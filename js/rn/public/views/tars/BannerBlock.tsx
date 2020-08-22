import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Badge } from 'react-native-elements'
import { List } from '../../network/Model/BannerModel'
import { Data } from '../../network/Model/HomeADModel'
import { scale } from '../../tools/Scale'
import UGSwiper from '../../widget/swp/UGSwiper'

interface BannerBlockProps {
  onlineNum?: number;
  banners: (List | Data)[];
  renderBanner: (item: List & Data, index: number) => any;
  badgePosition?: BadgePosition;
  showOnlineNum?: boolean;
  autoplayTimeout: number;
  visible?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
}

interface BadgePosition {
  top: number;
  right: number;
}

const BannerBlock = ({
  onlineNum = 0,
  banners = [],
  renderBanner,
  badgePosition = { top: scale(-300), right: scale(10) },
  showOnlineNum = true,
  autoplayTimeout,
  visible = true,
  containerStyle
}: BannerBlockProps) => {
  const { top, right } = badgePosition
  if (visible) {
    return (
      <View style={[styles.container, containerStyle]}>
        <UGSwiper
          autoplayTimeout={autoplayTimeout}
          showsPagination={true}
          paginationStyle={{
            bottom: 10,
            left: null,
            right: 10,
          }}
        >
          {banners?.map(renderBanner)}
        </UGSwiper>
        {showOnlineNum && (
          <Badge
            textStyle={{ fontSize: scale(18) }}
            badgeStyle={[
              styles.badge,
              {
                top,
                right,
              },
            ]}
            value={'当前在线:' + onlineNum}
          />
        )}
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    //aspectRatio: 540 / 217,
    aspectRatio: 540 / 310,
  },
  bannerContainer: {
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderColor: 'rgba(0,0,0,0)',
  },
})

export default BannerBlock
