import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { scale } from '../../helpers/function';

interface HeaderProps {
  name: string;
  money: string;
}

const Header = ({ name = '', money = '' }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{name}</Text>
        <Text>{'￥' + money}</Text>
      </View>
    </View>
  );
};

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
});

export default Header;
