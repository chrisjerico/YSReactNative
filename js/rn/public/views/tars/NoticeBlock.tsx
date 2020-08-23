import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import { MarqueeHorizontal } from 'react-native-marquee-ab'
import { INoticeScroll } from '../../../redux/model/home/INoticeBean'
import { scale } from '../../tools/Scale'

interface NoticeBlockProps {
  logo?: string;
  logoText?: string
  notices: INoticeScroll[];
  containerStyle?: ViewStyle;
  onPressNotice: (item: any) => any;
  iconContainerStyle?: ViewStyle
  logoTextStyle?: TextStyle
}

const NoticeBlock = ({
  logo,
  logoText = '公告',
  notices,
  containerStyle,
  onPressNotice,
  iconContainerStyle,
  logoTextStyle
}: NoticeBlockProps) => {
  const cleanContents = notices.map((notice, index) => ({
    label: index.toString(),
    value: notice?.title,
    content: notice?.content
  }))

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.iconContainer, iconContainerStyle]}>
        {logo ? <FastImage
          resizeMode={'stretch'}
          style={styles.iconImage}
          source={{ uri: logo }}
        /> :
          <Text style={[styles.logoTextStyle, logoTextStyle]}>{logoText}</Text>
        }
      </View>
      <View style={styles.noticContainer}>
        <MarqueeHorizontal
          width={scale(430)}
          height={'70%'}
          textStyle={styles.textStyle}
          textList={cleanContents}
          speed={60}
          onTextClick={onPressNotice}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 50,
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 70,
    alignItems: 'center',
  },
  iconImage: {
    width: '30%',
    aspectRatio: 1,
  },
  noticContainer: {
    flex: 450,
    height: '100%',
    justifyContent: 'center'
  },
  textStyle: {
    color: '#999999',
    fontSize: scale(25)
  },
  logoTextStyle: {
    fontSize: scale(25)
  }
})

export default NoticeBlock
