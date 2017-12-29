import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-image-picker',
  templateUrl: 'image-picker.html',
})
export class ImagePickerPage {
  mUrls: Array<string> = [];
  constructor(public navCtrl: NavController,
    public mModalController: ModalController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagePickerPage');
  }

  onClickSelectImage(multiple: boolean) {
    let modal = this.mModalController.create("FirebaseStoragePage", {
      mutiple_files: multiple
    });
    modal.present();
    modal.onDidDismiss(data => {
      console.log("on selected done", data);
      this.mUrls = [];
      if (multiple) {
        if (data && data.images) {
          data.images.forEach(element => {
            console.log(element);
            
            if (element) this.mUrls.push(element.url);
          });
        }
      } else {
        if (data && data.image) {

          this.mUrls.push(data.image.url);
        }
      }
    });
  }
}
