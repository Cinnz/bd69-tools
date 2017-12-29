import { FirebaseObject } from "../../firebase/classes/firebase-object";

export enum LeagueState {
    /**Sắp diễn ra */
    WAITING = 0,
    /**Đang khởi tranh */
    BEGAN,
    /**Đã kết thúc */
    ENDED
}

export class League extends FirebaseObject {
    /**id của giải*/
    id: string
    /**Tên giải */
    name: string;
    /**Thời gian bắt đầu */
    time_start: number;
    /**Ngày kết thúc */
    time_end: number;
    /**Ảnh backdrop của giải, tương đương với cover trong profile */
    cover: string;
    /**Logo của giải */
    logo: string;
    /**Slogan của giải */
    slogan: string;
    /**Mô tả của giải */
    description: string;
    /**Trạng thái của giải */
    state: number;
    /**Danh sách sân bóng tổ chức giải */
    stadium_ids: Array<string>;
    /**Các nhà tài trợ */
    donor_ids: Array<string>;
}