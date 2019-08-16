---
layout: custom
title: "Starlings and kestrels all the way down: the lambda calculus, part v"
permalink: /lambda-calculus-functional-programming-starling-kestrel-5/
---
<script src="/scripts/lambda.js"></script>

Having arrived, via the <a href="/lambda-calculus-functional-programming-starling-kestrel-4#lambda-pair" target="\_blank" rel="noopener noreferrer">pair</a> and <a href="/lambda-calculus-functional-programming-starling-kestrel-4#lambda-phi" target="\_blank" rel="noopener noreferrer">phi</a> functions, at the <a href="/lambda-calculus-functional-programming-starling-kestrel-1#lambda-predecessor" target="\_blank" rel="noopener noreferrer">predecessor</a>, we're finally ready to subtract using lambda calculus.

### λa.λb.a PRED b // minus

Apologies if it's a bit anticlimactic:

<div class="lambda-div" id="lambda-minus">
</div>

The `MINUS` function is identical to the `PLUS` function, except that `SUCC` is replaced by `PRED`. The logic here is straightforward: if you want to subtract one from a number `a`, you find the predecessor of `a`. If you want to subtract two, you find two predecessors of `a`. If you want to subract `b`, you find `b` predecessors of `a`.

The tricky part is arriving at the `PRED` function. Before moving on, let's check that it works. To make that process a bit easier, we'll redefine all the building blocks for `MINUS`:

<pre class="prettyprint">
// helpers
const K = a => b => a
const KI = a => b => b
const ZERO = f => x => x
const SUCC = n => f => x => f(n(f)(x))
const PAIR = a => b => f => f(a)(b)
const PHI = p => PAIR(p(KI))(SUCC(p(KI)))
const PRED = n => (n(PHI)(PAIR(ZERO)(ZERO)))(K)
const MINUS = a => b => b(PRED)(a)

// numbers
const TWO = f => x => f(f(x))
const THREE = f => x => f(f(f(x)))
const FIVE = f => x => f(f(f(f(f(x)))))

// example function -- call with 0 to turn church numeral to decimal
const f = x => x + 1

MINUS(FIVE)(TWO)(f)(0)
3

// same as
THREE(f)(0)
3
</pre>

I don't know about you, but I'll never go back to typing boring old:

<pre class="prettyprint">
5 - 2 === 3
true
</pre>

### λa.λb.ab // exponent

Sadly I'm a bit pressed for time this week. I'd very much like to move on to the bluebird -- it's been a while since we've met a new bird function, after all -- and dig into this functional composition business we've mentioned so many times without actually defining it.

When you can compose functions, as any Haskell-head or combinatory logician will tell you, you unlock the language of the birds, and every fowl upon the earth is made a loyal soldier in your very own squawking, feathery, majestic, mathematical host.

So get pumped.

Until I've done a bit more reading, though, we'll content ourselves with exponentiation, a surprisingly simple procedure in lambda calculus (and one with a bird mascot, the thrush):

<div class="lambda-div" id="lambda-exponent">
</div>

All you have to do to find `FOUR` to the power of `THREE` is run `THREE(FOUR)`. (To be clear, that's what the `EXP` function is doing by returning `power(base)`, but you still pass the arguments in using the accustomed order: `EXP(base)(power)`). Let's reassure ourselves that that's true:

<pre class="prettyprint">
// numbers
const THREE = f => x => f(f(f(x)))
const FOUR = f => x => f(f(f(f(x))))

// example function -- call with 0 to turn church numeral to decimal
const f = x => x + 1

// exponent definition
const EXP = a => b => b(a)

EXP(FOUR)(THREE)(f)(0)
64

// same as
Math.pow(4, 3)
64
</pre>

Weird. See you next week.
