# Selenium

Selenium documentation about Testing


> Contents:
> * [What’s Selenium?](#whats-selenium)
> * [Why do we need Selenium?](#why-do-we-need-selenium)
> * [References](#references)

## What’s Selenium?
Selenium is a portable open-source software-testing framework for web applications.It also provides a test domain-specific language (Selenese) to write tests in a number of popular programming languages, including C#, Groovy, Java, Perl, PHP, Python, Ruby and Scala.

## Why do we need Selenium?
We need Selenium for automating web applications and testing purposes, but Selenium is certainly not limited to just that, web-based administration tasks can also be automated as well.

## Examples

```js
require('chromedriver');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();

driver.get('http://www.google.com');
driver.findElement(webdriver.By.name('q')).sendKeys('hello world');
driver.quit();
```

## References
* [Selenium](http://www.seleniumhq.org)
* [Selenium documentation](http://www.seleniumhq.org/docs/)
