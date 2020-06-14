import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MarqueeHorizontal } from 'react-native-marquee-ab';
import { INoticeScroll } from '../../../../redux/model/home/INoticeBean';
import { scale } from '../../helpers/function';

interface NoticeBlockProps {
  logo: string;
  notices: INoticeScroll[];
  containerStyle?: ViewStyle;
  onPressNotice: (item: any) => any
}

const NoticeBlock = ({ logo = '', notices, containerStyle, onPressNotice }: NoticeBlockProps) => {
  const cleanContents = notices.map((notice, index) => ({ label: index.toString(), value: notice?.title }))

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} >
      <View style={styles.iconContainer}>
        <Image resizeMode={'stretch'} style={styles.iconImage} source={{ uri: logo }} />
      </View>
      <View style={styles.noticContainer}>
        <MarqueeHorizontal width={scale(430)} height={'70%'} textStyle={styles.textStyle} textList={cleanContents} speed={60} onTextClick={onPressNotice} />
      </View>
    </TouchableOpacity>
  );
};

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
});

export default NoticeBlock;