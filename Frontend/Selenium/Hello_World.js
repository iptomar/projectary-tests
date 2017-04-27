require('chromedriver');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();

//go to google page
driver.get('http://www.google.com');
//select the search box, finding it by name 'q' and write 'hello world'' in the box
driver.findElement(webdriver.By.name('q')).sendKeys('hello world');
driver.findElement(webdriver.By.className('sbico')).click();
//another way to select the seach box 
driver.findElement({name: 'q'}).sendKeys(' webdriverjs');
driver.findElement({name: 'q'}).sendKeys(webdriver.Key.ENTER);
//exit
driver.quit();