//vgl. https://github.com/electron/electron/issues/254

if (!window.$) { window.$ = window.jQuery = require('jquery'); }