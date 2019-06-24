---
layout: custom
title: "Gotodo: make a todo app in Go and PostgreSQL (part ii)"
permalink: /psql-golang-todo-app-2/
---

This is part two of a multipart series. If you skipped part one, it lives <a href="https://davidfloyd91.github.io/psql-golang-todo-app/" target="\_blank" rel="noopener noreferrer">here</a>. Otherwise, you'll know that last time we set up a PostgreSQL database and created a `todos` table. We then wrote a bit of Go code to wire us up to that table.

But we can't REST yet (sorry), because we haven't set up any routes to do CRUD to our todos. We'll be using a popular router, <a href="https://github.com/gorilla/mux" target="\_blank" rel="noopener noreferrer">mux</a>, for this example, so the first step is to

<pre class="prettyprint lang-bsh">
$ go get github.com/gorilla/mux
</pre>

and add it (and `encoding/json`, `log` and `net/http`) to the project's dependencies:

<pre class="prettyprint lang-go">
import (
    "database/sql"
    "encoding/json"
    "log"
    "net/http"
    "github.com/gorilla/mux"
    _ "github.com/lib/pq"
)
</pre>

Next we'll define an `initRouter` function, which will listen on port 8000 and -- for the moment -- respond with a friendly hello, via an appropriately named helper function:

<pre class="prettyprint lang-go">
func initRouter() {
    router := mux.NewRouter()

    router.HandleFunc("/", Home)

    log.Fatal(http.ListenAndServe(":8000", router))
}

var Home = func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode("أهلا بالعالم")
}
</pre>

Now add a call to `initRouter` to the `main` function --

<pre class="prettyprint lang-go">
func main() {
    initDB()
    initRouter()
}
</pre>

-- and `go run` the file (if you want to remove the now-potentially-misleading "it worked!" log from `main`, as I did above, make sure to also remove `fmt` from the import statement at the top):

<pre class="prettyprint lang-bsh">
$ go run todo.go
</pre>

If the server starts up without complaining, you can check your fancy new root route using curl (in a new terminal tab):

<pre class="prettyprint lang-bsh">
$ curl http://localhost:8000/ -v
</pre>

This should log something like:

<pre class="prettyprint lang-bsh">
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8000 (#0)
> GET / HTTP/1.1
> Host: localhost:8000
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Mon, 24 Jun 2019 00:22:17 GMT
< Content-Length: 26
<
"أهلا بالعالم"
* Connection #0 to host localhost left intact
</pre>

Assuming that's in order, we can define some routes we might find more useful. Since we don't have any todos at all so far, let's start with a `POST` to the `/todos` route --

<pre class="prettyprint lang-go">
func initRouter() {
    router := mux.NewRouter()

    // $ curl http://localhost:8000/ -v
    router.HandleFunc("/", Home)

    router.HandleFunc("/todos", CreateTodo).Methods("POST")

    log.Fatal(http.ListenAndServe(":8000", router))
}
</pre>

and a corresponding `CreateTodo` function:

<pre class="prettyprint lang-go">
var CreateTodo = func(w http.ResponseWriter, r *http.Request) {
    todo := &Todo{}

    err := json.NewDecoder(r.Body).Decode(todo)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        return
    }

    sqlStatement := `
        INSERT INTO todos (name, description)
        VALUES ($1, $2)
        RETURNING id
    `

    id := 0
    err = db.QueryRow(sqlStatement, todo.Name, todo.Description).Scan(&id)
    if err != nil {
        panic(err)
    }

    todo.Id = id

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(todo)
}
</pre>

To see if that worked, kill the server (`^c`) and `go run` the file again. If it compiles, you can try to create your first todo. Something normal, like:

<pre class="prettyprint lang-bsh">
$ curl -H "Content-Type: application/json" http://localhost:8000/todos -d '{"name":"Wash the garbage","description":"Be especially thorough"}' -v
</pre>

If you get a response that looks like the below, you've instantiated your todo:

<pre class="prettyprint lang-bsh">
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8000 (#0)
> POST /todos HTTP/1.1
> Host: localhost:8000
> User-Agent: curl/7.54.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 66
>
* upload completely sent off: 66 out of 66 bytes
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Mon, 24 Jun 2019 01:33:48 GMT
< Content-Length: 74
<
{"Id":1,"name":"Wash the garbage","description":"Be especially thorough"}
* Connection #0 to host localhost left intact
</pre>

Just to be sure, though, you can check the database:

<pre class="prettyprint lang-bsh">
$ psql gotodo
$ gotodo=# select * from todos;
id |       name       |      description       
----+------------------+------------------------
 1 | Wash the garbage | Be especially thorough
(1 row)
</pre>

And that does it for part ii. Below is all the code we've written so far in one place. Until next time!

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

func initRouter() {
    router := mux.NewRouter()

    // $ curl http://localhost:8000/ -v
    router.HandleFunc("/", Home)

    // $ curl -H "Content-Type: application/json" http://localhost:8000/todos -d '{"name":"Wash the garbage","description":"Be especially thorough"}' -v
    router.HandleFunc("/todos", CreateTodo).Methods("POST")

    log.Fatal(http.ListenAndServe(":8000", router))
}

var Home = func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode("أهلا بالعالم")
}

var CreateTodo = func(w http.ResponseWriter, r *http.Request) {
    todo := &Todo{}

    err := json.NewDecoder(r.Body).Decode(todo)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        return
    }

    sqlStatement := `
        INSERT INTO todos (name, description)
        VALUES ($1, $2)
        RETURNING id
    `

    id := 0
    err = db.QueryRow(sqlStatement, todo.Name, todo.Description).Scan(&id)
    if err != nil {
        panic(err)
    }

    todo.Id = id

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(todo)
}

// hook up to postgres db
func initDB() {
  var err error
  db, err = sql.Open("postgres", "dbname=gotodo sslmode=disable")

  if err != nil {
      panic(err)
  }
}
</pre>
