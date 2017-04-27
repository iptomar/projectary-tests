* Supertest

> Contents:
> * [What’s Supertest?](#whats-supertest)
> * [Why do we need Supertest?](#why-do-we-need-supertest)
> * [References](#references)

## What’s Supertest?
**Supertest** is a library made for testing nodejs http servers that depends on a module called super-agent.
Being essentially an extension of this module, supertest shares many methods from super-agent.

Example:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
```

More examples: https://github.com/visionmedia/supertest

## Why do we need Supertest?
To check if a given api is correctly implemented, for example, checking if the routes are exposing the right info to be consumed or if the api is prepared for certain inputs from clients.

## References
* [Supertest](https://github.com/visionmedia/supertest/)
* [Super-agent](https://github.com/visionmedia/superagent)
* [Super-agent documentation](http://visionmedia.github.io/superagent/)
