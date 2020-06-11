import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {UGColor} from '../../../../public/theme/UGThemeColor';
import UGSwiper from '../../../../public/widget/swp/UGSwiper';
import {IBannerDataItem} from '../../../../redux/model/home/IBannerAdvBean';

interface BannerProps {
  banners: IBannerDataItem[];
  onPressBanner: (banner: IBannerDataItem) => any;
}

const Banner = (props: BannerProps) => {
  const {banners = [], onPressBanner = () => {}} = props;
  return (
    <View style={styles.container}>
      <UGSwiper>
        {banners.map((banner: IBannerDataItem, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={[styles.bannerContainer, {backgroundColor: UGColor.placeholderColor2}]}
              onPress={() => {
                onPressBanner(banner);
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
  container: {
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

export default Banner;
