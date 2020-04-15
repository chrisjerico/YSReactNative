import {Image, StyleSheet, View} from 'react-native';
import * as React from 'react';
import {Component} from 'react';
import {anyNull, checkTrue} from '../../../public/tools/Ext';
import Icon from 'react-native-vector-icons/Feather';
import IRedBagBean from '../../../redux/model/home/IRedBagBean';
import {Skin1} from '../../../public/theme/UGSkinManagers';

interface IProps {
  reducerData: IRedBagBean;
}

/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
interface IFloatRedBagState {
  hideRedBag?: boolean; //隐藏红包
}

/**
 * 主页红包
 */
export default class HomeRedBagComponent extends Component<IProps, IFloatRedBagState> {
  /**
   * 绘制红包
   * @private
   */
  _rendRedBag(): React.ReactNode {
    const redBag = this.props.reducerData;
    if (checkTrue(this.state?.hideRedBag) || anyNull(redBag)) return null;

    return (
      <View style={_styles.redContainer}>
        <Image style={_styles.redImage} source={{uri: redBag.redBagLogo}} />
        <Icon
          name="x-circle"
          color={Skin1.themeColor}
          size={25}
          style={_styles.redImageClose}
          onPress={() => {
            this.setState({
              hideRedBag: true,
            });
          }}
        />
      </View>
    );
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
