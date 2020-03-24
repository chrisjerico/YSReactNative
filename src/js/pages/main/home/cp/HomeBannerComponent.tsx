import {Image, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import * as React from "react";
import IReducerState from "../../../../redux/inter/IReducerState";
import IHomeBean from "../../../../redux/inter/bean/home/IHomeBean";
import {anyNull, arrayEmpty} from "../../../../utils/Ext";
import {Divider} from "react-native-elements";
import {Component} from "react";
import {Res} from "../../../../../res/Resources";
import UGTheme from "../../../../theme/UGTheme";
import IHomeProps from "../IHomeProps";
import IHomePageState from "../IHomePageState";
import {FlatGrid} from "react-native-super-grid";
import {IBannerDataItem} from "../../../../redux/inter/bean/home/IBannerAdvBean";
import UGSwiper from "../../../../widget/swp/UGSwiper";

const {
  loadingBackground, colorText, homeMoney, colorAccent, colorSecondBackground, primary, primaryDark, primaryBright
} = UGTheme.getInstance().currentTheme();
/**
 * 主页banner
 */
export default class HomeBannerComponent extends Component<IHomeProps, IHomePageState> {

  /**
   * 广告跳转
   * @param adv
   * @private
   */
  _gotoBanner = (adv: IBannerDataItem) => {
    //TODO
  };

  /**
   * 绘制滑屏
   */
  _renderBanner(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const pics = data?.data?.banner?.data?.list;
    if (anyNull(pics)) return null;

    return (
      <View style={_styles.bannerWrapper} key={pics.toString()}>
        <UGSwiper>
          {
            pics.map((adv) => {
              return (
                <TouchableNativeFeedback onPress={()=>{
                  this._gotoBanner(adv)
                }}>
                  <View key={adv.pic}
                        style={[
                          _styles.bannerContainer,
                          {backgroundColor: loadingBackground}
                        ]}>
                    <Image style={_styles.bannerImage} source={{uri: adv.pic}}/>
                  </View>
                </TouchableNativeFeedback>
              )
            })
          }
        </UGSwiper>
      </View>
    );
  }

  render(): React.ReactNode {
    return this._renderBanner();
  }

}

const _styles = StyleSheet.create({

  //滑屏
  bannerWrapper: {
    aspectRatio: 343 / 153
  },
  bannerContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },

});
