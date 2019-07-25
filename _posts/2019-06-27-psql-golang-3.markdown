---
layout: custom
title: "Make a todo app in Go and PostgreSQL, part iii"
permalink: /psql-golang-todo-app-3/
---

This is part three of what looks like it's going to be a trilogy. Part one lives <a href="/psql-golang-todo-app/" target="\_blank" rel="noopener noreferrer">here</a>, and part two lives <a href="/psql-golang-todo-app-2/" target="\_blank" rel="noopener noreferrer">here</a>. If you'd just like to see the code, it's <a href="#thecode">down here</a>.

If you've looked at them already, you know that we set up a Postgres database (called `gotodo`) and created a `todos` table. We hooked that up to a Go program, which defines a Postgres-compatible `Todo` model, a router, and -- so far -- just one useful route: a `create` to, well, create new todos.

Now that we have the database, router and model all playing nicely, we can build out the rest of our REST API.

Logically, given our ability to craft sleek, artisanal todos, we'll want to be able to admire them, singly and in their multitudes. Multitudes first. Let's add an `index` route to the `initRouter` function:

<pre class="prettyprint lang-go">
func initRouter() {
    router := mux.NewRouter()

    // $ curl http://localhost:8000/ -v
    router.HandleFunc("/", Home)

    /*********************************/
    /************* INDEX *************/  
    /*********************************/
    router.HandleFunc("/todos/", GetTodos).Methods("GET")

    // $ curl -H "Content-Type: application/json" http://localhost:8000/todos -d '{"name":"Wash the garbage","description":"Be especially thorough"}' -v
    router.HandleFunc("/todos/", CreateTodo).Methods("POST")

    log.Fatal(http.ListenAndServe(":8000", router))
}
</pre>

Next, define the `GetTodos` function:

