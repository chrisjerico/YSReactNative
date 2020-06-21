import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from '../../../../helpers/function';

interface HeaderProps {
  onPressBack: () => any;
  onPressCustomerService: () => any;
}
const Header = ({ onPressBack, onPressCustomerService }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressBack}>
        <Text style={styles.text}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{'我的'}</Text>
      <TouchableOpacity onPress={onPressCustomerService}>
        <Text>{'客服'}</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: scale(25),
  },
});

export default Header;
