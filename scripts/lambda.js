const bigLambdaObj = {
  ibis: {
    id: "ibis",
    prev: null,
    next: null,
    title: "Identity ('ibis')",
    lambdaSyntax: "I := λa.a",
    jsSyntax: "var I = function (a) { return a }",
    es6Syntax: "const I = a => a",
    explanation: "The identity function takes a parameter and returns it."
  },
  mockingbird: {
    id: "mockingbird",
    prev: null,
    next: null,
    title: "Self-application ('mockingbird')",
    lambdaSyntax: "M := λf.ff",
    jsSyntax: "var M = function (f) { return f(f) }",
    es6Syntax: "const M = f => f(f)",
    explanation: "The self-application function takes a function as a parameter and returns the application of that function to itself."
  },
  kestrel: {
    id: "kestrel",
    prev: null,
    next: null,
    title: "True, const ('kestrel')",
    lambdaSyntax: "K := λa.λb.a = λab.a",
    jsSyntax: "var K = function (a) { return function (b) { return a } }",
    es6Syntax: "const K = a => b => a",
    explanation: "The true or const function takes two parameters (via Curried functions) and returns the first."
  },
  kite: {
    id: "kite",
    prev: null,
    next: null,
    title: "False ('kite')",
    lambdaSyntax: "KI := λa.λb.b = λab.b",
    jsSyntax: "var KI = function (a) { return function (b) { return b } }",
    es6Syntax: "const KI = a => b => b",
    explanation: "The false function takes two parameters and returns the second. It has the same effect as passing the identity function to the true function."
  },
  cardinal: {
    id: "cardinal",
    prev: null,
    next: null,
    title: "Flip ('cardinal')",
    lambdaSyntax: "C := λf.λa.λb.fba = λfab.fba",
    jsSyntax: "var C = function (f) { return function (a) { return function (b) { return f(b)(a) } } }",
    es6Syntax: "const C = f => a => b => f(b)(a)",
    explanation: "The flip function takes three parameters and reverses the order of the last two."
  },
  not: {
    id: "not",
    prev: null,
    next: null,
    title: "Not (derived from 'cardinal')",
    lambdaSyntax: "NOT := λp.p KI K",
    jsSyntax: "var NOT = function (p) { return p(KI)(K) }",
    es6Syntax: "const NOT = p => p(KI)(K)",
    explanation: "The not function takes a boolean and returns its opposite."
  },
  and: {
    id: "and",
    prev: null,
    next: null,
    title: "And (no bird, sorry)",
    lambdaSyntax: "AND := λp.λq.pq KI = λpq.pq KI",
    jsSyntax: "var AND = function (p) { return function (q) { return p(q)(KI) } }",
    es6Syntax: "const AND = p => q => p(q)(KI)",
    explanation: "The and function takes two booleans and returns true only if both are true."
  },
  equality: {
    id: "equality",
    prev: null,
    next: null,
    title: "Boolean equality",
    lambdaSyntax: "BEQ := λp.λq.p(q K KI)(q KI K) = λpq.p(q K KI)(q KI K)",
    jsSyntax: "var BEQ = function (p) { return function (q) { return p(q(K)(KI))(q(KI)(K)) } }",
    es6Syntax: "const BEQ = p => q => p(q(K)(KI))(q(KI)(K))",
    explanation: "The boolean equality function takes two booleans and returns true only if both are true or both are false."
  },
  zero: {
    id: "zero",
    prev: null,
    next: null,
    title: "Zero",
    lambdaSyntax: "ZERO := λf.λx.x = λfx.x",
    jsSyntax: "var ZERO = function (f) { return function (x) { return x } }",
    es6Syntax: "const ZERO = f => x => x",
    explanation: "The zero function applies a function to x zero times. It is the same as the false function."
  },
  one: {
    id: "one",
    prev: null,
    next: "two",
    title: "One (once)",
    lambdaSyntax: "ONE := λf.λx.fx = λfx.fx",
    jsSyntax: "var ONE = function (f) { return function (x) { return f(x) } }",
    es6Syntax: "const ONE = f => x => f(x)",
    explanation: "The one or once function applies a function to x once. It is the same as the identity function."
  },
  two: {
    id: "two",
    prev: "one",
    next: "three",
    title: "Two (twice)",
    lambdaSyntax: "TWO := λf.λx.f(fx) = λfx.f(fx)",
    jsSyntax: "var TWO = function (f) { return function (x) { return f(f(x)) } }",
    es6Syntax: "const TWO = f => x => f(f(x))",
    explanation: "The two or twice function applies a function to x twice."
  },
  three: {
    id: "three",
    prev: "two",
    next: "four",
    title: "Three (thrice)",
    lambdaSyntax: "THREE := λf.λx.f(f(fx)) = λfx.f(f(fx))",
    jsSyntax: "var THREE = function (f) { return function (x) { return f(f(f(x))) } }",
    es6Syntax: "const THREE = f => x => f(f(f(x)))",
    explanation: "The three or thrice function applies a function to x three times."
  },
  four: {
    id: "four",
    prev: "three",
    next: "five",
    title: "Four (times)",
    lambdaSyntax: "FOUR := λf.λx.f(f(f(fx))) = λfx.f(f(f(fx)))",
    jsSyntax: "var FOUR = function (f) { return function (x) { return f(f(f(f(x)))) } }",
    es6Syntax: "const FOUR = f => x => f(f(f(f(x))))",
    explanation: "The four (times) function applies a function to x four times."
  },
  five: {
    id: "five",
    prev: "four",
    next: null,
    title: "Five (times)",
    lambdaSyntax: "FIVE := λf.λx.f(f(f(f(f(x))))) = λfx.f(f(f(f(fx))))",
    jsSyntax: "var FIVE = function (f) { return function (x) { return f(f(f(f(f(x))))) } }",
    es6Syntax: "const FIVE = f => x => f(f(f(f(f(x)))))",
    explanation: "The five (times) function applies a function to x five times."
  },
  successor: {
    id: "successor",
    prev: null,
    next: null,
    title: "Successor",
    lambdaSyntax: "SUCC := λn.λf.λx.f(nfx) = λnfx.f(nfx)",
    jsSyntax: "var SUCC = function (n) { return function (f) { return function(x) { return f(n(f)(x)) } } }",
    es6Syntax: "const SUCC = n => f => x => f(n(f)(x))",
    explanation: "The successor function takes a number n, a function and a parameter x and performs n compositions of the function on x. Then it performs the function on the return value one more time."
  },
  plus: {
    id: "plus",
    prev: null,
    next: null,
    title: "Plus, add",
    lambdaSyntax: "PLUS := λa.λb.a SUCC b = λab.a SUCC b",
    jsSyntax: "var PLUS = function (a) { return function (b) { return a(SUCC)(b) } }",
    es6Syntax: "const PLUS = a => b => a(SUCC)(b)",
    explanation: "The plus or add function takes a number a and a number b and returns a compositions of the successor function, applied to b."
  },
  pair: {
    id: "pair",
    prev: null,
    next: null,
    title: "Pair ('vireo')",
    lambdaSyntax: "PAIR := λa.λb.λf.fab = λabf.fab",
    jsSyntax: "var PAIR = function (a) { return function (b) { return function (f) { return f(a)(b) } } }",
    es6Syntax: "const PAIR = a => b => f => f(a)(b)",
    explanation: "The pair function forms a closure around two functions, a and b, and returns one of them, depending on whether the f argument is K or KI."
  },
  phi: {
    id: "phi",
    prev: null,
    next: null,
    title: "Phi (Φ)",
    lambdaSyntax: "PHI := λp.PAIR (p KI) (SUCC (p KI))",
    jsSyntax: "var PHI = function (p) { return PAIR(p(KI))(SUCC(p(KI))) }",
    es6Syntax: "const PHI = p => PAIR(p(KI))(SUCC(p(KI)))",
    explanation: "The phi function takes a pair of numbers (n1 and n2) and returns a new pair: n2 and the successor of n2."
  },
  predecessor: {
    id: "predecessor",
    prev: null,
    next: null,
    title: "Predecessor",
    lambdaSyntax: "PRED := λn.(n PHI (PAIR ZERO ZERO)) K",
    jsSyntax: "var PRED = function (n) { return (n(PHI)(PAIR(ZERO)(ZERO)))(K) }",
    es6Syntax: "const PRED = n => (n(PHI)(PAIR(ZERO)(ZERO)))(K)",
    explanation: "The predecessor function takes a number and applies the Φ function that number of times to a zero-zero pair. It then returns the first item of the resulting pair."
  },
  minus: {
    id: "minus",
    prev: null,
    next: null,
    title: "Minus, subtract",
    lambdaSyntax: "MINUS := λa.λb.b PRED a = λab.b PRED a",
    jsSyntax: "var MINUS = function (a) { return function (b) { return b(PRED)(a) } }",
    es6Syntax: "const MINUS = a => b => b(PRED)(a)",
    explanation: "The minus or subtract function takes a number a and a number b and returns b compositions of the predecessor function, applied to a."
  },
  exponent: {
    id: "exponent",
    prev: null,
    next: null,
    title: "Exponent ('thrush')",
    lambdaSyntax: "EXP := λa.λb.ba",
    jsSyntax: "var EXP = function (a) { return function (b) { return b(a) } }",
    es6Syntax: "const EXP = a => b => b(a)",
    explanation: "The exponent function takes a number a and a number b and returns a to the power of b, which is the function b called with an argument a."
  },
};

