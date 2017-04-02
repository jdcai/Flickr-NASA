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
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnChanges { 
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
    }
}
