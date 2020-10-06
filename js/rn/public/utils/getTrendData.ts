import {getTrendData_cqssc_qxc_pcdd} from "./getTrendData_cqssc_qxc_pcdd";
import {getTrendData_pk10_pk10nn_xyft} from "./getTrendData_pk10_pk10nn_xyft";
import {getTrendData_jsk3} from "./getTrendData_jsk3";
import {getTrendData_gd11x5} from "./getTrendData_gd11x5";
import {getTrendData_gdkl10_xync} from "./getTrendData_gdkl10_xync";
import {TrendData} from "../interface/trendData";

export function getTrendData(defaultNumber: number, from_name: string, data: any[]): TrendData {
    switch (from_name) {
        case"pcdd":
        case"cqssc":
        case"qxc":
            return getTrendData_cqssc_qxc_pcdd(from_name, data, defaultNumber)
        case "xyft":
        case "pk10":
        case "pk10nn":
            return getTrendData_pk10_pk10nn_xyft(data, defaultNumber)
        case "jsk3":
            return getTrendData_jsk3(data, defaultNumber)
        case "gd11x5":
            return getTrendData_gd11x5(data, defaultNumber)
        case "gdkl10":
        case "xync":
            return getTrendData_gdkl10_xync(data, defaultNumber)
    }

}
