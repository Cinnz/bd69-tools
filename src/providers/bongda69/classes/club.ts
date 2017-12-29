import { FirebaseObject } from "../../firebase/classes/firebase-object";

export enum ClubState {
    /**Đang hoạt động bình thường */
    NORMAL = 0,
    /**Đã ngưng hoạt động */
    CLOSED
}

export class Club extends FirebaseObject {
    /**id của clb */
    id: string;
    /**id của đội hình */
    squad_id: string;
    /**Tên của clb */
    name: string;
    /**Ảnh bìa của clb */
    cover: string;
    /**logo của câu lạc bộ */
    logo: string;
    /**Ngày thành lập */
    time_created: number;
    /**Slogan của clb */
    slogan: string;
    /**Mô tả ngắn gọn của clb */
    description: string;
    /**ID của Sân nhà */
    stadium_id: string;
    /**Trạng thái của CLB */
    state: number;
}