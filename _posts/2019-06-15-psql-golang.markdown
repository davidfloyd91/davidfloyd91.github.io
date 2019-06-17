---
layout: custom
title: "Gotodo: make a todo app in Go and PostgreSQL (part i)"
permalink: /psql-golang-todo-app/
---

Go is a cool language. PostgreSQL (Postgres, from here) is a cool database. I should learn them and, if you're reading, you probably think you should too. So let's make a todo app (as in chores, tasks, appointments -- it took me forever not to read that as Spanish for "all").

We're going to start with a Postgres database. If you've installed Postgres, that's great. Otherwise, <a href="https://gomakethings.com/why-i-still-use-xhr-instead-of-the-fetch-api/" target="\_blank" rel="noopener noreferrer">we'll wait</a>.

In the terminal, within your project directory -- you might want to call it `go_todo` or anything that isn't taken -- run:

<pre class="prettyprint lang-bsh">
$ psql
</pre>

Then, when you see something like

<pre class="prettyprint lang-bsh">
psql (11.2)
Type "help" for help.

smartreaderusername=#
</pre>

enter:

<pre class="prettyprint lang-bsh">
smartreaderusername=# create database gotodo;
</pre>

It should return `CREATE DATABASE`. You can `exit`. Now navigate into your database

<pre class="prettyprint lang-bsh">
$ psql gotodo
</pre>

and create a `todo` table:

<pre class="prettyprint lang-bsh">
gotodo=# create table todos (
  id serial primary key,
  name text,
  description text
);
</pre>

This SQL command creates a table of `todo` instances, each with a `name` and `description` of type `text`. That's pretty straightforward, but it's worth noting that if -- like me -- you've been spoiled by Active Record, you have to define your own `id serial primary key`.

You can enter

<pre class="prettyprint lang-bsh">
smartreaderusername=# \dt public.*
</pre>

to check that your table is there:

<pre class="prettyprint lang-bsh">
List of relations
Schema | Name  | Type  |   Owner    
--------+-------+-------+------------
public | todos | table | smartreaderusername
(1 row)
</pre>

`exit`ing out of Postgres' CLI, we can `touch todo.go` -- assuming we have Go <a href="https://golang.org/doc/install" target="\_blank" rel="noopener noreferrer">installed</a> -- and add the following:

But not yet. Because first, in the terminal, you'll need to:

<pre class="prettyprint lang-bsh">
$ go get github.com/lib/pq
</pre>

Now, in `todo.go`:

<pre class="prettyprint lang-go">
  package main

  import (
      "database/sql"
      "fmt"
      _ "github.com/lib/pq"
  )

  var db *sql.DB

  type Todo struct {
      Id int `json: "id", db: "id"`
      Name string `json:"name", db:"name"`
      Description string `json:"description", db:"description"`
  }

  // if it worked, log such
  func main() {
    initDB()

    fmt.Printf("it worked!")
  }

  // hook up to postgres db
  func initDB() {
    var err error
    db, err = sql.Open("postgres", "dbname=todo sslmode=disable")

    if err != nil {
        panic(err)
    }
}
</pre>

And run it with

<pre class="prettyprint lang-bsh">
$ go run todo.go
</pre>

If it compiles without errors and logs `it worked!`, I have no cause to apologize. A couple of notes on the above. Every Go program has a package. The default, it appears, is `main`. The `import` statement brings outside code in, like a node_module or a gem, except that Go uses Github as its package manager, which strikes me as blindingly brilliant.

To handle our `todos` in Go, we define a `struct`, a datatype analogous to its namesake in C et fils. And finally we connect to our database with the `initDB()` function.

Now that we've connected Postgres to Go, we can set up a web server and a couple of routes, which we can use to create and read `todos`. Maybe update and delete them too. We'll see.

Till part ii!
