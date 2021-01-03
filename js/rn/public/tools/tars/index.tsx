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

type ImageType = 'png' | 'jpg' | 'gif' | 'svg'

export enum UGImageHost {
  test5 = 'http://test05.6yc.com',
  test10 = 'http://test10.6yc.com',
  t132f = 'http://t132f.fhptcdn.com',

  // git仓库的图片
  git = 'https://appstatic.guolaow.com',
}

export const useHtml5Image = (host?: UGImageHost) => {

  function getImage(host: string, pType: string, p1: string, p2?: string, suffix: ImageType = 'png') {
    // 不传host默认使用当前站点的接口域名
    !host?.length && (host = AppDefine.host)

    // 替换 pType 中的 {p1}、{p2}
    let path: string
    if (p2?.length) {
      path = pType.replace(/\{p1\}/, p1)
      path = path.replace(/\{p2\}/, p2)
    } else {
      path = pType.replace(/\{p1\}.*/, p1)
    }
    return host + '/' + path + '.' + suffix
  }

  // 替换掉第一个入参中的 {p1}、{p2} 会得到完整路径
  return {
    getHtml5Image: (id: number, path: string, type: ImageType = 'png') =>
      getImage(host, 'views/mobileTemplate/{p1}/images/{p2}', id?.toString(), path, type),

    img_mobileTemplate: (id: number, path: string, type: ImageType = 'png') =>
      getImage(host, 'views/mobileTemplate/{p1}/images/{p2}', id?.toString(), path, type),

    img_home: (path: string, type: ImageType = 'png') =>
      getImage(host, 'views/home/images/{p1}', path, undefined, type),

    img_platform: (siteId: string, path?: string, type: ImageType = 'png') =>
      getImage(host, 'platform/{p1}/images/{p2}', siteId, path, type),

    img_images: (path: string, type: ImageType = 'png') =>
      getImage(host, 'images/{p1}', path, undefined, type),

    img_assets: (path: string, type: ImageType = 'png') =>
      getImage(UGImageHost.git, 'assets/{p1}', path, undefined, type),
  }
}

export const getActivityPosition = (position: number) => {
  if (position == 1) {
    return { left: 0, top: scale(115) }
  } else if (position == 2) {
    return { left: 0, top: scale(725) }
  } else if (position == 3) {
    return { right: 0, top: scale(115) }
  } else if (position == 4) {
    return { right: 0, top: scale(725) }
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
