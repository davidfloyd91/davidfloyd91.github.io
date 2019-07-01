---
layout: custom
title: "Make a todo app in Go and PostgreSQL, part iv: TypeScript frontend"
permalink: /psql-golang-todo-app-4-typescript/
---

In the <a href="https://davidfloyd91.github.io/psql-golang-todo-app/" target="\_blank" rel="noopener noreferrer">first</a> <a href="https://davidfloyd91.github.io/psql-golang-todo-app-2/" target="\_blank" rel="noopener noreferrer">three</a> <a href="https://davidfloyd91.github.io/psql-golang-todo-app-3/" target="\_blank" rel="noopener noreferrer">parts</a> of this series, we saw how to build a very simple REST API in Go, as well as how to wire it up to a Postgres database. My plan was to leave it at that, but what fun is an API you can only interact with using the command line?

Negligible fun, so here's a brief addendum, in which we'll hook our Go API up to a frontend. Since you've opted for Go, choosing to brave type declarations and pointers and a finicky compiler, you might hesitate to build a loosey-goosey vanilla JavaScript frontend. How to ensure that your data is receiving the care and loving scrutiny it deserves?

TypeScript. By building your frontend in Microsoft's superset of JS, you can ensure that your data stays encapsulated in typed classes that mirror your Go structs and Postgres tables. Which is considerable fun.

First, <a href="https://www.typescriptlang.org/#download-links" target="\_blank" rel="noopener noreferrer">install</a> TypeScript, if you haven't already. Next create a file called `index.ts` in a directory of your choosing (we'll call it `gotodo-frontend` here). You'll need to add the TypeScript module using your favorite package manager -- mine happens to be yarn:

<pre class="prettyprint lang-bsh">
$ yarn add typescript
</pre>

As a reminder, in our Go todo app, we created a `Todo` data type, with the following attributes:

<pre class="prettyprint lang-go">
type Todo struct {
    Id int `json: "id", db: "id"`
    Name string `json:"name", db:"name"`
    Description string `json:"description", db:"description"`
}
</pre>

The challenge is to create a TypeScript class to mirror this Go struct. Luckily this isn't all that challenging:

<pre class="prettyprint">
// gotodo-frontend/index.ts
class Todo {
  id: number;
  name: string;
  description: string;

  constructor(res: any) {
    this.id = res.Id;
    this.name = res.name;
    this.description = res.description;
  }
}
</pre>

You might recognize the above as a version of and ES6 class, but with type declarations: `number`, `string`, and for the API `res`ponse, `any`.

Now to call the API. We'll need to define our `url` (remembering to change the port if you did so on the backend) and an empty array to fill with `Todo` instances. Then we'll write a `fetch` call:

<pre class="prettyprint">
const url: string = "http://localhost:8000";

class Todo {
  id: number;
  name: string;
  description: string;

  constructor(res: any) {
    this.id = res.Id;
    this.name = res.name;
    this.description = res.description;
  }
}

let todos: Todo[] = [];

function getTodos() {
  fetch(url + "/todos/")
  .then(res => res.json())
  .then(json => {
    // clear todos only if response is parsed
    todos = [];
    for (let todo of json) {
      todos.push(new Todo(todo));
    }
  })
  .then(() => console.log('todos: ', todos))
}
</pre>

Before we give this a whirl, let's confirm that our Go backend is working and that we have some todos to fetch. First, in the `gotodo` directory:

<pre class="prettyprint lang-bsh">
$ go run todo.go
</pre>

and if that works, in a new terminal tab:

<pre class="prettyprint lang-bsh">
$ curl http://localhost:8000/todos/ -v
</pre>

If you get an `OK` response, but no -- or too few -- todos, you can create new ones:

<pre class="prettyprint lang-bsh">
$ curl -H "Content-Type: application/json" http://localhost:8000/todos/ -d '{"name":"Create and blitz-scale todo app","description":"Prerequisite to seizure of Western Hemisphere"}' -v

$ curl -H "Content-Type: application/json" http://localhost:8000/todos/ -d '{"name":"Seize Western Hemisphere","description":"Govern justly"}' -v
</pre>

