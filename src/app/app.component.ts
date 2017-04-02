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
export class AppComponent implements OnInit { 
    sortKeys= [{
                id:"date-posted-desc",
                value:"Date posted"
                }, 
                {
                 id:"date-taken-desc",
                 value:"Date taken"
                },
                {
                 id:"interestingness-desc",
                 value:"Interesting"
                },
                {
                 id:"relevance",
                 value:"Relevant"
                },
              ];
    name = 'NASA'; 
    photos: Object[];
    private searchTerms = new Subject<string>();
    pageNumber: number = 1;
    searchTerm = "";
    sortBy = "date-posted-desc";
    
    search(term: string): void {
        this.searchTerm = term;
        this.triggerGetPhotos();
    }
    
    constructor(private flickrService: FlickrService) { }
    
    ngOnInit(): void {
        this.getPublicPhotos();
        this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term =>    // switch to new observable each time the term changes
            this.flickrService.search(term)).subscribe(photos => this.photos = photos); 
    }

    getPublicPhotos(): void {
       this.flickrService.getPublicPhotos().subscribe(photos => this.photos = photos);
    }
    
    setSort(id: string): void {
        this.sortBy = id;
        this.triggerGetPhotos();
    }
    
    getPage(page: number) {
        this.pageNumber = page;
        this.triggerGetPhotos();
    }
    
    triggerGetPhotos()
    {
        this.searchTerms.next(this.searchTerm + "&sort=" + this.sortBy + "&page=" + this.pageNumber);
    }
}
