import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Image
} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import {chunkArray} from "../tools/ChunkArr";
import {Navigation} from "../navigation/Navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import {getTrendData} from "../utils/getTrendData";
import {TrendData} from "../interface/trendData";
import Svg, {Line} from "react-native-svg";
import LottoSelector from "../../pages/common/LottoSelector/LottoSelector";
import Modal from "react-native-modal";
import APIRouter from "../network/APIRouter";

export const TrendView = () => {
    const [trendData, setTrendData] = useState<TrendData>()
    const thisData = [{
        "time": "2020-07-24 15:50:00",
        "timestamp": "1595577000",
        "number": "20200724035",
        "displayNumber": "20200724035",
        "data": "7,4,1,4,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 15:30:00",
        "timestamp": "1595575800",
        "number": "20200724034",
        "displayNumber": "20200724034",
        "data": "2,7,0,6,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 15:10:00",
        "timestamp": "1595574600",
        "number": "20200724033",
        "displayNumber": "20200724033",
        "data": "8,6,7,7,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 14:50:00",
        "timestamp": "1595573400",
        "number": "20200724032",
        "displayNumber": "20200724032",
        "data": "1,1,0,4,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 14:30:00",
        "timestamp": "1595572200",
        "number": "20200724031",
        "displayNumber": "20200724031",
        "data": "2,1,8,1,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 14:10:00",
        "timestamp": "1595571000",
        "number": "20200724030",
        "displayNumber": "20200724030",
        "data": "9,9,4,5,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 13:50:00",
        "timestamp": "1595569800",
        "number": "20200724029",
        "displayNumber": "20200724029",
        "data": "6,0,7,1,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 13:30:00",
        "timestamp": "1595568600",
        "number": "20200724028",
        "displayNumber": "20200724028",
        "data": "4,7,4,9,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 13:10:00",
        "timestamp": "1595567400",
        "number": "20200724027",
        "displayNumber": "20200724027",
        "data": "7,0,7,2,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 12:50:00",
        "timestamp": "1595566200",
        "number": "20200724026",
        "displayNumber": "20200724026",
        "data": "7,4,6,9,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 12:30:00",
        "timestamp": "1595565000",
        "number": "20200724025",
        "displayNumber": "20200724025",
        "data": "1,2,8,1,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 12:10:00",
        "timestamp": "1595563800",
        "number": "20200724024",
        "displayNumber": "20200724024",
        "data": "7,3,4,2,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 11:50:00",
        "timestamp": "1595562600",
        "number": "20200724023",
        "displayNumber": "20200724023",
        "data": "2,3,1,0,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 11:30:00",
        "timestamp": "1595561400",
        "number": "20200724022",
        "displayNumber": "20200724022",
        "data": "9,1,7,2,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 11:10:00",
        "timestamp": "1595560200",
        "number": "20200724021",
        "displayNumber": "20200724021",
        "data": "7,2,1,0,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 10:50:00",
        "timestamp": "1595559000",
        "number": "20200724020",
        "displayNumber": "20200724020",
        "data": "1,2,1,0,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 10:30:00",
        "timestamp": "1595557800",
        "number": "20200724019",
        "displayNumber": "20200724019",
        "data": "2,9,3,6,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 10:10:00",
        "timestamp": "1595556600",
        "number": "20200724018",
        "displayNumber": "20200724018",
        "data": "7,1,2,4,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 09:50:00",
        "timestamp": "1595555400",
        "number": "20200724017",
        "displayNumber": "20200724017",
        "data": "4,3,4,2,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 09:30:00",
        "timestamp": "1595554200",
        "number": "20200724016",
        "displayNumber": "20200724016",
        "data": "1,8,3,9,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 09:10:00",
        "timestamp": "1595553000",
        "number": "20200724015",
        "displayNumber": "20200724015",
        "data": "1,0,3,6,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 08:50:00",
        "timestamp": "1595551800",
        "number": "20200724014",
        "displayNumber": "20200724014",
        "data": "0,5,4,1,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 08:30:00",
        "timestamp": "1595550600",
        "number": "20200724013",
        "displayNumber": "20200724013",
        "data": "3,3,1,6,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 08:10:00",
        "timestamp": "1595549400",
        "number": "20200724012",
        "displayNumber": "20200724012",
        "data": "0,2,3,1,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 07:50:00",
        "timestamp": "1595548200",
        "number": "20200724011",
        "displayNumber": "20200724011",
        "data": "3,1,2,4,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 07:30:00",
        "timestamp": "1595547000",
        "number": "20200724010",
        "displayNumber": "20200724010",
        "data": "4,5,6,5,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 03:10:00",
        "timestamp": "1595531400",
        "number": "20200724009",
        "displayNumber": "20200724009",
        "data": "5,0,0,7,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 02:50:00",
        "timestamp": "1595530200",
        "number": "20200724008",
        "displayNumber": "20200724008",
        "data": "6,5,6,3,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 02:30:00",
        "timestamp": "1595529000",
        "number": "20200724007",
        "displayNumber": "20200724007",
        "data": "7,4,3,4,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 02:10:00",
        "timestamp": "1595527800",
        "number": "20200724006",
        "displayNumber": "20200724006",
        "data": "2,5,1,2,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 01:50:00",
        "timestamp": "1595526600",
        "number": "20200724005",
        "displayNumber": "20200724005",
        "data": "3,0,1,2,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 01:30:00",
        "timestamp": "1595525400",
        "number": "20200724004",
        "displayNumber": "20200724004",
        "data": "0,0,2,1,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 01:10:00",
        "timestamp": "1595524200",
        "number": "20200724003",
        "displayNumber": "20200724003",
        "data": "4,1,2,9,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 00:50:00",
        "timestamp": "1595523000",
        "number": "20200724002",
        "displayNumber": "20200724002",
        "data": "9,9,0,1,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-24 00:30:00",
        "timestamp": "1595521800",
        "number": "20200724001",
        "displayNumber": "20200724001",
        "data": "9,0,9,9,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 23:50:00",
        "timestamp": "1595519400",
        "number": "20200723059",
        "displayNumber": "20200723059",
        "data": "0,6,0,1,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 23:30:00",
        "timestamp": "1595518200",
        "number": "20200723058",
        "displayNumber": "20200723058",
        "data": "1,7,8,4,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 23:10:00",
        "timestamp": "1595517000",
        "number": "20200723057",
        "displayNumber": "20200723057",
        "data": "1,0,3,0,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 22:50:00",
        "timestamp": "1595515800",
        "number": "20200723056",
        "displayNumber": "20200723056",
        "data": "7,7,7,3,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 22:30:00",
        "timestamp": "1595514600",
        "number": "20200723055",
        "displayNumber": "20200723055",
        "data": "3,1,4,9,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 22:10:00",
        "timestamp": "1595513400",
        "number": "20200723054",
        "displayNumber": "20200723054",
        "data": "4,0,9,7,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 21:50:00",
        "timestamp": "1595512200",
        "number": "20200723053",
        "displayNumber": "20200723053",
        "data": "8,0,4,7,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 21:30:00",
        "timestamp": "1595511000",
        "number": "20200723052",
        "displayNumber": "20200723052",
        "data": "8,8,6,8,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 21:10:00",
        "timestamp": "1595509800",
        "number": "20200723051",
        "displayNumber": "20200723051",
        "data": "4,6,5,8,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 20:50:00",
        "timestamp": "1595508600",
        "number": "20200723050",
        "displayNumber": "20200723050",
        "data": "1,9,8,3,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 20:30:00",
        "timestamp": "1595507400",
        "number": "20200723049",
        "displayNumber": "20200723049",
        "data": "7,6,1,1,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 20:10:00",
        "timestamp": "1595506200",
        "number": "20200723048",
        "displayNumber": "20200723048",
        "data": "7,7,2,7,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 19:50:00",
        "timestamp": "1595505000",
        "number": "20200723047",
        "displayNumber": "20200723047",
        "data": "5,6,8,7,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 19:30:00",
        "timestamp": "1595503800",
        "number": "20200723046",
        "displayNumber": "20200723046",
        "data": "2,0,2,3,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 19:10:00",
        "timestamp": "1595502600",
        "number": "20200723045",
        "displayNumber": "20200723045",
        "data": "4,3,8,7,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 18:50:00",
        "timestamp": "1595501400",
        "number": "20200723044",
        "displayNumber": "20200723044",
        "data": "1,5,6,1,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 18:30:00",
        "timestamp": "1595500200",
        "number": "20200723043",
        "displayNumber": "20200723043",
        "data": "4,6,5,6,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 18:10:00",
        "timestamp": "1595499000",
        "number": "20200723042",
        "displayNumber": "20200723042",
        "data": "2,7,2,7,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 17:50:00",
        "timestamp": "1595497800",
        "number": "20200723041",
        "displayNumber": "20200723041",
        "data": "3,0,2,7,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 17:30:00",
        "timestamp": "1595496600",
        "number": "20200723040",
        "displayNumber": "20200723040",
        "data": "8,7,5,2,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 17:10:00",
        "timestamp": "1595495400",
        "number": "20200723039",
        "displayNumber": "20200723039",
        "data": "6,7,6,4,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 16:50:00",
        "timestamp": "1595494200",
        "number": "20200723038",
        "displayNumber": "20200723038",
        "data": "8,4,4,7,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 16:30:00",
        "timestamp": "1595493000",
        "number": "20200723037",
        "displayNumber": "20200723037",
        "data": "3,9,6,5,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 16:10:00",
        "timestamp": "1595491800",
        "number": "20200723036",
        "displayNumber": "20200723036",
        "data": "9,0,7,3,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 15:50:00",
        "timestamp": "1595490600",
        "number": "20200723035",
        "displayNumber": "20200723035",
        "data": "3,2,4,6,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 15:30:00",
        "timestamp": "1595489400",
        "number": "20200723034",
        "displayNumber": "20200723034",
        "data": "6,6,9,1,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 15:10:00",
        "timestamp": "1595488200",
        "number": "20200723033",
        "displayNumber": "20200723033",
        "data": "1,5,8,8,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 14:50:00",
        "timestamp": "1595487000",
        "number": "20200723032",
        "displayNumber": "20200723032",
        "data": "9,0,2,8,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 14:30:00",
        "timestamp": "1595485800",
        "number": "20200723031",
        "displayNumber": "20200723031",
        "data": "1,1,6,6,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 14:10:00",
        "timestamp": "1595484600",
        "number": "20200723030",
        "displayNumber": "20200723030",
        "data": "7,7,9,8,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 13:50:00",
        "timestamp": "1595483400",
        "number": "20200723029",
        "displayNumber": "20200723029",
        "data": "0,8,8,0,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 13:30:00",
        "timestamp": "1595482200",
        "number": "20200723028",
        "displayNumber": "20200723028",
        "data": "3,2,4,4,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 13:10:00",
        "timestamp": "1595481000",
        "number": "20200723027",
        "displayNumber": "20200723027",
        "data": "7,9,3,3,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 12:50:00",
        "timestamp": "1595479800",
        "number": "20200723026",
        "displayNumber": "20200723026",
        "data": "8,0,8,2,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 12:30:00",
        "timestamp": "1595478600",
        "number": "20200723025",
        "displayNumber": "20200723025",
        "data": "2,6,9,0,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 12:10:00",
        "timestamp": "1595477400",
        "number": "20200723024",
        "displayNumber": "20200723024",
        "data": "3,0,5,9,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 11:50:00",
        "timestamp": "1595476200",
        "number": "20200723023",
        "displayNumber": "20200723023",
        "data": "3,7,1,3,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 11:30:00",
        "timestamp": "1595475000",
        "number": "20200723022",
        "displayNumber": "20200723022",
        "data": "0,1,8,8,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 11:10:00",
        "timestamp": "1595473800",
        "number": "20200723021",
        "displayNumber": "20200723021",
        "data": "2,3,5,1,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 10:50:00",
        "timestamp": "1595472600",
        "number": "20200723020",
        "displayNumber": "20200723020",
        "data": "9,8,9,3,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 10:30:00",
        "timestamp": "1595471400",
        "number": "20200723019",
        "displayNumber": "20200723019",
        "data": "0,2,1,8,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 10:10:00",
        "timestamp": "1595470200",
        "number": "20200723018",
        "displayNumber": "20200723018",
        "data": "8,4,1,4,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 09:50:00",
        "timestamp": "1595469000",
        "number": "20200723017",
        "displayNumber": "20200723017",
        "data": "0,2,5,8,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 09:30:00",
        "timestamp": "1595467800",
        "number": "20200723016",
        "displayNumber": "20200723016",
        "data": "0,3,7,2,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 09:10:00",
        "timestamp": "1595466600",
        "number": "20200723015",
        "displayNumber": "20200723015",
        "data": "1,2,7,4,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 08:50:00",
        "timestamp": "1595465400",
        "number": "20200723014",
        "displayNumber": "20200723014",
        "data": "6,7,8,7,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 08:30:00",
        "timestamp": "1595464200",
        "number": "20200723013",
        "displayNumber": "20200723013",
        "data": "0,6,8,0,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 08:10:00",
        "timestamp": "1595463000",
        "number": "20200723012",
        "displayNumber": "20200723012",
        "data": "1,4,2,0,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 07:50:00",
        "timestamp": "1595461800",
        "number": "20200723011",
        "displayNumber": "20200723011",
        "data": "1,4,7,9,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 07:30:00",
        "timestamp": "1595460600",
        "number": "20200723010",
        "displayNumber": "20200723010",
        "data": "8,3,7,1,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 03:10:00",
        "timestamp": "1595445000",
        "number": "20200723009",
        "displayNumber": "20200723009",
        "data": "0,4,5,2,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 02:50:00",
        "timestamp": "1595443800",
        "number": "20200723008",
        "displayNumber": "20200723008",
        "data": "4,6,2,4,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 02:30:00",
        "timestamp": "1595442600",
        "number": "20200723007",
        "displayNumber": "20200723007",
        "data": "0,3,4,5,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 02:10:00",
        "timestamp": "1595441400",
        "number": "20200723006",
        "displayNumber": "20200723006",
        "data": "1,3,5,1,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 01:50:00",
        "timestamp": "1595440200",
        "number": "20200723005",
        "displayNumber": "20200723005",
        "data": "9,9,5,7,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 01:30:00",
        "timestamp": "1595439000",
        "number": "20200723004",
        "displayNumber": "20200723004",
        "data": "7,8,0,9,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 01:10:00",
        "timestamp": "1595437800",
        "number": "20200723003",
        "displayNumber": "20200723003",
        "data": "5,9,6,0,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 00:50:00",
        "timestamp": "1595436600",
        "number": "20200723002",
        "displayNumber": "20200723002",
        "data": "9,9,5,5,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-23 00:30:00",
        "timestamp": "1595435400",
        "number": "20200723001",
        "displayNumber": "20200723001",
        "data": "0,2,2,5,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 23:50:00",
        "timestamp": "1595433000",
        "number": "20200722059",
        "displayNumber": "20200722059",
        "data": "8,5,8,8,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 23:30:00",
        "timestamp": "1595431800",
        "number": "20200722058",
        "displayNumber": "20200722058",
        "data": "0,9,0,8,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 23:10:00",
        "timestamp": "1595430600",
        "number": "20200722057",
        "displayNumber": "20200722057",
        "data": "5,6,3,2,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 22:50:00",
        "timestamp": "1595429400",
        "number": "20200722056",
        "displayNumber": "20200722056",
        "data": "2,1,8,9,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 22:30:00",
        "timestamp": "1595428200",
        "number": "20200722055",
        "displayNumber": "20200722055",
        "data": "0,3,6,9,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 22:10:00",
        "timestamp": "1595427000",
        "number": "20200722054",
        "displayNumber": "20200722054",
        "data": "9,6,0,1,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 21:50:00",
        "timestamp": "1595425800",
        "number": "20200722053",
        "displayNumber": "20200722053",
        "data": "4,7,2,4,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 21:30:00",
        "timestamp": "1595424600",
        "number": "20200722052",
        "displayNumber": "20200722052",
        "data": "0,2,4,2,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 21:10:00",
        "timestamp": "1595423400",
        "number": "20200722051",
        "displayNumber": "20200722051",
        "data": "7,3,0,0,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 20:50:00",
        "timestamp": "1595422200",
        "number": "20200722050",
        "displayNumber": "20200722050",
        "data": "5,1,7,9,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 20:30:00",
        "timestamp": "1595421000",
        "number": "20200722049",
        "displayNumber": "20200722049",
        "data": "0,6,4,5,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 20:10:00",
        "timestamp": "1595419800",
        "number": "20200722048",
        "displayNumber": "20200722048",
        "data": "4,9,1,9,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 19:50:00",
        "timestamp": "1595418600",
        "number": "20200722047",
        "displayNumber": "20200722047",
        "data": "6,3,2,8,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 19:30:00",
        "timestamp": "1595417400",
        "number": "20200722046",
        "displayNumber": "20200722046",
        "data": "7,2,0,1,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 19:10:00",
        "timestamp": "1595416200",
        "number": "20200722045",
        "displayNumber": "20200722045",
        "data": "2,5,4,9,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 18:50:00",
        "timestamp": "1595415000",
        "number": "20200722044",
        "displayNumber": "20200722044",
        "data": "4,3,0,3,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 18:30:00",
        "timestamp": "1595413800",
        "number": "20200722043",
        "displayNumber": "20200722043",
        "data": "0,8,7,0,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 18:10:00",
        "timestamp": "1595412600",
        "number": "20200722042",
        "displayNumber": "20200722042",
        "data": "1,2,1,4,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 17:50:00",
        "timestamp": "1595411400",
        "number": "20200722041",
        "displayNumber": "20200722041",
        "data": "4,3,4,3,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 17:30:00",
        "timestamp": "1595410200",
        "number": "20200722040",
        "displayNumber": "20200722040",
        "data": "5,4,5,5,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 17:10:00",
        "timestamp": "1595409000",
        "number": "20200722039",
        "displayNumber": "20200722039",
        "data": "2,7,1,8,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 16:50:00",
        "timestamp": "1595407800",
        "number": "20200722038",
        "displayNumber": "20200722038",
        "data": "2,1,7,4,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 16:30:00",
        "timestamp": "1595406600",
        "number": "20200722037",
        "displayNumber": "20200722037",
        "data": "8,9,5,7,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 16:10:00",
        "timestamp": "1595405400",
        "number": "20200722036",
        "displayNumber": "20200722036",
        "data": "2,0,8,4,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 15:50:00",
        "timestamp": "1595404200",
        "number": "20200722035",
        "displayNumber": "20200722035",
        "data": "0,7,9,5,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 15:30:00",
        "timestamp": "1595403000",
        "number": "20200722034",
        "displayNumber": "20200722034",
        "data": "1,0,0,8,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 15:10:00",
        "timestamp": "1595401800",
        "number": "20200722033",
        "displayNumber": "20200722033",
        "data": "0,5,1,5,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 14:50:00",
        "timestamp": "1595400600",
        "number": "20200722032",
        "displayNumber": "20200722032",
        "data": "4,6,6,5,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 14:30:00",
        "timestamp": "1595399400",
        "number": "20200722031",
        "displayNumber": "20200722031",
        "data": "2,0,2,6,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 14:10:00",
        "timestamp": "1595398200",
        "number": "20200722030",
        "displayNumber": "20200722030",
        "data": "8,0,1,3,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 13:50:00",
        "timestamp": "1595397000",
        "number": "20200722029",
        "displayNumber": "20200722029",
        "data": "9,0,1,3,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 13:30:00",
        "timestamp": "1595395800",
        "number": "20200722028",
        "displayNumber": "20200722028",
        "data": "4,4,4,9,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 13:10:00",
        "timestamp": "1595394600",
        "number": "20200722027",
        "displayNumber": "20200722027",
        "data": "2,3,5,1,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 12:50:00",
        "timestamp": "1595393400",
        "number": "20200722026",
        "displayNumber": "20200722026",
        "data": "4,9,0,5,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 12:30:00",
        "timestamp": "1595392200",
        "number": "20200722025",
        "displayNumber": "20200722025",
        "data": "6,7,5,0,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 12:10:00",
        "timestamp": "1595391000",
        "number": "20200722024",
        "displayNumber": "20200722024",
        "data": "0,4,8,2,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 11:50:00",
        "timestamp": "1595389800",
        "number": "20200722023",
        "displayNumber": "20200722023",
        "data": "0,1,7,1,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 11:30:00",
        "timestamp": "1595388600",
        "number": "20200722022",
        "displayNumber": "20200722022",
        "data": "0,1,6,8,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 11:10:00",
        "timestamp": "1595387400",
        "number": "20200722021",
        "displayNumber": "20200722021",
        "data": "4,4,9,6,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 10:50:00",
        "timestamp": "1595386200",
        "number": "20200722020",
        "displayNumber": "20200722020",
        "data": "6,2,7,9,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 10:30:00",
        "timestamp": "1595385000",
        "number": "20200722019",
        "displayNumber": "20200722019",
        "data": "2,0,8,0,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 10:10:00",
        "timestamp": "1595383800",
        "number": "20200722018",
        "displayNumber": "20200722018",
        "data": "9,5,4,6,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 09:50:00",
        "timestamp": "1595382600",
        "number": "20200722017",
        "displayNumber": "20200722017",
        "data": "0,7,2,1,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 09:30:00",
        "timestamp": "1595381400",
        "number": "20200722016",
        "displayNumber": "20200722016",
        "data": "3,8,7,1,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 09:10:00",
        "timestamp": "1595380200",
        "number": "20200722015",
        "displayNumber": "20200722015",
        "data": "0,3,4,9,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 08:50:00",
        "timestamp": "1595379000",
        "number": "20200722014",
        "displayNumber": "20200722014",
        "data": "3,1,6,6,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 08:30:00",
        "timestamp": "1595377800",
        "number": "20200722013",
        "displayNumber": "20200722013",
        "data": "2,3,2,1,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 08:10:00",
        "timestamp": "1595376600",
        "number": "20200722012",
        "displayNumber": "20200722012",
        "data": "2,1,2,6,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 07:50:00",
        "timestamp": "1595375400",
        "number": "20200722011",
        "displayNumber": "20200722011",
        "data": "9,4,1,7,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 07:30:00",
        "timestamp": "1595374200",
        "number": "20200722010",
        "displayNumber": "20200722010",
        "data": "7,1,2,3,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 03:10:00",
        "timestamp": "1595358600",
        "number": "20200722009",
        "displayNumber": "20200722009",
        "data": "2,8,9,8,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 02:50:00",
        "timestamp": "1595357400",
        "number": "20200722008",
        "displayNumber": "20200722008",
        "data": "6,4,2,2,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 02:30:00",
        "timestamp": "1595356200",
        "number": "20200722007",
        "displayNumber": "20200722007",
        "data": "6,6,9,7,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 02:10:00",
        "timestamp": "1595355000",
        "number": "20200722006",
        "displayNumber": "20200722006",
        "data": "8,5,8,1,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 01:50:00",
        "timestamp": "1595353800",
        "number": "20200722005",
        "displayNumber": "20200722005",
        "data": "1,3,2,6,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 01:30:00",
        "timestamp": "1595352600",
        "number": "20200722004",
        "displayNumber": "20200722004",
        "data": "4,1,1,0,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 01:10:00",
        "timestamp": "1595351400",
        "number": "20200722003",
        "displayNumber": "20200722003",
        "data": "2,8,0,7,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 00:50:00",
        "timestamp": "1595350200",
        "number": "20200722002",
        "displayNumber": "20200722002",
        "data": "3,2,5,0,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-22 00:30:00",
        "timestamp": "1595349000",
        "number": "20200722001",
        "displayNumber": "20200722001",
        "data": "7,7,5,6,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 23:50:00",
        "timestamp": "1595346600",
        "number": "20200721059",
        "displayNumber": "20200721059",
        "data": "0,0,9,8,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 23:30:00",
        "timestamp": "1595345400",
        "number": "20200721058",
        "displayNumber": "20200721058",
        "data": "8,1,6,5,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 23:10:00",
        "timestamp": "1595344200",
        "number": "20200721057",
        "displayNumber": "20200721057",
        "data": "9,6,2,0,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 22:50:00",
        "timestamp": "1595343000",
        "number": "20200721056",
        "displayNumber": "20200721056",
        "data": "3,1,3,8,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 22:30:00",
        "timestamp": "1595341800",
        "number": "20200721055",
        "displayNumber": "20200721055",
        "data": "9,3,0,1,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 22:10:00",
        "timestamp": "1595340600",
        "number": "20200721054",
        "displayNumber": "20200721054",
        "data": "8,9,9,2,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 21:50:00",
        "timestamp": "1595339400",
        "number": "20200721053",
        "displayNumber": "20200721053",
        "data": "8,2,7,7,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 21:30:00",
        "timestamp": "1595338200",
        "number": "20200721052",
        "displayNumber": "20200721052",
        "data": "4,4,5,6,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 21:10:00",
        "timestamp": "1595337000",
        "number": "20200721051",
        "displayNumber": "20200721051",
        "data": "9,4,0,0,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 20:50:00",
        "timestamp": "1595335800",
        "number": "20200721050",
        "displayNumber": "20200721050",
        "data": "2,8,6,6,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 20:30:00",
        "timestamp": "1595334600",
        "number": "20200721049",
        "displayNumber": "20200721049",
        "data": "3,3,4,4,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 20:10:00",
        "timestamp": "1595333400",
        "number": "20200721048",
        "displayNumber": "20200721048",
        "data": "3,5,9,9,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 19:50:00",
        "timestamp": "1595332200",
        "number": "20200721047",
        "displayNumber": "20200721047",
        "data": "1,2,4,7,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 19:30:00",
        "timestamp": "1595331000",
        "number": "20200721046",
        "displayNumber": "20200721046",
        "data": "1,0,2,2,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 19:10:00",
        "timestamp": "1595329800",
        "number": "20200721045",
        "displayNumber": "20200721045",
        "data": "6,8,7,8,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 18:50:00",
        "timestamp": "1595328600",
        "number": "20200721044",
        "displayNumber": "20200721044",
        "data": "4,7,3,1,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 18:30:00",
        "timestamp": "1595327400",
        "number": "20200721043",
        "displayNumber": "20200721043",
        "data": "8,3,3,2,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 18:10:00",
        "timestamp": "1595326200",
        "number": "20200721042",
        "displayNumber": "20200721042",
        "data": "2,6,0,1,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 17:50:00",
        "timestamp": "1595325000",
        "number": "20200721041",
        "displayNumber": "20200721041",
        "data": "7,6,0,5,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 17:30:00",
        "timestamp": "1595323800",
        "number": "20200721040",
        "displayNumber": "20200721040",
        "data": "9,7,1,4,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 17:10:00",
        "timestamp": "1595322600",
        "number": "20200721039",
        "displayNumber": "20200721039",
        "data": "3,5,7,4,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 16:50:00",
        "timestamp": "1595321400",
        "number": "20200721038",
        "displayNumber": "20200721038",
        "data": "4,6,4,3,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 16:30:00",
        "timestamp": "1595320200",
        "number": "20200721037",
        "displayNumber": "20200721037",
        "data": "9,8,2,5,6",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 16:10:00",
        "timestamp": "1595319000",
        "number": "20200721036",
        "displayNumber": "20200721036",
        "data": "8,1,0,1,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 15:50:00",
        "timestamp": "1595317800",
        "number": "20200721035",
        "displayNumber": "20200721035",
        "data": "4,0,2,3,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 15:30:00",
        "timestamp": "1595316600",
        "number": "20200721034",
        "displayNumber": "20200721034",
        "data": "5,6,4,0,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 15:10:00",
        "timestamp": "1595315400",
        "number": "20200721033",
        "displayNumber": "20200721033",
        "data": "6,1,7,6,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 14:50:00",
        "timestamp": "1595314200",
        "number": "20200721032",
        "displayNumber": "20200721032",
        "data": "5,3,3,6,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 14:30:00",
        "timestamp": "1595313000",
        "number": "20200721031",
        "displayNumber": "20200721031",
        "data": "0,2,6,1,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 14:10:00",
        "timestamp": "1595311800",
        "number": "20200721030",
        "displayNumber": "20200721030",
        "data": "6,2,6,8,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 13:50:00",
        "timestamp": "1595310600",
        "number": "20200721029",
        "displayNumber": "20200721029",
        "data": "1,8,7,6,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 13:30:00",
        "timestamp": "1595309400",
        "number": "20200721028",
        "displayNumber": "20200721028",
        "data": "9,2,6,0,1",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 13:10:00",
        "timestamp": "1595308200",
        "number": "20200721027",
        "displayNumber": "20200721027",
        "data": "4,2,2,3,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 12:50:00",
        "timestamp": "1595307000",
        "number": "20200721026",
        "displayNumber": "20200721026",
        "data": "7,0,8,8,9",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 12:30:00",
        "timestamp": "1595305800",
        "number": "20200721025",
        "displayNumber": "20200721025",
        "data": "6,0,5,8,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 12:10:00",
        "timestamp": "1595304600",
        "number": "20200721024",
        "displayNumber": "20200721024",
        "data": "3,9,4,4,5",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 11:50:00",
        "timestamp": "1595303400",
        "number": "20200721023",
        "displayNumber": "20200721023",
        "data": "8,3,4,7,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 11:30:00",
        "timestamp": "1595302200",
        "number": "20200721022",
        "displayNumber": "20200721022",
        "data": "0,7,6,3,2",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 11:10:00",
        "timestamp": "1595301000",
        "number": "20200721021",
        "displayNumber": "20200721021",
        "data": "6,8,3,7,8",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 10:50:00",
        "timestamp": "1595299800",
        "number": "20200721020",
        "displayNumber": "20200721020",
        "data": "2,8,0,2,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 10:30:00",
        "timestamp": "1595298600",
        "number": "20200721019",
        "displayNumber": "20200721019",
        "data": "2,6,3,0,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 10:10:00",
        "timestamp": "1595297400",
        "number": "20200721018",
        "displayNumber": "20200721018",
        "data": "1,5,9,9,7",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 09:50:00",
        "timestamp": "1595296200",
        "number": "20200721017",
        "displayNumber": "20200721017",
        "data": "1,9,8,2,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 09:30:00",
        "timestamp": "1595295000",
        "number": "20200721016",
        "displayNumber": "20200721016",
        "data": "0,7,6,5,4",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 09:10:00",
        "timestamp": "1595293800",
        "number": "20200721015",
        "displayNumber": "20200721015",
        "data": "5,9,2,4,3",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 08:50:00",
        "timestamp": "1595292600",
        "number": "20200721014",
        "displayNumber": "20200721014",
        "data": "9,8,5,0,0",
        "preNumColor": null,
        "preNumSx": null
    }, {
        "time": "2020-07-21 08:30:00",
        "timestamp": "1595291400",
        "number": "20200721013",
        "displayNumber": "20200721013",
        "data": "0,6,0,8,9",
        "preNumColor": null,
        "preNumSx": null
    }]
    const [headerArr, setHeaderArr] = useState([])
    const {width: screenWidth} = Dimensions.get("screen")
    const itemWidth = screenWidth / 6 - 4
    const [showModal, setShowModal] = useState(false)
    const [defaultNumber, setDefaultNumber] = useState(0)
    const [d, setd] = useState()
    const getTrendData_ = async () => {
        await APIRouter.getTrendData("pk10").then(({data, status}) => {
            data && setd(data)
            console.log("data",d)
        })
    }

    useEffect(() => {
        getTrendData_();
        setTrendData(getTrendData(defaultNumber, "cqssc", thisData))
    }, [])
    useEffect(() => {
        setTrendData(getTrendData(defaultNumber, "cqssc", thisData))
    }, [defaultNumber])

    useEffect(() => {
        trendData && setHeaderArr(chunkArray(trendData.header, 6))
    }, [trendData])

    const getHeaderIndex = (fromName: string, index) => {
        switch (fromName) {
            case "gdkl10":
            case "xync":
            case "xyft":
            case "pk10":
            case "pk10nn":
            case "jsk3":
            case "gd11x5":
                return index < 9 ? `0${index}` : index
            case"pcdd":
            case"cqssc":
            case"qxc":
                return index < 9 ? `0${index - 1}` : index - 1
        }
    }
    return (
        <SafeAreaView style={{backgroundColor: "#ffffff", flex: 1}}>
            <View style={{
                width: Dimensions.get("screen").width,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
            }}>
                <Text style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    textAlign: "center",
                    fontSize: 17,
                    width: "100%",
                    alignSelf: "center"
                }}>开奖走势</Text>
                <TouchableOpacity style={{width: 30, position: "absolute", left: 20}} onPress={() => Navigation.pop()}>
                    <Icon size={33} name={'angle-left'}/>
                </TouchableOpacity>
            </View>
            <View style={{paddingVertical: 8, backgroundColor: "#f3f3f3"}}>
                {headerArr.map((item, index) => {
                    return <View key={`btnView-${index}`} style={{
                        flexDirection: "row",
                        width: Dimensions.get("screen").width,
                        marginTop: index != 0 ? 8 : 0,
                    }}>
                        {item.map((text, contentIndex) => <View key={`${index}-${contentIndex}`}
                                                                style={{flex: 1 / item.length, alignItems: "center"}}>
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderRadius: 4,
                                borderColor: "#999999",
                                height: 32,
                                marginHorizontal: 2,
                                width: itemWidth,
                                backgroundColor: defaultNumber == contentIndex ? "#f39b67" : "rgba(255,255,255,0.2)"
                            }} onPress={() => {
                                setDefaultNumber(contentIndex)
                            }}>
                                <Text style={{
                                    color: defaultNumber == contentIndex ? "#ffffff" : "#999999",
                                    fontSize: 15,
                                    marginVertical: 6,
                                    textAlign: "center"
                                }}>{text}</Text>
                            </TouchableOpacity>
                        </View>)}
                    </View>
                })}
            </View>
            <ScrollView bounces={false}>
                <ScrollView horizontal={true} bounces={false}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{flexDirection: "row", flex: 1}}>
                                {trendData?.data[0].map((item, index) => {
                                    return index == 0 ? <Text style={{
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8,
                                            width: 120,
                                            textAlign: "center"
                                        }}>期数</Text> :
                                        <Text key={`header-${index}`} style={{
                                            textAlign: "center",
                                            width: (screenWidth - 120) / 6,
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8
                                        }}>{getHeaderIndex("cqssc", index)}</Text>
                                })}
                            </View>
                        </View>
                        {trendData?.data.map((item, index) => <View key={`row-${index}`} style={{flexDirection: "row"}}>
                            <View style={{flexDirection: "row", flex: 1}}>
                                {item.map((data, i) => {
                                        return i == 0 ? <Text
                                                key={`${index}-${i}`}
                                                style={{
                                                    backgroundColor: "#c2adac",
                                                    borderWidth: 0.5,
                                                    borderColor: "#ccc",
                                                    color: "#ffffff",
                                                    paddingVertical: 8,
                                                    width: 120,
                                                    textAlign: "center"
                                                }}>{data}</Text> :
                                            <View style={{
                                                backgroundColor: "#d4d4ed",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}>
                                                {typeof data === "string" ? <>
                                                        <View style={{
                                                            width: 28,
                                                            height: 28,
                                                            backgroundColor: "#409fdc",
                                                            borderRadius: 14,
                                                            position: "absolute"
                                                        }}/>
                                                        <Text style={{
                                                            height: 34.5,
                                                            textAlign: "center",
                                                            width: (screenWidth - 120) / 6,
                                                            borderWidth: 0.5,
                                                            borderColor: "#ccc",
                                                            color: "#ffffff",
                                                            fontSize: 14,
                                                            paddingVertical: 8,
                                                        }}>{data}</Text>
                                                    </> :
                                                    <Text style={{
                                                        height: 34.5,
                                                        textAlign: "center",
                                                        width: (screenWidth - 120) / 6,
                                                        borderWidth: 0.5,
                                                        borderColor: "#ccc",
                                                        color: "#aaa",
                                                        paddingVertical: 8,
                                                        fontSize: 14,
                                                    }}>{data}</Text>}
                                            </View>
                                    }
                                )}
                            </View>
                        </View>)}
                        <>
                            <View style={{flexDirection: "row"}}>
                                {trendData?.totalTimes.map((item, index) => {
                                    return index == 0 ?
                                        <Text style={{
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8,
                                            width: 120,
                                            textAlign: "center"
                                        }}>{item}</Text> : <Text key={`header-${index}`} style={{
                                            textAlign: "center",
                                            width: (screenWidth - 120) / 6,
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8
                                        }}>{item}</Text>
                                })}
                            </View>
                            <View style={{flexDirection: "row"}}>
                                {trendData?.averageOmission.map((item, index) => {
                                    return index == 0 ?
                                        <Text style={{
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8,
                                            width: 120,
                                            textAlign: "center"
                                        }}>{item}</Text> : <Text key={`header-${index}`} style={{
                                            textAlign: "center",
                                            width: (screenWidth - 120) / 6,
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8
                                        }}>{item}</Text>
                                })}
                            </View>
                            <View style={{flexDirection: "row"}}>
                                {trendData?.maximumOmission.map((item, index) => {
                                    return index == 0 ?
                                        <Text style={{
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8,
                                            width: 120,
                                            textAlign: "center"
                                        }}>{item}</Text> : <Text key={`header-${index}`} style={{
                                            textAlign: "center",
                                            width: (screenWidth - 120) / 6,
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8
                                        }}>{item}</Text>
                                })}
                            </View>
                            <View style={{flexDirection: "row"}}>
                                {trendData?.maximumConnection.map((item, index) => {
                                    return index == 0 ?
                                        <Text style={{
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8,
                                            width: 120,
                                            textAlign: "center"
                                        }}>{item}</Text> : <Text key={`header-${index}`} style={{
                                            textAlign: "center",
                                            width: (screenWidth - 120) / 6,
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8
                                        }}>{item}</Text>
                                })}
                            </View>
                        </>
                    </View>
                    <Svg height="100%" width="100%"
                         style={{position: "absolute"}}>
                        {trendData?.positionArr.map((item, index) => {
                            return index != 0 &&
                                <Line x1={item.x} y1={item.y} x2={trendData?.positionArr[index - 1].x}
                                      y2={trendData?.positionArr[index - 1].y}
                                      stroke="#409fdc" strokeWidth="1"/>
                        })}
                    </Svg>
                </ScrollView>
            </ScrollView>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={{backgroundColor: "#d7213a", height: 44, justifyContent: "center"}}>
                    <Text style={{textAlign: "center", color: "white", paddingHorizontal: 16}}>北京赛车(PK10)</Text>
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: "row", paddingRight: 8, alignItems: "center"}}>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={{
                        backgroundColor: "#e74d39",
                        marginVertical: 6,
                        width: 33,
                        height: 26,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image style={{width: 20, height: 20}}
                               source={{uri: "https://test10.6yc.com/images/kj_refresh.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "#e77d21",
                        marginVertical: 6,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 4
                    }}>
                        <Text style={{color: "white", paddingHorizontal: 8, paddingVertical: 6}}>选择彩种</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "#e74d39",
                        marginVertical: 6,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 4
                    }}>
                        <Text style={{color: "white", paddingHorizontal: 8, paddingVertical: 6}}>去下注</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                hideModalContentWhileAnimating={false}
                hasBackdrop={false}
                swipeDirection={null}
                style={{margin: 0, justifyContent: "center", alignItems: "center"}}
                isVisible={false}
            >
                <View style={{width: Dimensions.get("screen").width - 24, borderRadius: 8}}>
                    <View style={{
                        backgroundColor: "#f5f5f5",
                        alignItems: "center",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8
                    }}>
                        <Text style={{fontSize: 16, paddingVertical: 16}}>选择彩种</Text>
                    </View>
                    <View>

                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
