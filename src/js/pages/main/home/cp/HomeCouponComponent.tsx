import {Image, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {Component} from "react";
import IReducerState from "../../../../redux/inter/IReducerState";
import IHomeBean from "../../../../redux/inter/bean/home/IHomeBean";
import {arrayEmpty} from "../../../../utils/Ext";
import {Res} from "../../../../../res/Resources";
import UGTheme from "../../../../theme/UGTheme";
import IBasePageProps from "../../../base/IBasePageProps";
import IBasePageState from "../../../base/IBasePageState";

const {
  loadingBackground, colorText, homeMoney, colorAccent, colorSecondBackground, primary, primaryDark, primaryBright
} = UGTheme.getInstance().currentTheme();
/**
 * 主页优惠活动
 */
export default class HomeCouponComponent extends Component<IBasePageProps, IBasePageState> {


  /**
   * 绘制优惠活动
   *
   * @private
   */
  _renderCoupon(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const coupon = data?.data?.coupon?.data;
    if (arrayEmpty(coupon?.list)) return null;

    return (
      <View key='_renderCoupon'>
        <View style={_styles.couponTitleContainer}>
          <Image style={_styles.couponTitleIcon} source={Res.yhhdIcon}/>
          <Text style={_styles.couponTitleText}>优惠活动</Text>
          <Text style={_styles.couponTitleText2}>查看更多</Text>
          <Image style={_styles.couponTitleArrow} source={Res.yhhdArraw}/>
        </View>
        {
          coupon.list.map((item, index) => (
            <View key={index}
                  style={[
                    _styles.couponItemContainer,
                    {backgroundColor: colorSecondBackground}
                  ]}>
              <Text style={_styles.couponItemTitle}>{item.title}</Text>
              <Image style={_styles.couponItemImage} source={{uri: item.pic}}/>
            </View>
          ))
        }
      </View>
    );
  }

  render(): React.ReactNode {
    return this._renderCoupon();
  }

}

const _styles = StyleSheet.create({

  //优惠券
  couponTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  couponTitleIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  couponTitleText: {
    fontSize: 14,
    flex: 1,
    color: 'white'
  },
  couponTitleText2: {
    fontSize: 12,
    color: 'white'
  },
  couponTitleArrow: {
    width: 12,
    height: 12,
    marginLeft: 4,
    resizeMode: 'contain',
  },
  couponItemContainer: {
    borderRadius: 4,
    padding: 12,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 12,
  },
  couponItemTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  couponItemImage: {
    height: 60,
    resizeMode: 'stretch'
  },

});
