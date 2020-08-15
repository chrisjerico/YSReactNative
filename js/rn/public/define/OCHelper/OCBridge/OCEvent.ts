import UGSysConfModel from '../../../../redux/model/全局/UGSysConfModel';
import { PageName } from '../../../navigation/Navigation';
import { getCurrentPage, jumpTo, pop } from '../../../navigation/RootNavigation';
import UGSkinManagers from '../../../theme/UGSkinManagers';
import { updateUserInfo } from '../../../tools/tars';
import { RnPageModel } from '../SetRnPageInfo';
import { IGlobalStateHelper } from './../../../../redux/store/IGlobalStateHelper';
import { OCCall } from './OCCall';

export enum OCEventType {
  UGNotificationGetSystemConfigComplete = 'UGSystemConfigModel.currentConfig',
  UGNotificationWithSkinSuccess = 'UGNotificationWithSkinSuccess',
  JspatchDownloadProgress = 'jsp下载进度',
  JspatchUpdateComplete = 'jsp更新结果',
  UGNotificationLoginComplete = 'UGNotificationLoginComplete',
  UGNotificationUserLogout = 'UGNotificationUserLogout'
}

export class OCEvent extends OCCall {
  protected static events: { type: OCEventType; event: Function }[] = [];

  protected static setup() {
    super.setup();

    // 监听原生发过来的事件通知
    this.emitter.addListener('EventReminder', (params: { _EventName: OCEventType; params: any }) => {
      console.log('OCEvent rn收到oc通知：', params);

      this.events
        .filter(v => {
          return v.type == params._EventName;
        })
        .forEach(v => {
          v.event(params.params);
        });
    });

    // 跳转到指定页面
    this.emitter.addListener('SelectVC', (params: { vcName: PageName }) => {
      console.log('跳转到rn页面：', params.vcName);

      if (params.vcName) {
        jumpTo(params.vcName) || jumpTo(RnPageModel.getPageName(params.vcName));
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
      IGlobalStateHelper.updateSysConf(sysConf);

    });
    this.addEvent(OCEventType.UGNotificationWithSkinSuccess, () => {
      UGSkinManagers.updateOcSkin();
    });
  }

  // public static addLoginCompleteListener(onEvent: (params: any) => {}) {
  //   this.addEvent(OCEventType.UGNotificationLoginComplete, onEvent)
  // }

  public static addEvent(type: OCEventType, event: Function) {
    this.events.push({ type: type, event: event });
  }

  public static removeEvents(type: OCEventType) {
    this.events = this.events.filter(v => {
      return v.type != type;
    });
  }
}
