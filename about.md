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
          <a id="download" href="/assets/david-floyd-resume.pdf" download class="resume-button">Download</a>
          <label for="copy-link">Stable link</label>
          <input type="text" value="https://davidfloyd91.github.io/resume/" id="copy-link">
          <button id="copy-button" class="resume-button">Copy link</button>
          <br/>
          {% include resume.html %}
        `;
      } else if (e.target.id === 'hide' || (e.target.id === 'resume-link' && display === true)) {
        e.preventDefault();
        display = false;
        resume.innerHTML = ``;
      } else if (e.target.id === 'copy-button') {
        const copyLink = document.querySelector('#copy-link');
        copyLink.select();
        document.execCommand('copy');
      };
    });
  });
</script>

Full-stack developer with a background in journalism. Atlanta native, Brooklyn resident, language lover, book hoarder, occasional brewer, runner when it's warm out.

My <a href="" id="resume-link">resume</a> will tell you more.

<div id="resume"></div>
