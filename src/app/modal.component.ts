import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
 
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
    setTimeout(() => this.visible = false);
  }
}