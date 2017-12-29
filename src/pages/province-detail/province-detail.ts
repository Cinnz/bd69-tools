import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
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
@IonicPage()
@Component({
  selector: 'page-province-detail',
  templateUrl: 'province-detail.html',
})
export class ProvinceDetailPage {
  mProvince: Province;
  mDistricts: Observable<District[]>;

  constructor(public mAngularFirestore: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.get('data')) {
      this.mProvince = this.navParams.get("data");
    } else {
      this.mProvince = {
        name: "",
        slug: "",
        type: "",
        name_with_type: "",
        code: "01"
      };
    }
  }


  ionViewDidEnter() {
    this._ConnectToFirebase();
  }
  _ConnectToFirebase() {
    let districtCollectionRef: AngularFirestoreCollection<District> = this.mAngularFirestore.collection("districts", ref => {
      return ref.where('province_code', '==', this.mProvince.code);
    });

    this.mDistricts = districtCollectionRef.valueChanges();
    console.log(this.mDistricts);
    

  }

}
