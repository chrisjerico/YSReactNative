
import {Platform} from "react-native";
import {PageName} from "../../navigation/Navigation";
import {ANHelper, NativeCommand} from "../../define/ANHelper/ANHelper";
import {Router} from "../../navigation/Router";

/**
 * Arc
 * 
 * UGApplication扩展协助
 *
 * */
export default class ExtUGApplication {

    /**
     * 从原生读取当前的暂存的UI
     */
    static syncCurrentPage = () => {
        let initName = null;
        //Android 需要特殊处理
        switch (Platform.OS) {
            case "android":
                let currentScene = PageName[ANHelper.callSync(NativeCommand.CURRENT_PAGE)];
                if (currentScene != null) {
                    initName = currentScene
                }
                break;
        }
        return initName;
    }

    /**
     * 该暂存的UI是不是 tab UI
     */
    static tabUI = () => {
        const pageName = ExtUGApplication.syncCurrentPage();
        const isTab = Router.PageNameLists.tabList.includes(pageName);
        if(isTab) return pageName;

        return PageName.UpdateVersionPage;
    }

    /**
     * 该暂存的UI是不是 stack UI
     */
    static stackUI = () => {
        const pageName = ExtUGApplication.syncCurrentPage();
        const isStack = Router.PageNameLists.stackList.includes(pageName);
        if(isStack) return pageName;

        return null;
    }
}
