# Frontend Testing

Much of the code we make is prone to errors, including frontend, even if you don’t notice at first or you’re sure that no one of them can slip through your hands.

Most of it should not be done with your eyes and that’s where **Automated Frontend Testing** comes in.

> Contents:
> * [What’s Automated Frontend Testing?](#whats-automated-frontend-testing)
> * [Why do we need frontend testing?](#why-do-we-need-frontend-testing)
> * [Functional Testing](#functional-testing)
> * [Angular Testing](#angular-testing)
> * [References](#references)


## What’s Automated Frontend Testing?
Automated process of detecting when things break.

## Why do we need frontend testing?
There are number of errors untold number of subtle errors that can occur on the frontend.
For instance:
* CSS and JS changes that break things, even minor ones
* Performance regressions

Frontend development is becoming more critical and complex, we need to employ the same testing abilities that the backend has had for a long time. We might need to **test the page load times**, **test render speeds**, **verify that visual changes** have occurred or don't have occurred and some other times you might want to **accountability for code changes**.

## Functional Testing
**CasperJS**, using PhantomJS under the hood, allows for scripted actions to be tested.
* Run the same test with multiple screen sizes.
* Test complex features or components.
* Automate complex user actions.
* Test content creation, transactions, (…).

Examples: https://github.com/rupl/frontend-testing/tree/gh-pages/examples/casper

## Angular Testing

Our section about testing angularjs is located [here](Angular/angular.md).

## References
* [github.com/rupl/frontend-testing](https://github.com/rupl/frontend-testing)
* [DrupalCon Austin 2014: Automated Frontend Testing](https://www.youtube.com/watch?v=1PCdlBSKhKk)
