import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MarqueeVertical } from 'react-native-marquee-ab';
import StringUtils from '../../../../public/tools/StringUtils';
import { INoticePop } from '../../../../redux/model/home/INoticeBean';
import { scale } from '../../../../helpers/function';
import FastImage from 'react-native-fast-image';
import { Icon } from 'react-native-elements'

interface HeadlineBlockProps {
  containerStyle?: ViewStyle;
  headlines: INoticePop[];
  headLineLogo: string
  onPressHeadline: (item: any) => any
}

const HeadlineBlock = ({ onPressHeadline, headlines, headLineLogo = '', containerStyle }: HeadlineBlockProps) => {

  const [display, setDisplay] = useState(true)
  const cleanContents = headlines.map((headline, index) => ({ label: index.toString(), value: StringUtils.getInstance().deleteHtml(headline?.content) }))
  return (
    display ?
      <View style={[styles.container, containerStyle]}>
        <View style={{ flex: 70 }}>
          <FastImage resizeMode={'contain'} style={{ width: '90%', height: '90%' }} source={{ uri: headLineLogo }} />
        </View>
        <View style={{ flex: 300 }}>
          <MarqueeVertical width={scale(390)} height={scale(100)} textList={cleanContents} numberOfLines={1} onTextClick={onPressHeadline} speed={60} onPressText={onPressHeadline} />
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => setDisplay(false)}>
          <Icon type={'antdesign'} name={'close'} color={'#ffffff'} size={scale(12)} />
        </TouchableOpacity>
      </View> : null
  );
};

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
});

export default HeadlineBlock;
