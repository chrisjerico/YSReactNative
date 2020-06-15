import React from 'react'
import { StyleSheet, View } from 'react-native'
import { List } from '../../../../public/network/Model/BannerModel'
import UGSwiper from '../../../../public/widget/swp/UGSwiper'
import { Badge } from 'react-native-elements'
import { scale } from '../../helpers/function'

interface BannerBlockProps {
  onlineNum: number
  banners: List[]
  renderBanner: (item: List, index: number) => any
}

const BannerBlock = ({
  onlineNum = 0,
  banners = [],
  renderBanner,
}: BannerBlockProps) => {
  return (
    <View style={styles.container}>
      <UGSwiper>{banners.map(renderBanner)}</UGSwiper>
      <Badge
        badgeStyle={{
          position: 'absolute',
          top: scale(-200),
          right: scale(10),
          backgroundColor: '#333333',
          borderColor: '#333333',
        }}
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
})

export default BannerBlock
