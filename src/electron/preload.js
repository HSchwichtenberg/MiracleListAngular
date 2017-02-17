console.log("preload.js", typeof require, typeof electron);
if (typeof require !== "undefined") {
    var electron = require('electron');
}
console.log("preload.js END", typeof require, typeof electron);