When that's in order, you can transpile it into old-school JS using TypeScript's CLI:

<pre class="prettyprint lang-bsh">
$ tsc index.ts
</pre>

If you've played fast and loose with your types, an ASCII animation of Satya Nadella's face will chide you. Otherwise the transpiler will finish silently and you'll find a brand new `index.js` file sitting next to `index.ts` in your frontend directory:

<pre class="prettyprint">
// gotodo-frontend/index.js
var url = "http://localhost:8000";
var Todo = /** @class */ (function () {
    function Todo(res) {
        this.id = res.Id;
        this.name = res.name;
        this.description = res.description;
    }
    return Todo;
}());
var todos = [];
function getTodos() {
    fetch(url + "/todos/")
        .then(function (res) { return res.json(); })
        .then(function (json) {
        // clear todos only if response is parsed
        todos = [];
        for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
            var todo = json_1[_i];
            todos.push(new Todo(todo));
        }
    })
        .then(function () { return console.log('todos: ', todos); });
}
</pre>

To call `getTodos`, let's set up a (very, very) simple html interface in an `index.html`

<pre class="prettyprint">
&lt;!DOCTYPE html&gt;
&lt;html lang="en" dir="ltr"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;&lt;/title&gt;
    &lt;!-- src tag imports transpiled index.ts  --&gt;
    &lt;script src="./index.js"&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;button id="fetch"&gt;getTodos()&lt;/button&gt;
  &lt;/body&gt;
&lt;/html&gt;
</pre>

and hook the button up to the `getTodos` function (note that grabbing the button's `id` is a bit more involved in TypeScript):

<pre class="prettyprint">
document.addEventListener("DOMContentLoaded", event => {
  document.addEventListener("click", e => {
    if (e["target"]["attributes"]["id"]["value"] === "fetch") {
      getTodos()
    };
  });

  function getTodos() {
    fetch(url + "/todos/")
    .then(res => res.json())
    .then(json => {
      // clear todos only if response is parsed
      todos = [];
      for (let todo of json) {
        todos.push(new Todo(todo));
      }
    })
    .then(() => console.log('todos: ', todos))
  }
});
</pre>

Run `$ tsc index.ts` to re-transpile the file, and `open index.html` in your favorite browser. Click `getTodos()` and check the dev panel.

Disaster.

<pre class="prettyprint nocode">
Access to fetch at 'http://localhost:8000/todos/' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
</pre>

To complete the fetch, we'll need to make some tweaks to our Go backend. First, we need to import this excellent cors library (remember to `go get` it in the `gotodo` directory):

<pre class="prettyprint lang-go">
// gotodo/todo.go
import (
    ...
    "github.com/rs/cors"
 )
</pre>

And then use it:

<pre class="prettyprint lang-go">
func initRouter() {
    ...

    c := cors.New(cors.Options{
        // allowing wildcard origins isn't secure
        AllowedOrigins: []string{"*"},
        AllowCredentials: true,
    })

    handler := c.Handler(router)

    // replace the line `log.Fatal(http.ListenAndServe(":8000", router))`
    // with the below:
    log.Fatal(http.ListenAndServe(":8000", handler))
}
</pre>

Stop the server, `go run todo.go`, and try the `getTodos()` button again in the browser. This time, the browser should log something like:

<pre class="prettyprint nocode">
todos:  
(3) [Todo, Todo, Todo]
0: Todo {id: 1, name: "Take the garbage out", description: "Like a normal person"}
1: Todo {id: 3, name: "Create and blitz-scale todo app", description: "Prerequisite to seizure of Western Hemisphere"}
2: Todo {id: 4, name: "Seize Western Hemisphere", description: "Govern justly"}
length: 3
__proto__: Array(0)
</pre>

Maximum fun. The frontend repository is available on Github <a href="https://github.com/davidfloyd91/gotodo-frontend" target="\_blank" rel="noopener noreferrer">here</a>, and the tweaked backend is available <a href="https://github.com/davidfloyd91/gotodo/tree/frontend-cors" target="\_blank" rel="noopener noreferrer">here</a> (note the branch).
