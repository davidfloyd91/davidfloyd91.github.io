---
layout: post
---

# How To Turn Your Chart.js Charts Into Embeddable HTML

Chart.js is a wonderfully useful, versatile tool, but for certain situations, its built-in methods don't cut it.

Say, for example, you've created a dashboard that allows your team to track sales (traffic, widgets, wins -- whatever you like) using Chart.js. After a particularly good month, you feel a justifiable urge to brag, and decide to pop one of these charts into a blog post.

This is trickier than you assumed it would be. Chart.js allows you to export a png, so you won't be reduced to taking a screenshot, but that renders your chart static and denies readers the pleasure of hovering over your tooltips.

Ideally, you'd be able to quickly generate embed code for your chart, which you could then pop into any piece of html content you like.

Luckily, it's eminently doable, though it does present a couple of unexpected challenges (at least, I didn't expect them).

Let's say we've got the following `data` object in a file we'll call `index.js`:

``` javascript
const data = {
  type: 'line',
  data: {
    labels: ['Mar', 'Jun', 'Sep', 'Dec'],
    datasets: [
      {
        fill: false,
        data: ['1', '2', '3', '4'],
        borderColor: ('blue'),
        lineTension: 0.3,
        pointRadius: 3
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    title: {
        display: true,
        text: '$$$$'
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 5,
          stepSize: 1
        },
        scaleLabel: {
          display: true,
          labelString: 'trillion USD'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'month'
        }
      }]
    }
  }
};
```
As you might have guessed, this object contains the raw data and configuration info for a Chart.js line chart. Let's prove it by rendering it.

