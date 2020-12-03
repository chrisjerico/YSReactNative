import { PageName } from '../../navigation/Navigation';
import { getCurrentPage, getStackLength, jumpTo, navigate, pop, push } from '../../navigation/RootNavigation'
import { RnPageModel } from '../OCHelper/SetRnPageInfo';
import { UGBridge } from './UGBridge';
import {ugLog} from "../../tools/UgLog";
import {UGStore} from "../../../redux/store/UGStore";
import { ANHelper } from './ANHelper'
import { CMD } from './hp/CmdDefine'
import { NA_DATA } from './hp/DataDefine'

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
    this.emitter.addListener('SelectVC', (params: { vcName: PageName; action: string }) => {
      ugLog('跳转到rn页面：', JSON.stringify(params));
      // navigate(params.vcName) || navigate(RnPageModel.getPageName(params.vcName));
      const page = RnPageModel.getPageName(params?.vcName)
      switch (params?.action) {
        case 'push':
          push(page, params)
          break
        case 'jump':
          // jumpTo(page, params, true)
          navigate(params.vcName) || navigate(RnPageModel.getPageName(params.vcName))
          break
        case 'refresh':
        default:
          const currentPage = getCurrentPage()
          const { didFocus } = UGStore.getPageProps(currentPage)
          didFocus && didFocus()
          ugLog('触发焦点：', currentPage, didFocus)
          break
      }

    });

    // 移除页面
    this.emitter.addListener('RemoveVC', (params: { vcName: PageName }) => {
      ugLog('退出页面', params.vcName);
      if (params.vcName == getCurrentPage()) {
        pop();
      }
    });

    // 检查界面
    this.emitter.addListener('CheckPages', (params: { type: string }) => {
      ugLog('检查界面：', JSON.stringify(params));
      switch (params?.type) {
        case 'main_menu_status':
          ANHelper.callAsync(CMD.VISIBLE_MAIN_TAB, {visibility: getStackLength() < 2 ? 0 : 8});
          break;
      }
    });

    // // 跳转到指定页面
    // this.emitter.addListener('SelectVC', (params: { vcName: PageName, rnAction: 'jump' | 'push' }) => {
    //   ugLog('跳转到rn页面：', params.vcName, params);
    //   if (params.vcName) {
    //     if (params.rnAction == 'push') {
    //       push(params.vcName, params, true) || push(RnPageModel.getPageName(params.vcName), params, true);
    //     } else {
    //       jumpTo(params.vcName, params, true) || jumpTo(RnPageModel.getPageName(params.vcName), params, true);
    //     }
    //   }
    // });
    //
    // // 移除页面
    // this.emitter.addListener('RemoveVC', (params: { vcName: PageName }) => {
    //   console.log('退出页面', params.vcName);
    //   if (params.vcName == getCurrentPage()) {
    //     !pop() && jumpTo(PageName.TransitionPage);
    //   }
    // });

    // 清除数据
    this.emitter.addListener('ClearData', (params: any) => {
      ugLog('清除数据');
      UGStore.dispatch({ type: 'reset', userInfo: {} })
      UGStore.save()
    });

    // 刷新数据
    this.emitter.addListener('RefreshData', (params: any) => {
      ugLog('刷新数据=', params);
      switch (params) {
        case NA_DATA.LOGIN_INFO:
          break;
        case NA_DATA.USER_INFO:
          ANHelper.callAsync(CMD.LOAD_DATA, { key: NA_DATA.USER_INFO }).then((user) => {
            UGStore.dispatch({ type: 'merge', userInfo: JSON.parse(user) })
            UGStore.save()
          })
          break;
        case NA_DATA.CONFIG:
          ANHelper.callAsync(CMD.LOAD_DATA, { key: NA_DATA.CONFIG }).then((config) => {
            UGStore.dispatch({ type: 'merge', sysConf: JSON.parse(config) })
            UGStore.save()
          })
          break;
      }
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
