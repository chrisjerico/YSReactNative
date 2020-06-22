import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../../helpers/function'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface HeaderProps {
  name: string;
  money: string;
  uid: string;
  onPressSignIn: () => any;
  onPressSignUp: () => any;
  onPressUser: () => any;
}

const Header = ({
  uid,
  name = '',
  money = '',
  onPressSignIn,
  onPressSignUp,
  onPressUser,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      {uid ? (
        <View style={styles.row}>
          <View style={{ width: scale(100) }} />
          <FastImage
            source={{
              uri:
                'https://cdn01.tianmeilai.com.cn/upload/t010/customise/images/m_logo.jpg?v=1578471928',
            }}
            style={styles.logo}
            resizeMode={'contain'}
          />
          <TouchableOpacity
            style={{ alignItems: 'flex-end', width: scale(100) }}
            onPress={onPressUser}
          >
            <Text>{name}</Text>
            <Text>{'￥' + money}</Text>
          </TouchableOpacity>
        </View>
      ) : (
          <View style={styles.row}>
            <Button
              title={'登陆'}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              onPress={onPressSignIn}
            />
            <FastImage
              source={{
                uri:
                  'https://cdn01.tianmeilai.com.cn/upload/t010/customise/images/m_logo.jpg?v=1578471928',
              }}
              style={styles.logo}
              resizeMode={'contain'}
            />
            <Button
              title={'注册'}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              onPress={onPressSignUp}
            />
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 60,
    backgroundColor: '#e53333',
    flexDirection: 'row',
    paddingHorizontal: scale(25),
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  text: {
    fontSize: scale(20),
    color: '#ffffff',
  },
  button: {
    width: scale(100),
    backgroundColor: '#CE0000',
    borderColor: '#ffffff',
    borderWidth: scale(1),
  },
  buttonTitle: {
    fontSize: scale(15),
  },
  logo: {
    width: scale(100),
    height: '100%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default Header
