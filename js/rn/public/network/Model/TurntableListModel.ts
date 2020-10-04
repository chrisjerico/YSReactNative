export interface TurntableListModel {
    code: number;
    msg: string;
    data?: Data[];
    info: Info;
}

export interface Info {
    sqlList: string[];
    debug: Debug;
    traceBack: TraceBack;
    runtime: string;
}

export interface TraceBack {
    loader: string;
    initDi: string;
    settings?: any;
    access?: any;
    dispatch?: any;
}

export interface Debug {
    file: string;
    line: number;
    code: number;
}


export interface Param {
    buy: string;
    buy_amount: number;
    check_in_user_levels: string;
    membergame: string;
    prize_time: number;
    content_turntable: string[];
    prizeArr: Prize[];
}

export interface Data {
    end: string;
    id: string;
    param: Param;
    start: string;
    type: string;
}


export interface Prize {
    prizeAmount: string;
    prizeIcon: string;
    prizeIconName: string;
    prizeId: number;
    prizeName: string;
    prizeType: string;
}