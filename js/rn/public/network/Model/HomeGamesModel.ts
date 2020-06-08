export interface List {
    id: string;
    icon: string;
    name: string;
    url: string;
    category: string;
    levelType: string;
    sort: string;
    seriesId: string;
    subId: any;
    tipFlag: string;
    openWay: string;
    hotIcon: string;
    gameCode: string;
    subtitle: string;
    gameId: any;
    realName: string;
    supportTrial: number;
    title: string;
    logo: string;
    isPopup: number;
    isInstant: string;
    isSeal: string;
    isClose: string;
    gameType: string;
}

export interface Icon {
    id: string;
    name: string;
    style: string;
    logo: string;
    list: List[];
}

export interface Nav {
    id: string;
    icon: string;
    name: string;
    url: string;
    category: string;
    levelType: string;
    sort: string;
    seriesId: string;
    subId: number;
    tipFlag: string;
    openWay: string;
    hotIcon: string;
    gameCode: string;
    subtitle: string;
    title: string;
    gameId: number;
}

export interface Data {
    icons: Icon[];
    navs: Nav[];
}

export interface HomeGamesModel {
    code: number;
    msg: string;
    data: Data;
}