In an `index.html` file, we can load up Chart.js (in the interest of sticking to plain ole JavaScript, we'll do so using a `<script>` tag) and write a `<canvas>` tag with an `id` of `lineChart`:

``` html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    <script src="index.js"></script>
  </head>
  <body>
    <canvas id="lineChart"></canvas>
  </body>
</html>
```

Then, back in `index.js`, we can render the chart based on our `data` object:

``` javascript
document.addEventListener('DOMContentLoaded', e => {
  let chart, data;
  const lineChart = document.querySelector('#lineChart');
  const ctx = lineChart.getContext('2d');

  // define `data` as above

  chart = new Chart(ctx, data);
});
```

So far so good. If you open `index.html` in Internet Explorer (kidding), you should see your line chart.

Now, to give our embed code a place to live, let's add a `<textarea>` tag in the `<body>` of `index.html`:

``` html
...
<body>
  <canvas id="lineChart"></canvas>
  <textarea id="embedCode"></textarea>
</body>
```

Next we can add a `code` variable to `index.js` (which we'll define shortly), which we can use to render embed code in our `#embedCode` element:

``` javascript
document.addEventListener('DOMContentLoaded', e => {
  let chart, code, data; // declare `code`
  const embedCode = document.querySelector('#embedCode'); // access the `#embedCode` element

  ...

  code = convertToEmbedCode(someData); // we'll write this method in a second

  embedCode.value = `<iframe srcdoc="<div id='embed_container'></div><script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js' crossorigin></script><canvas id='salp-chart' width='740px' height='540px'></canvas><script>new Chart(document.getElementById('salp-chart'),${code});</script>" width="740px" height="545px"></iframe>`
});
```

As you might have guessed, `code` will be a version of the `data` object (in a perfect world where the machines met us halfway, these two would be the same). Our embed code incorporates a few other elements, however, which we should review briefly.

First, the whole thing is housed in an `<iframe>`. This iframe contains a `srcdoc` tag, which allows us to feed JS code directly into the iframe, without needing to access to any local file or url. Unlike with a `src` tag, the `srcdoc` code is self-contained.

Within the `srcdoc`, we do more or less what we did in `index.js` and `index.html`. We create a `<div>` (called `embed_container`) to house our chart. We load up Chart.js using a `<script>` tags (okay so our code isn't _entirely_ self-contained). Then we create a `<canvas>` element and append a new `Chart` to it, using the `code` variable.

The `code` variable, which is still twiddling its thumbs, waiting to be defined.

Here's where we encounter the obstacles I mentioned at the top. For reasons I can't adequately explain, we can't simply turn our `data` object into a string and call it a day.

If we try replacing `code` with `JSON.stringify(data)`, we get this icky red console error: `Uncaught TypeError: Converting circular structure to JSON`.

The source of this error turns out to be the key `data.data.datasets`. Renaming it `data.data._datasets` turns out to be a solution (don't ask me why, but if you know, please do tell me why).

Doing so requires cloning the `data` object, which -- because of how deeply it's nested -- can't be accomplished using a convenient method like the spread operator (`{...data}`). I opted for lodash's `cloneDeep` method, meaning we need to add another dependency to `index.html`:

``` html
...
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
<script src="index.js"></script>
```

Now we can clone `data` to its very core, copy its `data.datasets` key, assign the value to `data._datasets`, delete `data.datasets`, stringify, make sure we don't short circuit the iframe by misformatting quotation marks, and -- finally -- revert `_datasets` to `datasets` so as not to baffle Chart.js:

``` javascript
const convertToEmbedCode = data => {
  return JSON.stringify(data)
  .replace(/'/g, '\\\'')
  .replace(/"/g, '\'')
  .replace('_datasets', 'datasets');
};

...

decircularizedData = _.cloneDeep(data);
const datasets = decircularizedData.data.datasets;
delete decircularizedData.data.datasets;
decircularizedData.data._datasets = datasets;

code = convertToEmbedCode(decircularizedData);
```

So, to bring it all together, here's our `index.js`:

``` javascript
document.addEventListener('DOMContentLoaded', e => {
  let chart, code, data, decircularizedData;
  const lineChart = document.querySelector('#lineChart');
  const embedCode = document.querySelector('#embedCode');
  const ctx = lineChart.getContext('2d');

  const convertToEmbedCode = data => {
    return JSON.stringify(data)
    .replace(/'/g, '\\\'')
    .replace(/"/g, '\'')
    .replace('_datasets', 'datasets');
  };

  data = {
    type: 'line',
    data: {
      labels: ['Mar', 'Jun', 'Sep', 'Dec'],
      datasets: [
        {
          fill: false,
          data: ['1', '2', '3', '4'],
          borderColor: ('blue'),
          lineTension: 0.3,
          pointRadius: 3
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      title: {
          display: true,
          text: '$$$$'
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 5,
            stepSize: 1
          },
          scaleLabel: {
            display: true,
            labelString: 'trillion USD'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'month'
          }
        }]
      }
    }
  };

  decircularizedData = _.cloneDeep(data);
  const datasets = decircularizedData.data.datasets;
  delete decircularizedData.data.datasets;
  decircularizedData.data._datasets = datasets;

  code = convertToEmbedCode(decircularizedData);

  chart = new Chart(ctx, data);

  embedCode.value = `<iframe srcdoc="<div id='embed_container'></div><script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js' crossorigin></script><canvas id='salp-chart' width='740px' height='540px'></canvas><script>new Chart(document.getElementById('salp-chart'),${code});</script>" width="740px" height="545px"></iframe>`
});
```

And here's `index.html`:

``` html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
    <script src="index.js"></script>
  </head>
  <body>
    <canvas id="lineChart"></canvas>
    <textarea id="embedCode"></textarea>
  </body>
</html>
```

And here is the chart we set out to embed in a blog at the beginning of this journey:

<iframe srcdoc="<div id='embed_container'></div><script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js' crossorigin></script><canvas id='salp-chart' width='740px' height='540px'></canvas><script>new Chart(document.getElementById('salp-chart'),{'type':'line','data':{'labels':['Mar','Jun','Sep','Dec'],'datasets':[{'fill':false,'data':['1','2','3','4'],'borderColor':'blue','lineTension':0.3,'pointRadius':3}]},'options':{'legend':{'display':false},'title':{'display':true,'text':'$$$$'},'scales':{'yAxes':[{'ticks':{'min':0,'max':5,'stepSize':1},'scaleLabel':{'display':true,'labelString':'trillion USD'}}],'xAxes':[{'scaleLabel':{'display':true,'labelString':'month'}}]}}});</script>" width="740px" height="545px"></iframe>

If you'd like to play around with the code, clone down [this repo](https://github.com/davidfloyd91/embeddable-chartjs-example), which contains two branches: `bare-bones`, which is just the code above, and `master`, which contains a form with a few fields that allow you to tweak the chart or (painstakingly) input your own data.

Note that, due to my being spoiled by React lifecycle methods and my assessment that the bug is tangential to the point of this post, you've got to type something in one of the forms in `master` for the chart to display. Sorry about that.

Here's a [JSFiddle](https://jsfiddle.net/fxs0e82r/) where you can experiment with the embed code.

If you'd like access to this sort of functionality in a fully-ish-built application, check out [Salp](https://salp-client.herokuapp.com/login) (you can log in with username `demo` and password `123` if you like, but there's no need to give your email to sign up).