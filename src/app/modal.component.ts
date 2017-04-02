import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
  <div (click)="hide()" class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
       [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
    <div class="modal-dialog modal-lg">
      <div class="modal-content" (click)="$event.stopPropagation();">
        <div class="modal-header">
            <h4 class="modal-title">
                {{title}}
            </h4>
        </div>
        <div class="modal-body">
          <img class="modal-image" src="{{imageUrl}}">
          <div style="white-space:pre-wrap;" [innerHtml]="description"></div>
        </div>
        <div class="modal-footer" >
            <button type="button" class="btn btn-default" (click)="hide()">Close</button>
            <a href="https://www.flickr.com/photos/{{userid}}/{{photoid}}" type="button" class="btn btn-primary">View on Flickr</a>
        </div>
      </div>
    </div>
  </div>
  `
})
export class ModalComponent {

  public visible = false;
  private visibleAnimate = false;
  private title: string = "";
  private imageUrl: string = "";
  private description: string = "";
  private photoid: string = "";
  private userid = "24662369@N07";
  
  public show(photo:any): void {
    $("body").addClass("modal-open");
      
    this.title = photo.title;
    this.imageUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
    this.description = photo.description._content.split("\n")[0];
    this.photoid = photo.id;
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    $("body").removeClass("modal-open")
    this.imageUrl = '';
    this.description = '';
    this.photoid = '';
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }
}