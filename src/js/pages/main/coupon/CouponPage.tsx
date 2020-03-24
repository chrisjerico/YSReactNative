import * as React from "react";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BasePage from "../../base/BasePage";

import {connect} from 'react-redux'
import IBasePageState from "../../base/IBasePageState";
import {Actions} from "react-native-router-flux";
import ICouponProps from "./ICouponProps";
import {arrayEmpty} from "../../../utils/Ext";
import IReducerState from "../../../redux/inter/IReducerState";
import IHomeBean from "../../../redux/inter/bean/home/IHomeBean";
import {Res} from "../../../../res/Resources";
import UGTheme from "../../../theme/UGTheme";
import ICouponBean, {ICouponListItem} from "../../../redux/inter/bean/home/ICouponBean";
import IBaseBean from "../../../redux/inter/bean/base/IBaseBean";
import Icon from 'react-native-vector-icons/FontAwesome';
import {requestCouponData} from "../../../redux/reducer/CouponReducer";

/**
 * Arc
 *
 * 优惠券
 *
 */
const {colorBackground, colorSecondBackground, colorTextSecondary, colorAccent, primary, colorText} = UGTheme.getInstance().currentTheme();
class CouponPage extends BasePage<ICouponProps, IBasePageState> {

  requestData() {
    const {requestCouponData} = this.props;
    requestCouponData();
  }

  /**
   * 绘制第一条数据
   * @param item
   * @param index
   * @private
   */
  _renderItem = (itemData) => {
    const item: ICouponListItem = itemData?.item;
    return (
      <View style={_styles.itemContainer}>
        <View style={[
          _styles.textContainer,
          {backgroundColor: colorSecondBackground}
        ]}>
          <Text style={[
            _styles.text,
            {color: colorTextSecondary}
          ]}>{item.title}</Text>
          <Icon name='chevron-right' size={14} style={{color: colorAccent}}/>
        </View>
        <View style={_styles.imageContainer}>
          <Image source={{uri: item.pic}} style={_styles.image}/>
        </View>
      </View>
    )
  };

  renderContent(): React.ReactNode {
    let data: IReducerState<IBaseBean<ICouponBean>> = this.props.reducerData;
    const coupon = data?.data?.data;
    if (arrayEmpty(coupon?.list)) return null;

    return (
      <FlatList
        data={coupon.list}
        renderItem={this._renderItem}
      />
    );
  }

}

const _styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    top: 0,
    right: 0,

  },
  image: {
    borderRadius: 4,
    width: '90%',
    aspectRatio: 335/120,
    resizeMode: 'stretch',
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 55,
    aspectRatio: 343/113,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 4,
  },
  text: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
  },

});

/**
 * 当前所使用到的 Action方法
 */
const _mapDispatchToProps = ({
  requestCouponData: requestCouponData
});

/**
 * 将得到的reducer结果绑定到当前界面
 *
 * @param state
 * @private
 */
const _mapStateToProps = (state) => {
  return {
    ...state,
    reducerData: state.couponReducer
  };
};

/**
 * 进行第二层包装, 生成的新组件拥有 接受和发送 数据的能力
 */
export default connect(_mapStateToProps, _mapDispatchToProps)(CouponPage)
