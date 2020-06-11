export interface Data {
    uid: string;
    usr: string;
    autoLogin: boolean;
}

export interface TraceBack {
    loader: string;
    initDi: string;
    settings: string;
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

export interface RegisterModel {
    code: number;
    msg: string;
    data: Data;
    info: Info;
}
