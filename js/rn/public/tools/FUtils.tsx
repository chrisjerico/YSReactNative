export default class FUtils {
  // 合并Props，使style不会整个被替换，而是只替换差异的样式
  static props_merge(defaultProps: any, props: any): any {
    var retProps = Object.assign({}, defaultProps);
    for (var k in props) {
      if (k.toLowerCase().indexOf('style') != -1) {
        var style: Array<{[x: string]: any}> | {[x: string]: any} = retProps[k];
        if (!style) {
          style = props[k];
        } else if (style instanceof Array) {
          style.push(props[k]);
        } else {
          style = [style, props[k]];
        }
        retProps[k] = style;
      } else {
        retProps[k] = props[k];
      }
    }
    return retProps;
  }
}
