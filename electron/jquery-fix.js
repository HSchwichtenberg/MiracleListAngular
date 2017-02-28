//vgl. https://github.com/electron/electron/issues/254 und http://stackoverflow.com/questions/32621988/electron-jquery-is-not-defined

if (!window.$) {
    console.log("jQuery fix...!")
    if (typeof module === 'object') {
        window.module = module;
        module = undefined;
    }
    window.$ = window.jQuery = require('./jquery.min.js');
    if (window.module) module = window.module;

    if (typeof require !== "undefined") {
        console.log("########## require('electron')");
        var electron = require('electron');
        // const ipcRenderer = require('electron');
    }

    console.log("jQuery fix END")
}