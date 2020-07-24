import {Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import {chunkArray} from "../tools/ChunkArr";
import {Navigation} from "../navigation/Navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import {getTrendData} from "../utils/getTrendData";
import {TrendData} from "../interface/trendData";
import Svg, {Line} from "react-native-svg";

const fakeHeader = ["冠", "亞", "三", "四", "五", "六", "七", "八", "九", "十"]
const itemWidth = Dimensions.get("screen").width / 6 - 4
export const TrendView = () => {
    const [trendData, setTrendData] = useState<TrendData>()
    const thisData = [{"time":"2020-07-23 17:49:20","timestamp":"1595497760","number":"20200723028","displayNumber":"20200723028","data":"2,2,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 17:29:20","timestamp":"1595496560","number":"20200723027","displayNumber":"20200723027","data":"1,1,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 17:09:20","timestamp":"1595495360","number":"20200723026","displayNumber":"20200723026","data":"3,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 16:49:20","timestamp":"1595494160","number":"20200723025","displayNumber":"20200723025","data":"3,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 16:29:20","timestamp":"1595492960","number":"20200723024","displayNumber":"20200723024","data":"4,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 16:09:20","timestamp":"1595491760","number":"20200723023","displayNumber":"20200723023","data":"2,3,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 15:49:20","timestamp":"1595490560","number":"20200723022","displayNumber":"20200723022","data":"1,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 15:29:20","timestamp":"1595489360","number":"20200723021","displayNumber":"20200723021","data":"1,3,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 15:09:20","timestamp":"1595488160","number":"20200723020","displayNumber":"20200723020","data":"1,1,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 14:49:20","timestamp":"1595486960","number":"20200723019","displayNumber":"20200723019","data":"1,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 14:29:20","timestamp":"1595485760","number":"20200723018","displayNumber":"20200723018","data":"4,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 14:09:20","timestamp":"1595484560","number":"20200723017","displayNumber":"20200723017","data":"2,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 13:49:20","timestamp":"1595483360","number":"20200723016","displayNumber":"20200723016","data":"1,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 13:29:20","timestamp":"1595482160","number":"20200723015","displayNumber":"20200723015","data":"1,1,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 13:09:20","timestamp":"1595480960","number":"20200723014","displayNumber":"20200723014","data":"2,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 12:49:20","timestamp":"1595479760","number":"20200723013","displayNumber":"20200723013","data":"3,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 12:29:20","timestamp":"1595478560","number":"20200723012","displayNumber":"20200723012","data":"1,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 12:09:20","timestamp":"1595477360","number":"20200723011","displayNumber":"20200723011","data":"1,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 11:49:20","timestamp":"1595476160","number":"20200723010","displayNumber":"20200723010","data":"1,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 11:29:20","timestamp":"1595474960","number":"20200723009","displayNumber":"20200723009","data":"4,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 11:09:20","timestamp":"1595473760","number":"20200723008","displayNumber":"20200723008","data":"1,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 10:49:20","timestamp":"1595472560","number":"20200723007","displayNumber":"20200723007","data":"1,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 10:29:20","timestamp":"1595471360","number":"20200723006","displayNumber":"20200723006","data":"1,1,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 10:09:20","timestamp":"1595470160","number":"20200723005","displayNumber":"20200723005","data":"2,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 09:49:20","timestamp":"1595468960","number":"20200723004","displayNumber":"20200723004","data":"2,3,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 09:29:20","timestamp":"1595467760","number":"20200723003","displayNumber":"20200723003","data":"1,1,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 09:09:20","timestamp":"1595466560","number":"20200723002","displayNumber":"20200723002","data":"2,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-23 08:49:20","timestamp":"1595465360","number":"20200723001","displayNumber":"20200723001","data":"2,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 22:09:20","timestamp":"1595426960","number":"20200722041","displayNumber":"20200722041","data":"1,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 21:49:20","timestamp":"1595425760","number":"20200722040","displayNumber":"20200722040","data":"2,3,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 21:29:20","timestamp":"1595424560","number":"20200722039","displayNumber":"20200722039","data":"2,3,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 21:09:20","timestamp":"1595423360","number":"20200722038","displayNumber":"20200722038","data":"2,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 20:49:20","timestamp":"1595422160","number":"20200722037","displayNumber":"20200722037","data":"3,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 20:29:20","timestamp":"1595420960","number":"20200722036","displayNumber":"20200722036","data":"1,3,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 20:09:20","timestamp":"1595419760","number":"20200722035","displayNumber":"20200722035","data":"2,3,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 19:49:20","timestamp":"1595418560","number":"20200722034","displayNumber":"20200722034","data":"3,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 19:29:20","timestamp":"1595417360","number":"20200722033","displayNumber":"20200722033","data":"2,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 19:09:20","timestamp":"1595416160","number":"20200722032","displayNumber":"20200722032","data":"1,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 18:49:20","timestamp":"1595414960","number":"20200722031","displayNumber":"20200722031","data":"3,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 18:29:20","timestamp":"1595413760","number":"20200722030","displayNumber":"20200722030","data":"1,1,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 18:09:20","timestamp":"1595412560","number":"20200722029","displayNumber":"20200722029","data":"1,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 17:49:20","timestamp":"1595411360","number":"20200722028","displayNumber":"20200722028","data":"2,2,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 17:29:20","timestamp":"1595410160","number":"20200722027","displayNumber":"20200722027","data":"2,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 17:09:20","timestamp":"1595408960","number":"20200722026","displayNumber":"20200722026","data":"1,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 16:49:20","timestamp":"1595407760","number":"20200722025","displayNumber":"20200722025","data":"1,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 16:29:20","timestamp":"1595406560","number":"20200722024","displayNumber":"20200722024","data":"2,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 16:09:20","timestamp":"1595405360","number":"20200722023","displayNumber":"20200722023","data":"4,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 15:49:20","timestamp":"1595404160","number":"20200722022","displayNumber":"20200722022","data":"3,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 15:29:20","timestamp":"1595402960","number":"20200722021","displayNumber":"20200722021","data":"1,1,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 15:09:20","timestamp":"1595401760","number":"20200722020","displayNumber":"20200722020","data":"1,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 14:49:20","timestamp":"1595400560","number":"20200722019","displayNumber":"20200722019","data":"3,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 14:29:20","timestamp":"1595399360","number":"20200722018","displayNumber":"20200722018","data":"2,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 14:09:20","timestamp":"1595398160","number":"20200722017","displayNumber":"20200722017","data":"1,2,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 13:49:20","timestamp":"1595396960","number":"20200722016","displayNumber":"20200722016","data":"2,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 13:29:20","timestamp":"1595395760","number":"20200722015","displayNumber":"20200722015","data":"2,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 13:09:20","timestamp":"1595394560","number":"20200722014","displayNumber":"20200722014","data":"1,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 12:49:20","timestamp":"1595393360","number":"20200722013","displayNumber":"20200722013","data":"2,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 12:29:20","timestamp":"1595392160","number":"20200722012","displayNumber":"20200722012","data":"5,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 12:09:20","timestamp":"1595390960","number":"20200722011","displayNumber":"20200722011","data":"2,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 11:49:20","timestamp":"1595389760","number":"20200722010","displayNumber":"20200722010","data":"5,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 11:29:20","timestamp":"1595388560","number":"20200722009","displayNumber":"20200722009","data":"5,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 11:09:20","timestamp":"1595387360","number":"20200722008","displayNumber":"20200722008","data":"3,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 10:49:20","timestamp":"1595386160","number":"20200722007","displayNumber":"20200722007","data":"2,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 10:29:20","timestamp":"1595384960","number":"20200722006","displayNumber":"20200722006","data":"1,1,2","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 10:09:20","timestamp":"1595383760","number":"20200722005","displayNumber":"20200722005","data":"3,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 09:49:20","timestamp":"1595382560","number":"20200722004","displayNumber":"20200722004","data":"2,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 09:29:20","timestamp":"1595381360","number":"20200722003","displayNumber":"20200722003","data":"2,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 09:09:20","timestamp":"1595380160","number":"20200722002","displayNumber":"20200722002","data":"1,2,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-22 08:49:20","timestamp":"1595378960","number":"20200722001","displayNumber":"20200722001","data":"2,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 22:09:20","timestamp":"1595340560","number":"20200721041","displayNumber":"20200721041","data":"1,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 21:49:20","timestamp":"1595339360","number":"20200721040","displayNumber":"20200721040","data":"1,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 21:29:20","timestamp":"1595338160","number":"20200721039","displayNumber":"20200721039","data":"2,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 21:09:20","timestamp":"1595336960","number":"20200721038","displayNumber":"20200721038","data":"2,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 20:49:20","timestamp":"1595335760","number":"20200721037","displayNumber":"20200721037","data":"4,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 20:29:20","timestamp":"1595334560","number":"20200721036","displayNumber":"20200721036","data":"1,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 20:09:20","timestamp":"1595333360","number":"20200721035","displayNumber":"20200721035","data":"2,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 19:49:20","timestamp":"1595332160","number":"20200721034","displayNumber":"20200721034","data":"1,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 19:29:20","timestamp":"1595330960","number":"20200721033","displayNumber":"20200721033","data":"1,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 19:09:20","timestamp":"1595329760","number":"20200721032","displayNumber":"20200721032","data":"2,2,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 18:49:20","timestamp":"1595328560","number":"20200721031","displayNumber":"20200721031","data":"1,2,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 18:29:20","timestamp":"1595327360","number":"20200721030","displayNumber":"20200721030","data":"1,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 18:09:20","timestamp":"1595326160","number":"20200721029","displayNumber":"20200721029","data":"1,3,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 17:49:20","timestamp":"1595324960","number":"20200721028","displayNumber":"20200721028","data":"3,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 17:29:20","timestamp":"1595323760","number":"20200721027","displayNumber":"20200721027","data":"1,1,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 17:09:20","timestamp":"1595322560","number":"20200721026","displayNumber":"20200721026","data":"2,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 16:49:20","timestamp":"1595321360","number":"20200721025","displayNumber":"20200721025","data":"1,3,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 16:29:20","timestamp":"1595320160","number":"20200721024","displayNumber":"20200721024","data":"3,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 16:09:20","timestamp":"1595318960","number":"20200721023","displayNumber":"20200721023","data":"2,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 15:49:20","timestamp":"1595317760","number":"20200721022","displayNumber":"20200721022","data":"3,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 15:29:20","timestamp":"1595316560","number":"20200721021","displayNumber":"20200721021","data":"1,1,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 15:09:20","timestamp":"1595315360","number":"20200721020","displayNumber":"20200721020","data":"4,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 14:49:20","timestamp":"1595314160","number":"20200721019","displayNumber":"20200721019","data":"2,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 14:29:20","timestamp":"1595312960","number":"20200721018","displayNumber":"20200721018","data":"2,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 14:09:20","timestamp":"1595311760","number":"20200721017","displayNumber":"20200721017","data":"2,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 13:49:20","timestamp":"1595310560","number":"20200721016","displayNumber":"20200721016","data":"1,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 13:29:20","timestamp":"1595309360","number":"20200721015","displayNumber":"20200721015","data":"2,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 13:09:20","timestamp":"1595308160","number":"20200721014","displayNumber":"20200721014","data":"5,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 12:49:20","timestamp":"1595306960","number":"20200721013","displayNumber":"20200721013","data":"3,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 12:29:20","timestamp":"1595305760","number":"20200721012","displayNumber":"20200721012","data":"2,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 12:09:20","timestamp":"1595304560","number":"20200721011","displayNumber":"20200721011","data":"3,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 11:49:20","timestamp":"1595303360","number":"20200721010","displayNumber":"20200721010","data":"2,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 11:29:20","timestamp":"1595302160","number":"20200721009","displayNumber":"20200721009","data":"1,3,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 11:09:20","timestamp":"1595300960","number":"20200721008","displayNumber":"20200721008","data":"2,2,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 10:49:20","timestamp":"1595299760","number":"20200721007","displayNumber":"20200721007","data":"1,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 10:29:20","timestamp":"1595298560","number":"20200721006","displayNumber":"20200721006","data":"2,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 10:09:20","timestamp":"1595297360","number":"20200721005","displayNumber":"20200721005","data":"2,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 09:49:20","timestamp":"1595296160","number":"20200721004","displayNumber":"20200721004","data":"1,2,2","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 09:29:20","timestamp":"1595294960","number":"20200721003","displayNumber":"20200721003","data":"1,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 09:09:20","timestamp":"1595293760","number":"20200721002","displayNumber":"20200721002","data":"2,2,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-21 08:49:20","timestamp":"1595292560","number":"20200721001","displayNumber":"20200721001","data":"3,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 22:09:20","timestamp":"1595254160","number":"20200720041","displayNumber":"20200720041","data":"1,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 21:49:20","timestamp":"1595252960","number":"20200720040","displayNumber":"20200720040","data":"2,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 21:29:20","timestamp":"1595251760","number":"20200720039","displayNumber":"20200720039","data":"4,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 21:09:20","timestamp":"1595250560","number":"20200720038","displayNumber":"20200720038","data":"3,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 20:49:20","timestamp":"1595249360","number":"20200720037","displayNumber":"20200720037","data":"1,1,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 20:29:20","timestamp":"1595248160","number":"20200720036","displayNumber":"20200720036","data":"2,3,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 20:09:20","timestamp":"1595246960","number":"20200720035","displayNumber":"20200720035","data":"1,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 19:49:20","timestamp":"1595245760","number":"20200720034","displayNumber":"20200720034","data":"1,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 19:29:20","timestamp":"1595244560","number":"20200720033","displayNumber":"20200720033","data":"2,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 19:09:20","timestamp":"1595243360","number":"20200720032","displayNumber":"20200720032","data":"5,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 18:49:20","timestamp":"1595242160","number":"20200720031","displayNumber":"20200720031","data":"3,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 18:29:20","timestamp":"1595240960","number":"20200720030","displayNumber":"20200720030","data":"2,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 18:09:20","timestamp":"1595239760","number":"20200720029","displayNumber":"20200720029","data":"1,1,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 17:49:20","timestamp":"1595238560","number":"20200720028","displayNumber":"20200720028","data":"2,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 17:29:20","timestamp":"1595237360","number":"20200720027","displayNumber":"20200720027","data":"1,2,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 17:09:20","timestamp":"1595236160","number":"20200720026","displayNumber":"20200720026","data":"2,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 16:49:20","timestamp":"1595234960","number":"20200720025","displayNumber":"20200720025","data":"1,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 16:29:20","timestamp":"1595233760","number":"20200720024","displayNumber":"20200720024","data":"2,3,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 16:09:20","timestamp":"1595232560","number":"20200720023","displayNumber":"20200720023","data":"2,3,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 15:49:20","timestamp":"1595231360","number":"20200720022","displayNumber":"20200720022","data":"1,1,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 15:29:20","timestamp":"1595230160","number":"20200720021","displayNumber":"20200720021","data":"5,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 15:09:20","timestamp":"1595228960","number":"20200720020","displayNumber":"20200720020","data":"1,2,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 14:49:20","timestamp":"1595227760","number":"20200720019","displayNumber":"20200720019","data":"1,1,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 14:29:20","timestamp":"1595226560","number":"20200720018","displayNumber":"20200720018","data":"4,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 14:09:20","timestamp":"1595225360","number":"20200720017","displayNumber":"20200720017","data":"1,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 13:49:20","timestamp":"1595224160","number":"20200720016","displayNumber":"20200720016","data":"3,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 13:29:20","timestamp":"1595222960","number":"20200720015","displayNumber":"20200720015","data":"3,3,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 13:09:20","timestamp":"1595221760","number":"20200720014","displayNumber":"20200720014","data":"1,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 12:49:20","timestamp":"1595220560","number":"20200720013","displayNumber":"20200720013","data":"2,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 12:29:20","timestamp":"1595219360","number":"20200720012","displayNumber":"20200720012","data":"1,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 12:09:20","timestamp":"1595218160","number":"20200720011","displayNumber":"20200720011","data":"1,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 11:49:20","timestamp":"1595216960","number":"20200720010","displayNumber":"20200720010","data":"1,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 11:29:20","timestamp":"1595215760","number":"20200720009","displayNumber":"20200720009","data":"1,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 11:09:20","timestamp":"1595214560","number":"20200720008","displayNumber":"20200720008","data":"2,3,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 10:49:20","timestamp":"1595213360","number":"20200720007","displayNumber":"20200720007","data":"1,2,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 10:29:20","timestamp":"1595212160","number":"20200720006","displayNumber":"20200720006","data":"2,3,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 10:09:20","timestamp":"1595210960","number":"20200720005","displayNumber":"20200720005","data":"1,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 09:49:20","timestamp":"1595209760","number":"20200720004","displayNumber":"20200720004","data":"3,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 09:29:20","timestamp":"1595208560","number":"20200720003","displayNumber":"20200720003","data":"1,1,2","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 09:09:20","timestamp":"1595207360","number":"20200720002","displayNumber":"20200720002","data":"2,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-20 08:49:20","timestamp":"1595206160","number":"20200720001","displayNumber":"20200720001","data":"1,2,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 22:09:20","timestamp":"1595167760","number":"20200719041","displayNumber":"20200719041","data":"2,3,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 21:49:20","timestamp":"1595166560","number":"20200719040","displayNumber":"20200719040","data":"1,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 21:29:20","timestamp":"1595165360","number":"20200719039","displayNumber":"20200719039","data":"1,2,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 21:09:20","timestamp":"1595164160","number":"20200719038","displayNumber":"20200719038","data":"5,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 20:49:20","timestamp":"1595162960","number":"20200719037","displayNumber":"20200719037","data":"3,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 20:29:20","timestamp":"1595161760","number":"20200719036","displayNumber":"20200719036","data":"2,2,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 20:09:20","timestamp":"1595160560","number":"20200719035","displayNumber":"20200719035","data":"3,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 19:49:20","timestamp":"1595159360","number":"20200719034","displayNumber":"20200719034","data":"1,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 19:29:20","timestamp":"1595158160","number":"20200719033","displayNumber":"20200719033","data":"1,2,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 19:09:20","timestamp":"1595156960","number":"20200719032","displayNumber":"20200719032","data":"1,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 18:49:20","timestamp":"1595155760","number":"20200719031","displayNumber":"20200719031","data":"5,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 18:29:20","timestamp":"1595154560","number":"20200719030","displayNumber":"20200719030","data":"3,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 18:09:20","timestamp":"1595153360","number":"20200719029","displayNumber":"20200719029","data":"2,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 17:49:20","timestamp":"1595152160","number":"20200719028","displayNumber":"20200719028","data":"1,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 17:29:20","timestamp":"1595150960","number":"20200719027","displayNumber":"20200719027","data":"1,2,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 17:09:20","timestamp":"1595149760","number":"20200719026","displayNumber":"20200719026","data":"2,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 16:49:20","timestamp":"1595148560","number":"20200719025","displayNumber":"20200719025","data":"3,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 16:29:20","timestamp":"1595147360","number":"20200719024","displayNumber":"20200719024","data":"1,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 16:09:20","timestamp":"1595146160","number":"20200719023","displayNumber":"20200719023","data":"1,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 15:49:20","timestamp":"1595144960","number":"20200719022","displayNumber":"20200719022","data":"1,2,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 15:29:20","timestamp":"1595143760","number":"20200719021","displayNumber":"20200719021","data":"4,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 15:09:20","timestamp":"1595142560","number":"20200719020","displayNumber":"20200719020","data":"3,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 14:49:20","timestamp":"1595141360","number":"20200719019","displayNumber":"20200719019","data":"3,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 14:29:20","timestamp":"1595140160","number":"20200719018","displayNumber":"20200719018","data":"2,2,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 14:09:20","timestamp":"1595138960","number":"20200719017","displayNumber":"20200719017","data":"1,2,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 13:49:20","timestamp":"1595137760","number":"20200719016","displayNumber":"20200719016","data":"3,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 13:29:20","timestamp":"1595136560","number":"20200719015","displayNumber":"20200719015","data":"1,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 13:09:20","timestamp":"1595135360","number":"20200719014","displayNumber":"20200719014","data":"1,2,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 12:49:20","timestamp":"1595134160","number":"20200719013","displayNumber":"20200719013","data":"2,2,2","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 12:29:20","timestamp":"1595132960","number":"20200719012","displayNumber":"20200719012","data":"1,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 12:09:20","timestamp":"1595131760","number":"20200719011","displayNumber":"20200719011","data":"3,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 11:49:20","timestamp":"1595130560","number":"20200719010","displayNumber":"20200719010","data":"1,3,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 11:29:20","timestamp":"1595129360","number":"20200719009","displayNumber":"20200719009","data":"1,1,2","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 11:09:20","timestamp":"1595128160","number":"20200719008","displayNumber":"20200719008","data":"3,3,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 10:49:20","timestamp":"1595126960","number":"20200719007","displayNumber":"20200719007","data":"4,4,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 10:29:20","timestamp":"1595125760","number":"20200719006","displayNumber":"20200719006","data":"4,5,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 10:09:20","timestamp":"1595124560","number":"20200719005","displayNumber":"20200719005","data":"2,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 09:49:20","timestamp":"1595123360","number":"20200719004","displayNumber":"20200719004","data":"4,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 09:29:20","timestamp":"1595122160","number":"20200719003","displayNumber":"20200719003","data":"2,3,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 09:09:20","timestamp":"1595120960","number":"20200719002","displayNumber":"20200719002","data":"1,5,5","preNumColor":null,"preNumSx":null},{"time":"2020-07-19 08:49:20","timestamp":"1595119760","number":"20200719001","displayNumber":"20200719001","data":"1,6,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-18 22:09:20","timestamp":"1595081360","number":"20200718041","displayNumber":"20200718041","data":"2,3,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-18 21:49:20","timestamp":"1595080160","number":"20200718040","displayNumber":"20200718040","data":"1,3,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-18 21:29:20","timestamp":"1595078960","number":"20200718039","displayNumber":"20200718039","data":"2,3,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-18 21:09:20","timestamp":"1595077760","number":"20200718038","displayNumber":"20200718038","data":"3,4,6","preNumColor":null,"preNumSx":null},{"time":"2020-07-18 20:49:20","timestamp":"1595076560","number":"20200718037","displayNumber":"20200718037","data":"1,2,3","preNumColor":null,"preNumSx":null},{"time":"2020-07-18 20:29:20","timestamp":"1595075360","number":"20200718036","displayNumber":"20200718036","data":"1,3,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-18 20:09:20","timestamp":"1595074160","number":"20200718035","displayNumber":"20200718035","data":"3,4,4","preNumColor":null,"preNumSx":null},{"time":"2020-07-18 19:49:20","timestamp":"1595072960","number":"20200718034","displayNumber":"20200718034","data":"2,3,6","preNumColor":null,"preNumSx":null}]
    const [headerArr, setHeaderArr] = useState([])

    useEffect(() => {
        setHeaderArr(chunkArray(fakeHeader, 6))
        setTrendData(getTrendData("jsk3", thisData))
    }, [])

    const getHeaderIndex = (fromName: string, index) => {
        switch (fromName) {
            case "xync":
                return index < 9 ? `0${index}` : index
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
                            <View style={{
                                borderWidth: 1,
                                borderRadius: 4,
                                borderColor: "#999999",
                                height: 32,
                                marginHorizontal: 2,
                                width: itemWidth
                            }}>
                                <Text style={{
                                    color: "#999999",
                                    fontSize: 15,
                                    marginVertical: 6,
                                    textAlign: "center"
                                }}>{text}</Text>
                            </View>
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
                                            width: 40,
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8
                                        }}>{getHeaderIndex("xync", index)}</Text>
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
                                                            width: 40,
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
                                                        width: 40,
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
                                            width: 40,
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
                                            width: 40,
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
                                            width: 40,
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
                                            width: 40,
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
        </SafeAreaView>
    )
}
