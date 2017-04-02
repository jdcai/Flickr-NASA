"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ModalComponent = (function () {
    function ModalComponent() {
        this.visible = false;
        this.visibleAnimate = false;
        this.title = "";
        this.imageUrl = "";
        this.description = "";
        this.photoid = "";
        this.userid = "24662369@N07";
    }
    ModalComponent.prototype.show = function (photo) {
        var _this = this;
        $("body").addClass("modal-open");
        this.title = photo.title;
        this.imageUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
        this.description = photo.description._content.split("\n")[0];
        this.photoid = photo.id;
        this.visible = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    ModalComponent.prototype.hide = function () {
        var _this = this;
        $("body").removeClass("modal-open");
        this.imageUrl = '';
        this.description = '';
        this.photoid = '';
        this.visibleAnimate = false;
        setTimeout(function () { return _this.visible = false; });
    };
    return ModalComponent;
}());
ModalComponent = __decorate([
    core_1.Component({
        selector: 'app-modal',
        templateUrl: './modal.component.html',
    })
], ModalComponent);
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map