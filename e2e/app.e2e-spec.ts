//import { AppModule } from '../src/app.module';
import { MiracleListClientPage } from './app.po';
import { browser, element, by } from 'protractor';

// Testcode mit Page Object
describe('miracle-list-client App', function () {
  let page: MiracleListClientPage;

  beforeEach(() => {
    page = new MiracleListClientPage();
  });

  //  Testcode mit Page Object
  it('Inhalt der Anmeldeseite', () => {
    page.navigateTo();
    expect(page.getHeadline()).toEqual('Benutzeranmeldung');
  });

// Direkter Testcode ohne Page Object
   var anmeldename = "testuser";
   var kennwort = "geheim";

    it('Kompletter Anmeldevorgang', function () {
      browser.get('/');
      var headline = element(by.css('start h2'));
      expect(headline.getText()).toBe('Benutzeranmeldung');

     // teste Formular ohne Page Object
     element(by.id('name')).sendKeys(anmeldename);
     element(by.id('password')).sendKeys(kennwort);
     element(by.id('Anmelden')).click().then(
     ()=>{

    // hat sich die URL nun verändert?
    expect(browser.getCurrentUrl())
     .toBe( browser.baseUrl + '/app');});

    // ========== Zugriff auf Modell geht noch nicht in Angular 2 :-(
    //  var e2 = element(by.model("this.communicationService.username"));
    //  expect(e2).toEqual(anmeldename);

    // Prüfe, ob Benutzername auf dem Bildschirm steht
    var e2 = element(by.id("LoggedInUser"));
    expect(e2.getText()).toEqual("Current User: " + anmeldename);

    });
  });

    // console.log("e2:",e2);
// browser.waitForAngular();
        //  browser.sleep(5000);
