import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import {Component} from 'react';
import {anyNull} from '../../../public/tools/Ext';
import UGSwiper from '../../../public/widget/swp/UGSwiper';
import PushHelper from '../../../public/define/PushHelper';
import IBannerAdvBean, {IBannerDataItem} from '../../../redux/model/home/IBannerAdvBean';
import {UGColor} from '../../../public/theme/UGThemeColor';

interface IProps {
  reducerData: IBannerAdvBean;
}

/**
 * 主页banner
 */
export default class HomeBannerComponent extends Component<IProps> {
  /**
   * 广告跳转
   * @param adv
   * @private
   */
  _gotoBanner = (adv: IBannerDataItem) => {
    //TODO 安卓
    PushHelper.pushCategory(adv.linkCategory, adv.linkPosition);
  };

  /**
   * 绘制滑屏
   */
  _renderBanner(): React.ReactNode {
    const pics = this.props.reducerData?.list;
    if (anyNull(pics)) return null;

    return (
      <View style={_styles.bannerWrapper} key={pics.toString()}>
        <UGSwiper>
          {pics.map((adv) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this._gotoBanner(adv);
                }}>
                <View key={adv.pic} style={[_styles.bannerContainer, {backgroundColor: UGColor.placeholderColor2}]}>
                  <Image style={_styles.bannerImage} source={{uri: adv.pic}} />
                </View>
              </TouchableOpacity>
            );
          })}
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
    aspectRatio: 343 / 153,
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
    resizeMode: 'stretch',
  },
});
