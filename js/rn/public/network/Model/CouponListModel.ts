export interface CouponListModel {
    code: number;
    msg: string;
    data: Data;
}

export interface Data {
    list: List[];
    style: string;
    showCategory: boolean;
    categories: Categories;
}

export interface Categories {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
    '6': string;
    '7': string;
    '8': string;
    '9': string;
}

export interface List {
    id: string;
    category: string;
    title: string;
    content: string;
    pic: string;
    linkCategory: number;
    linkPosition: number;
    linkUrl: string;
    clsName?: string
}