import {Image, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import * as React from "react";
import IReducerState from "../../../redux/inter/IReducerState";
import IHomeBean from "../../../redux/inter/bean/home/IHomeBean";
import {anyNull, checkTrue} from "../../../utils/Ext";
import {Avatar, Divider} from "react-native-elements";
import {Component} from "react";
import {Res} from "../../../../res/Resources";
import UGTheme from "../../../theme/UGTheme";
import IHomeProps from "./IHomeProps";
import IHomePageState from "./IHomePageState";
import Icon from "react-native-vector-icons/Feather";

const {
  loadingBackground, colorText, homeMoney, colorAccent, colorSecondBackground, primary, primaryDark, primaryBright
} = UGTheme.getInstance().currentTheme();
/**
 * 主页个人信息
 */
export default class HomeRedBagComponent extends Component<IHomeProps, IHomePageState> {



  /**
   * 绘制红包
   * @private
   */
  _rendRedBag(): React.ReactNode {
    let data: IReducerState<IHomeBean> = this.props.reducerData;
    const redBag = data?.data?.redBag;
    if (checkTrue(this.state?.hideRedBag) || anyNull(redBag.data)) return null;

    return (
      <View style={_styles.redContainer}>
        <Image style={_styles.redImage} source={{uri: redBag.data.redBagLogo}}/>
        <Icon name='x-circle'
              color={colorAccent} size={25}
              style={_styles.redImageClose}
              onPress={() => {
                this.setState({
                  hideRedBag: true,
                })
              }}/>
      </View>
    )
  }

  render(): React.ReactNode {
    return this._rendRedBag();
  }

}

const _styles = StyleSheet.create({

  //红包
  redContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: 150,
    right: 16,
  },
  redImage: {
    width: 60,
    height: 60,
    marginTop: 12,
    resizeMode: 'contain',
  },
  redImageClose: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

});
