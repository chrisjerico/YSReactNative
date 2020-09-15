import React from 'react'
import {Alert, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle} from 'react-native'
import { BZHThemeColor } from '../../../public/theme/colors/BZHThemeColor'
import { scale } from '../../../public/tools/Scale'
import Avatar from '../../../public/views/tars/Avatar'
import LinearBadge from '../../../public/views/tars/LinearBadge'
import ReLoadBalanceComponent from '../../../public/components/tars/ReLoadBalanceComponent'
import LinearGradient from "react-native-linear-gradient";
import {HJThemeColor} from "../../../public/theme/colors/HJThemeColor";
import {colorEnum} from "../../尊龙/enum/colorEnum";
import {Icon} from "react-native-elements";
import {navigate} from "../../../public/navigation/RootNavigation";
import {PageName} from "../../../public/navigation/Navigation";
import PushHelper from "../../../public/define/PushHelper";
import {UGUserCenterType} from "../../../redux/model/全局/UGSysConfModel";
import FastImage from "react-native-fast-image";

interface ProfileBlockProps {
  balance: string | number;
  features: any[];
  renderFeature: (item: any, index: number) => any;
  avatar: string;
  containerStyle?: ViewStyle;
  name: string;
  level: string;
  onPressAvatar: () => any;
}

const ProfileBlock = ({
  avatar,
  balance,
  features,
  renderFeature,
  containerStyle,
  name,
  level,
  onPressAvatar
}: ProfileBlockProps) => {
  return (
    <View style={[_styles.container, containerStyle]}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 2.0 }} colors={HJThemeColor.黑金.menuHeadViewColor}
                      style={_styles.hjTopBlock}/>
      <View style={_styles.whiteBlock}>
        <View style={_styles.profileContainer}>
          <Avatar uri={avatar} onPress={onPressAvatar} />
          <View style={_styles.moneyContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={_styles.text}>{name}</Text>
              <LinearBadge
                containerStyle={{ borderRadius: scale(5), width: null }}
                textStyle={{ paddingHorizontal: scale(10) }}
                title={level}
                colors={['#0080FF', '#97CBFF']}
                showIcon={false}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: scale(10) }}>
              <ReLoadBalanceComponent
                animatedContainerStyle={{ marginTop: scale(3) }}
                title={'余额 ¥ '}
                titleStyle={{ fontSize: scale(22) }}
                balance={balance}
                balanceStyle={{ color: '#000000', fontSize: scale(22) }}
                color={'#000000'}
                size={20}
              />
            </View>
          </View>
        </View>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 2.0 }} colors={HJThemeColor.黑金.progressBgColor}
                        style={_styles.featureBlock}>
          <View style={_styles.featureContainer}>
            {
              features.map(renderFeature)
            }
          </View>
        </LinearGradient>

      </View>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 500 / 250,
    backgroundColor: HJThemeColor.黑金.homeContentSubColor,
    paddingBottom: scale(30)
  },
  hjTopBlock: {
    width: '100%',
    height: '80%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  featureBlock: {
    width: '100%',
    height: '60%',
    borderRadius: 8,
  },
  whiteBlock: {
    height: '100%',
    position: 'absolute',
    top: scale(10),
    paddingTop: scale(15),
    width: '95%',
    alignSelf: 'center',
  },
  profileContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(35),
  },
  featureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(35),
  },
  text: {
    fontSize: scale(25),
    fontWeight: '400',
    paddingRight: scale(10)
  },
  moneyContainer: {
    flex: 1,
    paddingLeft: scale(30),
    justifyContent: 'flex-end',
    paddingBottom: scale(10),
  },
})

export default ProfileBlock
