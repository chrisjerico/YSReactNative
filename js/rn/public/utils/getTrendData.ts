import {getTrendData_cqssc_qxc_pcdd} from "./getTrendData_cqssc_qxc_pcdd";
import {getTrendData_pk10_pk10nn_xyft} from "./getTrendData_pk10_pk10nn_xyft";
import {getTrendData_jsk3} from "./getTrendData_jsk3";
import {getTrendData_gd11x5} from "./getTrendData_gd11x5";
import {getTrendData_gdkl10_xync} from "./getTrendData_gdkl10_xync";
import {TrendData} from "../interface/trendData";

export function getTrendData(from_name: string, data: any[]): TrendData {
    switch (from_name) {
        case"pcdd":
        case"cqssc":
        case"qxc":
            return getTrendData_cqssc_qxc_pcdd(data)
        case "xyft":
        case "pk10":
        case "pk10nn":
            return getTrendData_pk10_pk10nn_xyft(data)
        case "jsk3":
            return getTrendData_jsk3(data)
        case "gd11x5":
            return getTrendData_gd11x5(data)
        case "gdkl10":
        case "xync":
            return getTrendData_gdkl10_xync(data)
    }

}
