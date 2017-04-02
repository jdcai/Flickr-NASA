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
        this.sortKeys = [{
                id: "date-posted-desc",
                value: "Date posted"
            },
            {
                id: "date-taken-desc",
                value: "Date taken"
            },
            {
                id: "interestingness-desc",
                value: "Interesting"
            },
            {
                id: "relevance",
                value: "Relevant"
            },
        ];
        this.name = 'NASA';
        this.searchTerms = new Subject_1.Subject();
        this.pageNumber = 1;
        this.searchTerm = "";
        this.sortBy = "date-posted-desc";
    }
    AppComponent.prototype.search = function (term) {
        this.searchTerm = term;
        this.triggerGetPhotos();
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPublicPhotos();
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
    };
    AppComponent.prototype.setSort = function (id) {
        this.sortBy = id;
        this.triggerGetPhotos();
    };
    AppComponent.prototype.getPage = function (page) {
        this.pageNumber = page;
        this.triggerGetPhotos();
    };
    AppComponent.prototype.triggerGetPhotos = function () {
        this.searchTerms.next(this.searchTerm + "&sort=" + this.sortBy + "&page=" + this.pageNumber);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
    }),
    __metadata("design:paramtypes", [flickr_service_1.FlickrService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map