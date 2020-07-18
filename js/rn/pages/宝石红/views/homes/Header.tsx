import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { BZHThemeColor } from '../../../../public/theme/colors/BZHThemeColor'
import { scale } from '../../../../public/tools/Scale'

interface HeaderProps {
  name: string;
  money: string;
  uid: string;
  onPressSignIn: () => any;
  onPressSignUp: () => any;
  onPressUser: () => any;
  isTest: boolean;
  logo: string;
}

const Header = ({
  uid,
  name = '',
  money = '',
  onPressSignIn,
  onPressSignUp,
  onPressUser,
  isTest,
  logo,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      {uid ? (
        <View style={styles.row}>
          <View style={styles.left}>
            {isTest ? (
              <Button
                title={'注册'}
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                onPress={onPressSignUp}
              />
            ) : null}
          </View>
          <View style={styles.imageContainer}>
            <FastImage
              source={{
                uri: logo,
              }}
              style={styles.logo}
              resizeMode={'contain'}
            />
          </View>
          <TouchableOpacity style={styles.right} onPress={onPressUser}>
            <Text numberOfLines={1}>{name}</Text>
            <Text>{'￥' + money}</Text>
          </TouchableOpacity>
        </View>
      ) : (
          <View style={styles.row}>
            <View style={styles.left}>
              <Button
                title={'登陆'}
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                onPress={onPressSignIn}
              />
            </View>
            <View style={styles.imageContainer}>
              <FastImage
                source={{
                  uri: logo,
                }}
                style={styles.logo}
                resizeMode={'contain'}
              />
            </View>
            <View style={styles.right}>
              <Button
                title={'注册'}
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                onPress={onPressSignUp}
              />
            </View>
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 60,
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    flexDirection: 'row',
    paddingHorizontal: scale(25),
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: scale(20),
    color: '#ffffff',
  },
  button: {
    width: scale(80),
    backgroundColor: '#CE0000',
    borderColor: '#ffffff',
    borderWidth: scale(1),
    paddingVertical: scale(5),
  },
  buttonTitle: {
    fontSize: scale(25),
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: { flex: 1 },
  right: { flex: 1, alignItems: 'flex-end' },
})

export default Header
