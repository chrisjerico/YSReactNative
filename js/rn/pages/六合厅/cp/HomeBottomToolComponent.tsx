import { Image, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Component } from 'react';
import { Res } from '../../../Res/icon/Resources';
import StringUtils from '../../../public/tools/StringUtils';
import INoticeBean from '../../../redux/model/home/INoticeBean';

const defaultElements = [{}, {}, {}]
const Element = () => <View style={{ backgroundColor: '#ffffff', width: '27%', height: '100%', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>

</View>
interface IProps {
  containerStyle?: {}
}

/**
 * 主页公告,信息 等等内容
 */
export default class HomeBottomToolComponent extends Component<IProps> {
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
      <View style={[{ width: '100%', aspectRatio: 540 / 130, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between' }, containerStyle]}>
        {
          defaultElements.map((ele, index) => <Element key={index} {...ele} />)
        }
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
