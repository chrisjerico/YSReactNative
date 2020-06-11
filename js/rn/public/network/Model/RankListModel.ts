export interface RankListModel {
    code: number;
    msg: string;
    data: Data;
}

export interface Data {
    list: List[];
    switch: boolean;
}

export interface List {
    username: string,
    coin: string,
    type: string,
    actionTime: string
}