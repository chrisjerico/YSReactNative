import React from 'react'
import { StyleSheet, View } from 'react-native'
import { List } from '../../../../public/network/Model/BannerModel'
import UGSwiper from '../../../../public/widget/swp/UGSwiper'

interface BannerBlockProps {
  banners: List[]
  renderBanner: (item: List, index: number) => any
}

const BannerBlock = (props: BannerBlockProps) => {
  const { banners = [], renderBanner } = props
  return (
    <View style={styles.container}>
      <UGSwiper>{banners.map(renderBanner)}</UGSwiper>
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
