---
layout: custom
title: Contact
permalink: /contact/
---
<script>
  document.addEventListener('DOMContentLoaded', e => {
    const contactLink = document.querySelector('#contact-link');
    contactLink.innerHTML = 'About';
    contactLink.setAttribute('href', '/about/');

    const contactDiv = document.querySelector('#contacts');
    const fbDiv = document.querySelector('#fb');
    const logoDir = '/assets/logos/';
    const contacts = [
      {file: 'li.png', tooltip: 'LinkedIn', url: 'https://www.linkedin.com/in/david-floyd-1a982886/'},
      {file: 'github.png', tooltip: 'Github', url: 'https://github.com/davidfloyd91'},
      {file: 'keybase.png', tooltip: 'Keybase', url: 'https://keybase.io/davidfloyd91'}
    ];

    contacts.map(contact => {
      let contactClass;
      let alt = contact.file.replace(/\..+/, '');

      if (alt !== 'fb') {
        return contactDiv.innerHTML += `
          <a class="contact-container" href=${contact.url} target="_blank" rel="noopener noreferrer">
            <img class="contact" src=${logoDir + contact.file} alt=${alt} title=${contact.tooltip} />
          </a>
        `;
      };
    });
  });
</script>

<h2>Email</h2>

The best way to reach me is by email at <b>davidfloyd91 at gmail</b>, preferably encrypted with <a href='/pgp/' target="_blank" rel="noopener noreferrer">this key</a>, preferably-preferably with your own PGP key attached. If that's gibberish to you or you hate PGP, don't worry about it.

<h2>Misc</h2>

I also exist at these places:

<div id="contacts"></div>

But not here:

<div id="fb">
  <a class="contact-container" href='https://www.facebook.com/help/250563911970368' target="_blank" rel="noopener noreferrer">
    <img class="contact" src="/assets/logos/fb.png" alt="fb" title="Facebook" />
  </a>
</div>
