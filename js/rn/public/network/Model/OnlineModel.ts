export interface Data {
    onlineSwitch: number;
    onlineUserCount: number;
}

export interface OnlineModel {
    code: number;
    msg: string;
    data: Data;
}