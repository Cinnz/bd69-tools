import { FirebaseEnum } from "../../firebase/classes/firebase-enum";


import { FirebaseObject } from "../../firebase/classes/firebase-object";

export class StadiumType {
    id: number;
    name: string;
    quantity: number;
}
export class Stadium extends FirebaseObject {
    /**id của Sân */
    id: string;
    /**Tên của sân */
    name: string;
    /**Logo của sân */
    logo: string;
    /**Ảnh bìa của sân */
    cover: string;
    /**Mô tả sân */
    description: string;
    /**Địa chỉ sân */
    address: string;
    /**Mã code của tỉnh thành */
    province_id: string;
    /**Tên tỉnh thành */
    province_name: string;
    /**Mã code Quận huyện */
    district_id: string;
    /**Tên của quận huyện */
    district_name: string;
    /**Tọa độ lat của sân */
    lat: number;
    /**Tọa độ lng của sân */
    lng: number;
    /**id của bản đồ sân */
    map_id: string;
    /**Đường dây nóng */
    hotlines: Array<string>;
    /**Loại sân */
    types: Array<StadiumType>;
    /**Loại sân chính */
    stadium_type : StadiumType;
}