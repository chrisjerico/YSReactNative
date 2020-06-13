import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MarqueeHorizontal } from 'react-native-marquee-ab';
import { INoticeScroll } from '../../../../redux/model/home/INoticeBean';
import { scale } from '../../helpers/function';

interface NoticeBlockProps {
  notices: INoticeScroll[];
  containerStyle?: ViewStyle;
  onPressNotice: (item: any) => any
}

const NoticeBlock = ({ notices, containerStyle, onPressNotice }: NoticeBlockProps) => {
  const cleanContents = notices.map((notice, index) => ({ label: index.toString(), value: notice?.title }))

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} >
      <View style={styles.iconContainer}>
        <Text>{'公告'}</Text>
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