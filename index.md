---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: custom
---
<h1 class="center">Blog</h1>

<script>
  document.addEventListener('DOMContentLoaded', event => {
    document.addEventListener('click', e => {
      let target = e.target;
      if (!target.href) {
        let parent = e.target.parentNode;
        if (target.dataset.link) {
          window.location = target.dataset.link;
        } else if (parent.dataset.link) {
          window.location = parent.dataset.link;
        };
      };
    });
  });
</script>

<!-- https://flatuicolors.com/palette/nl -->
{% assign colors = "#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA" | split: "," %}

<div style="display:none;">
  {% assign min = 0 %}
  {% assign max = 4 %}
  {% assign diff = max | minus: min %}
  {% assign i = "now" | date: "%S" | modulo: diff | plus: min %}
</div>

{% for post in site.posts %}
  <div class="post-card" data-link="{{ post.url }}" style="outline-color:{{ colors[i] }};">
    <div class="post-description-container">
      <a href="{{ post.url }}">{{ post.date | date: "%b %-d, %Y" }}</a>
    </div>
    <div class="post-card-title">
      <a href="{{ post.url }}" style="color:{{ colors[i] }};">{{ post.title }}</a>
    </div>
    <div class="post-description-container">
      <a class="description" href="{{ post.url }}">{{ post.content | strip_html | truncatewords: 40, " ..." }}</a>
    </div>
  </div>
  {% assign i = i | plus: 1 | modulo: 5 %}
{% endfor %}
