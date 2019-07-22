---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: custom
---
<h1>Blog</h1>

<!-- https://flatuicolors.com/palette/nl -->
{% assign colors = "#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA,#FFC312,#12CBC4,#A3CB38,#ED4C67,#9980FA" | split: "," %}

{% for post in site.posts %}
  <div style="display:none;">{% increment i %}</div>

  <div class="post-card" style="outline-color:{{ colors[i] }};">
    <div class="post-description-container">
      <div class="syntax lambda-syntax" style="display:inline-block;">{{ post.date | date: "%b %-d, %Y" }}</div>
    </div>
    <div class="post-card-title"><a style="color:{{ colors[i] }}; text-decoration: none;" href="{{ post.url }}">{{ post.title }}</a></div>
    <div class="syntax-container">
      <div class="syntax lambda-syntax" style="display:inline-block;">{{ post.content | strip_html | truncatewords: 40, " ..." }}</div>
    </div>
  </div>
{% endfor %}
