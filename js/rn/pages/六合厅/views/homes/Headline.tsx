import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MarqueeVertical } from 'react-native-marquee-ab';
import Icon from 'react-native-vector-icons/AntDesign';
import StringUtils from '../../../../public/tools/StringUtils';
import { INoticePop } from '../../../../redux/model/home/INoticeBean';
import { scale } from '../../helpers/function';

interface HeadlineProps {
  containerStyle?: ViewStyle;
  headlines: INoticePop[];
  headLineLogo: string
  onPressHeadline: () => any
}

const Headline = ({onPressHeadline,headlines, headLineLogo= '',containerStyle}: HeadlineProps) => {
  
  const [display,setDisplay] = useState(true)
  const cleanContents = headlines.map((headline,index) => ({label: index.toString() , value: StringUtils.getInstance().deleteHtml(headline?.content)}) )
  return (
    display ? 
    <View style={styles.container}>
      <View style={{flex: 70}}>
        <Image resizeMode={'contain'} style={{width: '90%', height: '90%'}} source={{uri: headLineLogo}} />
      </View>
      <View style={{flex: 300}}>
        <MarqueeVertical width={scale(390)} height={scale(100)} textList={cleanContents} numberOfLines={1} onTextClick={onPressHeadline} speed={60}/>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={() => setDisplay(false)}>
        <Icon name={'close'} color={'#ffffff'} />
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

export default Headline;
