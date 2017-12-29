import { FirebaseObject } from "../../firebase/classes/firebase-object";

/**Nhà tài trợ*/
export class Donor extends FirebaseObject {
    /**Id của nhà tài trợ */
    id: string;
    /**Tên nhà tài trợ */
    name: string;
    /**Ảnh logo của nhà tài trợ */
    logo: string;
    /**Ảnh bìa của nhà tài trợ (cá nhân/ công ty) */
    cover: string;
    /**Email của nhà tài trợ */
    email: string;
    /**Địa chỉ của nhà tài trợ */
    address: string;
    /**Trang web của nhà tài trợ */
    website: string;
    /**Facebook nếu có */
    facebook: string;
    /**Đường day nóng */
    hotline: string;
}