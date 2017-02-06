System.registerDynamic("angular2-contextmenu/src/contextMenu.component", ["@angular/core", "./contextMenu.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var contextMenu_service_1 = $__require('./contextMenu.service');
  var ContextMenuComponent = (function() {
    function ContextMenuComponent(_contextMenuService) {
      var _this = this;
      this._contextMenuService = _contextMenuService;
      this.links = [];
      this.isShown = false;
      this.isOpening = false;
      this.mouseLocation = {
        left: 0,
        top: 0
      };
      _contextMenuService.show.subscribe(function(e) {
        return _this.showMenu(e.event, e.actions, e.item);
      });
    }
    Object.defineProperty(ContextMenuComponent.prototype, "locationCss", {
      get: function() {
        return {
          'position': 'fixed',
          'display': this.isShown ? 'block' : 'none',
          left: this.mouseLocation.left + 'px',
          top: this.mouseLocation.top + 'px'
        };
      },
      enumerable: true,
      configurable: true
    });
    ContextMenuComponent.prototype.clickedOutside = function() {
      if (!this.isOpening) {
        this.isShown = false;
      }
    };
    ContextMenuComponent.prototype.showMenu = function(event, actions, item) {
      var _this = this;
      this.isOpening = true;
      setTimeout(function() {
        return _this.isOpening = false;
      }, 400);
      if (actions && actions.length > 0) {
        this.isShown = true;
      }
      this.links = actions;
      this.item = item;
      this.mouseLocation = {
        left: event.clientX,
        top: event.clientY
      };
    };
    __decorate([core_1.HostListener('document:click'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], ContextMenuComponent.prototype, "clickedOutside", null);
    ContextMenuComponent = __decorate([core_1.Component({
      selector: 'context-menu',
      styles: [],
      template: "<div class=\"dropdown angular2-contextmenu\">\n      <ul [ngStyle]=\"locationCss\" class=\"dropdown-menu\">\n        <li *ngFor=\"let link of links\" [class.disabled]=\"link.enabled && !link.enabled(item)\">\n          <a href (click)=\"link.click(item, $event); $event.preventDefault();\" innerHTML=\"{{link.html()}}\"></a>\n        </li>\n      </ul>\n    </div>\n  "
    }), __metadata('design:paramtypes', [contextMenu_service_1.ContextMenuService])], ContextMenuComponent);
    return ContextMenuComponent;
  }());
  exports.ContextMenuComponent = ContextMenuComponent;
  return module.exports;
});

System.registerDynamic("angular2-contextmenu/src/contextMenu.service", ["@angular/core", "rxjs/Rx"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var Rx_1 = $__require('rxjs/Rx');
  var ContextMenuService = (function() {
    function ContextMenuService() {
      this.show = new Rx_1.Subject();
    }
    ContextMenuService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], ContextMenuService);
    return ContextMenuService;
  }());
  exports.ContextMenuService = ContextMenuService;
  return module.exports;
});

System.registerDynamic("angular2-contextmenu/angular2-contextmenu", ["./src/contextMenu.component", "./src/contextMenu.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var contextMenu_component_1 = $__require('./src/contextMenu.component');
  __export($__require('./src/contextMenu.component'));
  __export($__require('./src/contextMenu.service'));
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {directives: [contextMenu_component_1.ContextMenuComponent]};
  return module.exports;
});

//# sourceMappingURL=angular2-contextmenu.js.map