const bigLambdaObj = {
  ibis: {
    id: "ibis",
    title: "Identity ('ibis')",
    lambdaSyntax: "I := λa.a",
    jsSyntax: "var I = function (a) { return a }",
    es6Syntax: "const I = a => a",
    explanation: "The identity function takes a parameter and returns it."
  },
  mockingbird: {
    id: "mockingbird",
    title: "Self-application ('mockingbird')",
    lambdaSyntax: "M := λf.ff",
    jsSyntax: "var M = function (f) { return f(f) }",
    es6Syntax: "const M = f => f(f)",
    explanation: "The self-application function takes a function as a parameter and returns the application of that function to itself."
  },
  kestrel: {
    id: "kestrel",
    title: "True, const ('kestrel')",
    lambdaSyntax: "K := λa.λb.a = λab.a",
    jsSyntax: "var K = function (a) { return function (b) { return a } }",
    es6Syntax: "const K = a => b => a",
    explanation: "The true or const function takes two parameters (via Curried functions) and returns the first."
  },
  kite: {
    id: "kite",
    title: "False ('kite')",
    lambdaSyntax: "KI := λa.λb.b = λab.b",
    jsSyntax: "var KI = function (a) { return function (b) { return b } }",
    es6Syntax: "const KI = a => b => b",
    explanation: "The false function takes two parameters and returns the second. It has the same effect as passing the identity function to the true function."
  },
  cardinal: {
    id: "cardinal",
    title: "Flip ('cardinal')",
    lambdaSyntax: "C := λf.λa.λb.fba",
    jsSyntax: "var C = function (f) { return function (a) { return function (b) { return f(b)(a) } } }",
    es6Syntax: "const C = f => a => b => f(b)(a)",
    explanation: "The flip function takes three parameters and reverses the order of the last two."
  },
  not: {
    id: "not",
    title: "Not (derived from 'cardinal')",
    lambdaSyntax: "NOT := λp.p KI K",
    jsSyntax: "var NOT = function (p) { return p(KI)(K) }",
    es6Syntax: "const NOT = p => p(KI)(K)",
    explanation: "The not function takes a boolean and returns its opposite."
  },
  and: {
    id: "and",
    title: "And (no bird, sorry)",
    lambdaSyntax: "AND := λpq.pq KI",
    jsSyntax: "var AND = function (p) { return function (q) { return p(q)(KI) } }",
    es6Syntax: "const AND = p => q => p(q)(KI)",
    explanation: "The and function takes two booleans and returns true only if both are true."
  },
  equality: {
    id: "equality",
    title: "Boolean equality",
    lambdaSyntax: "BEQ := λpq.p(q K KI)(q KI K)",
    jsSyntax: "var BEQ = function (p) { return function (q) { return p(q(K)(KI))(q(KI)(K)) } }",
    es6Syntax: "const BEQ = p => q => p(q(K)(KI))(q(KI)(K))",
    explanation: "The boolean equality function takes two booleans and returns true only if both are true or both are false."
  },
};

const renderLambdaCard = (lambdaObj, color) => {
  return `
    <div class="lambda-card" style="outline-color:${color};">
      <div class="lambda-title" style="color:${color};">${lambdaObj.title}</div>
      <div class="syntax-container">
        <div class="syntax lambda-syntax" style="display:inline-block;">${lambdaObj.lambdaSyntax}</div>
        <div class="syntax js-syntax" style="display:none;">${lambdaObj.jsSyntax}</div>
        <div class="syntax es6-syntax" style="display:none;">${lambdaObj.es6Syntax}</div>
      </div>
      <div class="lambda-buttons">
        <button style="border-color:${color};" id="lambda-${lambdaObj.id}-la" disabled=true>λ syntax</button>
        <button style="border-color:${color};" id="lambda-${lambdaObj.id}-js">JS syntax</button>
        <button style="border-color:${color};" id="lambda-${lambdaObj.id}-es">ES6 syntax</button>
      </div>
      <div class="lambda-explanation" style="border-top-color:${color};">${lambdaObj.explanation}</div>
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

  for (let i = 0; i < lambdaDivs.length; i++) {
    let color = colors[i % colors.length];

    let currentDiv = lambdaDivs[i];
    let lambdaId = currentDiv.id.slice(7);
    let lambdaObj = bigLambdaObj[lambdaId];

    currentDiv.innerHTML += renderLambdaCard(lambdaObj, color);
  };

  document.addEventListener('click', e => {
    let targetId = e.target.id.slice(7, -3);
    let targetButton = e.target.id.slice(-2);

    let currentDiv = document.querySelector(`#lambda-${targetId}`);

    if (currentDiv === null) {
      return;
    }

    let syntaxDivs = currentDiv.querySelectorAll('.syntax');
    let syntaxButtons = currentDiv.querySelectorAll('button');

    let showSyntax;

    if (targetButton === 'la') {
      showSyntax = currentDiv.querySelector('.lambda-syntax');
    } else if (targetButton === 'js') {
      showSyntax = currentDiv.querySelector('.js-syntax');
    } else if (targetButton === 'es') {
      showSyntax = currentDiv.querySelector('.es6-syntax');
    };

    syntaxDivs.forEach((div) => {
      if (div === showSyntax) {
        div.style.display = 'inline-block';
      } else {
        div.style.display = 'none';
      };
    });

    syntaxButtons.forEach((btn) => {
      if (btn === e.target) {
        btn.disabled = true;
      } else {
        btn.disabled = false;
      };
    });
  });
});
