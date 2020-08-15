import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { scale } from '../../../public/tools/Scale';
import Avatar from '../../../public/views/tars/Avatar';

interface HomeHeaderProps {
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

const HomeHeader = ({ avatar = '', name = '', leftLogo = '', rightLogo = '', showLogout = false, onPressSignOut, onPressSignIn, onPressSignUp, onPressTryPlay, onPressLogo }: HomeHeaderProps) => {
  return (
    <>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-start' }}>
        <FastImage resizeMode={'contain'} style={styles.image} source={{ uri: leftLogo }} />
      </View>
      <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        {showLogout ? (
          <>
            <Avatar uri={avatar} size={50} />
            <View style={{ width: scale(100), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#ffffff', fontSize: scale(23), paddingHorizontal: scale(5) }} numberOfLines={1}>{name}</Text>
            </View>
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
                  {'注册'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.text}>{' | '}</Text>
              <TouchableOpacity onPress={onPressTryPlay}>
                <Text style={styles.text} >
                  {'试玩'}
                </Text>
              </TouchableOpacity>
            </>
          )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: scale(20),
    color: '#ffffff',
  },
});

export default HomeHeader;
