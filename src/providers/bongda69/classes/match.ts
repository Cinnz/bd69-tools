import { FirebaseObject } from "../../firebase/classes/firebase-object";

export class Match extends FirebaseObject {
    /**ID của trận đấu */
    match_id: string;
    /**Tên của trận đấu. Ví dụ trận đấu giao lưu fan, ...*/
    name: string;
    /**Mô tả của trận đấu */
    description: string;

    /**Thời gian diễn ra trận đấu, tính theo milliseconds */
    time: number;
    /**Số phút của trận đấu */
    address: string;
    /**id của sân vận động */
    stadium_id: string;
    /**Thời gian của trận đấu */
    duration: number;
    /**id của đội nhà */
    home_id: string;
    /**Logo của đội nhà */
    home_logo: string;
    /**Tên đội chủ nhà */
    home_name: string;
    /**Số bàn thắng đội chủ nhà */
    home_goal: number;

    /**id đội khách */
    away_id: string;
    /**logo đội khách */
    away_logo: string;
    /** tên đội khách */
    away_name: string;
    /**Số bàn thắng đội khách */
    away_goal: number;
    /**Trạng thái của trận đấu */
    state: number;
}

