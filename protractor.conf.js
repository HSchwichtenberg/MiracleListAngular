// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    capabilities: {
        'browserName': 'chrome' /*firefox' /*internet explorer' /*chrome */
            /* Während Chrome und FireFox den Silenium WebDriver inzwischen direkt unterstützen, muss der Entwickler für Internet Explorer[https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver], Edge [https://www.microsoft.com/en-us/download/details.aspx?id=48212] und Opera [https://github.com/operasoftware/operachromiumdriver] vorher einen Treiber auf seinem System installieren.
             */
    },
    directConnect: true,
    baseUrl: 'http://localhost:4400/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    beforeLaunch: function() {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
    },
    onPrepare: function() {
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

        var jasmineReporters = require('jasmine-reporters');
    var junitReporter = new jasmineReporters.JUnitXmlReporter({

      // setup the output path for the junit reports
      savePath: 'testresults/',

      // conslidate all true:
      //   output/junitresults.xml
      //
      // conslidate all set to false:
      //   output/junitresults-example1.xml
      //   output/junitresults-example2.xml
      consolidateAll: true

    });
    jasmine.getEnv().addReporter(junitReporter);
    }
};