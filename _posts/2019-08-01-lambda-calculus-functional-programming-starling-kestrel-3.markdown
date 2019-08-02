---
layout: custom
title: "Starlings and kestrels all the way down: the lambda calculus, part iii"
permalink: /lambda-calculus-functional-programming-starling-kestrel-3/
---
<script src="/scripts/lambda.js"></script>

In <a href="/lambda-calculus-functional-programming-starling-kestrel-1/" target="\_blank" rel="noopener noreferrer">part one</a> of this series, we met Alan Turing's PhD adviser Alonzo Church and his lambda calculus, the purely functional, Turing-complete system he devised less than a year before his advisee-to-be published a much more influential machine-based approach to the same problem (ensuring no one would ever talk about Church-complete programming languages). We then defined `true`, `false` and `or` using the lambda calculus.

In <a href="/lambda-calculus-functional-programming-starling-kestrel-2/" target="\_blank" rel="noopener noreferrer">part two</a>, we saw how lambda functions can be used to construct boolean operators (besides `or`): `and`, boolean equality and `not`.

Now it's time for numbers and arithmetic. Made of functions.

### λf.λx.x // 0

In a pleasant parallel with binary, lambda calculus's zero is the same as its `false`. The `0` function takes a function `f` and an `x` as parameters, and returns the `x`.

In other words, zero applies the function `f` to `x` zero times.

<div class="lambda-div" id="lambda-zero">
</div>

How is that the same as `false`? The `KI` function, if you recall from <a href="/lambda-calculus-functional-programming-starling-kestrel-1#lambda-kite" target="\_blank" rel="noopener noreferrer">part one</a>, encodes `false` by taking two parameters and returning the second one. The `ZERO` function does the same, it just names the parameters differently -- not out of any particular necessity, but out of convention:

<pre class="prettyprint nocode">
// false
KI := λab.b

// is equivalent to:
ZERO := λfx.x
</pre>

### λf.λx.fx, λf.λx.f(fx), λf.λx.f(f(fx)) ... // 1, 2, 3 ...

<span id="note1top"></span>

Perhaps you've intuited that, if the application of an arbitrary function zero times to `x` is lambdese for `0`, `1` is likely to be the application of that function once: `λfx.fx`.<a href="#note1"><sup>[1]</sup></a>

You'd be right. But surely `2` can't just be `f(fx)`, `3` `f(f(fx))`, `4` ...

Bizarrely, that's actually right:

<div class="lambda-buttons" id="one-two-three">
  <div class="lambda-div" id="lambda-one" style="display:block;">
  </div>
  <div class="lambda-div" id="lambda-two" style="display:none;">
  </div>
  <div class="lambda-div" id="lambda-three" style="display:none;">
  </div>
  <div class="lambda-div" id="lambda-four" style="display:none;">
  </div>
  <div class="lambda-div" id="lambda-five" style="display:none;">
  </div>
</div>

Clearly lambda calculus isn't very useful for hardcoding numbers. But it is interesting to see how, given this system as a basis, you can perform arithmetic.

First, though, a reminder -- for myself as much as anyone -- of what an "arbitrary function" means. In short, anything. Add, subtract, sequence the mantis shrimp genome, order a burrito, scramble the jets. Lambda's `ONE` ("ONCE" would probably be more accurate), denotes a single application of `f` to a parameter, `TWO` a double application, and so on. If that `f` is adding 5 to a number `x` that starts out as 3, you get:

<pre class="prettyprint nocode">
// f := λx.PLUS x 5
// ... where PLUS means what you think it does

// ZERO
3

// ONE
3 + 5
8

// TWO
8 + 5
13

// THREE
13 + 5
18
</pre>

If it's scrambling the jets, you do that however many times.

### λn.λf.λx.f(nfx) // successor

<div class="lambda-div" id="lambda-successor">
</div>

### λa.λb.a SUCC b // plus

<div class="lambda-div" id="lambda-plus">
</div>

## Notes

<a id="note1" href="#note1top"><sup>[1]</sup></a>It would be nice if `1` were equivalent to the lambda calculus `true`, as in binary, but that would be `λfx.f`. If it's any consolation, `λfx.fx` is an expression the <a href="/lambda-calculus-functional-programming-starling-kestrel-1#lambda-ibis" target="\_blank" rel="noopener noreferrer">identity function</a> `I`.
