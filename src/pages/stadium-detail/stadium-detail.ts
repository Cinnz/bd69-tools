import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Stadium, StadiumType } from '../../providers/bongda69/classes/stadium';

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
    this.quantity = null;
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
      console.log(JSON.stringify(this.mStadium));
    }
    else {
      this.mStadium = {
        "address": "16/67 phố Quảng An, Tây Hồ, Hà Nội",
        "cover": "https://firebasestorage.googleapis.com/v0/b/bdp-tools.appspot.com/o/BDP-Banner%2Fbanner.jpg?alt=media&token=414baf34-5288-4cc0-956b-6e359f81eb84",
        // "cover": "",
        "description": "\n\t\t\t    Sân Quảng An có ưu điểm là sở hữu 2 sân với diện tích khác nhau. Một sân ngắn nhưng rộng và một sân dài hơn, phù hợp cho những bạn quen thi đấu trong không gian hẹp và những bạn thích những pha đi bóng tốc độ cùng những đường chuyền dài vượt tuyến. Khung thành của sân Quảng An cũng được đầu tư khá tốt tạo cảm giác chụp gôn cho các thủ môn.\t\t\t",
        "district_id": "001",
        "district_name": "Ba Đình",
        "firebase_id": "ue14vfwDkVjLwSPurlne",
        "hotlines": ["0123456789"],
        "id": "6TXCT5S6nk8ItnFuC0Zb",
        "lat": 0,
        "lng": 0,
        "logo": "http://vietfootball.vn/data/uploads/2017/12/AC7Y2980.jpg",
        // "logo": "",
        "map_id": "",
        "name": "Sân bóng Quảng An",
        "province_id": "01",
        "province_name": "Hà Nội",
        "stadium_type": { "id": 1, "name": "Sân 7", "quantity": 2 },
        "types": [{ "id": 1, "name": "Sân 7", "quantity": 2 }]
      };
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
            console.log(data['stadium_types']);
            data['stadium_types'].forEach(element => {
              let type = new StadiumTypePrivate();
              type.id = element.id;
              type.name = element.name;
              this.mStadiumType.push(type);
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
    console.log(this.mDatas);
    console.log(this.mStadiumType);
  }

  onClickEditLogo() {
    console.log("edit logo");

  }

  onClickEditCover() {
    console.log("edit cover");

  }

  onClickAddress() {
    let location = new Location();
    location.onResponseData(this.mStadium.address, new LatLng(this.mStadium.lat, this.mStadium.lng))

    this.navCtrl.push("BdpInputAddressPage", { location: location, callback: this.getData }, { animate: false });
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
  }
}
