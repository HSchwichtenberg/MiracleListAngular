// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine-jquery', 'jasmine', '@angular-devkit/build-angular'],
        plugins: [
         require('karma-phantomjs-launcher'),
         require('karma-junit-reporter'),
            require('karma-jasmine-jquery'),
            require('karma-jasmine'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-chrome-launcher'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        files: [
         './node_modules/web-animations-js/web-animations.min.js', // https://github.com/ariya/phantomjs/issues/14222

            
        ],
        preprocessors: {
            
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, 'coverage'), reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        
        reporters: config.angularCli && config.angularCli.codeCoverage ? ['progress', 'coverage-istanbul', 'junit'] : ['progress', 'kjhtml', 'junit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'PhantomJS'],
        singleRun: false,

        // https://github.com/jasmine/jasmine/issues/1413
        captureTimeout: 210000,
browserDisconnectTolerance: 3, 
browserDisconnectTimeout : 210000,
browserNoActivityTimeout : 210000,

          // the default configuration
    junitReporter: {
     outputDir: 'testresults', // results will be saved as $outputDir/$browserName.xml
     outputFile: 'unitests.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
     suite: '', // suite will become the package name attribute in xml testsuite element
     useBrowserName: false, // add browser name to report and classes names
     nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
     classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
     properties: {}, // key value pair of properties to add to the <properties> section of the report
     xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
   }
    });
};