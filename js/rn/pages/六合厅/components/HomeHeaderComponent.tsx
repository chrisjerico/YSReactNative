import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import PushHelper from '../../../public/define/PushHelper';
import {defaultLeftLogoUri, defaultRightLogoUri} from '../helpers/config';
import {scale} from '../helpers/function';

interface HomeHeaderComponentProps {
  leftLogoUri?: string;
  rightLogoUri?: string;
}

const HomeHeaderComponent = ({leftLogoUri = defaultLeftLogoUri, rightLogoUri = defaultRightLogoUri}: HomeHeaderComponentProps) => {
  return (
    <View
      style={{
        width: '100%',
        aspectRatio: 540 / 60,
        backgroundColor: '#2894FF',
        flexDirection: 'row',
        paddingHorizontal: scale(25),
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
        <Image resizeMode={'contain'} style={{width: '100%', height: '80%'}} source={{uri: leftLogoUri}} />
      </View>
      <View style={{flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Image style={{width: scale(40), aspectRatio: 1}} resizeMode={'contain'} source={{uri: rightLogoUri}} />
        <Text style={styles.text}>{' | '}</Text>
        <Text style={styles.text} onPress={PushHelper.pushLogin}>
          {'登入'}
        </Text>
        <Text style={styles.text}>{' | '}</Text>
        <Text style={styles.text} onPress={PushHelper.pushRegister}>
          {'註冊'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: scale(20),
    color: '#ffffff',
  },
});

export default HomeHeaderComponent;
