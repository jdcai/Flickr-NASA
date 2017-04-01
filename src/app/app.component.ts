import { Component, OnInit } from '@angular/core';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/Rx';
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { FlickrService } from './flickr.service';

@Component({
  selector: 'my-app',
  template: `<div class="container">
      <form style="margin-top:15px">
        <div class="form-group row">
          <div class="col-md-11">
          <input #searchBox id="search-box" (keyup)="search(searchBox.value)" type="text" class="form-control" placeholder="Search"></div>
          <div class="dropdown col-md-1">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
              Sort By
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li *ngFor="let key of sortKeys"><a (click)="setSort()">{{key}}</a></li>
            </ul>
          </div>
        </div>
      </form>
    </div>

             <div clss="example-default" *ngFor="let photo of photos?.photo" style="display:inline">
             <img src="https://farm{{photo.farm}}.staticflickr.com/{{photo.server}}/{{photo.id}}_{{photo.secret}}.jpg">
             
             </div>`,
})
export class AppComponent implements OnInit { 
    sortKeys: string[] = ["Date posted", "Date taken", ];

    name = 'NASA'; 
    photos: Object[];
    private searchTerms = new Subject<string>();
    
    search(term: string): void {
        this.searchTerms.next(term);
    }
    
    constructor(private flickrService: FlickrService) { }
    
    ngOnInit(): void {
        this.getPublicPhotos();
        console.log(this.photos);
        this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term =>    // switch to new observable each time the term changes
 this.flickrService.search(term)).subscribe(photos => this.photos = photos);
 
 
    }
    
    getPublicPhotos(): void {
       this.flickrService.getPublicPhotos().subscribe(photos => this.photos = photos);
       //this.photos = this.flickrService.getPublicPhotos();
       
         
    
    }
    
    
}
