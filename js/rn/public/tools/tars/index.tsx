import { Platform } from 'react-native'
import { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel'
import AppDefine from '../../define/AppDefine'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import PushHelper from '../../define/PushHelper'
import { PasswordStrength } from '../../models/Enum'
import { scale } from '../Scale'
import { Toast } from '../ToastUtils'

export const validPassword = (password: string, pass_limit: PasswordStrength) => {
  if (password) {
    if (pass_limit == PasswordStrength.不限制) {
      return true
    } else {
      if (pass_limit == PasswordStrength.数字字母) {
        return /^(?=.*\d)(?=.*[a-zA-Z])/.test(password)
      } else if ([pass_limit == PasswordStrength.数字字母字符]) {
        return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/.test(password)
      } else {
        return false
      }
    }
  } else {
    return false
  }
}

export const ToastSuccess = (msg: any) => {
  const msgString = JSON.stringify(msg).slice(1, -1)
  switch (Platform.OS) {
    case 'ios':
      OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [msgString])
      break
    case 'android':
      Toast(msgString)
      break
  }
}

export const ToastError = (msg: any) => {
  const msgString = JSON.stringify(msg).slice(1, -1)
  switch (Platform.OS) {
    case 'ios':
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [msgString])
      break
    case 'android':
      Toast(msgString)
      break
  }
}

export const ToastStatus = (msg: any) => {
  const msgString = JSON.stringify(msg).slice(1, -1)
  switch (Platform.OS) {
    case 'ios':
      OCHelper.call('SVProgressHUD.showWithStatus:', [msgString])
      break
    case 'android':
      Toast(msgString)
      break
  }
}

export const useHtml5Image = (host: string = AppDefine.host) => {
  const getHtml5Image = (id: number, path: string, type: 'png' | 'jpg' | 'gif' | 'svg' = 'png') => {
    if (id) {
      return host + '/views/mobileTemplate/' + id?.toString() + '/images/' + path + '.' + type
    } else {
      return host + '/images/' + path + '.' + type
    }
  }
  const getHtml5ImagePlatform = (siteId: string, path: string, type: 'png' | 'jpg' | 'gif' | 'svg' = 'png') => {
    if (siteId) {
      return host + '/platform/' + siteId?.toString() + '/images/' + path + '.' + type
    } else {
      return host + '/images/' + path + '.' + type
    }
  }
  return { getHtml5Image, getHtml5ImagePlatform }
}

export const getIbbImage = (path: string) => {
  return 'https://i.ibb.co/' + path + '.png'
}

export const getActivityPosition = (position: number) => {
  if (position == 1) {
    return { left: 0, top: scale(100) }
  } else if (position == 2) {
    return { left: 0, bottom: scale(200) }
  } else if (position == 3) {
    return { right: 0, top: scale(100) }
  } else if (position == 4) {
    return { right: 0, bottom: scale(200) }
  } else {
    return {}
  }
}

export const stringToNumber = (x: string) => {
  const parsed = parseInt(x)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

export const stringToFloat = (x: string) => {
  const parsed = parseFloat(x)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

type UGUserCenterTypeKeys = keyof typeof UGUserCenterType

function* toEntries(keyMapper: (key: string) => any, valueMapper: (key: string) => any, data: any[]) {
  for (const item of data) {
    yield [keyMapper(item), valueMapper(item)]
  }
}

export const goToUserCenterType: {
  [key in UGUserCenterTypeKeys]?: () => any
} = Object.fromEntries(
  toEntries(
    (key: string) => key,
    (key: string) => () => PushHelper.pushUserCenterType(UGUserCenterType[key]),
    Object.keys(UGUserCenterType)
  )
)
