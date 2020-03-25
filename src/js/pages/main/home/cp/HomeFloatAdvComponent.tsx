import {Image, StyleSheet, View} from "react-native";
import * as React from "react";
import {Component} from "react";
import IReducerState from "../../../../redux/inter/IReducerState";
import IHomeBean from "../../../../redux/inter/bean/home/IHomeBean";
import {anyNull, arrayEmpty} from "../../../../utils/Ext";
import UGTheme from "../../../../theme/UGTheme";
import IFloatAdBean from "../../../../redux/inter/bean/home/IFloatAdBean";
import Icon from "react-native-vector-icons/Feather";
import IBasePageProps from "../../../base/IBasePageProps";
import IBasePageState from "../../../base/IBasePageState";

const {
  loadingBackground, colorText, homeMoney, colorAccent, colorSecondBackground, primary, primaryDark, primaryBright
} = UGTheme.getInstance().currentTheme();
/**
 * 主页悬浮广告
 */
export default class HomeFloatAdvComponent extends Component<IBasePageProps, IFloatAdvState> {

  /**
   * 隐藏悬浮广告
   * @param index
   * @private
   */
  _hideFloatAd = (index: number) => {
    const hideArr = anyNull(this.state?.hideFloatAd) ? [false, false, false, false] : [...this.state.hideFloatAd];
    hideArr[index] = true;
    this.setState({
      hideFloatAd: hideArr
    })
  };

  /**
   * 显示某个广告
   * @param index 广告位置
   * @param arr 广告数据
   * @private
   */
  _showFloatAd = (index: number, arr: Array<IFloatAdBean>) => {
    return (
      arr.length > index && <View style={[
        _styles.floatAdItemContainer,
        {opacity: !anyNull(this.state?.hideFloatAd) && this.state.hideFloatAd[index] ? 0 : 100}
      ]}>
        <Image style={_styles.floatAdImage} source={{uri: arr[index].image}}/>
        <Icon name='x-circle'
              color={colorAccent} size={25}
              style={_styles.floatAdClose}
              onPress={() => {
                this._hideFloatAd(index);
              }}/>
      </View>
    );
  };

  /**
   * 绘制广告
   * @private
   */
  _rendFloatAd(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const floatAd = data?.data?.floatAd;
    if (arrayEmpty(floatAd.data)) return null;

    return (
      <View style={_styles.floatAdContainer}>
        <View>
          {
            this._showFloatAd(0, floatAd.data)
          }
          {
            this._showFloatAd(1, floatAd.data)
          }
        </View>
        <View>
          {
            this._showFloatAd(2, floatAd.data)
          }
          {
            this._showFloatAd(3, floatAd.data)
          }
        </View>
      </View>
    )
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

/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
export interface IFloatAdvState extends IBasePageState{
  hideFloatAd?: Array<boolean>, //隐藏的广告
}