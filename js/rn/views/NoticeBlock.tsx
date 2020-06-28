import React from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { MarqueeHorizontal } from 'react-native-marquee-ab'
import { scale } from '../helpers/function'
import { INoticeScroll } from '../redux/model/home/INoticeBean'

interface NoticeBlockProps {
  logo?: string;
  logoString?: string
  notices: INoticeScroll[];
  containerStyle?: ViewStyle;
  onPressNotice: (item: any) => any;
}

const NoticeBlock = ({
  logo,
  logoString = '公告',
  notices,
  containerStyle,
  onPressNotice,
}: NoticeBlockProps) => {
  const cleanContents = notices.map((notice, index) => ({
    label: index.toString(),
    value: notice?.title,
  }))

  return (
    <TouchableOpacity style={[styles.container, containerStyle]}>
      <View style={styles.iconContainer}>
        {logo ? <FastImage
          resizeMode={'stretch'}
          style={styles.iconImage}
          source={{ uri: logo }}
        /> :
          <Text>{logoString}</Text>
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
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 42,
    backgroundColor: '#ffffff',
    borderRadius: 15,
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
  },
  textStyle: {
    color: '#999999',
  },
})

export default NoticeBlock
