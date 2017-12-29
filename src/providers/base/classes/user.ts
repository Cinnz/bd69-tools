import { FirebaseObject } from "../../firebase/classes/firebase-object";

export class User extends FirebaseObject {
    /**Tên đăng nhập */
    username: string;
    /**Ảnh đại diện */
    avatar: string;
    /**Họ tên */
    name: string;
    /**Trạng thái của tài khoản */
    account_state: number;
}