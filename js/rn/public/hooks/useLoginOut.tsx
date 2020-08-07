import { Alert, Platform } from 'react-native'
import { UGStore } from '../../redux/store/UGStore'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { PageName } from '../navigation/Navigation'
import { navigate } from '../navigation/RootNavigation'
import APIRouter from '../network/APIRouter'
import { Toast } from '../tools/ToastUtils'

const useLoginOut = (pageName: PageName) => {
  const requestLoginOut = async () => {
    try {
      await APIRouter.user_logout()
      if (Platform.OS == 'ios') {
        await OCHelper.call('UGUserModel.setCurrentUser:', [])
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout'])
        await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0])
        UGStore.dispatch({ type: 'reset', userInfo: {} })
        UGStore.save()
        console.log("---------------登出成功---------------")
        navigate(pageName, {})
      } else {
        // TODO 安卓
      }
    } catch (error) {
      console.log(error)
      Toast('退出失败，请稍后再试')
    }
  }
  const loginOut = () => {
    Alert.alert('温馨提示', '确定退出账号', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        onPress: requestLoginOut,
      },
    ])
  }
  return { loginOut }
}
export default useLoginOut
