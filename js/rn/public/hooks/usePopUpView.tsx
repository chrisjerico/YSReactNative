import { useState, useEffect } from "react";
import AppDefine from "../define/AppDefine";
import { List } from "../network/Model/CouponListModel";
import { OCHelper } from "../define/OCHelper/OCHelper";
import { NSValue } from "../define/OCHelper/OCBridge/OCCall";

const usePopUpView = () => {
    const [style1, setStyle1] = useState("")
    const [cardMargin, setCardMargin] = useState(0)
    const [marginHorizontal, setMarginHorizontal] = useState(0)
    const [marginVertical, setMarginVertical] = useState(0)
    useEffect(() => {
        setCardMargin(style1 == '行边框' ? 11 : 0)
        setMarginHorizontal(style1 === '贴边' ? 0 : 10)
        setMarginVertical(style1 === '贴边' ? 0 : 5)
    }, [style1])
    useEffect(() => {
        if ('c190'.indexOf(AppDefine.siteId) != -1) {
            setStyle1('贴边')
        } else if ('c199,c200,c213,c018'.indexOf(AppDefine.siteId) != -1) {
            setStyle1('行边框')
        } else if ('c012'.indexOf(AppDefine.siteId) != -1) {
            setStyle1('外边框')
        }
    }, [AppDefine.siteId])
    const onPopViewPress = (data: List, type: 'page' | 'popup' | 'slide', onPress?: () => void) => {
        if (!data?.clsName) {
            data.clsName = 'UGPromoteModel';
        }
        switch (type) {
            case 'page':
                OCHelper.call(({ vc }) => ({
                    vc: {
                        selectors: 'UGPromoteDetailController.new[setItem:]',
                        args1: [data],
                    },
                    ret: {
                        selectors: 'UGNavigationController.current.pushViewController:animated:',
                        args1: [vc, true],
                    },
                }));

                break;
            case 'popup':
                OCHelper.call('PromotePopView.alloc.initWithFrame:[setItem:].show', [NSValue.CGRectMake(20, AppDefine.height * 0.1, AppDefine.width - 40, AppDefine.height * 0.8)], [data]);
                break
            case 'slide':
                if (onPress) {
                    onPress()
                }
                break
            default:
                break;
        }

    }
    return { onPopViewPress, cardMargin, marginHorizontal, marginVertical }
}
export default usePopUpView