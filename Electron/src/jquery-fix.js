if (electron) {
    const w = window;
    if (!w.$) {
        console.log("jQuery fix...!");
        if (typeof module === 'object') {
            w.module = module;
            module = undefined;
        }
        w.$ = w.jQuery = require('./jquery.min.js');
        if (w.module)
            module = w.module;
        if (typeof require !== "undefined") {
            console.log("########## require('electron')");
            var electron = require('electron');
        }
        console.log("jQuery fix END");
    }
}
//# sourceMappingURL=jquery-fix.js.map