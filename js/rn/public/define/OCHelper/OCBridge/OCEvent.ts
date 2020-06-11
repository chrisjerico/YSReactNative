import { IGlobalStateHelper } from './../../../../redux/store/IGlobalStateHelper';
import { OCCall } from './OCCall';
import { PageName, Navigation } from '../../../navigation/Navigation';
import { RnPageModel } from '../SetRnPageInfo';
import UGSysConfModel from '../../../../redux/model/全局/UGSysConfModel';
import UGSkinManagers from '../../../theme/UGSkinManagers';

export enum OCEventType {
  UGNotificationGetSystemConfigComplete = 'UGSystemConfigModel.currentConfig',
  UGNotificationWithSkinSuccess = 'UGNotificationWithSkinSuccess',
  JspatchDownloadProgress = 'jsp下载进度',
  JspatchUpdateComplete = 'jsp更新结果',
}

export class OCEvent extends OCCall {
  protected static events: { type: OCEventType; event: Function }[] = [];

  protected static setup() {
    super.setup();

    // 监听原生发过来的事件通知
    this.emitter.addListener('EventReminder', (params: { _EventName: OCEventType; params: any }) => {
      console.log('rn收到oc通知：', params);
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
      if (params.vcName) {
        Navigation.jump(params.vcName) || Navigation.jump(RnPageModel.getPageName(params.vcName));
      }
    });

    // 移除页面
    this.emitter.addListener('RemoveVC', (params: { vcName: PageName }) => {
      console.log('退出页面', params.vcName);
      if (params.vcName == Navigation.pages[Navigation.pages.length - 1]) {
        if (Navigation.pages.length > 1) {
          Navigation.pop();
        } else {
          Navigation.jump(PageName.TransitionPage);
        }
      }
    });

    this.addEvent(OCEventType.UGNotificationGetSystemConfigComplete, (sysConf: UGSysConfModel) => {
      IGlobalStateHelper.updateSysConf(sysConf);
    });
    this.addEvent(OCEventType.UGNotificationWithSkinSuccess, () => {
      UGSkinManagers.updateOcSkin();
    });
  }

  protected static addEvent(type: OCEventType, event: Function) {
    this.events.push({ type: type, event: event });
  }

  protected static removeEvents(type: OCEventType) {
    this.events = this.events.filter(v => {
      return v.type != type;
    });
  }
}
