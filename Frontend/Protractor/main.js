describe('Projectary', function () {

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
        expect(greet).toContain("Bem vindo");
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
*/
  //Redirection issues
  /*describe('Profile', function () {
    it('Go to profile page', function () {
      browser.waitForAngular();
      element(by.id('auth')).click();
      element(by.id('rlgroupjoin')).click();
      expect(browser.getCurrentUrl()).toMatch('/user/profile');
      browser.sleep(5000);
    });
  });*/

  describe('Projects Page', function () {
    it('Go to projects list', function () {
      element(by.id('routPubProj')).click();
      expect(browser.getCurrentUrl()).toMatch('/projects');
    });

    it('Search project list', function () {
      element(by.className('btn btn-lg')).click();
      element(by.id('searchproj')).sendKeys('testes');
      element(by.className('btn btn-default')).click();
    });

    it('Go to project submit page', function () {
      element(by.id('routSubProj')).click();
      expect(browser.getCurrentUrl()).toMatch('/projectform');
    });

    it('Submit project', function () {
      element(by.id('routSubProj')).click();
      // ESTT
      element(by.id('slProjFormSchool')).$('[value="1"]').click();
      // Engenharia Informatica
      element(by.id('slProjFormCourse')).$('[value="1"]').click();
      element(by.id('tfProjFormName')).sendKeys('projeto');
      element(by.id('tfProjFormObj')).sendKeys('objetivos');
      element(by.id('butSubProj')).click();
      //wait for angular here
      expect(browser.getCurrentUrl()).toMatch('/home');
    });

  });

  it('Try to logout', function () {
    element(by.className('dropdown-toggle')).click();
    element(by.id('btUserLogout')).click();
    element(by.id('nauth')).getText()
      .then(function (greet) {
        expect(greet).toContain("Login");
      });
  });

});

