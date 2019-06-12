---
title: How to write nested strong parameters in Rails
layout: custom
permalink: /rails-nested-strong-params/
---

Ruby on Rails provides a straightforward way to stop malicious user shenanigans from hitting your database. Strong parameters let you decide what attributes you'll allow through and which you'll block.

To get an idea of why this is important, imagine that users could change any attribute in the database, like `security_clearance`, `gpa` or `prescriptions`.

In many cases, defining params is a relatively simple process. If your app has user comments, `CommentsController.rb` might look something like the following (`index`, `show`, `update` and `destroy` methods aren't shown here):

<pre class="prettyprint lang-rb">
class ChartsController < ApplicationController
  ...
  def create
    @chart = Chart.new(chart_params)

    if @chart.save
      render json: @chart, status: :ok
    end
  end

  private

  def user_params
    params.require(:comment).permit(:user_id, :text)
  end
end
</pre>

When your attributes are nested, though, things become more complicated. Take, for example, an app that allows users to create Chart.js charts.

Each chart instance has a `user_id` foreign key, easy enough. But it also contains a complex five-layer-deep nested json object under the key `data`:

<pre class="prettyprint lang-bsh">
{
  "id": 1,
  "user_id": 3,
  "data": {
    "type": "line",
    "data": {
      "labels": [
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016"
      ],
      "_datasets": [
        {
          "label": "deviation",
          "fill": false,
          "borderColor": "#f53b57",
          "lineTension": 0.4,
          "pointRadius": "0",
          "data": [
            0.7,
            0.58,
            0.62,
            0.67,
            0.74,
            0.9,
            0.95
          ]
        }
      ]
    },
    "options": {
      "title": {
        "display": true,
        "text": "Global temperature anomalies"
      },
      "scales": {
        "yAxes": [
          {
            "ticks": {
              "min": -1,
              "max": 1,
              "stepSize": 0
            },
            "scaleLabel": {
              "display": true,
              "labelString": "Deviation from 20th-century baseline"
            }
          }
        ],
        "xAxes": [
          {
            "scaleLabel": {
              "display": true,
              "labelString": "Year"
            }
          }
        ]
      }
    }
  },
  "created_at": "2019-04-23T04:11:10.812Z",
  "updated_at": "2019-04-23T04:11:10.812Z"
}
</pre>

At this point it's tempting to blanket-permit nested attributes like this, just to avoid the `ForbiddenAttributesError`:

<pre class="prettyprint lang-rb">
params.require(:chart).permit!
</pre>

But that wouldn't be secure. To be able to save this object to the database without introducing vulnerabilities, you need to write strong params that are more or less as complicated as the object itself. This is mildly intimidating. But also doable.

Here's how the finished product looks:

<pre class="prettyprint lang-rb">
class ChartsController < ApplicationController
  ...
  private

  def chart_params
    params.require(:chart).permit(
      :user_id,
      {
        :data => [
          :type,
          {
            data: [
              {:labels => []},
              {
                _datasets: [
                  :label,
                  :fill,
                  :borderColor,
                  :lineTension,
                  :pointRadius,
                  {:data => []}
                ]
              }
            ]
          },
          {
            options: [
              {
                title: [
                  :display,
                  :text
                ]
              },
              {
                scales: [
                  {
                    yAxes: [
                      {
                        ticks: [
                          :min,
                          :max,
                          :stepSize
                        ],
                      },
                      {
                        scaleLabel: [
                          :display,
                          :labelString
                        ]
                      }
                    ]
                  },
                  {
                    xAxes: [
                      {
                        scaleLabel: [
                          :display,
                          :labelString
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    )
  end
end
</pre>

Let's walk through the code above.

In the simplest case, we want to save a key-value pair like the following:

<pre class="prettyprint lang-bsh">
"user_id": 3,
</pre>

In our strong params, <b>simple key-value pairs simply become symbols</b>. So the above translates to:

<pre class="prettyprint lang-rb">
:user_id,
</pre>

In the next line, `data` is more involved. In the database-bound json, the `data` key's value is an object:

<pre class="prettyprint lang-bsh">
"data": {
  ...
},
</pre>

In our strong params, <b>the object becomes an array</b>, with each key-value pair becoming a symbol, as above. <b>We also wrap the `data` key and its array value in curly braces</b>:

<pre class="prettyprint lang-rb">
{
  :data => [
    ...
  ]
}
</pre>

As we go deeper in the nested object, we repeat these same steps. Where a key takes an object as a value, we wrap the whole thing in braces and turn the value-object into an array. Simple key-value pairs become symbols.

So `data.data._datasets` –

<pre class="prettyprint lang-bsh">
"_datasets": [
  {
    "label": "deviation",
    "fill": false,
    "borderColor": "#f53b57",
    "lineTension": 0.4,
    "pointRadius": "0",
    "data": [
      0.7,
      0.58,
      0.62,
      0.67,
      0.74,
      0.9,
      0.95
    ]
  }
]
</pre>

– turns into the following:

<pre class="prettyprint lang-rb">
_datasets: [
  :label,
  :fill,
  :borderColor,
  :lineTension,
  :pointRadius,
  {:data => []}
]
</pre>

And now there's no more need for dangerous over-permissiveness.
