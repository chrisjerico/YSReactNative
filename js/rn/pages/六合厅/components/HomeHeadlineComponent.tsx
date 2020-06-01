import {Image, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {Component} from 'react';
import {Res} from '../../../Res/icon/Resources';
import StringUtils from '../../../public/tools/StringUtils';
import INoticeBean from '../../../redux/model/home/INoticeBean';
import {headImage} from '../helpers/config';
import {scale} from '../helpers/function';

interface IProps {
  containerStyle?: {};
}

/**
 * 主页公告,信息 等等内容
 */
export default class HomeHeadlineComponent extends Component<IProps> {
  /**
   * 绘制 公告,信息 等等内容
   * @private
   */

  render(): React.ReactNode {
    const {containerStyle} = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={{flex: 70}}>
          <Image resizeMode={'contain'} style={{width: '90%', height: '90%'}} source={{uri: headImage}} />
        </View>
        <View style={{flex: 300}} />
      </View>
    );
  }
}

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
});
