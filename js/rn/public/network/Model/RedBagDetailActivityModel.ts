export interface Data {
    name: string;
    start: string;
    end: string;
    show_time: string;
    redBagLogo: string;
    isHideAmount: boolean;
    isHideCount: boolean;
    leftAmount: string;
    leftCount: string;
    id: string;
    intro: string;
    username: string;
    isTest: boolean;
    hasLogin: boolean;
    attendedTimes: number;
    attendTimesLimit: number;
    canGet: number;
}

export interface TraceBack {
    loader: string;
    initDi: string;
    settings?: any;
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

export interface RedBagDetailActivityModel {
    code: number;
    msg: string;
    data: Data;
    info: Info;
}
