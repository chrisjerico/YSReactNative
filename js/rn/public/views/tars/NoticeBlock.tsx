import React, { memo } from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle, StyleProp } from 'react-native'
import FastImage from 'react-native-fast-image'
import { MarqueeHorizontal } from 'react-native-marquee-ab'
import { INoticeScroll } from '../../../redux/model/home/INoticeBean'
import { scale } from '../../tools/Scale'
import AppDefine from '../../define/AppDefine'
import { ugLog } from '../../tools/UgLog'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface NoticeBlockProps {
  logo?: string
  logoText?: string
  notices: INoticeScroll[]
  onPressNotice: (item: any) => any
  iconContainerStyle?: StyleProp<ViewStyle>
  logoTextStyle?: StyleProp<TextStyle>
  textStyle?: StyleProp<TextStyle>
  bgContainerStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const NoticeBlock = ({ logo, logoText = '公告', notices, containerStyle, onPressNotice, iconContainerStyle, logoTextStyle, textStyle, bgContainerStyle }: NoticeBlockProps) => {
  const cleanContents = notices.map((notice, index) => {
      let _content = (index == (notices.length -1)) ? notice?.content : notice?.content + '<div class="fgx" style="border: 1px dashed #9a9898;margin-bottom: 10px;"></div>'
      return ({
        label: index.toString(),
        value: notice?.title,
        content: _content,
      })
    })

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.iconContainer, iconContainerStyle]}>
        {logo ? <FastImage resizeMode={'contain'} style={styles.iconImage} source={{ uri: logo }} /> : <UGText style={[styles.logoTextStyle, logoTextStyle]}>{logoText}</UGText>}
      </View>
      <View style={styles.noticContainer}>
        <MarqueeHorizontal
          width={AppDefine.width * 0.85} height={null} textStyle={textStyle} textList={cleanContents.concat(cleanContents).concat(cleanContents)} speed={60}
          onTextClick={() => onPressNotice({ content: cleanContents.map((ele) => ele.content).join('<hr style="border : 1px dashed #999;"/>') })}
          bgContainerStyle={bgContainerStyle} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: scale(50),
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconImage: {
    height: '60%',
    aspectRatio: 1,
  },
  noticContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#999999',
    fontSize: scale(25),
  },
  logoTextStyle: {
    fontSize: scale(25),
  },
})

export default memo(NoticeBlock)
