import React from 'react'
import { StyleSheet, View } from 'react-native'
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
}

interface BadgePosition {
  top: number;
  right: number;
}

const BannerBlock = ({
  onlineNum = 0,
  banners = [],
  renderBanner,
  badgePosition = { top: scale(-200), right: scale(10) },
  showOnlineNum = true,
  autoplayTimeout
}: BannerBlockProps) => {
  const { top, right } = badgePosition
  return (
    <View style={styles.container}>
      <UGSwiper
        autoplayTimeout={autoplayTimeout}
        showsPagination={true}
        paginationStyle={{
          bottom: 10,
          left: null,
          right: 10
        }}
      >
        {banners?.map(renderBanner)}
      </UGSwiper>
      {showOnlineNum && (
        <Badge
          badgeStyle={[
            styles.badge,
            {
              top,
              right,
            },
          ]}
          value={'当前在线' + onlineNum}
        />
      )}
    </View>
  )
}

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
  badge: {
    position: 'absolute',
    backgroundColor: '#333333',
    borderColor: '#333333',
  },
})

export default BannerBlock
