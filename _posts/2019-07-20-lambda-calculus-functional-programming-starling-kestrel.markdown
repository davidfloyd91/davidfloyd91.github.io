---
layout: custom
title: "Starlings and kestrels all the way down: the lambda calculus, part i"
permalink: /lambda-calculus-functional-programming-starling-kestrel-1/
---
<script src="/scripts/lambda.js"></script>

In the realms of physics, math and computers, there are all sorts of strange truths I can periodically -- and usually only briefly -- convince myself are real. The four dimensions of spacetime are a continuum (and then there are seven more dimensions or something like that). Shapes can have finite areas but infinite perimeters. Quantum ... anything.

And all the apps and all the internet and all the code and data everywhere are all just `1`s and `0`s.

That last one is familiar, if never quite fully graspable (speaking for myself of course). We came to encode so much information in binary because in 1928, a couple of German mathematicians posed a question called the "decision problem" or _Entscheidungsproblem_, which -- as David Joyce, Clark University professor emeritus of math and computer science, helpfully <a href="https://www.quora.com/How-can-I-explain-Entscheidungs-problem-in-a-few-sentences-to-people-without-confusing-people" target="\_blank" rel="noopener noreferrer">paraphrased</a> it -- asks whether there is "an algorithm to determine if a statement is true in all models of a theory."

Whatever exactly that means, the answer (no) turned out to be incredibly important. When a twenty-something British mathematician published a paper in 1936 describing a wacky <a href="https://www.youtube.com/watch?time_continue=149&v=E3keLeMwfHY" target="\_blank" rel="noopener noreferrer">machine</a> that prints, erases and reprints binary on an infinite tape, keeping track of changing state as it goes, we gained not only <a href="https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf" target="\_blank" rel="noopener noreferrer">proof</a> that there is no such algorithm -- we were left, seemingly as a side effect, with computers.

Ever since, we've been calling systems with computerly capabilities "Turing complete" and building gizmos that write values to tape and track state in the much the same way Turing described. We've just replaced the tape with hardware that's squintillions of times faster. The fundamentally stateful approach to computing remains the same.

## Lambda calculus

But there is an alternative.

A couple of months before Turing slapped his name on every available surface of computing's legacy, an American solved the same problem using a totally different <a href="https://www.ics.uci.edu/~lopes/teaching/inf212W12/readings/church.pdf" target="\_blank" rel="noopener noreferrer">approach</a>. And in the process, Alonzo Church -- who would later become Turing's PhD adviser -- reduced the whole universe of computation to another brain-kneadingly tiny set of symbols.

Just as you can express any program like this:

<pre class="prettyprint nocode">
01100111 01101001 01100010 01100010 01100101 01110010 01101001 01110011 01101000
</pre>

You can also express any program like this:

<pre class="prettyprint nocode">
(λxy.xy((λfab.fba)y))((λfab.fba)((λxy.xyx)pq))((λf.ff)((λfab.fba)p)((λfab.fba)q))
</pre>

That binary is gibberish (literally the ASCII string "gibberish"), because that's not our focus here. The stuff below, though, is highly meaningful: it expresses a <a href="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" target="\_blank" rel="noopener noreferrer">fundamental law of logic</a>: `not (A and B) = not A or not B` (that's `!(a && b) === !a || !b` in JavaScript).

This business is called the **lambda calculus**, and it is every bit as Turing complete as the infinite tape rig. The system achieves perfect computational might by a totally different road than Turing machines, though: there is no state in lambda calculus -- no memory, and no mutable variables. Everything in the lambda calculus is a function.

### λa.a // identity

Every `λ` in the math above denotes a function definition, and the rest of the symbols (bar the periods) are just the functions' parameters (on the left side of the period) and return expressions (on the right).

In other words, they're anonymous functions. This:

<pre class="prettyprint nocode">
λa.a
</pre>

can be written in JavaScript as:

<pre class="prettyprint">
function (a) { return a }

// or in ES6 as:
a => a
</pre>

Pass this function a thing -- anything -- and it returns said thing. In other words, it's the identity function:

<div class="lambda-div" id="lambda-ibis">
</div>

Speaking of passing things to functions, here's how they're invoked in lambda calculus syntax:

<pre class="prettyprint nocode">
fx
</pre>

`f` is the function, `x` is the parameter. Essentially, we've just dropped the parentheses from JavaScript:

<pre class="prettyprint">
f(x)
</pre>

So invoking the identity function with a parameter `x` looks like this:

<pre class="prettyprint nocode">
λa.ax
x
</pre>

And as in JavaScript, functions are invoked from left to right, unless parentheses mandate otherwise:

<pre class="prettyprint nocode">
lambda: fxy
js: f(x)(y)

versus

lambda: f(xy)
js: f(x(y))
</pre>

Back to the identity function: pass `I` an argument `x`, and it returns `x`. That simple. We can define and run the same logic in JavaScript (ES6) and test it with a value of, say, `1`:

<pre class="prettyprint">
const I = a => a

I(1)
1
</pre>

(By the way, if you prefer to play around with lambda calculus directly, rather than via JavaScript, Liang Gong has a nifty interpreter on his <a href="https://jacksongl.github.io/files/demo/lambda/index.htm" target="\_blank" rel="noopener noreferrer">site</a>.)

