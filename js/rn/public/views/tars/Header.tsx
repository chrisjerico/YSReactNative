import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { scale } from '../../tools/Scale'

interface HeaderProps {
  onPressBack: () => any;
  onPressCustomerService: () => any;
  title: string;
  marginTop: number;
  backgroundColor: string;
}

const Header = ({
  onPressBack,
  onPressCustomerService,
  title,
  marginTop,
  backgroundColor
}: HeaderProps) => {
  return (
    <View style={{ backgroundColor: backgroundColor }}>
      <View style={[styles.container, {
        marginTop: marginTop,
        backgroundColor: backgroundColor
      }]}>
        <TouchableOpacity onPress={onPressBack}>
          <Icon name={'left'} color={'#ffffff'} size={scale(25)} />
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity onPress={onPressCustomerService}>
          <Text style={styles.text}>{'客服'}</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

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
})

export default Header
