"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
// Observable class extensions
require("rxjs/Rx");
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var flickr_service_1 = require("./flickr.service");
var AppComponent = (function () {
    function AppComponent(flickrService) {
        this.flickrService = flickrService;
        this.sortKeys = ["Date posted", "Date taken",];
        this.name = 'NASA';
        this.searchTerms = new Subject_1.Subject();
    }
    AppComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPublicPhotos();
        console.log(this.photos);
        this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) {
            return _this.flickrService.search(term);
        }).subscribe(function (photos) { return _this.photos = photos; });
    };
    AppComponent.prototype.getPublicPhotos = function () {
        var _this = this;
        this.flickrService.getPublicPhotos().subscribe(function (photos) { return _this.photos = photos; });
        //this.photos = this.flickrService.getPublicPhotos();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "<div class=\"container\">\n      <form style=\"margin-top:15px\">\n        <div class=\"form-group row\">\n          <div class=\"col-md-11\">\n          <input #searchBox id=\"search-box\" (keyup)=\"search(searchBox.value)\" type=\"text\" class=\"form-control\" placeholder=\"Search\"></div>\n          <div class=\"dropdown col-md-1\">\n            <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\">\n              Sort By\n              <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\">\n              <li *ngFor=\"let key of sortKeys\"><a (click)=\"setSort()\">{{key}}</a></li>\n            </ul>\n          </div>\n        </div>\n      </form>\n    </div>\n\n             <div clss=\"example-default\" *ngFor=\"let photo of photos?.photo\" style=\"display:inline\">\n             <img src=\"https://farm{{photo.farm}}.staticflickr.com/{{photo.server}}/{{photo.id}}_{{photo.secret}}.jpg\">\n             \n             </div>",
    }),
    __metadata("design:paramtypes", [flickr_service_1.FlickrService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map