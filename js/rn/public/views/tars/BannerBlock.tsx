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
  showOnlineNum?: boolean;
  autoplayTimeout: number;
  visible?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  badgeStyle?: ViewStyle | ViewStyle[];
  showsPagination?: boolean;
}

const BannerBlock = ({
  onlineNum = 0,
  banners = [],
  renderBanner,
  showOnlineNum = true,
  autoplayTimeout,
  visible = true,
  containerStyle,
  badgeStyle,
  showsPagination = true
}: BannerBlockProps) => {
  if (visible) {
    return (
      <View style={[styles.container, containerStyle]}>
        <UGSwiper
          autoplayTimeout={autoplayTimeout}
          showsPagination={showsPagination}
          paginationStyle={{
            bottom: 10,
            left: null,
            right: 10,
          }}
          dotColor={'#ffffff'}
          activeDotColor={'#fff000'}
        >
          {banners?.map(renderBanner)}
        </UGSwiper>
        {showOnlineNum && (
          <Badge
            textStyle={{ fontSize: scale(18) }}
            badgeStyle={[
              styles.badge,
              {
                top: scale(-200),
                right: scale(10),
              },
              badgeStyle
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
    aspectRatio: 540 / 128 //540 / 310,
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
