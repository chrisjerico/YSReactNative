import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from '../../../../helpers/function';
import { LHThemeColor } from '../../../../public/theme/colors/LHThemeColor';
import Icon from 'react-native-vector-icons/AntDesign';

interface HeaderProps {
  onPressBack: () => any;
  onPressCustomerService: () => any;
}
const Header = ({ onPressBack, onPressCustomerService }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flex: 1, alignItems: 'flex-start' }} onPress={onPressBack}>
        <Icon name={'left'} color={'#ffffff'} size={scale(25)} />
        {/* <Text style={styles.text}>{'<'}</Text> */}
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.text}>{'我的'}</Text>
      </View>
      <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={onPressCustomerService}>
        <Text style={styles.text}>{'客服'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 60,
    backgroundColor: LHThemeColor.六合厅.themeColor,
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