<pre class="prettyprint lang-go">
var GetTodos = func(w http.ResponseWriter, r *http.Request) {
    var todos []Todo

    SqlStatement := `
        SELECT * FROM todos
    `

    rows, err := db.Query(SqlStatement)
    if err != nil {
        panic(err)
    }

    for rows.Next() {
        var Id int
        var Name string
        var Description string
        rows.Scan(&Id, &Name, &Description)

        todos = append(todos, Todo{
            Id: Id,
            Name: Name,
            Description: Description,
        })
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(todos)
}
</pre>

When that's done, save the file and `go run` it in the terminal. Once the server is running, we can create one more todo, just to make things more interesting:

<pre class="prettyprint lang-bsh">
$ curl -H "Content-Type: application/json" http://localhost:8000/todos/ -d '{"name":"Obtain Gila monster","description":"Give it to Jimbo"}' -v
</pre>

Then we can test our `index` route using:

<pre class="prettyprint lang-bsh">
$ curl http://localhost:8000/todos/ -v
</pre>

Ideally, along with http status information, you'll get back something like this:

<pre class="prettyprint lang-bsh">
[{"Id":1,"name":"Take the garbage out","description":"Like a normal person"},{"Id":2,"name":"Obtain Gila monster","description":"Give it to Jimbo"}]
</pre>

You can also check in Postgres using the SQL command from the `GetTodos` method: `SELECT * FROM todos;` (don't forget the semicolon).

That's fun, but what if we only want to see one todo? `show` time:

<pre class="prettyprint lang-go">
func initRouter() {
    router := mux.NewRouter()

    // $ curl http://localhost:8000/ -v
    router.HandleFunc("/", Home)

    // $ curl http://localhost:8000/todos/ -v
    router.HandleFunc("/todos/", GetTodos).Methods("GET")

    /********************************/
    /************* SHOW *************/  
    /********************************/
    router.HandleFunc("/todos/{id}/", GetTodo).Methods("GET")

    // $ curl -H "Content-Type: application/json" http://localhost:8000/todos -d '{"name":"Wash the garbage","description":"Be especially thorough"}' -v
    router.HandleFunc("/todos/", CreateTodo).Methods("POST")

    log.Fatal(http.ListenAndServe(":8000", router))
}

...

var GetTodo = func(w http.ResponseWriter, r *http.Request) {
    var todo Todo
    params := mux.Vars(r)

    SqlStatement := `
        SELECT * FROM todos
        WHERE id = $1
    `

    err := db.QueryRow(
        SqlStatement,
        params["id"],
    ).Scan(&todo.Id, &todo.Name, &todo.Description)

    if err != nil {
        panic(err)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(&todo)
}
</pre>

Note that this is our first use of mux parameters -- the `id` of the todo we want, which the router pulls from the url. For example:

<pre class="prettyprint lang-bsh">
$ curl http://localhost:8000/todos/1/ -v
...
{"Id":1,"name":"Wash the garbage","description":"Be especially thorough"}
</pre>

Nice. Except, maybe that's not the best way to handle an accumulation of domestic refuse. After a bit of Googling, you realize that normal people just take the trash out, so you'll need to update that todo.

Luckily, this is very todoable:

<pre class="prettyprint lang-go">
func initRouter() {
    router := mux.NewRouter()

    // $ curl http://localhost:8000/ -v
    router.HandleFunc("/", Home).Methods("GET")

    // $ curl http://localhost:8000/todos/ -v
    router.HandleFunc("/todos/", GetTodos).Methods("GET")

    // $ curl http://localhost:8000/todos/1/ -v
    router.HandleFunc("/todos/{id}/", GetTodo).Methods("GET")

    // $ curl -H "Content-Type: application/json" http://localhost:8000/todos -d '{"name":"Wash the garbage","description":"Be especially thorough"}' -v
    router.HandleFunc("/todos/", CreateTodo).Methods("POST")

    /********************************/
    /************ UPDATE ************/  
    /********************************/
    router.HandleFunc("/todos/{id}/", UpdateTodo).Methods("PUT")

    // start server
    log.Fatal(http.ListenAndServe(":8000", router))
}

...

var UpdateTodo = func(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
  	var todo Todo

    r.ParseForm() // must be called to access r.FormValue()

    SqlStatement := `
        UPDATE todos
        SET name = $1, description = $2
        WHERE id = $3
        RETURNING *
    `

    err := db.QueryRow(
        SqlStatement,
        r.FormValue("name"),
        r.FormValue("description"),
        params["id"],
    ).Scan(&todo.Id, &todo.Name, &todo.Description)

    if err != nil {
        panic(err)
    }

    w.Header().Set("Content-Type", "application/json")
  	json.NewEncoder(w).Encode(&todo)
}
</pre>

Let's see if that works (note that the `%20`s below represent spaces):

<pre class="prettyprint lang-bsh">
$ curl -X PUT http://localhost:8000/todos/1/ -d name=Take%20the%20garbage%20out -d description=Like%20a%20normal%20person -v
...
{"Id":1,"name":"Take the garbage out","description":"Like a normal person"}
</pre>

Much better. There's just one last problem. It appears Jimbo has found himself a new supplier, a much trendier one who makes todo apps in Rust. He has no more need of your services, so you have no more need of a Gila monster. You need a `delete` route.

<pre class="prettyprint lang-go">
func initRouter() {
    router := mux.NewRouter()

    // $ curl http://localhost:8000/ -v
    router.HandleFunc("/", Home).Methods("GET")

    // $ curl http://localhost:8000/todos/ -v
    router.HandleFunc("/todos/", GetTodos).Methods("GET")

    // $ curl http://localhost:8000/todos/1/ -v
    router.HandleFunc("/todos/{id}/", GetTodo).Methods("GET")

    // $ curl -H "Content-Type: application/json" http://localhost:8000/todos -d '{"name":"Wash the garbage","description":"Be especially thorough"}' -v
    router.HandleFunc("/todos/", CreateTodo).Methods("POST")

    $ curl -X PUT http://localhost:8000/todos/1/ -d name=Take%20the%20garbage%20out -d description=Like%20a%20normal%20person -v
    router.HandleFunc("/todos/{id}/", UpdateTodo).Methods("PUT")

    /********************************/
    /************ DELETE ************/  
    /********************************/
    router.HandleFunc("/todos/{id}/delete/", DeleteTodo).Methods("DELETE")

    // start server
    log.Fatal(http.ListenAndServe(":8000", router))
}

...

var DeleteTodo = func(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
  	var todo Todo

    SqlStatement := `
        DELETE FROM todos
        WHERE id = $1
        RETURNING *
    `

    err := db.QueryRow(
        SqlStatement,
        params["id"],
    ).Scan(&todo.Id, &todo.Name, &todo.Description)

    if err != nil {
        panic(err)
    }

    w.Header().Set("Content-Type", "application/json")
  	json.NewEncoder(w).Encode(&todo)
}
</pre>

Testing:

<pre class="prettyprint lang-bsh">
$ curl -X DELETE http://localhost:8000/todos/2/delete/ -v
...
{"Id":2,"name":"Obtain Gila monster","description":"Give it to Jimbo"}
</pre>

And just to be sure:

<pre class="prettyprint lang-bsh">
$  curl http://localhost:8000/todos/ -v
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8000 (#0)
> GET /todos/ HTTP/1.1
> Host: localhost:8000
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Thu, 27 Jun 2019 21:59:15 GMT
< Content-Length: 78
<
[{"Id":1,"name":"Take the garbage out","description":"Like a normal person"}]
* Connection #0 to host localhost left intact
</pre>

How bittersweet: a successfully deleted todo.

All done. I hope that was informative, but if you have any questions or corrections, please <a href="/contact/" target="\_blank" rel="noopener noreferrer">email me</a>.

<a name="thecode"></a>

Here's the complete code (and here it is on <a href="https://github.com/davidfloyd91/gotodo" target="\_blank" rel="noopener noreferrer">Github</a>, if you prefer):

<pre class="prettyprint lang-go">
package main

import (
    "database/sql"
    "encoding/json"
    // "fmt"
    "log"
    "net/http"
    "github.com/gorilla/mux"
    _ "github.com/lib/pq"
)

var db *sql.DB

type Todo struct {
    Id int `json: "id", db: "id"`
    Name string `json:"name", db:"name"`
    Description string `json:"description", db:"description"`
}

func main() {
    initDB()
    // fmt.Printf("it worked!")

    initRouter()
}

/********************************/
/************ routes ************/  
/********************************/

func initRouter() {
    router := mux.NewRouter()

    // $ curl http://localhost:8000/ -v
    router.HandleFunc("/", Home).Methods("GET")

    // $ curl http://localhost:8000/todos/ -v
    router.HandleFunc("/todos/", GetTodos).Methods("GET")

    // $ curl http://localhost:8000/todos/1/ -v
    router.HandleFunc("/todos/{id}/", GetTodo).Methods("GET")

    // $ curl -H "Content-Type: application/json" http://localhost:8000/todos/ -d '{"name":"Do something cool","description":"Or not"}' -v
    router.HandleFunc("/todos/", CreateTodo).Methods("POST")

    // $ curl -X PUT http://localhost:8000/todos/9/ -d name=Ok%20gee -d description=Sure%20nice -v
    router.HandleFunc("/todos/{id}/", UpdateTodo).Methods("PUT")

    // $ curl -X DELETE http://localhost:8000/todos/8/delete/ -v
    router.HandleFunc("/todos/{id}/delete/", DeleteTodo).Methods("DELETE")

    // start server
    log.Fatal(http.ListenAndServe(":8000", router))
}

/********************************/
/*********** handlers ***********/  
/********************************/

/*** home ***/
var Home = func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode("أهلا بالعالم")
}

/*** index ***/
var GetTodos = func(w http.ResponseWriter, r *http.Request) {
    var todos []Todo

    SqlStatement := `
        SELECT * FROM todos
    `

    rows, err := db.Query(SqlStatement)
    if err != nil {
        panic(err)
    }

    for rows.Next() {
        var Id int
        var Name string
        var Description string
        rows.Scan(&Id, &Name, &Description)

        todos = append(todos, Todo{
            Id: Id,
            Name: Name,
            Description: Description,
        })
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(todos)
}

/*** show ***/
var GetTodo = func(w http.ResponseWriter, r *http.Request) {
    var todo Todo
    params := mux.Vars(r)

    SqlStatement := `
        SELECT * FROM todos
        WHERE id = $1
    `

    err := db.QueryRow(
        SqlStatement,
        params["id"],
    ).Scan(&todo.Id, &todo.Name, &todo.Description)

    if err != nil {
        panic(err)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(&todo)
}

/*** create ***/
var CreateTodo = func(w http.ResponseWriter, r *http.Request) {
    todo := &Todo{}

    err := json.NewDecoder(r.Body).Decode(todo)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        return
    }

    SqlStatement := `
        INSERT INTO todos (name, description)
        VALUES ($1, $2)
        RETURNING id
    `

    id := 0
    err = db.QueryRow(SqlStatement, todo.Name, todo.Description).Scan(&id)
    if err != nil {
        panic(err)
    }

    todo.Id = id

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(todo)
}

/*** update ***/
var UpdateTodo = func(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
  	var todo Todo

    r.ParseForm() // must be called to access r.FormValue()

    SqlStatement := `
        UPDATE todos
        SET name = $1, description = $2
        WHERE id = $3
        RETURNING *
    `

    err := db.QueryRow(
        SqlStatement,
        r.FormValue("name"),
        r.FormValue("description"),
        params["id"],
    ).Scan(&todo.Id, &todo.Name, &todo.Description)

    if err != nil {
        panic(err)
    }

    w.Header().Set("Content-Type", "application/json")
  	json.NewEncoder(w).Encode(&todo)
}

/*** delete ***/
var DeleteTodo = func(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
  	var todo Todo

    SqlStatement := `
        DELETE FROM todos
        WHERE id = $1
        RETURNING *
    `

    err := db.QueryRow(
        SqlStatement,
        params["id"],
    ).Scan(&todo.Id, &todo.Name, &todo.Description)

    if err != nil {
        panic(err)
    }

    w.Header().Set("Content-Type", "application/json")
  	json.NewEncoder(w).Encode(&todo)
}

/********************************/
/************** db **************/  
/********************************/

// hook up to postgres db
func initDB() {
  var err error
  db, err = sql.Open("postgres", "dbname=gotodo sslmode=disable")

  if err != nil {
      panic(err)
  }
}
</pre>
