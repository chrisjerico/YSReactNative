"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tars_1 = require("../../public/tools/tars");
var getHtml5Image = tars_1.useHtml5Image('http://test10.6yc.com/').getHtml5Image;
var config = {
    defaultUserCenterLogos: {
        1: getHtml5Image(5, 'ck'),
        2: getHtml5Image(22, 'withdrawlogo'),
        3: getHtml5Image(5, 'menu-bankaccount'),
        4: getHtml5Image(5, 'syb1'),
        5: getHtml5Image(5, 'menu-myreco'),
        6: getHtml5Image(5, 'ugBetList'),
        7: getHtml5Image(5, 'menu-record'),
        8: getHtml5Image(5, 'menu-transfer'),
        9: getHtml5Image(5, 'menu-message'),
        10: getHtml5Image(5, 'menu-modifypwd'),
        11: getHtml5Image(5, 'menu-task'),
        12: null,
        13: getHtml5Image(5, 'menu-feedback'),
        14: getHtml5Image(5, 'menu-service'),
        15: getHtml5Image(5, 'winApply'),
        16: tars_1.getIbbImage('Twnz2tK/changlong'),
        17: getHtml5Image(5, 'guessingIco'),
        18: getHtml5Image(5, 'kj_trend'),
        19: tars_1.getIbbImage('pw7LqkR/qq'),
        20: tars_1.getIbbImage('qRBq508/kjw'),
    },
};
exports.default = config;
