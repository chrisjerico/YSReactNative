import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import PushHelper from '../../../public/define/PushHelper';
import {UGColor} from '../../../public/theme/UGThemeColor';
import UGSwiper from '../../../public/widget/swp/UGSwiper';
import {IBannerDataItem} from '../../../redux/model/home/IBannerAdvBean';
import {defaultBanners} from '../helpers/config';

interface HomeBannerComponentProps {
  banners: IBannerDataItem[];
}

const HomeBannerComponent = ({banners = defaultBanners}: HomeBannerComponentProps) => {
  const gotoBanner = (banner: IBannerDataItem) => {
    const {linkCategory, linkPosition} = banner;
    console.log('-----linkCategory-----', linkCategory);
    console.log('-----linkPosition-----', linkPosition);
    PushHelper.pushCategory(linkCategory, linkPosition);
  };

  return (
    <View style={styles.bannerWrapper}>
      <UGSwiper>
        {banners.map((banner: IBannerDataItem, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={[styles.bannerContainer, {backgroundColor: UGColor.placeholderColor2}]}
              onPress={() => {
                gotoBanner(banner);
              }}>
              <Image style={styles.bannerImage} source={{uri: banner.pic}} resizeMode={'cover'} />
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
