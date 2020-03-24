import {Image, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import * as React from "react";
import IReducerState from "../../../redux/inter/IReducerState";
import IHomeBean from "../../../redux/inter/bean/home/IHomeBean";
import {anyNull} from "../../../utils/Ext";
import {Avatar, Divider} from "react-native-elements";
import {Component} from "react";
import {Res} from "../../../../res/Resources";
import UGTheme from "../../../theme/UGTheme";
import IHomeProps from "./IHomeProps";
import IHomePageState from "./IHomePageState";

const {
  loadingBackground, colorText, homeMoney, colorAccent, colorSecondBackground, primary, primaryDark, primaryBright
} = UGTheme.getInstance().currentTheme();
/**
 * 主页个人信息
 */
export default class HomeNewsComponent extends Component<IHomeProps, IHomePageState> {


  /**
   * 绘制投注专栏
   *
   * @private
   */
  _renderNews(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;

    return (
      <View key='_renderNews'>
        <View style={_styles.betTitleContainer}>
          <Text style={_styles.betTitle}>投注专栏</Text>
        </View>
        {
          data.data.movie.movies.map((movie, index) => (
            <View style={[
              _styles.betContainer,
              {backgroundColor: colorSecondBackground}
            ]} key={index}>
              <View style={_styles.betUserContainer}>
                <Avatar rounded containerStyle={_styles.betUserAvatar} source={Res.home}/>
                <Text style={_styles.betUserName}>j***01</Text>
                <Text style={_styles.betUserDate}>2020-02-12 11:28:44</Text>
              </View>
              <View style={_styles.betMessageContainer}>
                <Image style={_styles.betMessageImage} source={Res.home}/>
                <Text style={_styles.betMessageText}>{movie.title}
                  <Text style={_styles.betMessageText2}>¥100.00</Text>
                  <Text style={_styles.betMessageText}>{movie.title}</Text>
                </Text>
              </View>
            </View>
          ))
        }
      </View>
    );
  }

  render(): React.ReactNode {
    return this._renderNews();
  }

}

const _styles = StyleSheet.create({


  //下注
  betTitleContainer: {
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
  },
  betTitle: {
    fontSize: 14,
    color: 'white',
  },
  betContainer: {
    borderRadius: 4,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 12,
  },
  betUserContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  betUserAvatar: {
    width: 20,
    height: 20,
  },
  betUserName: {
    fontSize: 12,
    marginLeft: 12,
    flex: 1,
  },
  betUserDate: {
    fontSize: 12,
    marginLeft: 12,
  },
  betUser: {
    fontSize: 12,
  },
  betMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
  },
  betMessageImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  betMessageText: {
    fontSize: 18,
    flex: 1,
  },
  betMessageText2: {
    fontSize: 18,
    color: 'red',
  },

});
