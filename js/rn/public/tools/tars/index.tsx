import AppDefine from '../../define/AppDefine'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import { scale } from '../Scale'

export const validPassword = (password: string, pass_limit: string) => {
  if (password) {
    if (pass_limit) {
      if (pass_limit == '1') {
        return /^(?=.*\d)(?=.*[a-zA-Z])/.test(password)
      } else if ([pass_limit == '2']) {
        return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/.test(password)
      } else {
        return false
      }
    } else {
      return true
    }
  } else {
    return false
  }
}

export const ToastSuccess = (msg: any) => {
  console.log('--------ToastSuccess--------', msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [
    typeof m === 'string' ? m : '',
  ])
}

export const ToastError = (msg: any) => {
  console.log('--------ToastError--------', msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
    typeof m === 'string' ? m : '',
  ])
}

export const ToastStatus = (msg: any) => {
  console.log('--------ToastStatus--------', msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showWithStatus:', [
    typeof m === 'string' ? m : '',
  ])
}

export const useHtml5Image = (host: string = AppDefine.host) => {
  const getHtml5Image = (
    id: number,
    path: string,
    type: 'png' | 'jpg' | 'gif' = 'png',
  ) => {
    if (id) {
      return (host +
        '/views/mobileTemplate/' +
        id?.toString() +
        '/images/' +
        path +
        '.' +
        type)
    } else {
      return (host +
        '/images/' +
        path +
        '.' +
        type)
    }

  }
  return { getHtml5Image }
}

export const getIbbImage = (path: string) => {
  return 'https://i.ibb.co/' + path + '.png'
}


export const getActivityPosition = (position: number) => {
  if (position == 1) {
    return { left: 0, top: scale(100) }
  } else if (position == 2) {
    return { left: 0, bottom: scale(100) }
  } else if (position == 3) {
    return { right: 0, top: scale(100) }
  } else if (position == 4) {
    return { right: 0, bottom: scale(100) }
  } else {
    return {}
  }
}

export const stringToNumber = (x: string) => {
  const parsed = parseInt(x);
  if (isNaN(parsed)) { return 0; }
  return parsed
}

