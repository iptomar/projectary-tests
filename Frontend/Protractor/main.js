// Try to login
describe('Projectary Homepage', function () {

  beforeEach(function () {
    browser.get('http://localhost:4200');
  });

  it("It should have correct title", function () {
    expect(browser.getTitle()).toEqual('Projectary');
  });

  it('Go to Home Page', function () {
    element(by.id('routHome')).click();
    expect(browser.getCurrentUrl()).toMatch('/home');
  });

  it('Return to Home Page', function () {
    element(by.id('anLinkToHome')).click();
    expect(browser.getCurrentUrl()).toMatch('');
  });

  it('Go to About Page', function () {
    element(by.id('routAbout')).click();
    expect(browser.getCurrentUrl()).toMatch('/about');
  });

  it('Go to Contacts Page', function () {
    element(by.id('routContact')).click();
    expect(browser.getCurrentUrl()).toMatch('/contacts');
  });

  it('Try to login into application', function () {
    element(by.className('dropdown-toggle')).click();
    element(by.name('email')).sendKeys('ninja@caldas.ipt');
    element(by.name('password')).sendKeys('123qwe');
    element(by.id('btUserLogin')).click();
    element(by.id('auth')).getText()
      .then(function (greet) {
        expect(greet).toEqual("Bem vindo Ninja das Caldas");
      });
  });

  /*it('Create a user', function () {
    element(by.className('dropdown-toggle')).click();
    element(by.id('anUserRegister')).click();
    element(by.id('tfSigninUserName')).sendKeys('TestUser');
    element(by.id('tfSigninUserStudentNr')).sendKeys('11111');
    element(by.id('tfSigninUserEmail')).sendKeys('teste@ipt.pt');
    element(by.id('tfSigninUserPass')).sendKeys('123qw');
    element(by.id('tfSigninUserRepPass')).sendKeys('123qw');
    // ESTT
    element(by.name('school')).$('[value="1"]').click();
    // Engenharia Informatica
    element(by.name('course')).$('[value="1"]').click();
    element(by.id('tfSigninUserRegister')).click();
    browser.sleep(1000);
  });

    /*it('Check profile page', function () {
    element(by.className('dropdown-toggle')).click();
    element(by.className('rlgroupjoin')).click();
  });*/

  /*it('Check profile page', function () {
    element(by.className('dropdown-toggle')).click();
    element(by.className('rlgroupjoin')).click();
    element(by.name('email')).sendKeys('ninja@caldas.ipt');
    element(by.name('password')).sendKeys('123qw');
    element(by.id('btUserLogin')).click();
    browser.sleep(1000);
  });*/

});

