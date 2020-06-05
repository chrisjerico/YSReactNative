import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import PushHelper from '../../../public/define/PushHelper';
import {UGColor} from '../../../public/theme/UGThemeColor';
import UGSwiper from '../../../public/widget/swp/UGSwiper';
import {IBannerDataItem} from '../../../redux/model/home/IBannerAdvBean';

const defaultBanners = [
  {pic: 'https://cdn01.dalianshutong.cn/upload/t061/customise/images/m_banner_3.jpg?v=1581317567'},
  {pic: 'https://cdn01.dalianshutong.cn/upload/t061/customise/images/m_banner_4.jpg?v=1583055564'},
];

interface HomeBannerComponentProps {
  banners?: BannerProps[];
}
interface BannerProps {
  pic: string;
}

const HomeBannerComponent = ({banners = defaultBanners}: HomeBannerComponentProps) => {
  //const banners: any = reducerData?.list || defaultBanners;

  const gotoBanner = (adv: IBannerDataItem) => {
    //TODO 安卓
    PushHelper.pushCategory(adv.linkCategory, adv.linkPosition);
  };

  return (
    <View style={styles.bannerWrapper}>
      <UGSwiper>
        {banners.map((adv: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={[styles.bannerContainer, {backgroundColor: UGColor.placeholderColor2}]}
              onPress={() => {
                gotoBanner(adv);
              }}>
              <Image style={styles.bannerImage} source={{uri: adv.pic}} resizeMode={'cover'} />
            </TouchableOpacity>
          );
        })}
      </UGSwiper>
    </View>
  );
};

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

export default HomeBannerComponent;
