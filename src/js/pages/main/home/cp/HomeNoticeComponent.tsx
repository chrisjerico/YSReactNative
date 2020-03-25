import {Image, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {Component} from "react";
import IReducerState from "../../../../redux/inter/IReducerState";
import IHomeBean from "../../../../redux/inter/bean/home/IHomeBean";
import {arrayEmpty} from "../../../../utils/Ext";
import {Res} from "../../../../../res/Resources";
import UGTheme from "../../../../theme/UGTheme";
import StringUtils from "../../../../utils/StringUtils";
import IBasePageProps from "../../../base/IBasePageProps";
import IBasePageState from "../../../base/IBasePageState";

const {
  loadingBackground, colorText, homeMoney, colorAccent, colorSecondBackground, primary, primaryDark, primaryBright
} = UGTheme.getInstance().currentTheme();
/**
 * 主页公告,信息 等等内容
 */
export default class HomeNoticeComponent extends Component<IBasePageProps, IBasePageState> {



  /**
   * 绘制 公告,信息 等等内容
   * @private
   */
  _renderNotice(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    let noticeArr = data?.data?.notice?.scroll;
    if (arrayEmpty(noticeArr)) return null;

    return (
      <View style={_styles.noticeContainer} key='_renderNotice'>
        <Image resizeMode='stretch' style={_styles.noticeTextImage} source={Res.gd}/>
        <Text numberOfLines={1} ellipsizeMode='tail' style={_styles.noticeDesText}>{StringUtils.getInstance().deleteHtml(noticeArr[0].content)}</Text>
      </View>
    )
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
