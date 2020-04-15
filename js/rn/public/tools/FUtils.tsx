export default class FUtils {
  static isExactlyEqual(x: any, y: any): boolean {
    // 指向同一内存时
    if (x === y) {
      return true;
    } else if (typeof x == 'object' && x != null && typeof y == 'object' && y != null) {
      if (Object.keys(x).length != Object.keys(y).length) return false;

      for (const prop in x) {
        if (y.hasOwnProperty(prop)) {
          if (!this.isExactlyEqual(x[prop], y[prop])) return false;
        } else return false;
      }
      return true;
    } else return false;
  }
}

// 合并Props
export function mergeProps<P>(...propsArray: P[]): P {
  const retProps: any = {};
  // 合并
  propsArray.forEach(props => {
    if (!(props instanceof Object)) return;
    for (const k in props) {
      let currentValue = retProps[k];
      const newValue = props[k];

      if (typeof k == 'string' && k.toLowerCase().indexOf('style') != -1 && (currentValue instanceof Array || newValue instanceof Array)) {
        if (currentValue instanceof Array && newValue instanceof Array) {
          currentValue = mergeProps(...currentValue, ...newValue);
        } else if (currentValue instanceof Array) {
          currentValue = mergeProps(...currentValue, newValue);
        } else if (newValue instanceof Array) {
          currentValue = mergeProps(currentValue, ...newValue);
        }
      } else if (typeof currentValue == 'object' && typeof newValue == 'object' && !(currentValue instanceof Array) && !(newValue instanceof Array)) {
        currentValue = mergeProps(currentValue, newValue);
      } else {
        currentValue = newValue;
      }
      retProps[k] = currentValue;
    }
  });
  return retProps;
}
