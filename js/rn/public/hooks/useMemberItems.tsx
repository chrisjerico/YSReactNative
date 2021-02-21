import { useEffect, useState } from "react"
import { OCHelper } from "../define/OCHelper/OCHelper";
import { UGUserCenterItem } from "../../redux/model/全局/UGSysConfModel";
import {ANHelper} from "../define/ANHelper/ANHelper";
import {CMD} from "../define/ANHelper/hp/CmdDefine";
import {Platform} from "react-native";

const useMemberItems = () => {
    const [items, setItems] = useState<UGUserCenterItem[]>([])
    const init = async () => {
        switch (Platform.OS) {
          case 'ios':
              const dataArray = await OCHelper.call('UGSystemConfigModel.currentConfig.userCenter')
            setItems(dataArray.map(item => new UGUserCenterItem(item)))
            break;
          case 'android':
              ANHelper.callAsync(CMD.ASK_MINE_ITEMS)
                .then((data) => {
                    let dataArray = JSON.parse(data)
                    setItems(dataArray.map(item => new UGUserCenterItem(item)))
                })
            break;
        }
    }
    useEffect(() => {
        init()
    }, [])
    return { UGUserCenterItem: items }
}
export default useMemberItems
