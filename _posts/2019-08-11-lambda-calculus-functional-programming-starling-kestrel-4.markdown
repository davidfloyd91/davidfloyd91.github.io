---
layout: custom
title: "Starlings and kestrels all the way down: the lambda calculus, part iv"
permalink: /lambda-calculus-functional-programming-starling-kestrel-4/
---
<script src="/scripts/lambda.js"></script>

So far in our journey through the lambda calculus, we've learned how to encode booleans -- and compare and conjoin and disjoin and negate them -- as well as encode numbers and well, just add them. So far.

### λa.λb.λf.fab // pair

Before we can do much more arithmetic, though, we need to define our first lambda calculus data structure. Its spirit-bird is the vireo, and it holds a pair of functions using a closure: `a` and `b`.

<div class="lambda-div" id="lambda-pair">
</div>

Depending on the `f` you pass to `PAIR`, it will return one or the other of these two items: `K` (which is our <a href="/lambda-calculus-functional-programming-starling-kestrel-1#lambda-kestrel" target="\_blank" rel="noopener noreferrer">true</a>) will return the first one, `a`, while `KI` (<a href="/lambda-calculus-functional-programming-starling-kestrel-1#lambda-kite" target="\_blank" rel="noopener noreferrer">false</a>) will return the second, `b`.

<pre class="prettyprint">
PAIR(1)(2)(K)
1

PAIR(1)(2)(KI)
2
</pre>

That's nice. But what can we do with it? Subtract, eventually.

### λp.PAIR (p KI) (SUCC (p KI)) // phi

First, though, we need to define a `Φ` function, which is like memory foam to the successor function's grungy old box spring.

<div class="lambda-div" id="lambda-phi">
</div>

The successor function takes a number and returns that number, incremented by one. `PHI` does something similar, but retains the original number by taking a pair of numbers (, discarding the first number,) and returning a pair containing the second number and its successor.

Let's try it with, say, `THREE`. To show that the sometimes garbled-looking function declarations we get as return values are in fact what we're expecting, we'll define a function `f` to run `THREE` or however many times. To keep things simple, we'll have it return `3` if run `THREE` times, `4` if `FOUR`, etc.

<pre class="prettyprint">
// simple function: show Church encodings as decimal numbers
const f = x => x + 1

// define a pair, the second value of which is three
const pair = PAIR("this first value doesn't matter")(THREE)

// run phi on that pair
const phiPair = PHI(pair)

// check the first value of phiPair by passing it f(0)
phiPair(K)(f)(0)
3

// that's equivalent to
THREE(f)(0)
3

// check the second value of phiPair
phiPair(KI)(f)(0)
4

// that's equivalent to
FOUR(f)(0)
4
</pre>

That's also nice. Can we subtract now?

### λn.K (n PHI PAIR(ZERO ZERO)) // predecessor

Sure can, but only by one. With `PHI` and `PAIR`, we can build a predecessor function to emulate JavaScript's `--` or `-= 1`.

In keeping with the general theme here, the way lambda calculus accomplishes decrementing by one is convoluted, but it does make sense: given a number `n`, we can take a `PAIR` of `ZERO`s, `PHI` it up `n` times, and take the first item of the returned pair.

Say we want the predecessor of `25`. Applying `PHI` once to a `0, 0` pair gives us `0, 1`. Doing it twice gives us `1, 2`. Twenty-five times, `24, 25`. Grab the first value out of that pair, and we've got our answer.

No, this is not especially efficient.

<div class="lambda-div" id="lambda-predecessor">
</div>

Let's just ~~get it to work~~ prove that it works real quick:

<pre class="prettyprint">
PRED(FOUR)(f)(0)
3

// same as
THREE(f)(0)
3
</pre>

Chévere.

Subtraction by an arbitrary subtrahend (<a href="https://en.wiktionary.org/wiki/subtrahend" target="\_blank" rel="noopener noreferrer">who knew?</a>) next time. I swear.
