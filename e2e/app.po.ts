import { browser, element, by } from 'protractor';

export class MiracleListClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('start h2')).getText();
  }
}
