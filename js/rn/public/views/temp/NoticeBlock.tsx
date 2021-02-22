import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import { MarqueeHorizontal } from 'react-native-marquee-ab'
import { INoticeScroll } from '../../../redux/model/home/INoticeBean'
import { scale } from '../../tools/Scale'
import AppDefine from '../../define/AppDefine'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface NoticeBlockProps {
  logo?: string;
  logoText?: string;
  notices: INoticeScroll[];
  containerStyle?: ViewStyle | ViewStyle[];
  onPressNotice: (item: any) => any;
  iconContainerStyle?: ViewStyle | ViewStyle[];
  logoTextStyle?: TextStyle | TextStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const NoticeBlock = ({
  logo,
  logoText = '公告',
  notices,
  containerStyle,
  onPressNotice,
  iconContainerStyle,
  logoTextStyle,
  textStyle
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
          <UGText style={[styles.logoTextStyle, logoTextStyle]}>{logoText}</UGText>
        }
      </View>
      <View style={styles.noticContainer}>
        <MarqueeHorizontal
          bgContainerStyle={{backgroundColor: 'transparent'}}
          width={AppDefine.width * 0.85}
          height={null}
          textStyle={textStyle}
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
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    aspectRatio: 1,
  },
  noticContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
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
