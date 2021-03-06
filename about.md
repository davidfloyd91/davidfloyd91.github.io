---
layout: custom
title: About
permalink: /about/
---
<script>
  document.addEventListener('DOMContentLoaded', e => {
    let resumeDisplay = false;
    const resume = document.querySelector('#resume');

    let salpDisplay = false;
    const salpVideo = document.querySelector('#salp-video');
    const salpCredit = document.querySelector('#salp-credit');

    const logoDiv = document.querySelector('#logos');
    const logoDir = '/assets/logos/';
    const logos = [
      {file: 'js.png', tooltip: 'JavaScript'},
      {file: 'react.png', tooltip: 'React'},
      {file: 'ruby.png', tooltip: 'Ruby'},
      {file: 'rails.png', tooltip: 'Rails'},
      {file: 'node.png', tooltip: 'Node'},
      {file: 'pg.png', tooltip: 'PostgreSQL'},
      {file: 'ts.png', tooltip: 'TypeScript'},
      {file: 'graphql.png', tooltip: 'GraphQL'},
      {file: 'go.png', tooltip: 'Go'},
    ];

    logos.map(logo => {
      return logoDiv.innerHTML += `
        <div class="logo-container">
          <img class="logo" src=${logoDir + logo.file} alt=${logo.tooltip} title=${logo.tooltip} />
          <!-- <span class="logo-title">${logo.tooltip}</span> -->
        </div>
      `;
    });

    document.addEventListener('click', e => {
      if (e.target.id === 'resume-link' && resumeDisplay === false) {
        e.preventDefault();
        resumeDisplay = true;
        resume.innerHTML = `
          <div class="resume-border">
            <div class="resume-button-wrapper">
              <button id="hide" class="resume-button right">Hide</button>
              <a id="download" href="/assets/david-floyd-resume.pdf" download class="resume-button right">Download</a>
              <button id="copy-button" class="resume-button right">Copy link</button>
              <input type="text" class="resume-button right" value="https://davidfloyd91.github.io/resume/" id="copy-link">
            </div>
            <br/>
            {% include resume.html %}
          </div>
        `;
      } else if (e.target.id === 'hide' || (e.target.id === 'resume-link' && resumeDisplay === true)) {
        e.preventDefault();
        resumeDisplay = false;
        resume.innerHTML = '';
      } else if (e.target.id === 'copy-button') {
        const copyLink = document.querySelector('#copy-link');
        copyLink.select();
        document.execCommand('copy');
      } else if (e.target.id === 'salp-ref') {
        e.preventDefault();
        if (salpDisplay === false) {
          salpDisplay = true;
          salpVideo.innerHTML = `
            <div class="iframe-container">
              <iframe src="https://player.vimeo.com/video/15436689#t=0m10s" frameborder="0" title="Salps" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
            </div>
          `;
          salpCredit.innerHTML = `
            <p><em>Courtesy <a href="http://planktonchronicles.org/en/episode/salps-exploding-populations/" target="\_blank" rel="noopener noreferrer">Plankton Chronicles</a>.</em></p>
          `;
          window.scroll({top: 10000});
        } else {
          salpDisplay = false;
          salpVideo.innerHTML = '';
          salpCredit.innerHTML = '';
        };
      } else if (e.target.id === 'about-link') {
        e.preventDefault();
      } else if (e.target.id === 'salp-chart') {
        window.open("https://salp-client.herokuapp.com/login", "no-name", "target=_blank, rel=noopener noreferrer")
      };
    });
  });
</script>

Hi.

I'm a full-stack developer with a background in journalism. Atlanta native, Brooklyn resident, language lover, book hoarder, wannabe cryptography sage, occasional brewer, and runner when it's warm out. Recent, zealous convert to the Oxford comma.

<h2>Resume</h2>

Here's my <a href="" id="resume-link">resume</a>, with contact information.

<div id="resume"></div>

<h2>Languages</h2>

I know the following technologies, in roughly descending order of proficiency:

<div id="logos"></div>

<h2>Projects</h2>

I'm working on a few nifty apps right now. Here are the ones that are live and presentable:

<h3>Is It Gonna Rain?</h3>

I might build this out into a full-fledged weather app at some point, but as I was getting started on this one I realized that 90 percent of why I check the weather is to find out whether it's going to rain while I'm out running/getting tacos/buying toothpaste/etc.

