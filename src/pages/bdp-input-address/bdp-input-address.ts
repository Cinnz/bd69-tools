import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

// import { NSegmentItem } from '../../components/n-segment/n-segment';

import { Utils } from '../../providers/app-utils';


declare var google;

class LatLng{  
  lat: number;
  lng: number;
  constructor(lat: number, lng: number){
    this.lat = lat;
    this.lng = lng;
  }
}

class Location {
  address: string = "";
  latlng: LatLng;

  constructor() {
      this.resetData();
  }

  onResponseData(address: string, latlng: LatLng) {
      this.resetData();

      if(address){
          this.address = address;
      }
      else{
          this.address = "";
      }

      if(latlng){
          this.latlng = latlng;
      }
      else{
          this.latlng = null;
      }
      
  }

  resetData() {
      this.address = "";
      this.latlng = null;
  }

  setAddress(address){
      this.address = address;
  }
}

@IonicPage()
@Component({
  selector: 'page-bdp-input-address',
  templateUrl: 'bdp-input-address.html',
})
export class BdpInputAddressPage {
  @ViewChild('map') mapElement: ElementRef;

  // for header segment
  title: string = 'Nhập địa chỉ';
  // segments: Array<NSegmentItem> = [{ text: "Bản đồ", selectedImg: "", unSelectedImg: "" }];
  root = "BusinoHomePage";
  bgColor = "white";
  color: string = 'black';
  btmColor = "#FAC132";
  rgtColor = "lightgrey";
  popData: any;

  // searchbar contributes
  mSearchInput: string = "";
  mPlaceholder: string = "Tìm địa điểm...";
  mShouldShowCancel: boolean = false;
  isSearching: boolean = false;

  // google place api
  geocoder = new google.maps.Geocoder;
  autocompleteService = new google.maps.places.AutocompleteService();
  places: any = [];

  // for view
  VIEW_GOOGLE = 1;
  VIEW_MAP = 0;
  currentView: number = this.VIEW_MAP;

