import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { scale } from '../../../../helpers/function';

interface HeaderProps {
  name: string;
  avatar: string;
  leftLogo: string;
  rightLogo: string;
  showLogout: boolean;
  onPressSignOut: () => any;
  onPressSignIn: () => any;
  onPressSignUp: () => any;
  onPressTryPlay: () => any
  onPressLogo: () => any
}

const Header = ({ avatar = '', name = '', leftLogo = '', rightLogo = '', showLogout = false, onPressSignOut, onPressSignIn, onPressSignUp, onPressTryPlay, onPressLogo }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
        <FastImage resizeMode={'contain'} style={styles.image} source={{ uri: leftLogo }} />
      </View>
      <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        {showLogout ? (
          <>
            <Avatar size={'small'} rounded source={{ uri: avatar }} />
            <Text style={{ color: '#ffffff', fontSize: scale(23), paddingHorizontal: scale(5) }}>{name}</Text>
            <Badge
              value={'退出'}
              onPress={onPressSignOut}
              badgeStyle={{ backgroundColor: '#ffffff', paddingLeft: scale(10), paddingRight: scale(10), width: scale(75), height: scale(32), borderRadius: scale(75) }}
              textStyle={{ color: '#2894FF', fontSize: scale(20) }}
            />
            <Text style={styles.text}>{' | '}</Text>
            <TouchableOpacity onPress={onPressLogo}>
              <FastImage style={{ width: scale(40), aspectRatio: 1 }} resizeMode={'contain'} source={{ uri: rightLogo }} />
            </TouchableOpacity>
          </>
        ) : (
            <>
              <TouchableOpacity onPress={onPressLogo}>
                <FastImage style={{ width: scale(40), aspectRatio: 1 }} resizeMode={'contain'} source={{ uri: rightLogo }} />
              </TouchableOpacity>
              <Text style={styles.text}>{' | '}</Text>
              <TouchableOpacity onPress={onPressSignIn}>
                <Text style={styles.text} >
                  {'登入'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.text}>{' | '}</Text>
              <TouchableOpacity onPress={onPressSignUp}>
                <Text style={styles.text} >
                  {'註冊'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.text}>{' | '}</Text>
              <TouchableOpacity onPress={onPressTryPlay}>
                <Text style={styles.text} >
                  {'試玩'}
                </Text>
              </TouchableOpacity>
            </>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 60,
    backgroundColor: '#2894FF',
    flexDirection: 'row',
    paddingHorizontal: scale(25),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: scale(20),
    color: '#ffffff',
  },
});

export default Header;
