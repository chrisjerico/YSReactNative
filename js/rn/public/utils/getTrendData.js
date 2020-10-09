"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrendData = void 0;
var getTrendData_cqssc_qxc_pcdd_1 = require("./getTrendData_cqssc_qxc_pcdd");
var getTrendData_pk10_pk10nn_xyft_1 = require("./getTrendData_pk10_pk10nn_xyft");
var getTrendData_jsk3_1 = require("./getTrendData_jsk3");
var getTrendData_gd11x5_1 = require("./getTrendData_gd11x5");
var getTrendData_gdkl10_xync_1 = require("./getTrendData_gdkl10_xync");
function getTrendData(defaultNumber, from_name, data) {
    switch (from_name) {
        case "pcdd":
        case "cqssc":
        case "qxc":
            return getTrendData_cqssc_qxc_pcdd_1.getTrendData_cqssc_qxc_pcdd(from_name, data, defaultNumber);
        case "xyft":
        case "pk10":
        case "pk10nn":
            return getTrendData_pk10_pk10nn_xyft_1.getTrendData_pk10_pk10nn_xyft(data, defaultNumber);
        case "jsk3":
            return getTrendData_jsk3_1.getTrendData_jsk3(data, defaultNumber);
        case "gd11x5":
            return getTrendData_gd11x5_1.getTrendData_gd11x5(data, defaultNumber);
        case "gdkl10":
        case "xync":
            return getTrendData_gdkl10_xync_1.getTrendData_gdkl10_xync(data, defaultNumber);
    }
}
exports.getTrendData = getTrendData;
