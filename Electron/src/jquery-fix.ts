//vgl. https://github.com/electron/electron/issues/254 und http://stackoverflow.com/questions/32621988/electron-jquery-is-not-defined

if (electron)
{
const w = <any>window;
if (!w.$) {
    console.log("jQuery fix...!")
    if (typeof module === 'object') {
        w.module = module;
        module = undefined;
    }
    w.$ = w.jQuery = require('./jquery.min.js');
    if (w.module) module = w.module;

    if (typeof require !== "undefined") {
        console.log("########## require('electron')");
        // tslint:disable-next-line:no-var-keyword
        var electron = require('electron');
    }
    console.log("jQuery fix END")
}
}
