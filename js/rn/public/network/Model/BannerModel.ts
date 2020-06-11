
export interface List {
    id: string;
    url: string;
    linkCategory: string;
    linkPosition: string;
    pic: string;
    lotteryGameType: string;
    realIsPopup: number;
    realSupportTrial: number;
}

export interface Data {
    list: List[];
    interval: string;
}

export interface BannerModel {
    code: number;
    msg: string;
    data: Data;
}


