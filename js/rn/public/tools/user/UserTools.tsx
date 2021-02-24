import APIRouter from '../../network/APIRouter'
import { ugLog } from '../UgLog'
import { UGStore } from '../../../redux/store/UGStore'
import { hideLoading, showLoading } from '../../widget/UGLoadingCP'

/**
 * 刷新用户信息
 */
const syncUserInfo = async (showWaiting?: boolean) => {
  showWaiting && showLoading()
  const { data: userInfo } = await APIRouter.user_info()
  ugLog('userInfo = ', userInfo)
  if (userInfo?.code == 0) {//刷新一下用户数据
    UGStore.dispatch({ type: 'merge', userInfo: userInfo?.data })
    await UGStore.save()
  }
  showWaiting && hideLoading()
}

export { syncUserInfo }
