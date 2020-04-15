import {Navigation, PageName} from './../../pages/router/Navigation';
import {Dimensions, Platform} from 'react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {NativeCommand} from './NativeCommand';
import {RnPageModel} from '../../pages/router/ios/SetRnPageInfo';

class OCFuncVariable {
  vc: string = '';
  ret: string = '';

  static init(): OCFuncVariable {
    var obj: any = {};
    for (var key in new OCFuncVariable()) {
      obj[key] = `OCFuncVariable.${key}`;
    }
    return obj;
  }
}

interface OCFuncModel {
  obj?: string;
  selectors: string;
  args1?: Array<any | OCFuncModel>;
  args2?: Array<any | OCFuncModel>;
  args3?: Array<any | OCFuncModel>;
  args4?: Array<any | OCFuncModel>;
  args5?: Array<any | OCFuncModel>;
}

export default class AppDefine {
  static host = 'http://接口域名'; // 接口域名
  static siteId = '未知站点';
  static width = Dimensions.get('window').width;
  static height = Dimensions.get('window').height;

  static currentPages: Array<string> = []; // 存活的页面

  //
  static ocHelper = NativeModules.ReactNativeHelper; // oc助手
  static ocEvent = new NativeEventEmitter(AppDefine.ocHelper); // oc事件
  static ocBlocks = {};

  static setup() {
    // 监听原生发过来的事件通知
    AppDefine.ocEvent.addListener('EventReminder', (params: {_EventName: string; params: any}) => {
      console.log('rn收到oc通知：');
      console.log(params);
      var block = AppDefine.ocBlocks[params._EventName];
      if (typeof block == 'function') {
        block(params.params);
      }
    });

    // 跳转到指定页面
    AppDefine.ocEvent.addListener('SelectVC', (params: {vcName: PageName}) => {
      console.log('跳转到rn页面：', params.vcName);
      if (params.vcName) {
        Navigation.jump(params.vcName) || Navigation.jump(RnPageModel.getPageName(params.vcName));
      }
    });

    // 移除页面
    AppDefine.ocEvent.addListener('RemoveVC', (params: {vcName: PageName}) => {
      console.log('退出页面', params.vcName);
      if (params.vcName == Navigation.pages[Navigation.pages.length - 1]) {
        if (Navigation.pages.length > 1) {
          Navigation.pop();
        } else {
          Navigation.jump(PageName.LoadingPage);
        }
      }
    });

    if (Platform.OS == 'ios') {
      // 设置接口域名
      AppDefine.ocCall('AppDefine.shared.Host').then((host: string) => {
        AppDefine.host = host;
      });
      // 设置站点编号
      AppDefine.ocCall('AppDefine.shared.SiteId').then((siteId: string) => {
        AppDefine.siteId = siteId;
      });
    } else {
      // 设置接口域名
      AppDefine.ocHelper
        .executeCmd(
          JSON.stringify({
            type: NativeCommand.APP_HOST,
          }),
        )
        .then((host: string) => {
          AppDefine.host = host;
        });
      // 设置站点编号
      AppDefine.ocHelper
        .executeCmd(
          JSON.stringify({
            type: NativeCommand.APP_SITE,
          }),
        )
        .then((siteId: string) => {
          AppDefine.siteId = siteId;
        });
    }

    // 必须在注册监听之后执行
    // AppDefine.ocHelper.launchFinish();
  }

  // 调用原生OC函数
  static ocCall(
    selectors: string | ((vars: OCFuncVariable) => {[x: string]: OCFuncModel}),
    args1: Array<any | OCFuncModel> = [],
    args2: Array<any | OCFuncModel> = [],
    args3: Array<any | OCFuncModel> = [],
  ): Promise<any> {
    var array = [];
    var temp: {[x: string]: OCFuncModel};
    if (typeof selectors === 'function') {
      temp = selectors(OCFuncVariable.init());
    } else {
      var sel: OCFuncModel = {selectors: selectors};
      args1.length && (sel['args1'] = args1);
      args2.length && (sel['args2'] = args2);
      args3.length && (sel['args3'] = args3);
      temp = {ret: sel};
    }
    for (let [key, value] of Object.entries(temp)) {
      var obj = {};
      obj[key] = value;
      array.push(obj);
    }
    return AppDefine.ocHelper.performSelectors(array);
  }
}

// OC结构体
export class NSValue {
  valueType: string;
  string: string;

  constructor(valueType: 'CGRect' | 'CGPoint' | 'CGSize' | 'UIEdgeInsets' | 'UIOffset' | 'CGAffineTransform' | 'CGVector', string: string) {
    this.valueType = valueType;
    this.string = string;
  }

  static CGRectMake(x: number, y: number, w: number, h: number): NSValue {
    return new NSValue('CGRect', `{{${x}, ${y}}, {${w}, ${h}}}`);
  }

  static CGPointMake(x: number, y: number): NSValue {
    return new NSValue('CGPoint', `{{${x}, ${y}}}`);
  }

  static CGSizeMake(w: number, h: number): NSValue {
    return new NSValue('CGSize', `{{${w}, ${h}}}`);
  }

  static UIEdgeInsetsMake(top: number, left: number, bottom: number, right: number): NSValue {
    return new NSValue('UIEdgeInsets', `{${top}, ${left}, ${bottom}, ${right}}`);
  }

  static UIOffsetMake(horizontal: number, vertical: number): NSValue {
    return new NSValue('UIOffset', `{${horizontal}, ${vertical}}`);
  }

  static CGAffineTransformMake(a: number, b: number, c: number, d: number, tx: number, ty: number): NSValue {
    return new NSValue('CGAffineTransform', `[${a}, ${b}, ${c}, ${d}, ${tx}, ${ty}]`);
  }

  static CGVectorMake(dx: number, dy: number): NSValue {
    return new NSValue('CGVector', `{${dx}, ${dy}}`);
  }
}
