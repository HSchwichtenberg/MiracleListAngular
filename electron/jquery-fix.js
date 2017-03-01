if (!window.$) {
    console.log("jQuery fix...!");
    if (typeof module === 'object') {
        window.module = module;
        module = undefined;
    }
    window.$ = window.jQuery = require('./jquery.min.js');
    if (window.module)
        module = window.module;
    if (typeof require !== "undefined") {
        console.log("########## require('electron')");
        var electron = require('electron');
    }
    console.log("jQuery fix END");
}
//# sourceMappingURL=jquery-fix.js.map