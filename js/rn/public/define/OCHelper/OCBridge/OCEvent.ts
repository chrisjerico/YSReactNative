import { Skin1 } from './../../../theme/UGSkinManagers';
import { OCHelper } from './../OCHelper';
import { UGStore } from './../../../../redux/store/UGStore';
import { OCCall } from './OCCall';
import { PageName, } from '../../../navigation/Navigation';
import UGSysConfModel from '../../../../redux/model/全局/UGSysConfModel';
import { getCurrentPage, getStackLength, jumpTo, pop, push } from '../../../navigation/RootNavigation';
import UGSkinManagers from '../../../theme/UGSkinManagers';
import { RnPageModel } from '../SetRnPageInfo';
import UGUserModel from '../../../../redux/model/全局/UGUserModel';
import AppDefine from '../../AppDefine';

export enum OCEventType {
  UGNotificationGetSystemConfigComplete = 'UGSystemConfigModel.currentConfig',
  UGNotificationWithSkinSuccess = 'UGNotificationWithSkinSuccess',
  UGNotificationLoginComplete = 'UGNotificationLoginComplete',
  UGNotificationUserLogout = 'UGNotificationUserLogout',
  viewWillAppear = 'viewWillAppear',
  AppDefineSetupSiteAndSkinParams = 'AppDefine-SetupSiteAndSkinParams',
  TZImagePickerControllerDidFinishPickingPhotosHandle = 'TZImagePickerController-DidFinishPickingPhotosHandle',
}

export class OCEvent extends OCCall {
  protected static events: { type: OCEventType; event: Function }[] = []

  protected static setup() {
    super.setup()

    // 监听原生发过来的事件通知
    this.emitter.addListener('EventReminder', (params: { _EventName: OCEventType; params: any }) => {
      console.log('OCEvent rn收到oc通知：', params._EventName);

      this.events
        .filter((v) => {
          return v.type == params._EventName
        })
        .forEach((v) => {
          v.event(params.params)
        })
    })

    // 跳转到指定页面
    this.emitter.addListener('SelectVC', (params: { vcName: PageName; rnAction: 'jump' | 'push' | 'refresh' }) => {
      UGUserModel.updateFromYS()
      const page = RnPageModel.getPageName(params.vcName)
      const currentPage = getCurrentPage()

      let action = params.rnAction;
      if (action == 'jump' && currentPage == page && getStackLength() < 2) {
        action = 'refresh';
      }
      else if (action == 'refresh' && page.indexOf('Login') != -1) {
        action = 'jump';
      }

      switch (action) {
        case 'push':
          console.log('push到rn页面：', params.vcName, params)
          push(page, params)
          break
        case 'jump':
          console.log('跳转到rn页面：', params.vcName, params)
          jumpTo(page, params, true)
          break
        case 'refresh':
        default:
          console.log('成为焦点：', currentPage, params)
          const { didFocus } = UGStore.getPageProps(currentPage)
          didFocus && didFocus()
      }
    })

    // 移除页面
    this.emitter.addListener('RemoveVC', (params: { vcName: PageName }) => {
      console.log('退出页面', params.vcName)
      if (params.vcName == getCurrentPage()) {
        !pop() && jumpTo(PageName.TransitionPage)
      }
    })

    this.addEvent(OCEventType.UGNotificationGetSystemConfigComplete, (sysConf: UGSysConfModel) => {
      UGStore.dispatch({ type: 'merge', sysConf: sysConf })
    })
    this.addEvent(OCEventType.AppDefineSetupSiteAndSkinParams, () => {
      if (AppDefine.siteId == 'c116') {
        OCHelper.call('AppDefine.shared.setIsNoOnLineDoc:', [false]);
      }
      if (Skin1.skitType == '香槟金') {
        OCHelper.call('AppDefine.shared.setIsTabMassageBadge:', [false]);
      }
    })
    this.addEvent(OCEventType.UGNotificationUserLogout, () => {
      UGStore.dispatch({ type: 'reset', userInfo: {} })
      UGStore.save()
    })
  }

  public static addEvent(type: OCEventType, event: Function) {
    this.events.push({ type: type, event: event })
  }

  public static removeEvents(type: OCEventType) {
    this.events = this.events.filter((v) => {
      return v.type != type
    })
  }
}
