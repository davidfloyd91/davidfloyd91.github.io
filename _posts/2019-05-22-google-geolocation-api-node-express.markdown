---
layout: custom
title: How to query Google's Geolocation API using Node/Express
permalink: /google-geolocation-api-node-express/
---

Recently I wanted to query Google's Geolocation API using Node.js -- more specifically, its most popular web framework, Express.

It took me longer than I would have liked, so to save some exasperated Googlers <a name="note1top" href="#note1"><sup>[1]</sup></a> some time, I thought I'd show y'all how I did it.

First of all, you'll need a Google API key, which you can get <a href="https://developers.google.com/maps/documentation/geolocation/get-api-key" target="\_blank" rel="noopener noreferrer">here</a>.

Next, in a `.js` file, fire up an Express app, as described in the <a href="https://expressjs.com/en/starter/hello-world.html" target="\_blank" rel="noopener noreferrer">docs</a>:

``` javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
```

Querying the root route on `localhost:3000` should now return `Hello World!`, which you can test in the terminal:

``` bash
$ curl -X GET -H 'Content-Type: application/json' http://localhost:3000/
```

You'll need to reference your Google API key, which -- if you have any intention whatsoever of deploying your code or uploading it to GitHub -- needs to be hidden. I saved mine in `~/.bash_profile` as `GOOGLE_API_KEY`,<a name="note2top" href="#note2"><sup>[2]</sup></a> which lets me refer to it like this:


``` javascript
const googleKey = process.env.GOOGLE_API_KEY;
```

You may choose or need to do it some other way. Once the key is registered in the system (which can take a minute) you can query the geolocation API in curl:

``` bash
$ curl -X POST -H 'Content-Type: application/json' https://www.googleapis.com/geolocation/v1/geolocate?key=$GOOGLE_API_KEY
```

And, ideally, get a response along the lines of:

``` bash
{
 "location": {
  "lat": -41.384711,
  "lng": 89.284239
 },
 "accuracy": 1827.4
}
```

To achieve the same outcome in Express, you'll need to load up the `https` protocol and define an `options` object with your query's url (divided into `hostname` [leave out the `https://`] and `path`), the `method` (important: it's `POST`), and `headers`:

``` javascript
const https = require('https');

const options = {
  hostname: 'www.googleapis.com',
  path: `/geolocation/v1/geolocate?key=${googleKey}`,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};
```

And now, finally, you can has geolocation at `localhost:3000/location`:

``` javascript
let lat, lng;

app.get('/location', (req, res) => {
  const request = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);

      let coords = JSON.parse(chunk);
      lat = coords.location.lat;
      lng = coords.location.lng;
    });

    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  request.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  request.end();
});
```

Run

``` bash
$ curl -X GET -H 'Content-Type: application/json' http://localhost:3000/location
```

to see.

A note: `lat` and `lng` store their similarly named counterparts from the response's `location` object, since you might want to use those at some point. Do do so, you can't leave out the `JSON.parse(chunk)`, for `chunk` is not as it seems.

Mashed together, the code above looks something like <a href="https://gist.github.com/davidfloyd91/e7a57dfc5882096ffc971d2917ceadd5" target="\_blank" rel="noopener noreferrer">this</a>. Good luck finding out where you are!

## Notes

<a name="note1" href="#note1top"><sup>[1]</sup></a> And their much cooler counterparts, <a href="https://duckduckgo.com/" target="\_blank" rel="noopener noreferrer">DuckDuckGoers</a>.

<a name="note2" href="#note2top"><sup>[2]</sup></a> See how to save an API key as a local variable, temporarily or permanently, <a href="https://davidfloyd91.github.io/tweepy/" target="\_blank" rel="noopener noreferrer">here</a>.
