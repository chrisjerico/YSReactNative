import {Image, StyleSheet, Text, View, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import * as React from 'react';
import {Component} from 'react';
import {Res} from '../../../Res/icon/Resources';
import StringUtils from '../../../public/tools/StringUtils';
import INoticeBean from '../../../redux/model/home/INoticeBean';
import {headImage} from '../helpers/config';
import {scale} from '../helpers/function';
import {MarqueeVertical} from 'react-native-marquee-ab';
import Icon from 'react-native-vector-icons/AntDesign';

const defaultHeadLine = [
  {
    label: '0',
    value: '【六合厅公告】彩民必读→这里有彩民都想了解的问题，如有其他问题可以在评论区说出自己的想法！',
  },
  {
    label: '1',
    value: '009期【尺寸之功】、17中15、吉美凶丑中特、全网最稳资料',
  },
];

interface HomeHeadlineComponentProps {
  containerStyle?: ViewStyle;
}

const HomeHeadlineComponent = ({containerStyle}: HomeHeadlineComponentProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{flex: 70}}>
        <Image resizeMode={'contain'} style={{width: '90%', height: '90%'}} source={{uri: headImage}} />
      </View>
      <View style={{flex: 300}}>
        <MarqueeVertical width={scale(390)} height={scale(100)} textList={defaultHeadLine} />
      </View>
      <TouchableOpacity style={styles.closeButton}>
        <Icon name={'close'} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
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

export default HomeHeadlineComponent;
