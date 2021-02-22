import React from 'react'
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import {scale} from '../../../public/tools/Scale'
import Avatar from '../../../public/views/temp/Avatar'
import LinearBadge from '../../../public/views/temp/LinearBadge'
import ReLoadBalanceComponent from '../../../public/components/temp/ReLoadBalanceComponent'
import LinearGradient from "react-native-linear-gradient";
import {colorEnum} from "../../尊龙/enum/colorEnum";
import {Icon} from "react-native-elements";
import {navigate} from "../../../public/navigation/RootNavigation";
import {PageName} from "../../../public/navigation/Navigation";
import PushHelper from "../../../public/define/PushHelper";
import {UGUserCenterItem, UGUserCenterType} from "../../../redux/model/全局/UGSysConfModel";
import FastImage from "react-native-fast-image";
import {ANHelper} from "../../../public/define/ANHelper/ANHelper";
import {CMD} from "../../../public/define/ANHelper/hp/CmdDefine";
import { skinColors } from '../../../public/theme/const/UGSkinColor'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

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
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0.5, y: 2.0}} colors={skinColors.menuHeadViewColor.黑金}
                      style={_styles.hjTopBlock}/>
      <View style={_styles.whiteBlock}>
        <LinearBadge
          containerStyle={_styles.fl}
          textStyle={{paddingHorizontal: scale(10), color: 'white', fontWeight: 'bold'}}
          title={'领取俸禄'}
          colors={['#85a9ff', '#9d69fd']}
          showIcon={false}
          onPress={() => {
            switch (Platform.OS) {
              case 'ios':

                break;
              case 'android':
                ANHelper.callAsync(CMD.ASK_SALARY)
                  .then((data) => {
                  })
                break;
            }
          }}/>

        <View style={_styles.flex}/>

        <View style={_styles.profileContainer}>
          <Avatar uri={avatar} onPress={onPressAvatar}/>
          <View style={_styles.moneyContainer}>
            <View style={{flexDirection: 'row'}}>
              <UGText style={_styles.text}>{name}</UGText>
              <LinearBadge
                containerStyle={{borderRadius: scale(5), width: null}}
                textStyle={{paddingHorizontal: scale(10)}}
                title={level}
                colors={['#85a9ff', '#9d69fd']}
                showIcon={false}/>
            </View>
            <View style={_styles.ye}>
              <ReLoadBalanceComponent
                animatedContainerStyle={{marginTop: scale(3)}}
                title={'余额 ¥ '}
                titleStyle={{fontSize: scale(22)}}
                balance={balance}
                balanceStyle={{color: '#000000', fontSize: scale(22)}}
                color={'#000000'}
                size={20}/>
            </View>
          </View>
        </View>

        <View style={_styles.flex}/>

        <LinearGradient start={{x: 0, y: 0}} end={{x: 0.5, y: 2.0}}
                        colors={skinColors.progressBgColor.黑金}
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
  flex: {
    flex: 1,
  },
  container: {
    width: '100%',
    aspectRatio: 500 / 350,
    backgroundColor: skinColors.homeContentSubColor.黑金,
    paddingBottom: scale(30),
  },
  hjTopBlock: {
    width: '100%',
    height: '85%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  fl: {//俸禄
    borderRadius: scale(5),
    width: 100,
    height: 30,
    marginRight: 16,
    alignSelf: 'flex-end',
  },
  ye: { //余额
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10)
  },
  featureBlock: {
    width: '100%',
    height: '30%',
    borderRadius: 8,
  },
  whiteBlock: {
    height: '100%',
    position: 'absolute',
    top: scale(10),
    paddingTop: scale(15),
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
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
