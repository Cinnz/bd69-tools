export class ClubInTable {
    /**id của câu lạc bộ */
    club_id: string;
    /**Tên của câu lạc bộ */
    club_name: string;
    /**Logo của câu lạc bộ */
    club_logo: string;
    /**Số trận đã đấu */
    played: number;
    /**Số trận thắng */
    won: number;
    /**Số trận thua */
    lost: number;
    /**Số trận hòa */
    drawn: number;
    /**Số bàn thắng ghi được */
    goals_for: number;
    /**Số lần bị thủng lưới */
    goals_against: number;
    /**Hiệu số bàn thắng*/
    goals_different: number;
    /**Số điểm */
    points: number;
    /**Vị trí */
    position: number;
    /**Bảng/ nhóm */
    group: string;
}

export class Table {
    /**ID của table */
    id: string;
    /**ID của giải đấu */
    league_id: string;
    /**Tên giải đấu */
    league_name: string;
    /**Danh sách câu lạc bộ*/
    clubs: Array<ClubInTable>;
}