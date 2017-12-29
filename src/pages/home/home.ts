import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

interface ItemPage {
  name: string;
  page: string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  items: Array<ItemPage> = [
    { name: "Firebase Storage", page: "FirebaseStoragePage" },
    { name: "Viet Nam Provinces", page: "VietnamProvincePage" },
    { name: "ImagePicker", page: "ImagePickerPage" },
    { name: "Danh sách sân bóng", page: "StadiumsHanoiPage" },
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onClickItem(itemPage: ItemPage) {
    if (itemPage.page.length > 0) {
      this.navCtrl.push(itemPage.page);
    }
  }

}
