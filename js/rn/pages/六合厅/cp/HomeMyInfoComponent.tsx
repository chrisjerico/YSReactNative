import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import {Component} from 'react';
import {anyNull} from '../../../public/tools/Ext';
import {Divider} from 'react-native-elements';
import {Res} from '../../../Res/icon/Resources';
import PushHelper from '../../../public/define/PushHelper';
import {UGUserCenterType} from '../../../redux/model/全局/UGSysConfModel';
import IUserBean from '../../../redux/model/user/IUserBean';
import {UGColor} from '../../../public/theme/UGThemeColor';
import {Skin1} from '../../../public/theme/UGSkinManagers';
import {Navigation, PageName} from '../../../public/navigation/Navigation';

interface IProps {
  reducerData: IUserBean;
}

/**
 * 主页个人信息
 */
export default class HomeMyInfoComponent extends Component<IProps> {
  /**
   * 个人菜单
   */
  myInfoMenuArr = [
    {
      url: Res.ck,
      text: '存款',
      onPress: () => {
        //TODO 安卓
        PushHelper.pushUserCenterType(UGUserCenterType.存款);
      },
    },
    {
      url: Res.edzh,
      text: '额度转换',
      onPress: () => {
        //TODO 安卓
        PushHelper.pushUserCenterType(UGUserCenterType.额度转换);
      },
    },
    {
      url: Res.qk,
      text: '取款',
      onPress: () => {
        //TODO 安卓
        PushHelper.pushUserCenterType(UGUserCenterType.取款);
      },
    },
    {
      url: Res.zjmx,
      text: '资金明细',
      onPress: () => {
        //TODO 安卓
        PushHelper.pushUserCenterType(UGUserCenterType.资金明细);
      },
    },
  ];

  /**
   * 绘制存款 取款 等图标
   * @param url
   * @param text
   * @private
   */
  _renderMyInfoIcon = item => {
    const skin = Skin1;
    return (
      <TouchableOpacity onPress={item.onPress}>
        <View key={item.text} style={_styles.myInfoBottomWalletIconContainer}>
          <Image resizeMode="stretch" style={[_styles.myInfoBottomWalletIcon, {tintColor: skin.themeColor}]} source={item.url} />
          <Text style={[_styles.myInfoBottomWalletIconText, {color: skin.themeColor}]}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * 跳转个人中心
   * @private
   */
  _gotoMyInfo = () => {
    Navigation.jump(PageName.XBJMinePage);
  };

  /**
   * 绘制 个个信息 存款 等等内容
   * @private
   */
  _renderMyInfo(): React.ReactNode {
    const userInfo = this.props.reducerData;
    if (anyNull(userInfo)) return null;

    return (
      <View style={_styles.myInfoContainer} key="_renderMyInfo">
        <View style={[_styles.myInfoTopContainer, {backgroundColor: Skin1.themeLightColor}]}>
          <Text style={_styles.myInfoTopText}>{`晚上好，${userInfo.usr}`}</Text>
          <TouchableOpacity onPress={this._gotoMyInfo}>
            <View style={_styles.myInfoTopButton}>
              <Text style={_styles.myInfoTopText}>个人资料</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[_styles.myInfoBottomContainer, {backgroundColor: UGColor.placeholderColor2}]}>
          <View>
            <View style={_styles.myInfoBottomWalletMoneyContainer}>
              <Text style={[_styles.myInfoBottomWalletMoneyFlag, {color: '#3f5bcd'}]}>¥</Text>
              <Text style={[_styles.myInfoBottomWalletMoney, {color: '#3f5bcd'}]}>{userInfo.balance}</Text>
            </View>
            <Text style={_styles.myInfoBottomWalletMe}>我的钱包</Text>
          </View>
          <Divider style={_styles.myInfoBottomWalletDivider} />
          {this.myInfoMenuArr.map(this._renderMyInfoIcon)}
        </View>
      </View>
    );
  }

  render(): React.ReactNode {
    return this._renderMyInfo();
  }
}

const _styles = StyleSheet.create({
  //个人钱包
  myInfoContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 8,
  },
  myInfoTopContainer: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
  },
  myInfoTopText: {
    flex: 1,
    fontSize: 12,
    color: 'white',
  },
  myInfoTopButton: {
    borderWidth: 1,
    borderRadius: 999,
    borderColor: 'white',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
  },
  myInfoBottomContainer: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 26,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
  },
  myInfoBottomWalletContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  myInfoBottomWalletMoneyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myInfoBottomWalletMoneyFlag: {
    fontSize: 14,
  },
  myInfoBottomWalletMoney: {
    fontSize: 20,
  },
  myInfoBottomWalletMe: {
    fontSize: 12,
    marginTop: 6,
  },
  myInfoBottomWalletDivider: {
    width: 1,
    height: 38,
  },
  myInfoBottomWalletIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  myInfoBottomWalletIcon: {
    width: 24,
    height: 18,
  },

  myInfoBottomWalletIconText: {
    fontSize: 12,
    marginTop: 8,
  },
});
