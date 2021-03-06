import React, { useState } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { Icon } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { MarqueeVertical } from 'react-native-marquee-ab'
import { scale } from '../../../public/tools/Scale'
import { INoticePop } from '../../../redux/model/home/INoticeBean'
import { deleteHtml } from '../../../public/tools/StringUtil'

interface HeadlineBlockProps {
  containerStyle?: ViewStyle
  headlines: INoticePop[]
  headLineLogo: string
  onPressHeadline: (item: any) => any
}

const HeadlineBlock = ({ onPressHeadline, headlines, headLineLogo = '', containerStyle }: HeadlineBlockProps) => {
  const [display, setDisplay] = useState(true)
  const cleanContents = headlines.map((headline, index) => ({ label: index.toString(), value: deleteHtml(headline?.content) }))
  return display ? (
    <View style={[styles.container, containerStyle]}>
      <View style={{ flex: 70 }}>
        <FastImage resizeMode={'contain'} style={{ width: '90%', height: '90%' }} source={{ uri: headLineLogo }} />
      </View>
      <View style={{ flex: 300 }}>
        <MarqueeVertical width={scale(390)} height={scale(100)} textList={cleanContents} numberOfLines={1} onTextClick={onPressHeadline} speed={60} onPressText={onPressHeadline} />
      </View>
      <TouchableWithoutFeedback onPress={() => setDisplay(false)}>
        <View style={styles.closeButton}>
          <Icon type={'antdesign'} name={'close'} color={'#ffffff'} size={scale(12)} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 112,
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    paddingLeft: scale(15),
    paddingRight: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    width: scale(20),
    aspectRatio: 1,
    backgroundColor: '#ff861b',
    position: 'absolute',
    top: scale(5),
    right: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    paddingTop: scale(2),
  },
})

export default HeadlineBlock
