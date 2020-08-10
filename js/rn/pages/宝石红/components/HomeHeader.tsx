import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'

interface HomeHeaderProps {
  name: string;
  money: string;
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
  money = '',
  onPressSignIn,
  onPressSignUp,
  onPressUser,
  isTest,
  logo,
}: HomeHeaderProps) => {
  return (
    <>
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
          <TouchableWithoutFeedback onPress={onPressUser}>
            <View style={styles.right}>
              <Text numberOfLines={1}>{name}</Text>
              <Text numberOfLines={1}>{'￥' + money}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
          <View style={styles.row}>
            <View style={styles.left}>
              <Button
                title={'登录'}
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
    </>
  )
}

const styles = StyleSheet.create({
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
    alignItems: 'flex-start',
  },
  left: { flex: 1 },
  right: { flex: 1, alignItems: 'flex-end' },
})

export default HomeHeader
