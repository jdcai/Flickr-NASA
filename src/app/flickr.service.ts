import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FlickrService {
  private flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&per_page=12&format=json&nojsoncallback=1';  // URL to web api

  constructor (private http: Http) {}
  
  getPublicPhotos(): Observable<Object[]> {
    return this.http.get(this.flickrUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  
  private extractData(res: Response) {
    let body = res.json();
    console.log(body.photos);
    return body.photos;
  }
  
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
  search(term: string): Observable<Object[]> {
    return this.http
               .get(this.flickrUrl+`&text=${term}`)
               .map(this.extractData)
               .catch(this.handleError);
  }
  

}
