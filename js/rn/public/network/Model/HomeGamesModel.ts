// export interface List {
//     id: string;
//     icon: string;
//     name: string;
//     url: string;
//     category: string;
//     levelType: string;
//     sort: string;
//     seriesId: string;
//     subId: any;
//     tipFlag: string;
//     openWay: string;
//     hotIcon: string;
//     gameCode: string;
//     subtitle: string;
//     gameId: any;
//     realName: string;
//     supportTrial: number;
//     title: string;
//     logo: string;
//     isPopup: number;
//     isInstant: string;
//     isSeal: string;
//     isClose: string;
//     gameType: string;
// }

// export interface Icon {
//     id: string;
//     name: string;
//     style: string;
//     logo: string;
//     list: List[];
// }

// export interface Nav {
//     id: string;
//     icon: string;
//     name: string;
//     url: string;
//     category: string;
//     levelType: string;
//     sort: string;
//     seriesId: string;
//     subId: number;
//     tipFlag: string;
//     openWay: string;
//     hotIcon: string;
//     gameCode: string;
//     subtitle: string;
//     title: string;
//     gameId: number;
// }

// export interface Data {
//     icons: Icon[];
//     navs: Nav[];
// }

// export interface HomeGamesModel {
//     code: number;
//     msg: string;
//     data: Data;
// }

export interface SubType {
    id: string;
    levelType: string;
    name: string;
    openWay: string;
    tipFlag: string;
    sort: string;
    seriesId: string;
    subId: string;
    parentId: string;
    isDelete: string;
    icon: string;
    url: string;
    category: string;
    hot_icon?: any;
    game_code: string;
    is_plus: string;
    site_ids: string;
    site_id: string;
    subtitle: string;
    gameId: string;
    realName: string;
    title: string;
    isInstant: string;
    isSeal: string;
    isClose: string;
    gameType: string;
    logo: string;
}

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
    subType: SubType[];
    gameId: any;
    realName: string;
    title: string;
    type: string;
    admin_uid: string;
    enable: string;
    headadd: string;
    footadd: string;
    domain: string;
    docType?: number;
    gameType: string;
    logo: string;
    isInstant: string;
    isSeal: string;
    isClose: string;
    supportTrial?: number;
    isPopup?: number;
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
    subId: any;
    tipFlag: string;
    openWay: string;
    hotIcon: string;
    gameCode: string;
    subtitle: string;
    title: string;
    gameId: any;
}

export interface Data {
    icons: Icon[];
    navs: Nav[];
}

export interface TraceBack {
    loader: string;
    initDi: string;
    settings?: any;
    fileCfg: string;
    access: string;
    dispatch?: any;
}

export interface Info {
    sqlList: string[];
    sqlTotalNum: number;
    sqlTotalTime: string;
    traceBack: TraceBack;
    runtime: string;
}

export interface HomeGamesModel {
    code: number;
    msg: string;
    data: Data;
    info: Info;
}
