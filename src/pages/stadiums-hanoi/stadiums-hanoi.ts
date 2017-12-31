import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
import { Stadium } from '../../providers/bongda69/classes/stadium';

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

class privateDistrict {
  name: string;
  code: string;
  noStadium: number;
  constructor() {
    this.name = "";
    this.code = "";
    this.noStadium = 0;
  }
}

@IonicPage()
@Component({
  selector: 'page-stadiums-hanoi',
  templateUrl: 'stadiums-hanoi.html',
})
export class StadiumsHanoiPage {

  mProvince: Province;
  mDistricts: Observable<District[]>;

  district: Array<privateDistrict> = [];
  totalStadium = 0;
  constructor(public navCtrl: NavController,
    public mHttpClient: HttpClient,
    public mAngularFirestore: AngularFirestore,
    public navParams: NavParams) {
    this.mProvince = {
      name: "",
      slug: "",
      type: "",
      name_with_type: "",
      code: "01"
    }
  }

  ionViewDidEnter() {
    this._ConnectToFirebase();
  }

  _ConnectToFirebase() {
    this.totalStadium = 0;
    this.district = [];

    let districtCollectionRef: AngularFirestoreCollection<District> = this.mAngularFirestore.collection("districts", ref => {
      return ref.where('province_code', '==', this.mProvince.code);
    });

    this.mDistricts = districtCollectionRef.valueChanges();
    this.mDistricts.subscribe(data => {
      data.forEach(district => {
        let dst = new privateDistrict();
        dst.code = district.code;
        dst.name = district.name;
        this.district.push(dst);

        let stadiumsCollectionRef: AngularFirestoreCollection<Stadium> = this.mAngularFirestore.collection("stadiums", ref=>{
          return ref.where('district_id','==',dst.code)
        });

        let stadiums = stadiumsCollectionRef.valueChanges();

        stadiums.subscribe(data => {
          dst.noStadium = data.length;
          this.totalStadium += data.length;
        })
      })
    })
  }

  onClickDistrict(item) {
    this.navCtrl.push("StadiumsPage", { data: item.code, name: item.name });
  }
}
