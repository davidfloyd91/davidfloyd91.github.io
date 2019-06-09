---
layout: custom
title: "A bit of history: how JavaScript fetched before fetch"
permalink: /fetch-xmlhttprequest/
---

If, like myself, you began learning JavaScript in the past year or two, you might never have used anything but the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" target="\_blank" rel="noopener noreferrer">Fetch API</a> to make HTTP requests.

Not that there's anything wrong with `fetch()`. Ignoring <a href="https://gomakethings.com/why-i-still-use-xhr-instead-of-the-fetch-api/" target="\_blank" rel="noopener noreferrer">justifiable complaints</a> about its <a href="https://www.tjvantoll.com/2015/09/13/fetch-and-errors/" target="\_blank" rel="noopener noreferrer">deceptively complex</a> error handling, the Fetch API is clean and inuitive.

Here's a hyper-simplified `GET` request (which will [should] work in the console if you feel like trying it):

``` javascript
fetch('https://jsonplaceholder.typicode.com/posts')
.then(res => res.json())
.then(console.log);
```

Nice, no? The thing is, despite being native to the language, `fetch()` is <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API$history?page=8" target="\_blank" rel="noopener noreferrer">young</a>. Firefox and Chrome added support in 2015. Safari didn't follow suit until 2017. There's also a lot of hidden complexity in `fetch()`. The function returns a `Promise` (also <a href="https://developers.google.com/web/fundamentals/primers/promises" target="\_blank" rel="noopener noreferrer">newly native</a> to JS), which simplifies the task of handling asynchronous requests and responses, but clearly indicates that not so long ago, developers relied on something less abstracted and arguably less convenient.

That something is called `XMLHttpRequest`.

Briefly, here's why you might want to care:

1. history is neat
2. you might run into pre-`fetch()` code you'd like to understand
3. `fetch()` will probably make more sense when you know about its predecessor

At least, that's why I care.

Re: #1, here's a neat historical tidbit: both "JavaScript" and "XMLHttpRequest" are products of cynical, Browser Wars-era naming conventions. Just as JavaScript -- created and christened in the mid-90s -- has very little to do with Java, `XMLHttpRequest` -- created and christened in the late-90s -- has very little to do with XML. It just so happens that Java and XML were so-hot-right-now when their namesakes were created.

Anyway, here's the `GET` request above, minus four years (this code, along with the neat historical tidbit above, come from the 2nd edition of <a href="https://eloquentjavascript.net/2nd_edition/" target="\_blank" rel="noopener noreferrer">Eloquent JavaScript</a>, and it should also work in the console, if you feel like trying it):

``` javascript
var req = new XMLHttpRequest();
req.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
req.addEventListener('load', function() {
  console.log(req.responseText);
});
req.send(null);
```

First, we create a request object `req`, which takes a couple of methods. `open()` is fed configuration information like the request type (`GET`), the url and a boolean (`true` in this case) that determines whether the request is performed asynchronously.

`req.open()` doesn't return a `Promise`, so `.then()` chaining isn't an option. Instead, we give `req` an event listener. On `load`, this listener is triggered, and a callback function logs the request's `responseText`.

Finally, `req.send()` is where we put the request's body -- or would, if it were a `POST` or `PATCH`. Since we're just `GET`ting for the time being, the body is `null`.

And now you know.
