import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Stadium, StadiumType } from '../../providers/bongda69/classes/stadium';

declare var google;

interface Province {
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  code: string;
}
interface District {
  name: string;
  type: string;
  slug: string;
  name_with_type: string;
  path: string;
  path_with_type: string;
  code: string;
  province_code: string;
}

class StadiumTypePrivate extends StadiumType {
  // id: number;
  // name: string;
  status: boolean;
  // quantity: number;

  constructor() {
    super();
    this.id = -1;
    this.name = "";
    this.status = false;
    this.quantity = 0;
  }
}

class LatLng {
  lat: number;
  lng: number;
  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}

class Location {
  address: string = "";
  latlng: LatLng;
  // marker: Marker;

  constructor() {
    this.resetData();
  }

  onResponseData(address: string, latlng: LatLng) {
    this.resetData();

    if (address) {
      this.address = address;
    }
    else {
      this.address = "";
    }

    if (latlng) {
      this.latlng = latlng;
    }
    else {
      this.latlng = null;
    }

  }

  resetData() {
    this.address = "";
    this.latlng = null;
  }

  setAddress(address) {
    this.address = address;
  }
}

@IonicPage()
@Component({
  selector: 'page-stadium-detail',
  templateUrl: 'stadium-detail.html',
})
export class StadiumDetailPage {

  mProvince: Province;
  mDistricts: Observable<District[]>;
  mStadiumType: Array<StadiumTypePrivate> = [];

  mStadium: Stadium;

  mDatas = {
    emptyHotline: "Số liên hệ",
    description: "Enter a description",
    stadiumType: "Số sân",
    save: "Lưu",
    district: {
      code: "",
      name: ""
    }
  }

  constructor(public navCtrl: NavController,
    public mAngularFirestore: AngularFirestore,
    public mAlertController: AlertController,
    public mModalController: ModalController,
    public mHttpClient: HttpClient,
    public navParams: NavParams) {
    this.mProvince = {
      name: "",
      slug: "",
      type: "",
      name_with_type: "",
      code: "01"
    }
    if (navParams.data['data']) {
      this.mStadium = navParams.data['data'];
      // console.log(JSON.stringify(this.mStadium));
    }
    else {
      if (navParams.data['district']) {
        this.mStadium = {
          "address": "",
          "cover": "",
          "description": "",
          "district_id": navParams.data['district'],
          "district_name": navParams.data['name'],
          "firebase_id": "",
          "hotlines": [],
          "id": "",
          "lat": 0,
          "lng": 0,
          "logo": "",
          "map_id": "",
          "name": "",
          "province_id": "0",
          "province_name": "Hà Nội",
          "stadium_type": { "id": -1, "name": "", "quantity": -1 },
          "types": [],
          "album": []
        };
      }
      else {
        this.mStadium = {
          "address": "",
          "cover": "",
          "description": "",
          "district_id": "001",
          "district_name": "Ba Đình",
          "firebase_id": "",
          "hotlines": [],
          "id": "",
          "lat": 0,
          "lng": 0,
          "logo": "",
          "map_id": "",
          "name": "",
          "province_id": "0",
          "province_name": "Hà Nội",
          "stadium_type": { "id": -1, "name": "", "quantity": -1 },
          "types": [],
          "album": []
        };
      }
    }
    if (this.mStadium.lat == 0 && this.mStadium.lng == 0) {
      if (this.mStadium.address) {
        this.getLatLngByAddress(this.mStadium.address).then(data => {
          this.mStadium.lat = data['lat'];
          this.mStadium.lng = data['lng'];
        });
      }
      else {
        this.mStadium.lat = 21.027764;
        this.mStadium.lng = 105.834160;
      }
    }
    console.log(this.mStadium);
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad StadiumDetailPage');
    this._LoadJsonData();
    this._ConnectToFirebase();
  }

  _ConnectToFirebase() {

    let districtCollectionRef: AngularFirestoreCollection<District> = this.mAngularFirestore.collection("districts", ref => {
      return ref.where('province_code', '==', this.mProvince.code);
    });

    this.mDistricts = districtCollectionRef.valueChanges();
  }

  _LoadJsonData() {
    return new Promise((resolve, reject) => {
      if (this.mStadiumType.length > 0) {
        resolve(this.mStadiumType);
      } else {
        this.mHttpClient.get("./assets/data/enums.json").subscribe(
          data => {
            data['stadium_types'].forEach(element => {
              let type = new StadiumTypePrivate();
              type.id = element.id;
              type.name = element.name;
              this.mStadiumType.push(type);

              for (let i = 0; i < this.mStadium.types.length; i++) {
                if (this.mStadium.types[i].id == type.id) {
                  type.status = true;
                  type.quantity = this.mStadium.types[i].quantity;
                  break;
                }
              }
            });
            console.log(this.mStadiumType);
            resolve(this.mStadiumType);
          }
        );
      }
    });
  }

