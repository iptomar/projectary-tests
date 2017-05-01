# CasperJS

CasperJS documentation.

> Contents:
> * [What’s CasperJS?](#whats-casperjs)
> * [Why do we need CasperJS?](#why-do-we-need-casperjs)
> * [References](#references)


## What’s CasperJS?

CasperJS is a navigation scripting & testing utility for the [PhantomJS](http://phantomjs.org/) (WebKit) and [SlimerJS](http://slimerjs.org/) (Gecko) headless browsers, written in Javascript.

* [CasperJS QuickStart](http://docs.casperjs.org/en/latest/quickstart.html)

## Why do we need CasperJS?

Facilitates the process of defining a navigation scenario.

## Examples

```js
// hello-world.js
casper.test.begin("Hello World!", 1, function(test) {
  test.assert(true);
  test.done();
});
```

Run it using the casperjs test subcommand:

```js
$ casperjs test hello-world.js
Test file: hello-world.js
# Hello World!
PASS Subject is strictly true
PASS 1 test executed in 0.023s, 1 passed, 0 failed, 0 dubious, 0 skipped.
```

## References

* [CasperJS](http://casperjs.org/)
* [CasperJS documentation](http://docs.casperjs.org/en/latest/)
