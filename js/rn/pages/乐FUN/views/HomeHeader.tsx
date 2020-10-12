import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'
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
}

const HomeHeader = ({
  uid,
  name = '',
  balance = '',
  onPressSignIn,
  onPressSignUp,
  onPressUser,
  isTest,
  logo,
}: HomeHeaderProps) => {
  return (
    <>
      {uid ? (
        <View style={_styles.row}>
          <View style={_styles.left}>
            {isTest ? (
              <Button
                title={'注册'}
                containerStyle={_styles.button}
                titleStyle={_styles.buttonTitle}
                onPress={onPressSignUp}
              />
            ) : null}
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
            <View style={_styles.right}>
              <Text
                numberOfLines={1}
                style={{ color: '#ffffff', fontSize: scale(18) }}
              >
                {name}
              </Text>
              <Text
                numberOfLines={1}
                style={{ color: '#ffffff', fontSize: scale(18) }}
              >
                {'￥' + balance}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
          <View style={_styles.row}>
            <View style={_styles.left}/>
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
                title={'登录/注册/试玩'}
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
    borderColor: LEFThemeColor.乐FUN.textColor1,
    borderWidth: scale(1.5),
    paddingVertical: scale(5),
    borderRadius: scale(5),
  },
  buttonTitle: {
    fontSize: scale(18),
    color: LEFThemeColor.乐FUN.textColor1,
  },
  logo: {
    width: '100%',
    height: '100%',
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
  left: { flex: 1 },
  right: { flex: 1, alignItems: 'flex-end' },
})

export default HomeHeader
