import { FirebaseObject } from "../../firebase/classes/firebase-object";
import { Player } from "./player";

export enum SquadType {
    FIVE = 0,
    SEVEN = 1,
    NINE = 2,
    ELEVEN = 3
}

export class Squad extends FirebaseObject {
    /**ID của squad này */
    id: string;
    /**ID câu lạc bộ của squad này*/
    club_id: string;
    /**Danh sách cầu thủ */
    players: Array<Player>;
    /**Loại đội hình : Sân 5, Sân 7, sân 11 */
    squad_type: number;
}