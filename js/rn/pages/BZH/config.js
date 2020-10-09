"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tars_1 = require("../../public/tools/tars");
var getHtml5Image = tars_1.useHtml5Image('http://test10.6yc.com/').getHtml5Image;
var config = {
    defaultUserCenterLogos: {
        1: getHtml5Image(21, 'cqk'),
        2: getHtml5Image(21, 'tx'),
        3: getHtml5Image(23, 'center/bank'),
        4: getHtml5Image(21, 'center/syb3'),
        5: getHtml5Image(21, 'center/menu-myreco'),
        6: getHtml5Image(21, 'center/menu-rule-1'),
        7: getHtml5Image(21, 'center/menu-account'),
        8: getHtml5Image(21, 'hbdz-icon', 'gif'),
        9: getHtml5Image(21, 'center/menu-notice'),
        10: getHtml5Image(21, 'center/menu-password'),
        11: getHtml5Image(21, 'center/task'),
        12: getHtml5Image(21, 'center/userInf'),
        13: getHtml5Image(21, 'center/menu-feedback'),
        14: getHtml5Image(21, 'zxkf'),
        15: getHtml5Image(21, 'center/money'),
        16: tars_1.getIbbImage('Twnz2tK/changlong'),
        17: getHtml5Image(21, 'center/menu-activity'),
        18: getHtml5Image(21, 'center/kj_trend'),
        19: tars_1.getIbbImage('pw7LqkR/qq'),
        20: tars_1.getIbbImage('qRBq508/kjw'),
    },
};
exports.default = config;
