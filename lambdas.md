---
layout: custom
title: Lambda functions
permalink: /lambdas/
---
<script src="/scripts/lambda.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', (evt) => {
    let bigLambdaArr = [];
    Object.keys(bigLambdaObj).forEach((key) => {
      bigLambdaArr.push(bigLambdaObj[key]);
    });

    const lambdaContainer = document.querySelector('#lambda-container');    
    const lambdaFilter = document.querySelector('#lambda-filter');
    let filterCards = [];
    let noShowCards = [];
    let searchValue = "";

    bigLambdaArr.forEach((card) => {
      lambdaContainer.innerHTML += `
        <div class="lambda-div" id="lambda-${card.id}" style="display:none;">
        </div>
      `;
    });

    const lambdaDivs = document.querySelectorAll('.lambda-div');
    populateCards(lambdaDivs);

    document.addEventListener('input', (e) => {
      if (e.target.id === 'lambda-filter') {
        searchValue = lambdaFilter.value;
      }

      filterLambdas();
      if (filterCards.length) populateLambdaContainer();
    });

    const filterLambdas = () => {
      filterCards = [];
      noShowCards = [];
      bigLambdaArr.forEach((card) => {
        if (card.id.toUpperCase().includes(searchValue.toUpperCase())) {
          filterCards.push(card);
        } else {
          noShowCards.push(card);
        }
      });
    };

    const populateLambdaContainer = () => {
      for (let i = 0; i < noShowCards.length; i++) {
        document.querySelector(`#lambda-${noShowCards[i].id}`).style.display = "none";
      }
      for (let i = 0; i < filterCards.length; i++) {
        document.querySelector(`#lambda-${filterCards[i].id}`).style.display = "block";
      }
    };
  });
</script>

<input id="lambda-filter" placeholder="Search for a lambda function">

<div id="lambda-container">
</div>
