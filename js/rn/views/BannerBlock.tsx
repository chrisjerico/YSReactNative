import React from 'react'
import { StyleSheet, View } from 'react-native'
import { List } from '../public/network/Model/BannerModel'
import UGSwiper from '../public/widget/swp/UGSwiper'
import { Badge } from 'react-native-elements'

interface BannerBlockProps {
  onlineNum: number
  banners: List[]
  renderBanner: (item: List, index: number) => any
  badgePosition?: BadgePosition
}

interface BadgePosition {
  top: number,
  right: number
}

const BannerBlock = ({
  onlineNum = 0,
  banners = [],
  renderBanner,
  badgePosition = { top: -160, right: 10 }
}: BannerBlockProps) => {

  const { top, right } = badgePosition
  return (
    <View style={styles.container}>
      <UGSwiper>{banners.map(renderBanner)}</UGSwiper>
      <Badge
        badgeStyle={[styles.badge, {
          top,
          right
        }]}
        value={'当前在线' + onlineNum}
      />
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
  }
})

export default BannerBlock
