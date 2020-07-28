import {UGBridge} from './UGBridge';
import {PageName, } from '../../navigation/Navigation';
import {RnPageModel} from '../OCHelper/SetRnPageInfo';
import { navigate, pop, push, getCurrentPage } from '../../navigation/RootNavigation';

export enum ANEventType {}

export class ANEvent extends UGBridge {
  protected static events: {type: ANEventType; event: Function}[] = [];

  protected static setup() {
    super.setup();

    // 监听原生发过来的事件通知
    this.emitter.addListener('UGEventEmitter', params => {
      // Toast('params='+ params);
      console.log(`params=${params}`);
      let pms = JSON.parse(params);
      push(pms.sceneKey, { fromNative: true, type: ActionConst.REPLACE, ...pms?.props, });
    });

    // 监听原生发过来的事件通知
    this.emitter.addListener('EventReminder', (params: {_EventName: ANEventType; params: any}) => {
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
    this.emitter.addListener('SelectVC', (params: {vcName: PageName}) => {
      console.log('跳转到rn页面：', params.vcName);
      if (params.vcName) {
        navigate(params.vcName) || navigate(RnPageModel.getPageName(params.vcName));
      }
    });

    // 移除页面
    this.emitter.addListener('RemoveVC', (params: {vcName: PageName}) => {
      console.log('退出页面', params.vcName);
      if (params.vcName == getCurrentPage()) {
        pop();
      }
    });
  }

  protected static addEvent(type: ANEventType, event: Function) {
    this.events.push({type: type, event: event});
  }

  protected static removeEvents(type: ANEventType) {
    this.events = this.events.filter(v => {
      return v.type != type;
    });
  }
}
