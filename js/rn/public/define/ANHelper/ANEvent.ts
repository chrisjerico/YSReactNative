import {UGBridge} from './UGBridge';
import {ugLog} from '../../tools/UgLog';
import {PageName, Navigation} from '../../navigation/Navigation';
import {RnPageModel} from '../OCHelper/SetRnPageInfo';

export enum ANEventType {}

export class ANEvent extends UGBridge {
  protected static events: {type: ANEventType; event: Function}[] = [];

  protected static setup() {
    super.setup();

    // 监听原生发过来的事件通知
    this.emitter.addListener('UGEventEmitter', params => {
      // Toast('params='+ params);
      ugLog(`params=${params}`);
      let pms = JSON.parse(params);
      Navigation.push(pms.sceneKey, { fromNative: true, type: ActionConst.REPLACE, ...pms?.props, });
    });

    // 监听原生发过来的事件通知
    this.emitter.addListener('EventReminder', (params: {_EventName: ANEventType; params: any}) => {
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
    this.emitter.addListener('SelectVC', (params: {vcName: PageName}) => {
      console.log('跳转到rn页面：', params.vcName);
      if (params.vcName) {
        Navigation.jump(params.vcName) || Navigation.jump(RnPageModel.getPageName(params.vcName));
      }
    });

    // 移除页面
    this.emitter.addListener('RemoveVC', (params: {vcName: PageName}) => {
      console.log('退出页面', params.vcName);
      if (params.vcName == Navigation.pages[Navigation.pages.length - 1]) {
        if (Navigation.pages.length > 1) {
          Navigation.pop();
        } else {
          Navigation.jump(PageName.LoadingPage);
        }
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
