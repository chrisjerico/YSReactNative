import { Image, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Component } from 'react';
import { Res } from '../../../Res/icon/Resources';
import StringUtils from '../../../public/tools/StringUtils';
import INoticeBean from '../../../redux/model/home/INoticeBean';

interface IProps {
  reducerData: INoticeBean;
}

/**
 * 主页公告,信息 等等内容
 */
export default class HomeNoticeComponent extends Component<IProps> {
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
    let noticeArr = this.props.reducerData?.scroll || defaultNotice;
    return (
      <View style={{ width: '100%', aspectRatio: 540 / 60, justifyContent: 'center' }}>
        <View style={{ width: '100%', aspectRatio: 540 / 40, backgroundColor: '#ffffff', borderRadius: 15, flexDirection: 'row', alignItems: 'center' }}>
          <Image resizeMode="stretch" style={styles.noticeTextImage} source={Res.gd} />
          <Text style={styles.noticeDesText}>{StringUtils.getInstance().deleteHtml(noticeArr[0].content)}</Text>
        </View>
      </View>
    );
  }
}

const defaultNotice = [{
  "content": "公告公告公告公告公告公"
}]

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
    paddingLeft: 5
  },
  noticeDesText: {
    fontSize: 12,
    color: '#000000',
    paddingLeft: 8,
    paddingRight: 8,
  },
});
