import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }   from '@angular/http';
import { Ng2PaginationModule } from 'ng2-pagination';

import { AppComponent }  from './app.component';
import { ModalComponent } from './modal.component';

import { FlickrService } from './flickr.service';

@NgModule({
  imports:      [ 
                    BrowserModule,
                    HttpModule,
                    Ng2PaginationModule
                ],
  declarations: [ 
                  AppComponent,
                  ModalComponent
                  ],
  bootstrap:    [ AppComponent ],
  providers:    [ FlickrService ]
})
export class AppModule { }
