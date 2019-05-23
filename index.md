---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: custom
---
<h1>Blog</h1>

{% for post in site.posts %}
  <p class="post-date-home">
    {{ post.date | date: "%b %-d, %Y" }}
  </p>

  <h2 class="post-head-home">
    <a style="text-decoration: none;" href="{{ post.url }}">{{ post.title }}</a>
  </h2>

  <p class="post-summary">
    {{ post.content | strip_html | truncatewords: 40, " ..." }}
  </p>
{% endfor %}
