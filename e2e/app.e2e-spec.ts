import { AppModule } from './../src/app/app.module';
import { MiracleListClientPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('miracle-list-client App', function () {
  let page: MiracleListClientPage;

  beforeEach(() => {
    page = new MiracleListClientPage();
  });

// Direkter Testcode
describe('Protractor Demo App', function () {
    var anmeldename = "testuser";

    it('Anmelde-Check', function () {
      browser.get('http://localhost:4400');
      var e1 = element(by.css('start h2'));
      expect(e1.getText()).toEqual('Benutzeranmeldung');
     
     // teste Formular
     element(by.id('name')).sendKeys(anmeldename);
     element(by.id('password')).sendKeys(anmeldename);
     element(by.id('Anmelden')).click().then(
     ()=>{ 
        //  browser.sleep(5000);
    expect(browser.getCurrentUrl())
     .toBe('http://localhost:4400/app');});

    // ========== Zugriff auf Modell geht noch nicht in Angular 2 :-(
    //  var e2 = element(by.model("this.communicationService.username"));
    //  expect(e2).toEqual(anmeldename);

    var e2 = element(by.id("LoggedInUser"));
    console.log("e2:",e2);
    expect(e2.getText()).toEqual("Angemeldeter Benutzer: " + anmeldename);

    });
  });

// browser.waitForAngular();

// Testcode mit Abstraktion in app.po.test
  // it('should display message saying app works', () => {
  //   page.navigateTo();
  //   expect(page.getParagraphText()).toEqual('Benutzeranmeldung');
  // });
});
