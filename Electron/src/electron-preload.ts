console.log("preload.js", typeof require, typeof electron);
if (typeof require !== "undefined") {
    // tslint:disable-next-line:no-var-keyword
    var electron = require('electron');
}
console.log("preload.js END", typeof require, typeof electron);
