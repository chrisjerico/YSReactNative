import {Image, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import * as React from "react";
import IReducerState from "../../../../redux/inter/IReducerState";
import IHomeBean from "../../../../redux/inter/bean/home/IHomeBean";
import {anyNull, arrayEmpty} from "../../../../utils/Ext";
import {Divider} from "react-native-elements";
import {Component} from "react";
import {Res} from "../../../../../res/Resources";
import UGTheme from "../../../../theme/UGTheme";
import IHomeProps from "../IHomeProps";
import IHomePageState from "../IHomePageState";
import {FlatGrid} from "react-native-super-grid";
import {IBannerDataItem} from "../../../../redux/inter/bean/home/IBannerAdvBean";
import UGSwiper from "../../../../widget/swp/UGSwiper";
import StringUtils from "../../../../utils/StringUtils";

const {
  loadingBackground, colorText, homeMoney, colorAccent, colorSecondBackground, primary, primaryDark, primaryBright
} = UGTheme.getInstance().currentTheme();
/**
 * 主页公告,信息 等等内容
 */
export default class HomeNoticeComponent extends Component<IHomeProps, IHomePageState> {



  /**
   * 绘制 公告,信息 等等内容
   * @private
   */
  _renderNotice(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    let noticeArr = data?.data?.notice?.data?.scroll;
    if (arrayEmpty(noticeArr)) return null;

    return (
      <View style={_styles.noticeContainer} key='_renderNotice'>
        <Image resizeMode='stretch' style={_styles.noticeTextImage} source={Res.gd}/>
        <Text style={_styles.noticeDesText}>{StringUtils.getInstance().deleteHtml(noticeArr[0].content)}</Text>
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
