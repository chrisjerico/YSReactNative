import { Image, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import StringUtils from '../../../public/tools/StringUtils';
import INoticeBean from '../../../redux/model/home/INoticeBean';
import { noticeImage, defaultNoticeMessage } from '../helpers/config'

interface IProps {
  reducerData: INoticeBean;
  containerStyle: {}
}
/**
 * 主页公告,信息 等等内容
 */
export default class HomeNoticeComponent extends Component<IProps> {
  /**
   * 绘制 公告,信息 等等内容
   * @private
   */

  render(): React.ReactNode {

    //const noticeMessageArr = this.props.reducerData?.scroll
    const containerStyle = this.props.containerStyle

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.iconContainer}>
          <Image resizeMode={"stretch"} style={styles.iconImage} source={{ uri: noticeImage }} />
        </View>
        <View style={styles.noticContainer}>
          { /* noticeMessageArr[0].content */}
          <Text style={styles.noticeText}>{StringUtils.getInstance().deleteHtml(defaultNoticeMessage)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 42,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    flex: 70,
    alignItems: 'center'
  },
  iconImage: {
    width: '30%',
    aspectRatio: 1
  },
  noticContainer: {
    flex: 450
  },
  noticeText: {
    //
  }
});
