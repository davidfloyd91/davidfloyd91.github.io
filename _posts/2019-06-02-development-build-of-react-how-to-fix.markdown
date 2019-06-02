---
layout: custom
title: "How to fix 'This page is using the development build of React' on Heroku"
permalink: /development-build-error-react-heroku/
---

A friend of mine -- I can assure this post is not about my own experience -- recently added the React Developer Tools Chrome extension, and almost immediately made an unpleasant discovery. When they visited their own lovingly crafted React web app, the extension's icon became angry and inflamed. Clicked on, it chided:

> "This page is using the development build of React. 🚧"

The app, built using <a href="https://github.com/facebook/create-react-app" target="\_blank" rel="noopener noreferrer">Create React App</a> and deployed to Heroku using Yarn as its package manager, had shown scant signs of sloppy deployment. In short, it worked. But there was a distinct risk that some user would come along, trundle down some untested unhappy path, and end up seeing dev panel errors about being unable to `read property technoFlimFlam of undefined` -- right there in the main browser window.

Perhaps it had already happened.

The solution is to set the buildpack to <a href="https://github.com/mars/create-react-app-buildpack" target="\_blank" rel="noopener noreferrer">create-react-app-buildpack</a>, brought to us by the God of War I guess. First, check the buildpack by running the following in your project's directory:

``` bash
$ heroku buildpacks
```

If the result isn't `mars/create-react-app`, run the following:

``` bash
$ heroku buildpacks:set mars/create-react-app
```

From here on out, the majority of this post is drawn from the inimitable Jeremy Gottfried's <a href="https://medium.com/jeremy-gottfrieds-tech-blog/tutorial-how-to-deploy-a-production-react-app-to-heroku-c4831dfcfa08" target="\_blank" rel="noopener noreferrer">tutorial</a> for deploying a production React app to Heroku. It's excellent and I encourage you to check it out. The only reason I'm reproducing so much of it below is that, helpful as it was, I needed to complete one important step that the post left unstated (likely because I -- I mean, my friend -- should have read it in the React docs on the first go-round).

Hopefully bringing it all together saves someone a few Google searches.

Getting back to it, you'll need to create a `server.js` file in the root directory:

``` javascript
// source: https://medium.com/jeremy-gottfrieds-tech-blog/tutorial-how-to-deploy-a-production-react-app-to-heroku-c4831dfcfa08

const express = require('express');
const favicon = require('express-favicon');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// this route is just to test that the server is connected
app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
```

You'll notice a few dependencies at the top, which you'll need to add:

``` bash
$ yarn add express express-favicon path
```

Next, in `package.json`, change the `start` script to `node server.js`. You can retain the old script, `react-scripts start`, by setting it to a different value (my friend opted for `local_start`), and even specify the port if you're tired of Rails and React fighting over 3000:

``` json
"scripts": {
  "local_start": "PORT=3001 react-scripts start",
  "start": "node server.js",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
```

Next -- <a href="https://facebook.github.io/create-react-app/docs/deployment" target="\_blank" rel="noopener noreferrer">per the docs</a> -- set `homepage`  to `.` in `package.json`:

``` json
{
  "name": "my-friends-app",
  "version": "0.1.0",
  "homepage": ".",
  ...
}
```

Skip this step and Yarn will happily create a production build, Heroku will happily deploy it, and all manner of thing shall be well. Except that when you load up your app in the browser, the window will be blank, because the app's routes have been altered by the buildpack.

Note that, despite the React docs' caveat -- "If you are not using the HTML5 `pushState` history API or not using client-side routing at all" -- I've found that setting the `homepage` key to `.` has played perfectly well with `pushState` and client-side routing using React Router (https://github.com/ReactTraining/react-router).

When that's done, you can run:

``` bash
$ yarn build
```

This will create a `build` folder in your root directory, which you'll find chock full of pleasingly impenetrable, productiony-looking code:

``` javascript
// build/static/js/2.e1df358c.chunk.js
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],[function(e,t,n){"use strict";e.exports=n(54)},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n(17);function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){Object(r.a)(e,t,n[t])})}return e}},function(e,t,n){"use strict";var r=n(11),i=n(0),o=n.n(i),a=n(14),s=n.n(a),u=o.a.createContext(null),l=function(e){function t(t){var n;n=e.call(this,t)||this;var r=t.store;return n.state={storeState:r.getState(),store:r},n}Object(r.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){this._isMounted=!0,this.subscribe()} ...
```

Hopefully now lines like the following in `server.js` should make more sense:

``` javascript
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
```

For Heroku to see these changes, your `.gitignore` file needs to be in order. Make sure the following line is **not** present:

```
/build
```

And add these lines:

```
build/static/css/*.map
build/static/js/*.map
```

Then, if you like, you can add the following, since Heroku no longer needs to see these folders:

```
src/*
public/*
```

On the other hand, if you're pushing your project up to Github and would like the code to be readable, you'll need to let Git see `/src` and `/public`.

Now, finally, you can stage and commit your changes. And push them to Heroku:

``` bash
$ git push heroku master
```

Good luck, and feel free to <a href="https://davidfloyd91.github.io/contact/" target="\_blank" rel="noopener noreferrer">contact me</a> with any questions or issues.
