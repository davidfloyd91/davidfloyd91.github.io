---
layout: custom
title: "Starlings and kestrels all the way down: the lambda calculus, part ii"
permalink: /lambda-calculus-functional-programming-starling-kestrel-2/
---
<script src="/scripts/lambda.js"></script>

In <a href="/lambda-calculus-functional-programming-starling-kestrel-1/" target="\_blank" rel="noopener noreferrer">part one</a> of this series, we introduced the lambda calculus, Alonzo Church's Turing-complete system that beat Turing to solving the _Entscheidungsproblem_ (sorry, there's no algorithm to determine if a statement is true in all models of a theory) by a matter of months.

We showed that just as you can build arbitrarily complex programs using the familiar stateful, machine-based manipulation of bits, you can do it without state -- just by passing arguments to functions that return values you can then pass into other functions.

And we saw how, using dots and variables and lambdas, you can build `identity`, `true`, `false` and `or`.

### λf.λa.λb.fba // flip

The next combinator we'll see is called `flip`, and it does something whose use isn't immediately obvious. Pass it a function and two other parameters (which is really just three functions -- everything's a function) and it returns that function applied to those same two parameters, but flipped.

Given `fab` as arguments, in other words, `flip` (conventionally called `Cs`) returns `fba`.

<div class="lambda-div" id="lambda-cardinal">
</div>

### λp.p KI K // not

What can we do with this? Say we pass `C` a `K` (`true`) as its first argument:

<pre class="prettyprint nocode">
// flip of true, a, b
(λfab.fba) K

// substitute K for f
Kba

// apply K, that is, return parameter b
b
</pre>

The `C` of `K`, `a` and `b` is ... `b`. Not much help in the abstract, but it's interesting, considering that the result is the same as the `KI` of `a` and `b`. In other words, `CK` is equivalent to `KI`: the `C` of `true` is `false`.

<pre class="prettyprint">
K(1)(2)
1

C(K)(1)(2)
2

KI(1)(2)
2
</pre>

Now what if we assign values to `a` and `b`? We have the technology:

<pre class="prettyprint nocode">
// flip of K, hardcoded K, hardcoded KI
(λf K KI.f KI K) K

// fix syntax (drop hardcoded parameters)
(λf.f KI K) K

// substitute K for f
K KI K

// apply K, that is, return the first argument
KI
</pre>

If we hardcode `a` to `K` (`true`) and `b` to `KI` (`false`), the `C` (`flip`) of `K` returns the first of the `flip`ped arguments: `KI`/`false`. Pass `false` to this hardcoded `flip`, and it returns `true`.

Sounds familiar.  

<div class="lambda-div" id="lambda-not">
</div>

We've derived boolean `not` from `C`. In case the gobbλedygook above wasn't convincing, let's try that in JavaScript:

<pre class="prettyprint">
NOT(K)
a => b => b

// which is equivalent to:
KI
a => b => b

NOT(KI)
a => b => a

// which is equivalent to:
K
a => b => a
</pre>

At this point we've knocked out most of the boolean values and operators: `true`, `false`, `||`, `!`. Just `&&` and `===` to go.

Let's start with `&&`.

### λpq.pqp // and

What does `and` do? It takes two booleans and returns a boolean, based on the inputs:

+ `true and true => true`
+ `true and false => false`
+ `false and true => false`
+ `false and false => false`

So we know our lambda function will begin with `λpq.`: two booleans. But what should they return?

If `p` is `K` (`true`), the answer depends on `q`: we should return `KI` if `q` is `KI` (`false`), and `K` if `q` is `K`.

If `p` is `KI`, on the other hand, we return `KI` regardless of what `q` is.

Beginning our return expression with `p`, we can begin to whittle away at the logic: now if `p` is `true`, we will return the following value (the first parameter passed to `p`). Since that depends on the value of `q`, we can say `λpq.pq_`.

If `p` is `true` and `q` is `true`, we return `KK`, which evaluates to `K` (`true`). If `p` is `true` and `q` is false, we return `K KI`, which evaluates to `KI` (`false`). Two down.

But what if `p` is `false`? It will return the second parameter passed to it, the `_` placeholder. We know this placeholder should encode `false`, since a `false and` anything will return `false`. So `_` is `p`. Or we can just hardcode it to `KI`:

<div class="lambda-div" id="lambda-and">
</div>

Prove it? Sure.

<pre class="prettyprint">
AND(K)(K)
a => b => a

// which is equivalent to:
K
a => b => a

AND(KI)(K)
a => b => b

// which is equivalent to:
KI
a => b => b
</pre>

Signs and wonders.

### λpq.p(q K KI)(q KI K) // equality

The last boolean operator we need to lambdify is equality: given two boolean values, return a boolean value based on whether the arguments were identical or not.

Which sounds more complex than it is:

+ `true and true => true`
+ `true and false => false`
+ `false and true => false`
+ `false and false => true`

So if we get a `K` as the first argument, we want to check whether the second argument is a `K`, return `K` if so, and return `KI` if not.

Since we're taking two boolean parameters, we'll start with `λpq.`. Since we're choosing a door based on the value of the first boolean, we'll begin out return value with `p` and choose between two outcomes -- `λpq.p _ _` -- based on the value of `q`, which in turn chooses between two outcomes: `λpq.p (q _ _) (q _ _)`.

If `p` is `true`, we choose the first parenthetical block, and if `q` is `true`, we pick the first option within that block. Since we want to return `true` for these arguments, we fill in a `K`:

`λpq.p (q K _) (q _ _)`

Applying the same logic, we can fill in the rest of the blanks:

<div class="lambda-div" id="lambda-equality">
</div>

And in JavaScript:

<pre class="prettyprint">
BEQ(K)(K)
a => b => a

BEQ(KI)(KI)
a => b => a

// which are equivalent to:
K
a => b => a

BEQ(K)(KI)
a => b => b

// which is equivalent to:
KI
a => b => b
</pre>

Hope that all was as fun for y'all as it was for me. Next time: numbers.
