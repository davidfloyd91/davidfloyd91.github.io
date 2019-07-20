const bigLambdaObj = {
  identity: {
    id: "identity",
    title: "Identity (Ibis)",
    lambdaSyntax: "I := λa.a",
    jsSyntax: "var I = function (a) { return a }",
    es6Syntax: "const I = a => a",
    explanation: "The identity function takes one parameter and returns it."
  },
  mockingbird: {
    id: "mockingbird",
    title: "Self-application (Mockingbird)",
    lambdaSyntax: "M := λf.ff",
    jsSyntax: "var M = function (f) { return f(f) }",
    es6Syntax: "const M = f => f(f)",
    explanation: "The self-application function takes one function as a parameter and returns the application of that function to itself."
  },
};

const renderLambdaCard = (lambdaObj) => {
  return `
    <div class="lambda-card">
      <div class="lambda-title">${lambdaObj.title}</div>
      <div class="syntax lambda-syntax" style="display:block;">${lambdaObj.lambdaSyntax}</div>
      <div class="syntax js-syntax" style="display:none;">${lambdaObj.jsSyntax}</div>
      <div class="syntax es6-syntax" style="display:none;">${lambdaObj.es6Syntax}</div>
      <div class="lambda-buttons">
        <button id="lambda-${lambdaObj.id}-la">λ syntax</button>
        <button id="lambda-${lambdaObj.id}-js">JS syntax</button>
        <button id="lambda-${lambdaObj.id}-es">ES6 syntax</button>
      </div>
      <div class="lambda-explanation">${lambdaObj.explanation}</div>
    </div>
  `;
};

document.addEventListener('DOMContentLoaded', event => {
  const lambdaDivs = document.querySelectorAll('.lambda-div');

  for (let i = 0; i < lambdaDivs.length; i++) {
    let currentDiv = lambdaDivs[i];
    let lambdaId = currentDiv.id.slice(7);
    let lambdaObj = bigLambdaObj[lambdaId];

    currentDiv.innerHTML += renderLambdaCard(lambdaObj);
  };

  document.addEventListener('click', e => {
    let targetId = e.target.id.slice(7, -3);
    let targetButton = e.target.id.slice(-2);

    let currentDiv = document.querySelector(`#lambda-${targetId}`);
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
        div.style.display = 'block';
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
