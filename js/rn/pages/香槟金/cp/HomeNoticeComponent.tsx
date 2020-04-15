import {Image, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {Component} from 'react';
import {arrayEmpty} from '../../../public/tools/Ext';
import {Res} from '../../../Res/icon/Resources';
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
  _renderNotice(): React.ReactNode {
    let noticeArr = this.props.reducerData?.scroll;
    if (arrayEmpty(noticeArr)) return null;

    return (
      <View style={_styles.noticeContainer} key="_renderNotice">
        <Image resizeMode="stretch" style={_styles.noticeTextImage} source={Res.gd} />
        <Text style={_styles.noticeDesText}>{StringUtils.getInstance().deleteHtml(noticeArr[0].content)}</Text>
      </View>
    );
  }

  render(): React.ReactNode {
    return this._renderNotice();
  }
}

const _styles = StyleSheet.create({
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
    color: 'white',
    paddingLeft: 8,
    paddingRight: 8,
  },
});
