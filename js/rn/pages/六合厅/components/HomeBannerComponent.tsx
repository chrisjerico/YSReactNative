import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as React from 'react';
import { Component } from 'react';
import { anyNull } from '../../../public/tools/Ext';
import UGSwiper from '../../../public/widget/swp/UGSwiper';
import PushHelper from '../../../public/define/PushHelper';
import IBannerAdvBean, { IBannerDataItem } from '../../../redux/model/home/IBannerAdvBean';
import { UGColor } from '../../../public/theme/UGThemeColor';

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
  gotoBanner = (adv: IBannerDataItem) => {
    //TODO 安卓
    PushHelper.pushCategory(adv.linkCategory, adv.linkPosition);
  };

  /**
   * 绘制滑屏
   */
  renderBanner(): React.ReactNode {
    const pics: any = this.props.reducerData?.list || defaultPics;
    console.log("------pics------", pics)
    return (
      <View style={styles.bannerWrapper} >
        <UGSwiper>
          {pics.map((adv: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.bannerContainer, { backgroundColor: UGColor.placeholderColor2 }]}
                onPress={() => {
                  this.gotoBanner(adv);
                }}>
                <Image style={styles.bannerImage} source={{ uri: adv.pic }} resizeMode={'cover'} />
              </TouchableOpacity>
            );
          })}
        </UGSwiper>
      </View>
    );
  }

  render(): React.ReactNode {
    return this.renderBanner();
  }
}

const defaultPics = [{ "pic": "https://cdn01.dalianshutong.cn/upload/t061/customise/images/m_banner_3.jpg?v=1581317567" }, { "pic": "https://cdn01.dalianshutong.cn/upload/t061/customise/images/m_banner_4.jpg?v=1583055564" }]

const styles = StyleSheet.create({
  bannerWrapper: {
    width: '100%',
    aspectRatio: 540 / 217,
  },
  bannerContainer: {
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});
