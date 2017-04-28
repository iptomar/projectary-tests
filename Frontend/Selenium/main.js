browser.waitForAngularEnabled(false);

describe('Google Search Testing', function() {
  it('Search for "Hello World"', function() {
    browser.get('http://www.google.com');
    expect(browser.getTitle()).toEqual('Google');
    element(by.name('q')).sendKeys('Hello World');
    element(by.className('sbico')).click();
  });
});