const renderLambdaCard = (lambdaObj, color) => {
  return `
    <div class="lambda-card" style="outline-color:${color};">
      <div
        class="lambda-title"
        style="color:${color};"
      >${lambdaObj.title}</div>
      <div class="syntax-container">
        <div
          class="syntax"
          id="syntax-${lambdaObj.id}-la"
          style="display:inline-block;"
        >${lambdaObj.lambdaSyntax}</div>
        <div
          class="syntax"
          id="syntax-${lambdaObj.id}-js"
          style="display:none;"
        >${lambdaObj.jsSyntax}</div>
        <div
          class="syntax"
          id="syntax-${lambdaObj.id}-es"
          style="display:none;"
        >${lambdaObj.es6Syntax}</div>
      </div>
      <div class="lambda-buttons">
        <button
          style="border-color:${color};"
          id="lambda-${lambdaObj.id}-la"
          disabled=true
        >λ syntax</button>
        <button
          style="border-color:${color};"
          id="lambda-${lambdaObj.id}-js"
        >JS syntax</button>
        <button
          style="border-color:${color};"
          id="lambda-${lambdaObj.id}-es"
        >ES6 syntax</button>
      </div>
      <div
        class="lambda-explanation"
        style="border-top-color:${color};"
      >${lambdaObj.explanation}</div>
      ${lambdaObj.prev !== null || lambdaObj.next !== null
        ?
      `
        <div class="lambda-skip">
            <button
              id="lambda-${lambdaObj.id}-pr"
              style="border-color:${color};"
              data-color=${color}
              ${lambdaObj.prev === null ? "disabled" : ""}
              data-prev=${lambdaObj.prev}
            > -- </button>
            <button
              id="lambda-${lambdaObj.id}-nx"
              style="border-color:${color};"
              data-color=${color}
              ${lambdaObj.next === null ? "disabled" : ""}
              data-next=${lambdaObj.next}
            > ++ </button>
        </div>
      ` : ""
      }
    </div>
  `;
};