  map: any;
  callback: any;
  location: Location = new Location();
  requestingAddress = "Đang xác định...";

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public navParams: NavParams) {
    this.callback = this.navParams.get('callback');
    if (navParams.data['location']) {
      let location: Location = navParams.data['location'];
      this.location.onResponseData(location.address, location.latlng);

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BdpInputAddressPage');

    this.initMap();
  }


  currentPosition;
  initMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      if (this.location.address) {
        this.location.address ? this.location.latlng : this.currentPosition
        this.currentPosition = new google.maps.LatLng(this.location.latlng.lat, this.location.latlng.lng);
      }
      else {
        this.currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      }

      let mapOptions = {
        center: this.currentPosition,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
    }, (err) => {
      console.log(err);
    });

  }

  marker: any;
  infoWindow;
  addMarker() {
    if (!this.location.address) {
      this.findAddress(new LatLng(this.currentPosition.lat(), this.currentPosition.lng())).then(()=>{
        this.updateInfoWindow();
      });
    }

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: true,
      position: this.location.address ? this.location.latlng : this.currentPosition
    });

    this.updateInfoWindow();

    google.maps.event.addListener(this.marker, "click", () => {
      if (this.infoWindow) {
        this.infoWindow.open(this.map, this.marker);
      }
    });

    google.maps.event.addListener(this.marker, "dragstart", () => {
      console.log("dragstart");

      if (this.infoWindow) {
        this.infoWindow.close();
      }

    });

    google.maps.event.addListener(this.marker, "dragend", () => {
      console.log("drag end");

      this.findAddress(new LatLng(this.marker.getPosition().lat(), this.marker.getPosition().lng())).then(() => {
        this.updateInfoWindow();
      });

    });


  }

  setMarkerPosition(lat, lng) {
    this.updateInfoWindow();
    var latlng = new google.maps.LatLng(lat, lng);
    this.marker.setPosition(latlng);
  }

  updateInfoWindow() {

    if (this.infoWindow) {
      this.infoWindow.close();
    }

    this.infoWindow = new google.maps.InfoWindow({
      content: this.location.address
    });
    this.infoWindow.open(this.map, this.marker);
  }

  onClickMyLocation() {
    this.getMyLocation()
  }

  getMyLocation() {
    if (this.map) {
      this.map.getMyLocation().then(data => {
        this.animateCamera(data.latLng);
      });
    }
  }

  animateCamera(location: LatLng) {
    if (this.map) {
      this.map.animateCamera({
        target: location,
        duration: 400
      });
    }
  }

  isRequestingAddr = false;
  findAddress(latlng: LatLng) {
    this.isRequestingAddr = true;
    // this.getAddressByLatLng(latlng);
    return new Promise((resolve, reject) => {
      this.location.resetData();
      this.getAddressByLatLng(latlng).then(addr => {
        if (addr) {
          this.location.onResponseData(addr['formatted_address'] + "", latlng);
          this.isRequestingAddr = false;
          console.log("findaddress", this.location);

          resolve();
        }
      });
    })
  }

  confirmPlace() {
    if (!this.isRequestingAddr && this.location.address.length > 0) {
      this.sendData(this.packData(this.location.address, this.location.latlng));
    }
  }

  onChangeView(view) {
    if (view != this.currentView) {
      this.onSearchInput();
      this.currentView = view;
      this.mSearchInput = "";

      if (view == this.VIEW_MAP) {
        // this.loadMap();
      }
      else {
        // this.removeMap();
      }
    }
    else {
      console.log(this.title);

    }
  }

  // searchbar func
  onSearchInput() {
    this.isSearching = true;
    this.scrollToTop();

    let query: string = this.mSearchInput.toLocaleLowerCase().trim();


    if (Utils.kiemTraToanDauCach(query)) {
      if (!query) {
        this.isSearching = false;
      }
      this.recoverRawData();
      return;
    }

    if (this.mSearchInput.length > 0) {
      this.searchPlace(query);
      // if (this.currentView == this.VIEW_GOOGLE) {
      //   this.searchPlace(query);
      // }
    }
    else {
      this.recoverRawData();
    }
  }

  onSearchCancel() {
    this.isSearching = false;
  }

  recoverRawData() {
    this.places = [];
  }


  searchPlace(query) {
    // this.saveDisabled = true;

    if (query.length > 0) {//} && !this.searchDisabled) {

      var hanoi = new google.maps.LatLng(21.027764, 105.834160);
      let config = {
        types: ['geocode'],
        location: hanoi,
        radius: 50000,
        // strictBounds: true,
        componentRestrictions: { country: "vn" },
        input: query
      }

      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

        if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {

          this.places = [];

          predictions.forEach((prediction) => {
            let length = prediction.terms.length;
            if (length >= 3) {
              // && prediction.terms[length - 1].value == 'Vietnam'
              // && prediction.terms[length - 2].value == 'Hanoi') {
              this.places.push(prediction);
            }
          });
          console.log(this.places);

        }

      });

    } else {
      this.places = [];
    }

  }

  selectPlace(place) {
    this.mSearchInput = "";
    this.recoverRawData();
    this.geocoder.geocode({ 'placeId': place.place_id }, (results, status) => {
      this.location.onResponseData(place.description, new LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
      this.updateInfoWindow();
      this.setMarkerPosition(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      this.map.panTo({
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      })
      // this.sendData(this.packData(place.description, this.location.district, this.location.city, new LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())));
    })
  }

  packData(place: string, latLng: LatLng) {
    return {
      place: place,
      latlng: latLng
    }
  }

  onClickSave() {
    this.sendData(this.packData(this.location.address, this.location.latlng));
  }

  sendData(data) {
    this.callback(data).then(() => { this.navCtrl.pop({ animate: false }) });
  }

  requestObject: any;
  scrollToTop() {
    return new Promise((resolve, reject) => {
      let elm = document.querySelector("#main-content .scroll-content");
      if (elm.scrollTop <= 50) {
        elm.scrollTop = 0;
        if (this.requestObject) {
          cancelAnimationFrame(this.requestObject);
        }
        resolve();
      }
      else {
        elm.scrollTop -= elm.scrollTop / 2;

        this.requestObject = requestAnimationFrame(() => {
          this.scrollToTop();
        });
      }
    })
  }


  getAddressByLatLng(latlng: LatLng) {
    return new Promise((res, rej) => {
      this.geocoder.geocode({ 'location': new google.maps.LatLng(latlng.lat, latlng.lng) }, (results, status) => {
        if (results) {
          // if (results[0]) {
          res(results[0]);
          // }
        }
      });
    });
  }

}
