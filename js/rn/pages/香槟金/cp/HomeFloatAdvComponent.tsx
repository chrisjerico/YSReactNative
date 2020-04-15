import {Image, StyleSheet, View} from 'react-native';
import * as React from 'react';
import {Component} from 'react';
import {anyNull, arrayEmpty} from '../../../public/tools/Ext';
import Icon from 'react-native-vector-icons/Feather';
import IFloatAdBean from '../../../redux/model/home/IFloatAdBean';
import {Skin1} from '../../../public/theme/UGSkinManagers';

interface IProps {
  reducerData: Array<IFloatAdBean>;
}

/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
interface IFloatAdvState {
  hideFloatAd?: Array<boolean>; //隐藏的广告
}

/**
 * 主页悬浮广告
 */
export default class HomeFloatAdvComponent extends Component<IProps, IFloatAdvState> {
  /**
   * 隐藏悬浮广告
   * @param index
   * @private
   */
  _hideFloatAd = (index: number) => {
    const hideArr = anyNull(this.state?.hideFloatAd) ? [false, false, false, false] : [...this.state.hideFloatAd];
    hideArr[index] = true;
    this.setState({
      hideFloatAd: hideArr,
    });
  };

  /**
   * 显示某个广告
   * @param index 广告位置
   * @param arr 广告数据
   * @private
   */
  _showFloatAd = (index: number, arr: Array<IFloatAdBean>) => {
    return (
      arr.length > index && (
        <View style={[_styles.floatAdItemContainer, {opacity: !anyNull(this.state?.hideFloatAd) && this.state.hideFloatAd[index] ? 0 : 100}]}>
          <Image style={_styles.floatAdImage} source={{uri: arr[index].image}} />
          <Icon
            name="x-circle"
            color={Skin1.themeColor}
            size={25}
            style={_styles.floatAdClose}
            onPress={() => {
              this._hideFloatAd(index);
            }}
          />
        </View>
      )
    );
  };

  /**
   * 绘制广告
   * @private
   */
  _rendFloatAd(): React.ReactNode {
    const floatAd = this.props.reducerData;
    if (arrayEmpty(floatAd)) return null;

    return (
      <View style={_styles.floatAdContainer}>
        <View>
          {this._showFloatAd(0, floatAd)}
          {this._showFloatAd(1, floatAd)}
        </View>
        <View>
          {this._showFloatAd(2, floatAd)}
          {this._showFloatAd(3, floatAd)}
        </View>
      </View>
    );
  }

  render(): React.ReactNode {
    return this._rendFloatAd();
  }
}

const _styles = StyleSheet.create({
  //悬浮广告
  floatAdContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 230,
    left: 16,
    right: 16,
  },
  floatAdItemContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  floatAdImage: {
    width: 120,
    height: 120,
    marginTop: 12,
    resizeMode: 'contain',
  },
  floatAdClose: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
