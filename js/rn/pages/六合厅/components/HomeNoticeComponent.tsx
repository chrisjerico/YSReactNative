import React from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import {MarqueeHorizontal} from 'react-native-marquee-ab';
import StringUtils from '../../../public/tools/StringUtils';
import INoticeBean from '../../../redux/model/home/INoticeBean';
import {defaultNoticeMessage, noticeImage} from '../helpers/config';
import {scale} from '../helpers/function';

interface HomeNoticeComponentProps {
  reducerData: INoticeBean;
  containerStyle: ViewStyle;
}
/**
 * 主页公告,信息 等等内容
 */
const HomeNoticeComponent = ({containerStyle}: HomeNoticeComponentProps) => {
  //const noticeMessageArr = this.props.reducerData?.scroll
  //const containerStyle = this.props.containerStyle;
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconContainer}>
        <Image resizeMode={'stretch'} style={styles.iconImage} source={{uri: noticeImage}} />
      </View>
      <View style={styles.noticContainer}>
        {/* noticeMessageArr[0].content */}
        <MarqueeHorizontal width={scale(430)} height={'70%'} textStyle={styles.textStyle} textList={[{label: '0', value: StringUtils.getInstance().deleteHtml(defaultNoticeMessage)}]} />
      </View>
    </View>
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
