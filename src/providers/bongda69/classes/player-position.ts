import { FirebaseObject } from "../../firebase/classes/firebase-object";

export class PlayerPosition extends FirebaseObject {
    /**ID của vị trí */
    id: string;
    /**Tên viết tắt tiếng anh của vị trí */
    abbr: string;
    /**Tên tiếng việt */
    name: string;
    /**Tên tiếng anh */
    en_name: string;
}