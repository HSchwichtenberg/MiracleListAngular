// Workaround für Problem, dass  $ und jQuery nicht im global Scope landen - vgl. https://github.com/electron/electron/issues/254 und http://stackoverflow.com/questions/32621988/electron-jquery-is-not-defined

const w = <any>window;
if (!w.$) {
    if (typeof module === 'object') {
        w.module = module;
        module = undefined;
    }
    w.$ = w.jQuery = require('./jquery.min.js');
    if (w.module) module = w.module;

    if (typeof require !== "undefined") {
        // tslint:disable-next-line:no-var-keyword
        var electron = require('electron');
    }
}