Note that we're assigning this function to the variable `I` so that we can combine it with other lambda functions (there are others, and they're all more exciting than identity) without the result looking like this:

<pre class="prettyprint nocode">
(λxy.xy((λfab.fba)y))((λfab.fba)((λxy.xyx)pq))((λf.ff)((λfab.fba)p)((λfab.fba)q))
</pre>

The function still isn't named, though: we're just assigning an anonymous function to a variable.

Before we go any farther, I'd like to refer you to this excellent <a href="https://www.youtube.com/watch?v=3VQ382QG-y4" target="\_blank" rel="noopener noreferrer">two</a>-<a href="https://www.youtube.com/watch?v=pAnLQ9jwN-E" target="\_blank" rel="noopener noreferrer">part</a> talk (and <a href="https://speakerdeck.com/glebec/lambda-as-js-or-a-flock-of-functions-combinators-lambda-calculus-and-church-encodings-in-javascript" target="\_blank" rel="noopener noreferrer">deck</a> and code <a href="https://glebec.github.io/lambda-talk/" target="\_blank" rel="noopener noreferrer">walkthrough</a>) by Gabriel Lebec, whose treatment of the subject is excellent and accessible. It inspired and informed this post, once it was done melting my brain. He also explains why the combinators are named after birds, which is a great story I won't get into right now.

### λf.ff // or

Next comes the "mockingbird" or self-application function. It takes a function as a parameter, then calls that function on itself. Depending on the function, this can trigger infinite recursion, or it can reduce to a rational value. The trick -- the "halting problem" -- is that you can't know until you try.

<div class="lambda-div" id="lambda-mockingbird">
</div>

Also, as we'll see in a bit, the self-application function is equivalent to the logical operator `or`. All `or` is, when you drill down, is functional self-application. The world is wide and strange.

### λa.λb.a // true

To round out part one of this series, let's take a look at the booleans. You can hardly have `or` -- an operator that takes two booleans and returns one -- without `true` and `false`.

But how to express them?

In the lambda calculus, `true` is a function that takes two parameters and returns the first one. I'll confess to being a bit perplexed as to why this is so, but it becomes clear fairly quickly how this go-with-door-number-one operator serves as a building block to more complex programs.

<div class="lambda-div" id="lambda-kestrel">
</div>

(By the way, the `λab.a` is equivalent to `λa.λb.a`, which more accurately denotes what's really happening, but sucks to read. No lambda function actually takes more than one parameter -- they just pass the return values on to other functions in a process known as <a href="https://en.wikipedia.org/wiki/Currying" target="\_blank" rel="noopener noreferrer">currying</a>.)

You might be asking why the `true` function is also called `const`. Let's ask the JavaScript.

<pre class="prettyprint">
const K = a => b => a

const three = K(3)

three(10)
3

three(10000000000)
3
</pre>

Calling the `true` or `const` function with any `a` returns a function that always returns `a` -- whatever `b` parameter is passed to it. `K(3)` will give you `3` no matter how it's invoked. So `K`, in addition to encoding the `true` boolean, sets a constant.

### λa.λb.b // false

What if you pass `I` into `K` as its `a` argument? Whatever `b` is, `K` will return `I`. Pass `K(I)` an `x`, you get `I`. Pass `K(I)(x)` a `y`, though, and you get `y`: `I(y)`, the identity of `y`.

Which sort of looks like the opposite of `K`:

<pre class="prettyprint">
K(1)(2)
1

K(I)(1)
a => a

// the above is equivalent to:
I
a => a

K(I)(1)(2)
2
</pre>

The `true` of `identity`, it turns out, is `true`'s opposite: `false`.

<div class="lambda-div" id="lambda-kite">
</div>

### λf.ff(λa.λb.a)(λa.λb.b) // true or false

Now that we've defined `true` and `false`, we can convince ourselves that `M` is (a form of) `or`. First a quick review of how `or` works:

+ `true or true => true`
+ `true or false => true`
+ `false or true => true`
+ `false or false => false`

`M(K)(KI)` (`true or false`), then, should return `K`, which it does:

<pre class="prettyprint">
M(K)(KI)
a => b => a

// which is equivalent to:
K
a => b => a
</pre>

You can try out the other permutations in the console or a REPL and see that functional self-application reliably `or`s two booleans.

We can even show that this works by simplifying the lambda notation through a process known as "β reduction":

`true or false` returns `true`! Everything's in its right place.

<pre class="prettyprint nocode">
// true or false, equivalent to M(K)(KI)
λf.ff(λa.λb.a)(λa.λb.b)

// apply M, substituting K for f (that is, apply K to itself)
(λa.λb.a)(λa.λb.a)(λa.λb.b)

// apply K, that is, return parameter a, which is K or true
(λa.λb.a)
</pre>

## Whoa

Knowing that at some level, all data can be encoded through pure (in all senses of the word) functions -- that `or` is the self-application of an arbitrary function, that `true` is a function that latches onto its first argument, and that `false` is `true` applied to a function that returns its argument -- well it's very weird and pretty fun. Imho, at least.

Till part two.
