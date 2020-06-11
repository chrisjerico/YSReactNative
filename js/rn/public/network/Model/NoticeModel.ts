export interface NoticeModel {
    code: number;
    msg: string;
    data: Data;
}

export interface Data {
    scroll: Scroll[];
    popup: Scroll[];
    popupSwitch: string;
    popupInterval: string;
}

export interface Scroll {
    id: string;
    nodeId: string;
    type: string;
    content: string;
    title: string;
    addTime: string;
}