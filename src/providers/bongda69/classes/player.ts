import { User } from "../../base/classes/user";

export enum PlayerState {


}
export enum PlayerStateInClub {
    /**Đang chơi */
    PLAYING = 0,
    /**Đang đợi tham gia CLB */
    WAITING,
    /**Đã rời clb */
    LEAVE,
    /**Bị ban, hoặc buộc phải rời câu lạc bộ */
    BLOCKED
}

export class Player extends User {

    /**Ngày sinh, tính theo milliseconds */
    birthday: number;
    /**Số áo thi đấu */
    shirt: number;
    /**Biệt danh */
    nickname: string;
    /**id của vị trí thi đấu.*/
    play_position: string;
    /**Chiều cao */
    height: number;
    /**Cân nặng */
    weight: number;

    /**Số điện thoại thường dùng */
    phone: string;
    /**Địa chỉ hiện tại */
    address: string;
    /**Nơi sinh */
    birthplace: string;
    /**ảnh bìa của cầu thủ */
    cover: string;
    /**Slogan của cầu thủ */
    slogan: string;
    /**Mô tả ngắn gọn về cầu thủ*/
    description: string;
    /**Trạng thái của cầu thủ */
    state: number;
    /**Trạng thái cầu thủ ở câu lạc bộ, xem thêm PlayerStateInClub */
    state_in_club: number;

}