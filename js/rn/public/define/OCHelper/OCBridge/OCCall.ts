import {UGBridge} from '../../ANHelper/UGBridge';

// 变量
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

// OC函数格式
interface OCFuncModel {
  obj?: string;
  selectors: string;
  args1?: Array<any | OCFuncModel>;
  args2?: Array<any | OCFuncModel>;
  args3?: Array<any | OCFuncModel>;
  args4?: Array<any | OCFuncModel>;
  args5?: Array<any | OCFuncModel>;
}

// 调用原生OC函数
export class OCCall extends UGBridge {
  protected static setup() {
    super.setup();
  }

  protected static call(
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
    for (const k in temp) {
      var obj = {};
      obj[k] = temp[k];
      array.push(obj);
    }
    return this.core.performSelectors(array);
  }
}

// ————————————————————————————————————
// OC结构体转换器
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