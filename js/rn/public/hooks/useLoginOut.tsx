import { useCallback } from "react"
import { Alert, Platform } from "react-native"
import APIRouter from "../network/APIRouter"
import { Toast } from "../tools/ToastUtils"
import { OCHelper } from "../define/OCHelper/OCHelper"
import { IGlobalStateHelper } from "../../redux/store/IGlobalStateHelper"
import { useDispatch } from "react-redux"
import { ActionType } from "../../redux/store/ActionTypes"

const useLoginOut = () => {
    const dispatch = useDispatch()
    const clearStore = useCallback(
        () => dispatch({ type: ActionType.Clear_User }),
        [dispatch]
    )
    const requestLoginOut = async () => {
        try {
            const { data, status } = await APIRouter.user_logout()
            if (Platform.OS == 'ios') {
                await OCHelper.call('UGUserModel.setCurrentUser:', []);
                await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
                await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]);
                IGlobalStateHelper.updateUserInfo()
                clearStore()
                Toast('退出成功');

            } else {
                // TODO 安卓
            }
        } catch (error) {
            Toast('退出失败，请稍后再试');
        }

    }
    const loginOut = useCallback(() => {
        Alert.alert('温馨提示', '确定退出账号',
            [
                { text: '取消', style: 'cancel' },
                {
                    text: '确定',
                    onPress: requestLoginOut,
                },
            ])
    }, [])
    return { loginOut }
}
export default useLoginOut