browser.waitForAngularEnabled(false);

// Try to login
describe('Login', function () {
  it('Try to login into application', function () {
    browser.get('http://localhost:4200');
    expect(browser.getTitle()).toEqual('Projectary');
    element(by.className('dropdown-toggle')).click();
    element(by.name('username')).sendKeys('ninja@caldas.ipt');
    element(by.name('password')).sendKeys('123qwe');
    element(by.id('btUserLogin')).click();
  });
});