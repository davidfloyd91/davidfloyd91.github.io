---
layout: custom
title: About
permalink: /about/
---
<script>
  document.addEventListener('DOMContentLoaded', e => {
    let display = false;
    const resume = document.querySelector('#resume');
    document.addEventListener('click', e => {
      if (e.target.id === 'resume-link' && display === false) {
        e.preventDefault();
        display = true;
        resume.innerHTML = `
          <button id="hide" class="resume-button">Hide</button>
          <a id="download" href="/assets/david-floyd-resume.pdf" download class="resume-button">Save</a>
          <br/>

          <h2 class="center">DAVID FLOYD</h2>
          <p class="center">davidfloyd91 at gmail | <a href="https://github.com/davidfloyd91" target="_blank" rel="noopener noreferrer">G​itHub​</a> | <a href="https://www.linkedin.com/in/david-floyd-1a982886/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>

          <p>Full-stack web developer with a background in journalism and a lifelong love for learning natural languages: Spanish and Portuguese, Arabic (شویة), much dabbling in others. Recently I've begun learning programming languages and libraries: Ruby, Rails, JavaScript, React and Redux, plus the basics: SQL, Git, HTML, CSS. Node and Python are next.</p>

          <h3 class="center">Technical Experience</h3>

          <p class="line-head"><b>Salp​</b> ​<a href="https://salp-client.herokuapp.com/login" target="_blank" rel="noopener noreferrer">Live​</a> (username: demo, password: 123) | <a href="https://www.youtube.com/watch?v=1zRdEr1ctiY" target="_blank" rel="noopener noreferrer">Demo</a> | <a href="https://github.com/davidfloyd91/Salp" target="_blank" rel="noopener noreferrer">Frontend</a> | <a href="https://github.com/davidfloyd91/Salp-Backend" target="_blank" rel="noopener noreferrer">Backend</a> (Ruby on Rails, Chart.js, React, Redux)</p>

          <p class="bullet">• A data visualization web app that allows non-technical users to create and customize gorgeous charts and easily embed them into their own content</p>

          <p><em>As a journalist covering markets, trade, elections and other data-heavy stories, I relied on tools that let me quickly create and configure data visualizations to enhance an article's prose (here are a <a href="https://www.investopedia.com/taxes/trumps-tax-reform-plan-explained/" target="_blank" rel="noopener noreferrer">couple</a> of <a href="https://www.investopedia.com/terms/b/brexit.asp" target="_blank" rel="noopener noreferrer">examples</a>). Datawrapper was my favorite, but its limitations made me wish I knew how to build my own charts—or my own charting tools.</em></p>

          <p class="line-head"><b>Softipy</b>​ ​<a href="https://github.com/elicleveland12/softipy-front-end" target="_blank" rel="noopener noreferrer">Frontend</a> | <a href="https://github.com/sivanadler/Softipy-Back-End" target="_blank" rel="noopener noreferrer">Backend</a> (Ruby on Rails, JavaScript, React)</p>

          <p class="bullet">• A Spotify clone that allows users to search for music using an external API, create and add songs to playlists, and add other users' playlists to their own profile</p>

          <p class="line-head"><b>Moverr​</b> <a href="https://github.com/clarencekwong/moverr" target="_blank" rel="noopener noreferrer">Github</a>​ (Ruby on Rails)</p>

          <p class="bullet">• A forum where users can advertise their unwanted furniture, which other users can come pick up for free, as long as they take care of transportation</p>

          <h3 class="center">Work Experience</h3>

          <p class="line-head"><b>CoinDesk​</b> ​Reporter | New York, NY | 2018 | <a href="https://www.coindesk.com/author/dfloyd" target="_blank" rel="noopener noreferrer">Articles</a>​</p>

          • Reported and wrote stories for the leading blockchain and cryptocurrency industry publication that led to ​tangible changes in corporate behavior
          • Led efforts to increase coverage of ​cryptocurrency exchanges​, a notoriously under-scrutinized area of the industry • Broke ground in uncovering evidence ​social media manipulation​ by combining network analysis and interviews
          Investopedia​ ​Staff Writer | New York, NY | 2016 - 2018
          • Covered spot market, economic and political news as well as producing and maintaining explainers on larger trends
          • Promoted from freelancer to associate producer to staff writer
          • Carried out projects designed to maximize Investopedia's visibility on major topics such as ​Brexit​ and ​tax reform
          • Spotted Brexit as a potentially explosive issue months in advance, crafting coverage that put Investopedia at the top of Google results for several Brexit-related searches on the day of the 2016 referendum
          Investopedia, Nasdaq, Fusion, Kapitall​ ​Freelance Writer | New York, NY | 2014 - 2016 • Covered a range of topics related to economics, markets, tech, policy and investing
          Education
          Flatiron School​ ​New York, NY | 2019
          • Software engineering immersive – a 15-week, intensive, on-site programming bootcamp
          • Completed coursework in JavaScript (including React and Redux), Ruby (including Rails), SQL, Git, HTML, CSS • Built five functioning applications in order to demonstrate and solidify newly acquired skills
          Kenyon College​ ​Gambier, OH | 2010 - 2014
          • Bachelor of Arts: Anthropology (high honors) and Religious Studies
          • Summa cum laude, Phi Beta Kappa
          • Wrote an honors thesis on indigenous groups living in isolation in the western Amazon, based in part on experience interning at an NGO in Madre de Dios, Peru
        `;
      } else if (e.target.id === 'hide' || (e.target.id === 'resume-link' && display === true)) {
        e.preventDefault();
        display = false;
        resume.innerHTML = ``;
      };
    });
  });
</script>

Full-stack developer with a background in journalism. Atlanta native, Brooklyn resident, language lover, book hoarder, occasional brewer, runner when it's warm out.

My <a href="" id="resume-link">resume</a> will tell you more.

<div id="resume"></div>
