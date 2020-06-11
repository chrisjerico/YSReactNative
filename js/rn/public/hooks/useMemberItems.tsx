import { useEffect, useState } from "react"
import { OCHelper } from "../define/OCHelper/OCHelper";
import { UGUserCenterItem } from "../../redux/model/全局/UGSysConfModel";

const useMemberItems = () => {
    const [items, setItems] = useState<UGUserCenterItem[]>([])
    const init = async () => {
        const dataArray = await OCHelper.call('UGSystemConfigModel.currentConfig.userCenter')
        setItems(dataArray.map(item => new UGUserCenterItem(item)))
    }
    useEffect(() => {
        init()
    }, [])
    return { UGUserCenterItem: items }
}
export default useMemberItems