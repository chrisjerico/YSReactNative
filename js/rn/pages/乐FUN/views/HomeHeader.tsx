import React from 'react'
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import FastImage from 'react-native-fast-image'
import {scale} from '../../../public/tools/Scale'
import Button from '../../../public/views/temp/Button'
import { TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import { skinColors } from '../../../public/theme/const/UGSkinColor'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface HomeHeaderProps {
  name: string;
  balance: string;
  uid: string;
  onPressSignIn: () => any;
  onPressSignUp: () => any;
  onPressUser: () => any;
  isTest: boolean;
  logo: string;
  easyRememberDomain: string;
}

const USER_ICON = 'http://t126f.fhptcdn.com/views/mobileTemplate/9/images/gezx.png';

const HomeHeader = ({
                      uid,
                      name = '',
                      balance = '',
                      onPressSignIn,
                      onPressSignUp,
                      onPressUser,
                      isTest,
                      logo,
                      easyRememberDomain,
                    }: HomeHeaderProps) => {
  return (
    <>
      {uid ? (
        <View style={_styles.row}>
          <View style={_styles.left}>
            <UGText style={_styles.left_text}>易记网址</UGText>
            <UGText style={_styles.left_text} numberOfLines={1}>{easyRememberDomain}</UGText>
          </View>
          <View style={_styles.imageContainer}>
            <FastImage
              source={{
                uri: logo,
              }}
              style={_styles.logo}
              resizeMode={'contain'}
            />
          </View>
          <TouchableWithoutFeedback onPress={onPressUser}>
            <View style={_styles.right_login}>
              <FastImage
                source={{
                  uri: USER_ICON,
                }}
                style={_styles.user_icon}
                resizeMode={'contain'}
              />
              <UGText
                numberOfLines={1}
                style={{color: 'white', fontSize: scale(20), flex:1}}>
                {name}
              </UGText>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <View style={_styles.row}>
          <View style={_styles.left}>
            <UGText style={_styles.left_text}>易记网址</UGText>
            <UGText style={_styles.left_text} numberOfLines={1}>{easyRememberDomain}</UGText>
          </View>
          <View style={_styles.imageContainer}>
            <FastImage
              source={{
                uri: logo,
              }}
              style={_styles.logo}
              resizeMode={'contain'}
            />
          </View>
          <View style={_styles.right_button_container}>
            <Button
              title={'登录'}
              containerStyle={_styles.button}
              titleStyle={_styles.buttonTitle}
              onPress={onPressSignIn}
            />
            <Button
              title={'|'}
              containerStyle={_styles.button_divider}
              titleStyle={_styles.buttonTitle}
              onPress={onPressSignIn}
            />
            <Button
              title={'注册'}
              containerStyle={_styles.button}
              titleStyle={_styles.buttonTitle}
              onPress={onPressSignUp}
            />
          </View>
        </View>
      )}
    </>
  )
}

const _styles = StyleSheet.create({
  text: {
    fontSize: scale(20),
    color: '#ffffff',
  },
  button: {
    paddingHorizontal: scale(4),
    paddingVertical: scale(5),
  },
  button_divider: {
  },
  left_text: {
    fontSize: scale(18),
    color: skinColors.textColor2.乐FUN,
  },
  buttonTitle: {
    fontSize: scale(26),
    color: skinColors.textColor2.乐FUN,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  user_icon: {
    height: '50%',
    aspectRatio: 1,
    marginRight: scale(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    width:180,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal:10,
  },
  left: {},
  right_button_container: {
    flex:1,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
  },
  right_login: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
  },
})

export default HomeHeader
