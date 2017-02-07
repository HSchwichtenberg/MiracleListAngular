// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    capabilities: {
        'browserName': 'firefox' /*firefox' /*internet explorer' /*chrome */
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
    useAllAngular2AppRoots: true,
    beforeLaunch: function() {
        require('ts-node').register({
            project: 'e2e'
        });
    },
    onPrepare: function() {
        jasmine.getEnv().addReporter(new SpecReporter());
    }
};