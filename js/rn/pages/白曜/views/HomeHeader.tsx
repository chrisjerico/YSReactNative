import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'
import Button from '../../../public/views/tars/Button'

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
        <View style={styles.row}>
          <View style={styles.left}>
            {isTest ? (
              <Button
                title={'注 册'}
                containerStyle={styles.button}
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
          <View style={styles.row}>
            <View style={styles.left}>
              <Button
                title={'登 录'}
                containerStyle={styles.button}
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
                title={'注 册'}
                containerStyle={styles.button}
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
    width: scale(65),
    backgroundColor: '#d82e2f',
    borderColor: '#fefefe',
    borderWidth: scale(1.5),
    paddingVertical: scale(5),
    borderRadius: scale(5),
  },
  buttonTitle: {
    fontSize: scale(18),
    color: '#ffffff',
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
