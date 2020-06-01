import { Image, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Component } from 'react';
import { Res } from '../../../Res/icon/Resources';
import StringUtils from '../../../public/tools/StringUtils';
import INoticeBean from '../../../redux/model/home/INoticeBean';

interface IProps {
  containerStyle?: {}
}

/**
 * 主页公告,信息 等等内容
 */
export default class HomeTabComponent extends Component<IProps> {
  /**
   * 绘制 公告,信息 等等内容
   * @private
   */

  /*
        <View style={styles.noticeContainer}>
        <Image resizeMode="stretch" style={styles.noticeTextImage} source={Res.gd} />
        <Text style={styles.noticeDesText}>{StringUtils.getInstance().deleteHtml(noticeArr[0].content)}</Text>
      </View>
      */

  render(): React.ReactNode {
    const { containerStyle } = this.props
    return (
      <View style={[{ width: '100%', aspectRatio: 540 / 112, backgroundColor: '#ffffff', borderRadius: 15 }, containerStyle]}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  //公告
  noticeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  noticeTextImage: {
    width: 27,
    height: 13,
    resizeMode: 'contain',
  },
  noticeDesText: {
    fontSize: 12,
    color: '#000000',
    paddingLeft: 8,
    paddingRight: 8,
  },
});
