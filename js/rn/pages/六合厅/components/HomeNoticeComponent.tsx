import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MarqueeHorizontal } from 'react-native-marquee-ab';
import PushHelper from '../../../public/define/PushHelper';
import StringUtils from '../../../public/tools/StringUtils';
import { INoticeScroll } from '../../../redux/model/home/INoticeBean';
import { defaultNotices, noticeImage } from '../helpers/config';
import { scale } from '../helpers/function';

interface HomeNoticeComponentProps {
  notices: INoticeScroll[];
  containerStyle?: ViewStyle;
}

const HomeNoticeComponent = ({notices = defaultNotices, containerStyle}: HomeNoticeComponentProps) => {
  const cleanContents = notices.map((notice,index) => ({label: index.toString() , value: StringUtils.getInstance().deleteHtml(notice?.title)}) )
  const gotoNotice = () => PushHelper.pushLogin();

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={gotoNotice}>
      <View style={styles.iconContainer}>
        <Image resizeMode={'stretch'} style={styles.iconImage} source={{uri: noticeImage}} />
      </View>
      <View style={styles.noticContainer}>
        <MarqueeHorizontal width={scale(430)} height={'70%'} textStyle={styles.textStyle} textList={cleanContents} />
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

export default HomeNoticeComponent;
