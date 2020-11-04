import { PageName } from '../../navigation/Navigation';
import { getCurrentPage, navigate, pop } from '../../navigation/RootNavigation';
import { RnPageModel } from '../OCHelper/SetRnPageInfo';
import { UGBridge } from './UGBridge';
import {ugLog} from "../../tools/UgLog";
import {UGStore} from "../../../redux/store/UGStore";

export enum ANEventType { }

export class ANEvent extends UGBridge {
  protected static events: { type: ANEventType; event: Function }[] = [];

  protected static setup() {
    super.setup();
    // // 监听原生发过来的事件通知
    // this.emitter.addListener('UGEventEmitter', params => {
    //   // Toast('params='+ params);
    //   console.log(`params=${params}`);
    //   // let pms = JSON.parse(params);
    //   // Navigation.push(pms.sceneKey, { fromNative: true, type: ActionConst.REPLACE, ...pms?.props, });
    // });

    // 监听原生发过来的事件通知
    this.emitter.addListener('EventReminder', (params: { _EventName: ANEventType; params: any }) => {
      ugLog('rn收到oc通知：', params);
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
      ugLog('跳转到rn页面：', JSON.stringify(params));
      if (params.vcName) {
        navigate(params.vcName) || navigate(RnPageModel.getPageName(params.vcName));
      }
    });

    // 移除页面
    this.emitter.addListener('RemoveVC', (params: { vcName: PageName }) => {
      ugLog('退出页面', params.vcName);
      if (params.vcName == getCurrentPage()) {
        pop();
      }
    });

    // 清除数据
    this.emitter.addListener('ClearData', (params: any) => {
      ugLog('清除数据');
      UGStore.dispatch({ type: 'reset', userInfo: {} })
      UGStore.save()
    });
  }

  protected static addEvent(type: ANEventType, event: Function) {
    this.events.push({ type: type, event: event });
  }

  protected static removeEvents(type: ANEventType) {
    this.events = this.events.filter(v => {
      return v.type != type;
    });
  }
}
