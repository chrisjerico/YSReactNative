"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 底部Tab按钮
var UGTabbarItem = /** @class */ (function () {
    function UGTabbarItem() {
    }
    return UGTabbarItem;
}());
exports.UGTabbarItem = UGTabbarItem;
var UGUserCenterType;
(function (UGUserCenterType) {
    UGUserCenterType[UGUserCenterType["\u5B58\u6B3E"] = 1] = "\u5B58\u6B3E";
    UGUserCenterType[UGUserCenterType["\u53D6\u6B3E"] = 2] = "\u53D6\u6B3E";
    UGUserCenterType[UGUserCenterType["\u94F6\u884C\u5361\u7BA1\u7406"] = 3] = "\u94F6\u884C\u5361\u7BA1\u7406";
    UGUserCenterType[UGUserCenterType["\u5229\u606F\u5B9D"] = 4] = "\u5229\u606F\u5B9D";
    UGUserCenterType[UGUserCenterType["\u63A8\u8350\u6536\u76CA"] = 5] = "\u63A8\u8350\u6536\u76CA";
    UGUserCenterType[UGUserCenterType["\u5F69\u7968\u6CE8\u5355\u8BB0\u5F55"] = 6] = "\u5F69\u7968\u6CE8\u5355\u8BB0\u5F55";
    UGUserCenterType[UGUserCenterType["\u5176\u4ED6\u6CE8\u5355\u8BB0\u5F55"] = 7] = "\u5176\u4ED6\u6CE8\u5355\u8BB0\u5F55";
    UGUserCenterType[UGUserCenterType["\u989D\u5EA6\u8F6C\u6362"] = 8] = "\u989D\u5EA6\u8F6C\u6362";
    UGUserCenterType[UGUserCenterType["\u7AD9\u5185\u4FE1"] = 9] = "\u7AD9\u5185\u4FE1";
    UGUserCenterType[UGUserCenterType["\u5B89\u5168\u4E2D\u5FC3"] = 10] = "\u5B89\u5168\u4E2D\u5FC3";
    UGUserCenterType[UGUserCenterType["\u4EFB\u52A1\u4E2D\u5FC3"] = 11] = "\u4EFB\u52A1\u4E2D\u5FC3";
    UGUserCenterType[UGUserCenterType["\u4E2A\u4EBA\u4FE1\u606F"] = 12] = "\u4E2A\u4EBA\u4FE1\u606F";
    UGUserCenterType[UGUserCenterType["\u5EFA\u8BAE\u53CD\u9988"] = 13] = "\u5EFA\u8BAE\u53CD\u9988";
    UGUserCenterType[UGUserCenterType["\u5728\u7EBF\u5BA2\u670D"] = 14] = "\u5728\u7EBF\u5BA2\u670D";
    UGUserCenterType[UGUserCenterType["\u6D3B\u52A8\u5F69\u91D1"] = 15] = "\u6D3B\u52A8\u5F69\u91D1";
    UGUserCenterType[UGUserCenterType["\u957F\u9F99\u52A9\u624B"] = 16] = "\u957F\u9F99\u52A9\u624B";
    UGUserCenterType[UGUserCenterType["\u5168\u6C11\u7ADE\u731C"] = 17] = "\u5168\u6C11\u7ADE\u731C";
    UGUserCenterType[UGUserCenterType["\u5F00\u5956\u8D70\u52BF"] = 18] = "\u5F00\u5956\u8D70\u52BF";
    UGUserCenterType[UGUserCenterType["QQ\u5BA2\u670D"] = 19] = "QQ\u5BA2\u670D";
    UGUserCenterType[UGUserCenterType["\u5F00\u5956\u7F51"] = 20] = "\u5F00\u5956\u7F51";
    // 自定义（从100+开始写，前面的都是后台定制的）
    UGUserCenterType[UGUserCenterType["\u5F69\u7968\u5927\u5385"] = 100] = "\u5F69\u7968\u5927\u5385";
    UGUserCenterType[UGUserCenterType["\u804A\u5929\u5BA4"] = 101] = "\u804A\u5929\u5BA4";
    UGUserCenterType[UGUserCenterType["\u6BCF\u65E5\u7B7E\u5230"] = 102] = "\u6BCF\u65E5\u7B7E\u5230";
    UGUserCenterType[UGUserCenterType["\u767B\u51FA"] = 103] = "\u767B\u51FA";
    UGUserCenterType[UGUserCenterType["\u6E38\u620F\u5927\u5385"] = 104] = "\u6E38\u620F\u5927\u5385";
    UGUserCenterType[UGUserCenterType["\u6211\u7684\u9875"] = 105] = "\u6211\u7684\u9875";
    UGUserCenterType[UGUserCenterType["\u5B58\u6B3E\u7EAA\u5F55"] = 106] = "\u5B58\u6B3E\u7EAA\u5F55";
    UGUserCenterType[UGUserCenterType["\u53D6\u6B3E\u7EAA\u5F55"] = 107] = "\u53D6\u6B3E\u7EAA\u5F55";
    UGUserCenterType[UGUserCenterType["\u8D44\u91D1\u660E\u7EC6"] = 108] = "\u8D44\u91D1\u660E\u7EC6";
    UGUserCenterType[UGUserCenterType["\u5F00\u5956\u7ED3\u679C"] = 109] = "\u5F00\u5956\u7ED3\u679C";
})(UGUserCenterType = exports.UGUserCenterType || (exports.UGUserCenterType = {}));
// 我的页功能按钮
var UGUserCenterItem = /** @class */ (function () {
    function UGUserCenterItem(props) {
        var _a;
        Object.assign(this, props);
        // 设置默认图标
        if (((_a = this.logo) === null || _a === void 0 ? void 0 : _a.indexOf('http')) == -1) {
            this.logo = UGUserCenterItem.defaultLogos[props.code];
            this.isDefaultLogo = true;
        }
    }
    // 默认图标
    UGUserCenterItem.defaultLogos = {
        1: 'https://i.ibb.co/hghhbCs/chongzhi-2x.png',
        2: 'https://i.ibb.co/4drXB18/tixian-2x.png',
        3: 'https://i.ibb.co/VVPPpRM/yinhangqia-2x.png',
        4: 'https://i.ibb.co/Hr4pGTZ/lixibao.png',
        5: 'https://i.ibb.co/PTCdZwH/shouyisel.png',
        6: 'https://i.ibb.co/vYzZYx5/zdgl-2x.png',
        7: 'https://i.ibb.co/vYzZYx5/zdgl-2x.png',
        8: 'https://i.ibb.co/DW9vdz6/change-2x.png',
        9: 'https://i.ibb.co/ZM0rtZ1/zhanneixin-2x.png',
        10: 'https://i.ibb.co/CQY7GdL/ziyuan-2x.png',
        11: 'https://i.ibb.co/Km10DqM/renwuzhongxin.png',
        12: 'https://i.ibb.co/DwjwGJ2/gerenzhongxinxuanzhong.png',
        13: 'https://i.ibb.co/sQwhYtB/yijian.png',
        14: 'https://i.ibb.co/T0VMxJV/zaixiankefu-2x.png',
        15: 'https://i.ibb.co/vYzZYx5/zdgl-2x.png',
        16: 'https://i.ibb.co/0ZjBxJY/changlong-2x.png',
        17: 'https://i.ibb.co/dJTkm3j/menu-activity.png',
        18: 'https://i.ibb.co/PWHWTB2/kj-trend.png',
        19: 'https://i.ibb.co/7t3Cb6S/usr-Center-qq.png',
    };
    return UGUserCenterItem;
}());
exports.UGUserCenterItem = UGUserCenterItem;
// 六合发帖价格范围
var LHPriceModel = /** @class */ (function () {
    function LHPriceModel() {
    }
    return LHPriceModel;
}());
exports.LHPriceModel = LHPriceModel;
// 系统配置Model
var UGSysConfModel = /** @class */ (function () {
    function UGSysConfModel() {
    }
    UGSysConfModel.current = new UGSysConfModel();
    return UGSysConfModel;
}());
exports.default = UGSysConfModel;
//# sourceMappingURL=UGSysConfModel.js.map