---
layout: custom
title: "Starlings and kestrels all the way down: the lambda calculus, part i"
permalink: /lambda-calculus-functional-programming-starling-kestrel-1/
---
<script src="/scripts/lambda.js"></script>

In the realms of physics, math and computers, there are all sorts of fundamental truths I can periodically -- and usually only briefly -- convince myself are true. The four dimensions of spacetime are a continuum (and then there are seven more dimensions or something like that). Shapes can have finite areas but infinite perimeters. Quantum ... anything.

And all the apps and all the internet and all the code and data everywhere are all just `1`s and `0`s.

That last one is familiar, if never quite fully graspable (speaking for myself of course). In 1928 a couple of German mathematicians posed a question called the "decision problem" or _Entscheidungsproblem_, which -- as David Joyce, Clark University professor emeritus of math and computer science, helpfully <a href="https://www.quora.com/How-can-I-explain-Entscheidungs-problem-in-a-few-sentences-to-people-without-confusing-people" target="\_blank" rel="noopener noreferrer">paraphrased</a> it -- asks whether there is "an algorithm to determine if a statement is true in all models of a theory."

Whatever exactly that means, the answer (no) turned out to be incredibly important. When a twenty-something-year-old British mathematician published a paper in 1936 describing a wacky machine with an infinite tape that proved there was no such algorithm, we suddenly had a computer.

Ever since, we've been calling systems with computerly capabilities "Turing complete" and building machines that write values to tape in the much the same way Turing described. We've just replaced the tape with hardware that's squintillions of times faster. That fundamentally stateful approach to computing -- in which variables store values that are overwritten as the program executes -- is the same.

## Lambda calculus

But a couple of months before Turing slapped his name on every available surface of computing's legacy, an American solved the same problem using a totally different approach. And in the process, Alonzo Church -- who would later become Turing's PhD adviser -- reduced the whole universe of computation to another brain-kneadingly tiny set of symbols.

Just as you can express any program like:

<pre class="prettyprint nocode">
01100111 01101001 01100010 01100010 01100101 01110010 01101001 01110011 01101000
</pre>

You can express any program like:

<pre class="prettyprint nocode">
(λxy.xy((λfab.fba)y))((λfab.fba)((λxy.xyx)pq))((λf.ff)((λfab.fba)p)((λfab.fba)q))
</pre>

The binary's gibberish (literally the ASCII string "gibberish"), cause that's not what we're talking about here. The stuff below expresses a <a href="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" target="\_blank" rel="noopener noreferrer">fundamental law of logic</a>: `not (A and B) = not A or not B` (that's `!(a && b) === !a || !b` in JavaScript).

This business is called the **lambda calculus**, and it is every bit as Turing complete as Turing's tape. The system achieves perfect computational via by a totally different road than Turing machines, though: there is no state in lambda calculus -- no memory or mutable variables.

Every `λ` in the math above denotes a function, and the rest of the symbols (bar the periods) are just variables. On the left side of a period, they're that function's parameters; on the right, they're its return expression.

In other words, they're anonymous functions. This:

<pre class="prettyprint nocode">
λa.a
</pre>

can be written in JavaScript as:

<pre class="prettyprint">
function (a) { return a }

// or in ES6:
a => a
</pre>

Pass this function a thing -- anything -- and it returns said thing. In other words, it's the identity function:

<div class="lambda-div" id="lambda-identity">
</div>

Note that we're assigning this function to the variable `I` so that we can combine it with other lambda functions (yes there are others, and they're far more exciting) without the result looking like this:

<pre class="prettyprint nocode">
(λxy.xy((λfab.fba)y))((λfab.fba)((λxy.xyx)pq))((λf.ff)((λfab.fba)p)((λfab.fba)q))
</pre>

We're not really _naming the function_, though. It's still anonymous, as it is in the JavaScript given above: we're just assigning the anonymous function to a variable.

Behold the power of the identity function:

<pre class="prettyprint">
I(1)
1
</pre>

<div class="lambda-div" id="lambda-mockingbird">
</div>
