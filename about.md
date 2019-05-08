---
layout: custom
title: About
permalink: /about/
---
<script>
  document.addEventListener('DOMContentLoaded', e => {
    const resume = document.querySelector('#resume');
    document.addEventListener('click', e => {
      if (e.target.id === 'resume-link') {
        e.preventDefault();
        resume.innerHTML = `
          <p>wow!</p>
        `;
      };
    });
  });
</script>

Full-stack developer with a background in journalism. Atlanta native, Brooklyn resident, language lover, occasional brewer, runner when it's warm out.

My <a href="" id="resume-link">resume</a> will tell you more.

<div id="resume"></div>
