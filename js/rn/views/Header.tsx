import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from '../helpers/function';
import Icon from 'react-native-vector-icons/AntDesign';

interface HeaderProps {
  onPressBack: () => any;
  onPressCustomerService: () => any;
  title: string,
  color: string
}
const Header = ({ onPressBack, onPressCustomerService, title, color }: HeaderProps) => {
  return (
    <View style={[styles.container, {
      backgroundColor: color
    }]}>
      <TouchableOpacity onPress={onPressBack}>
        <Icon name={'left'} color={'#ffffff'} size={scale(25)} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity onPress={onPressCustomerService}>
        <Text style={styles.text}>{'客服'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 60,
    flexDirection: 'row',
    paddingHorizontal: scale(25),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: scale(25),
  },
});

export default Header;
