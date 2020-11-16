import { OCHelper } from './../OCHelper';
import { UGStore } from './../../../../redux/store/UGStore';
import { OCCall } from './OCCall';
import { PageName, } from '../../../navigation/Navigation';
import UGSysConfModel from '../../../../redux/model/全局/UGSysConfModel';
import { getCurrentPage, getStackLength, jumpTo, pop, push } from '../../../navigation/RootNavigation';
import UGSkinManagers from '../../../theme/UGSkinManagers';
import { RnPageModel } from '../SetRnPageInfo';
import UGUserModel from '../../../../redux/model/全局/UGUserModel';

export enum OCEventType {
  UGNotificationGetSystemConfigComplete = 'UGSystemConfigModel.currentConfig',
  UGNotificationWithSkinSuccess = 'UGNotificationWithSkinSuccess',
  JspatchDownloadProgress = 'jsp下载进度',
  JspatchUpdateComplete = 'jsp更新结果',
  UGNotificationLoginComplete = 'UGNotificationLoginComplete',
  UGNotificationUserLogout = 'UGNotificationUserLogout',
  viewWillAppear = 'viewWillAppear',
}

export class OCEvent extends OCCall {
  protected static events: { type: OCEventType; event: Function }[] = [];

  protected static setup() {
    super.setup();

    // 监听原生发过来的事件通知
    this.emitter.addListener('EventReminder', (params: { _EventName: OCEventType; params: any }) => {
      // console.log('OCEvent rn收到oc通知：', params);

      this.events
        .filter(v => {
          return v.type == params._EventName;
        })
        .forEach(v => {
          v.event(params.params);
        });
    });

    // 跳转到指定页面
    this.emitter.addListener('SelectVC', (params: { vcName: PageName, rnAction: 'jump' | 'push' | 'refresh' }) => {
      UGUserModel.updateFromYS();

      if (params.vcName) {
        const page = RnPageModel.getPageName(params.vcName);
        if (params.rnAction == 'push') {
          console.log('push到rn页面：', params.vcName, params);
          push(page, params);
        } else {
          const currentPage = getCurrentPage()
          if (params.rnAction == 'refresh' || (currentPage == page && getStackLength() < 2)) {
            console.log('成为焦点：', currentPage);
            const { didFocus } = UGStore.getPageProps(currentPage);
            didFocus && didFocus();
          } else {
            console.log('跳转到rn页面：', params.vcName, params);
            jumpTo(page, params, true);
          }
        }
      } else {
        console.log('页面为空', params);
      }
    });

    // 移除页面
    this.emitter.addListener('RemoveVC', (params: { vcName: PageName }) => {
      console.log('退出页面', params.vcName);
      if (params.vcName == getCurrentPage()) {
        !pop() && jumpTo(PageName.TransitionPage);
      }
    });


    this.addEvent(OCEventType.UGNotificationGetSystemConfigComplete, (sysConf: UGSysConfModel) => {
      UGStore.dispatch({ type: 'merge', sysConf: sysConf });
    });
    this.addEvent(OCEventType.UGNotificationWithSkinSuccess, () => {
      UGSkinManagers.updateOcSkin();
    });
  }

  public static addEvent(type: OCEventType, event: Function) {
    this.events.push({ type: type, event: event });
  }

  public static removeEvents(type: OCEventType) {
    this.events = this.events.filter(v => {
      return v.type != type;
    });
  }
}