So I made a <a href="https://chrome.google.com/webstore/detail/is-it-gonna-rain/nadehodhmoogambiebejlonkdifmobbp" target="_blank" rel="noopener noreferrer">Chrome extension</a> to take care of 90 percent of your weather needs and tell you if it's gonna rain. The backend API is hosted on AWS and queries Google's Geocoding API and the Dark Sky API.

<div style="display: block; position: relative; width: 65%; min-width: 250px; max-width: 450px; margin: 0 auto;">
  <a href="https://chrome.google.com/webstore/detail/is-it-gonna-rain/nadehodhmoogambiebejlonkdifmobbp" target="_blank" rel="noopener noreferrer">
    <img src="/assets/is-it-gonna-rain.png" alt="Is It Gonna Rain?" title="is-it-gonna-rain" style="width: 100%;">
  </a>
</div>

<h3>Salp</h3>

As a journalist covering markets, trade, elections and other data-heavy stories, I relied on tools that let me quickly create and configure data visualizations to enhance an article's prose. Datawrapper was my favorite, but its limitations made me wish I knew how to build my own charts—or my own charting tools.

Hence <a href="https://salp-client.herokuapp.com/login" target="_blank" rel="noopener noreferrer">Salp</a>, which lets you create and configure interactive, embeddable Chart.js charts. Like this one:

<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js' crossorigin></script><canvas id='salp-chart'></canvas><script>new Chart(document.getElementById('salp-chart'),{'type':'line','data':{'labels':['2014-03-01','2014-04-01','2014-05-01','2014-06-01','2014-07-01','2014-08-01','2014-09-01','2014-10-01','2014-11-01','2014-12-01','2015-01-01','2015-02-01','2015-03-01','2015-04-01','2015-05-01','2015-06-01','2015-07-01','2015-08-01','2015-09-01','2015-10-01','2015-11-01','2015-12-01','2016-01-01','2016-02-01','2016-03-01','2016-04-01','2016-05-01','2016-06-01','2016-07-01','2016-08-01','2016-09-01','2016-10-01','2016-11-01','2016-12-01','2017-01-01','2017-02-01','2017-03-01','2017-04-01','2017-05-01','2017-06-01','2017-07-01','2017-08-01','2017-09-01','2017-10-01','2017-11-01','2017-12-01','2018-01-01','2018-02-01','2018-03-01','2018-04-01','2018-05-01','2018-06-01','2018-07-01','2018-08-01','2018-09-01','2018-10-01','2018-11-01','2018-12-01','2019-01-01','2019-02-01','2019-03-01'],'datasets':[{'label':'CPI inflation','fill':false,'data':[1.61269,2.01513,2.16695,2.05898,1.97424,1.7151,1.68405,1.60954,1.23152,0.65312,-0.24226,-0.13203,-0.00974,-0.13194,0.02364,0.19095,0.23369,0.2392,0.01221,0.14783,0.4359,0.66243,1.32712,0.94926,0.86142,1.13103,1.05075,1.04466,0.8809,1.08139,1.49259,1.64437,1.68602,2.08353,2.50049,2.73383,2.3992,2.18736,1.87836,1.67175,1.76556,1.95136,2.2265,2.02573,2.19106,2.11268,2.09369,2.21675,2.35857,2.41958,2.73977,2.84706,2.94897,2.68328,2.26931,2.51716,2.19462,1.94513,1.5224,1.50139,1.86374],'borderColor':'#0fbcf9','lineTension':'0.1','pointRadius':'0'}]},'options':{'legend':{'display':false},'title':{'display':true,'text':'CPI inflation, 5 years to March 2019'},'scales':{'yAxes':[{'ticks':{'min':-1,'max':4,'stepSize':1},'scaleLabel':{'display':true,'labelString':'Year-over-year percent change in CPI'}}],'xAxes':[{'scaleLabel':{'display':true,'labelString':'Month'}}]}}});</script>

Feel free to log in with the username <span style="font-family:monospace;">demo</span> and the password <span style="font-family:monospace;">123</span>, but know there's no need to give your email if you prefer to <a href="https://salp-client.herokuapp.com/signup" target="_blank" rel="noopener noreferrer">sign up</a>.

What's with the name? Glad you asked. These are <a href="" id="salp-ref">salps</a>, and salps are pretty cool. I kind of want to be one.

<div id="salp-video"></div>
<div id="salp-credit"></div>