  updateTypeStatus(id) {
    console.log(id);

  }

  onClickAddHotline() {
    console.log("onClickAddHotline");
    this.mStadium.hotlines.push("");
  }

  onClickTitle() {
    console.log(this.mStadium);
    console.log(this.mStadiumType);
  }

  onClickRemove() {

    let alert = this.mAlertController.create({
      title: 'Xác nhận',
      message: "Bạn muốn xóa \"" + this.mStadium.name + "\"?",
      buttons: [
        {
          text: 'Xóa',
          handler: () => {

            if (this.mStadium.firebase_id) {
              let stadiumsRef = this.mAngularFirestore.collection("stadiums");
  
              stadiumsRef.doc(this.mStadium.firebase_id).delete().then(() => {
                this.navCtrl.pop();
              });
            }
            else{
              this.navCtrl.pop();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    alert.present();
  }

  onClickEditLogo() {
    this.onClickSelectImage(false, this.LOGO);
  }

  onClickEditCover() {
    this.onClickSelectImage(false, this.COVER);
  }

  onClickAddress() {
    let location = new Location();
    location.onResponseData(this.mStadium.address, new LatLng(this.mStadium.lat, this.mStadium.lng))

    this.navCtrl.push("BdpInputAddressPage", { location: location, callback: this.getData }, { animate: false });
  }

  onClickSave() {
    console.log("onClickSave");

    this.mStadium.types = [];
    this.mStadium.stadium_type = null;
    this.mStadiumType.forEach(element => {
      if (element.status) {
        let type = {
          id: element.id,
          name: element.name,
          quantity: parseInt(element.quantity + "")
        }
        this.mStadium.types.push(type);
        if (type.quantity > (this.mStadium.stadium_type ? this.mStadium.stadium_type.quantity : 0)) {
          this.mStadium.stadium_type = type;
        }
      }
    });

    {
      let stadiumsRef = this.mAngularFirestore.collection("stadiums");
      if (!this.mStadium.firebase_id) {
        this.mStadium.firebase_id = this.mAngularFirestore.createId();
      }

      stadiumsRef.doc(this.mStadium.firebase_id).set(this.mStadium).then(() => {
        this.navCtrl.pop();
      });
    }
  }

  onClickRemoveHotline(i) {
    this.mStadium.hotlines.splice(i, 1);
  }

  onClickAddAlbumImg() {
    this.onClickSelectImage(true, this.ALBUM);
  }

  onClickRemoveImg(i) {
    let alert = this.mAlertController.create({
      title: 'Xóa ảnh?',
      buttons: [
        {
          text: 'Xóa',
          handler: () => {
            this.mStadium.album.splice(i, 1);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })

    alert.present();
  }


  LOGO = 1;
  COVER = 2;
  ALBUM = 3;
  onClickSelectImage(multiple: boolean, save: number) {
    let modal = this.mModalController.create("FirebaseStoragePage", {
      mutiple_files: multiple
    });
    modal.present();
    modal.onDidDismiss(data => {
      console.log("on selected done", data);

      if (multiple && save == this.ALBUM) {
        if (data && data.images) {
          data.images.forEach(element => {

            this.mStadium.album.push(element.url)
          });
        }
      } else {
        if (data && data.image) {
          if (save == this.LOGO) {
            this.mStadium.logo = data.image.url;
          }
          else if (save == this.COVER) {
            this.mStadium.cover = data.image.url;
          }
        }
      }
    });
  }

  trackByIndex(index: number) {
    return index;
  }

  // callback
  getData = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.setFindData(data);
      resolve();
    });
  };

  setFindData(data) {
    let location = new Location();

    location.onResponseData(data.place, data.latlng);
    console.log(location);
    this.mStadium.address = location.address;
    this.mStadium.lat = location.latlng.lat;
    this.mStadium.lng = location.latlng.lng;
  }


  geocoder = new google.maps.Geocoder;
  getLatLngByAddress(address, name?) {
    return new Promise((res, rej) => {

      this.geocoder.geocode({ 'address': address }, (results, status) => {
        console.log(status);

        if (results && results[0]) {
          let location = results[0].geometry.location;
          let latlng = new LatLng(location.lat(), location.lng());
          res(latlng);
        }
      });
    });
  }
}
