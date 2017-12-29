import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Stadium, StadiumType } from '../../providers/bongda69/classes/stadium';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-stadiums',
  templateUrl: 'stadiums.html',
})
export class StadiumsPage {
  districtCode: string;
  mStadiumJsonData;

  mStadiumCollectionRef: AngularFirestoreCollection<Stadium>;
  mStadiums: Observable<Stadium[]>;


  constructor(public navCtrl: NavController,
    public mAngularFirestore: AngularFirestore,
    public mHttpClient: HttpClient,
    public navParams: NavParams) {
    if (navParams.data['data']) {
      this.districtCode = navParams.data['data'];
    }
    else {
      this.districtCode = '001';
    }
  }

  ionViewDidEnter() {
    // this._LoadJsonData();
    this._ConnectToFirebase();
    // this._UpdateDataToFirebase();
  }

  onClickStadium(stadium) {
    this.navCtrl.push("StadiumDetailPage", { data: stadium });
  }

  _ConnectToFirebase() {
    let stadiumCollectionRef: AngularFirestoreCollection<Stadium> = this.mAngularFirestore.collection("stadiums", ref => {
      return ref.where('district_id', '==', this.districtCode);
    })

    // this.mStadiumCollectionRef = this.mAngularFirestore.collection("stadiums");

    this.mStadiums = stadiumCollectionRef.valueChanges();
    console.log(this.mStadiums);


  }

  _UpdateDataToFirebase() {
    this._LoadJsonData().then(
      data => {

        let types: Array<string> = [];
        let stadiums: Array<Stadium> = [];



        for (var key in data) {
          let stadiumData = data[key];
          let stadium: Stadium = {
            firebase_id: this.mAngularFirestore.createId(),
            id: this.mAngularFirestore.createId(),
            name: stadiumData.name,
            logo: stadiumData.logo,
            cover: stadiumData.cover,
            description: stadiumData.description,
            address: stadiumData.address,
            province_id: stadiumData.province_id,
            province_name: stadiumData.province_name,
            district_id: stadiumData.district_id,
            district_name: stadiumData.district_name,
            lat: stadiumData.lat,
            lng: stadiumData.lng,
            map_id: stadiumData.map_id,
            hotlines: stadiumData.hotlines,
            types: stadiumData.types,
            stadium_type: stadiumData.stadium_type,
            album: stadiumData.album ? stadiumData.album : []
          }
          stadiums.push(stadium);
        }

        {
          let stadiumsRef = this.mAngularFirestore.collection("stadiums");
          console.log(stadiumsRef);
          stadiumsRef.valueChanges().subscribe(data => {
            if (data.length == 0) {
              console.log("Update stadiums");
              stadiums.forEach(stadium => {
                stadiumsRef.doc(stadium.id).set(stadium);
              });
            }
            else {
              data.forEach(element => {
                stadiumsRef.doc(element['id']).delete();
              });
            }
          });
        }
      }
    );
  }

  _LoadJsonData() {
    return new Promise((resolve, reject) => {
      if (this.mStadiumJsonData) {
        resolve(this.mStadiumJsonData);
      } else {
        this.mHttpClient.get("./assets/data/stadium.json").subscribe(
          data => {
            this.mStadiumJsonData = data;
            resolve(this.mStadiumJsonData);
          }
        );
      }
    });
  }

  onClickAdd() {
    console.log("add", { data: this.districtCode });

  }
}
