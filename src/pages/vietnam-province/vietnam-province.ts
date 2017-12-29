import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
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

interface Village {
  name: string;
  type: string;
  slug: string;
  name_with_type: string;
  path: string;
  path_with_type: string;
  code: string;
  province_code: string;
  district_code: string;
}





@IonicPage()
@Component({
  selector: 'page-vietnam-province',
  templateUrl: 'vietnam-province.html',
})
export class VietnamProvincePage {
  mVietnamJsonData;

  mProvincesCollectionRef: AngularFirestoreCollection<Province>;
  mProvinces: Observable<Province[]>;




  constructor(public mAngularFirestore: AngularFirestore, public mHttpClient: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidEnter() {
    this._LoadJsonData();
    this._ConnectToFirebase();
    // this._UpdateDataToFirebase();
  }
  onClickBack() {
    this._GoHome();
  }

  _GoHome() {
    if (this.navCtrl.getViews().length > 1) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }
  _ConnectToFirebase() {
    this.mProvincesCollectionRef = this.mAngularFirestore.collection("provinces");
    this.mProvinces = this.mProvincesCollectionRef.valueChanges();


  }

  _UpdateDataToFirebase() {
    this._LoadJsonData().then(
      data => {

        let types: Array<string> = [];
        let provinces: Array<Province> = [];
        let districts: Array<District> = [];
        let cities: Array<District> = [];
        let villages: Array<Village> = [];



        for (var key in data) {

          let provinceData = data[key];
          let province: Province = {
            name: provinceData.name,
            slug: provinceData.slug,
            type: provinceData.type,
            name_with_type: provinceData.name_with_type,
            code: provinceData.code
          }
          provinces.push(province);
          if (types.indexOf(province.type) == -1) {
            types.push(province.type);
          }

          let districtsOfProvinceData = provinceData['quan-huyen'];
          for (var districtKey in districtsOfProvinceData) {
            let districtData = districtsOfProvinceData[districtKey];
            let district: District = {
              name: districtData.name,
              type: districtData.type,
              slug: districtData.slug,
              name_with_type: districtData.name_with_type,
              path: districtData.path,
              path_with_type: districtData.path_with_type,
              code: districtData.code,
              province_code: provinceData.code
            }
            districts.push(district);

            if (types.indexOf(district.type) == -1) {
              types.push(district.type);
            }
            if (district.type == "thanh-pho") {
              cities.push(district);
            }

            let villagesOfDistrictData = districtData['xa-phuong'];
            for (var villageKey in villagesOfDistrictData) {
              let villageData = villagesOfDistrictData[villageKey];

              let village: Village = {
                name: villageData.name,
                type: villageData.type,
                slug: villageData.slug,
                name_with_type: villageData.name_with_type,
                path: villageData.path,
                path_with_type: villageData.path_with_type,
                code: villageData.code,
                province_code: provinceData.code,
                district_code: districtData.code
              };
              villages.push(village);
              if (types.indexOf(village.type) == -1) {
                types.push(village.type);
              }
            }
          }


        }

        {
          let citiesRef = this.mAngularFirestore.collection("cities");
          citiesRef.valueChanges().subscribe(data => {
            if (data.length == 0) {
              console.log("Update cities");
              cities.forEach(city => {
                citiesRef.doc(city.code).set(city);
              });
            }
          });

        }

        {
          let provincesRef = this.mAngularFirestore.collection("provinces");
          provincesRef.valueChanges().subscribe(data => {
            if (data.length == 0) {
              console.log("Update provinces");
              for (let province of provinces) {
                provincesRef.doc(province.code).set(province);
              }
            }
          });
        }

        {
          let districtsRef = this.mAngularFirestore.collection("districts");
          districtsRef.valueChanges().subscribe(data => {
            if (data.length == 0) {
              console.log("Update district");
              districts.forEach(district => {
                districtsRef.doc(district.code).set(district);
              });
            }
          });

        }

        //   {
        //     let villagesRef = this.mAngularFirestore.collection("villages");
        //     let index = 0;
        //     while (villages.length > 0) {
        //       index++;
        //       if (index > 5) {
        //         let village = villages.pop();
        //         villagesRef.doc(village.code).set(village);
        //         index = 0;
        //       }
        //     }
        //   }
      }
    );
  }

  _LoadJsonData() {
    return new Promise((resolve, reject) => {
      if (this.mVietnamJsonData) {
        resolve(this.mVietnamJsonData);
      } else {
        this.mHttpClient.get("./assets/data/vietnam.json").subscribe(
          data => {
            this.mVietnamJsonData = data;
            resolve(this.mVietnamJsonData);
          }
        );
      }
    });
  }

  onClickProvince(province: Province) {
    this.navCtrl.push("ProvinceDetailPage", { data: province });
  }

}
