export interface NoticeModel {
    code: number;
    msg: string;
    data: Data;
}

export interface Data {
    scroll: Scroll[];
    popup: Scroll[];
    popupSwitch: '0' | '1' | '2'; // 0不弹窗，1、2都弹窗
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