import React from 'react'
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import FastImage from 'react-native-fast-image'
import {scale} from '../../../public/tools/Scale'
import Button from '../../../public/views/temp/Button'
import {LEFThemeColor} from "../../../public/theme/colors/LEFThemeColor";

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
            <Text style={_styles.left_text}>易记网址</Text>
            <Text style={_styles.left_text} numberOfLines={1}>{easyRememberDomain}</Text>
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
              <Text
                numberOfLines={1}
                style={{color: 'white', fontSize: scale(20)}}>
                {name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <View style={_styles.row}>
          <View style={_styles.left}>
            <Text style={_styles.left_text}>易记网址</Text>
            <Text style={_styles.left_text} numberOfLines={1}>{easyRememberDomain}</Text>
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
          <View style={_styles.right}>
            <Button
              title={'登录 | 试玩'}
              containerStyle={_styles.button}
              titleStyle={_styles.buttonTitle}
              onPress={onPressSignIn}
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
  left_text: {
    fontSize: scale(18),
    color: LEFThemeColor.乐FUN.textColor2,
  },
  buttonTitle: {
    fontSize: scale(26),
    color: LEFThemeColor.乐FUN.textColor2,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  left: {flex: 1},
  right: {
    flex: 1,
    alignItems: 'flex-end'
  },
  right_login: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
})

export default HomeHeader
