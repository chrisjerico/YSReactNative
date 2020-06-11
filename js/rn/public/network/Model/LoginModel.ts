export interface LoginModel {
    code: number;
    msg: string;
    data: Data;
}

export interface Data {
    'API-SID': string;
    'API-TOKEN': string;
}