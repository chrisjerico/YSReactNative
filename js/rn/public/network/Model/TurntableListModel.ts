export interface TurntableListModel {
    code: number;
    msg: string;
    data?: any;
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