// https://flatuicolors.com/palette/nl
const colors = [
  "#FFC312",/*sunflower*/
  "#12CBC4",/*blue martina*/
  "#A3CB38",/*android green*/
  "#ED4C67",/*bara red*/
  "#9980FA",/*forgotten purple*/
];

document.addEventListener('DOMContentLoaded', event => {
  const lambdaDivs = document.querySelectorAll('.lambda-div');
  const oneTwoThree = document.querySelector('#one-two-three');
  const oneTwoThreeDivs = oneTwoThree ? oneTwoThree.querySelectorAll('div') : null;

  for (let i = 0; i < lambdaDivs.length; i++) {
    const color = colors[i % colors.length];

    const currentDiv = lambdaDivs[i];
    const lambdaId = currentDiv.id.slice(7);
    const lambdaObj = bigLambdaObj[lambdaId];

    currentDiv.innerHTML += renderLambdaCard(lambdaObj, color);
  };

  let lastSyntax = 'la';

  document.addEventListener('click', e => {
    const targetId = e.target.id.slice(7, -3);
    const targetButton = e.target.id.slice(-2);
    const targetDataset = e.target.dataset;

    const syntaxDivs = document.querySelectorAll('.syntax');
    const allButtons = document.querySelectorAll('button');

    let syntaxButtons = [];
    allButtons.forEach(btn => {
      const end = btn.id.slice(-2);
      if (end === 'la' || end === 'js' || end === 'es') {
        syntaxButtons.push(btn);
      };
    });

    let showSyntax;
    if (targetButton === 'la') {
      showSyntax = document.querySelector(`#syntax-${targetId}-la`);
      lastSyntax = targetButton;
    } else if (targetButton === 'js') {
      showSyntax = document.querySelector(`#syntax-${targetId}-js`);
      lastSyntax = targetButton;
    } else if (targetButton === 'es') {
      showSyntax = document.querySelector(`#syntax-${targetId}-es`);
      lastSyntax = targetButton;
    }

    let disableButton;
    if (targetButton === 'pr') {
      oneTwoThreeDivs.forEach((div) => {
        if (div.id.slice(7) === targetDataset.prev) {
          div.style.display = 'block';
        } else {
          div.style.display = 'none';
        }
      });
      showSyntax = document.querySelector(`#syntax-${targetDataset.prev}-${lastSyntax}`);
      disableButton = document.querySelector(`#lambda-${targetDataset.prev}-${lastSyntax}`);
    } else if (targetButton === 'nx') {
      oneTwoThreeDivs.forEach((div) => {
        if (div.id.slice(7) === targetDataset.next) {
          div.style.display = 'block';
        } else {
          div.style.display = 'none';
        }
      });
      showSyntax = document.querySelector(`#syntax-${targetDataset.next}-${lastSyntax}`);
      disableButton = document.querySelector(`#lambda-${targetDataset.next}-${lastSyntax}`);
    }

    syntaxDivs.forEach((div) => {
      if (div.id.slice(7, -3) === targetId || (targetButton === 'nx' && div.id.slice(7, -3) === targetDataset.next) || (targetButton === 'pr' && div.id.slice(7, -3) === targetDataset.prev)) {
        if (div === showSyntax) {
          div.style.display = 'inline-block';
        } else {
          div.style.display = 'none';
        }
      }
    });

    syntaxButtons.forEach((btn) => {
      if (btn.id.slice(7, -3) === targetId || (targetButton === 'nx' && btn.id.slice(7, -3) === targetDataset.next) || (targetButton === 'pr' && btn.id.slice(7, -3) === targetDataset.prev)) {
        if (btn === e.target || btn === disableButton) {
          btn.disabled = true;
        } else {
          btn.disabled = false;
        }
      }
    });
  });
});
