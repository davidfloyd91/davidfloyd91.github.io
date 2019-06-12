---
layout: custom
title: How to query Google's Geolocation API using Node/Express
permalink: /google-geolocation-api-node-express/
---

Recently I wanted to query Google's <a href="https://developers.google.com/maps/documentation/geolocation/intro" target="\_blank" rel="noopener noreferrer">Geolocation API</a> using Node.js -- more specifically, its most popular web framework, Express.

It took me longer than I would have liked, so to save some exasperated Googlers <a name="note1top" href="#note1"><sup>[1]</sup></a> some time, I thought I'd show y'all how I did it.

First of all, you'll need a Google API key, which you can get <a href="https://developers.google.com/maps/documentation/geolocation/get-api-key" target="\_blank" rel="noopener noreferrer">here</a>.

Next, in an `index.js` file (the naming is up to you), fire up an Express app, as described in the <a href="https://expressjs.com/en/starter/hello-world.html" target="\_blank" rel="noopener noreferrer">docs</a>:

<pre class="prettyprint">
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
</pre>

Once you run the file with `$ node index`, querying the root route on `localhost:3000` should return `Hello World!`:

<pre class="prettyprint lang-bsh">
$ curl -X GET -H 'Content-Type: application/json' http://localhost:3000/
Hello World!
</pre>

You'll need to reference your Google API key, which needs to be hidden. I saved mine in `~/.bash_profile` as `GOOGLE_API_KEY`,<a name="note2top" href="#note2"><sup>[2]</sup></a> which lets me refer to it like this:


<pre class="prettyprint">
const googleKey = process.env.GOOGLE_API_KEY;
</pre>

You may choose or need to do it some other way. Once the key is registered in the system (which can take a minute) you can query the geolocation API in curl:

<pre class="prettyprint lang-bsh">
$ curl -X POST -H 'Content-Type: application/json' https://www.googleapis.com/geolocation/v1/geolocate?key=$GOOGLE_API_KEY
</pre>

And, ideally, get a response along the lines of:

<pre class="prettyprint lang-bsh">
{
 "location": {
  "lat": -41.384711,
  "lng": 89.284239
 },
 "accuracy": 1827.4
}
</pre>

To achieve the same outcome in Express, you'll need to load up the `https` protocol and define an `options` object with your query's url (divided into `hostname` -- leave out the `https://` -- and `path`), the `method` (important: it's `POST`), and `headers`:

<pre class="prettyprint">
const https = require('https');

const googleOptions = {
  hostname: 'www.googleapis.com',
  path: `/geolocation/v1/geolocate?key=${googleKey}`,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};
</pre>

And now, finally, you can has geolocation at `localhost:3000/location`:

<pre class="prettyprint">
let lat, lng;

app.get('/location', (req, res) => {
  let data = '';

  const request = https.request(googleOptions, (response) => {
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
      data += chunk;
    });

    response.on('end', () => {
      console.log('No more data in response.');

      let coords = JSON.parse(data);
      lat = coords.location.lat;
      lng = coords.location.lng;

      res.send(coords);
    });
  });

  request.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  request.end();
});
</pre>

Run

<pre class="prettyprint lang-bsh">
$ curl -X GET -H 'Content-Type: application/json' http://localhost:3000/location
</pre>

to see.

A note: `lat` and `lng` store their similarly named counterparts from the response's `location` object, since you might want to use those at some point. It's important not to leave out the `JSON.parse(chunk)`, for `chunk` is not the friendly JSON object it looks like.

Mashed together, the code above looks like <a href="https://gist.github.com/davidfloyd91/e7a57dfc5882096ffc971d2917ceadd5" target="\_blank" rel="noopener noreferrer">this</a>. Good luck, and have fun finding out where you are!

## Notes

<a name="note1" href="#note1top"><sup>[1]</sup></a> And their much cooler counterparts, <a href="https://duckduckgo.com/" target="\_blank" rel="noopener noreferrer">DuckDuckGoers</a>.

<a name="note2" href="#note2top"><sup>[2]</sup></a> See how to save an API key as a local variable, temporarily or permanently, <a href="https://davidfloyd91.github.io/tweepy/" target="\_blank" rel="noopener noreferrer">here</a>.
