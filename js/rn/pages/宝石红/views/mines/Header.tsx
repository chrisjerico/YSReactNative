import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from '../../../../public/tools/Scale'

interface HeaderProps {
  title: string;
  marginTop: number;
  backgroundColor: string;
}
const Header = ({ title = '', marginTop, backgroundColor }: HeaderProps) => {
  return (
    <View style={{ backgroundColor: backgroundColor }}>
      <View
        style={[
          styles.container,
          {
            marginTop: marginTop,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 60,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

export default Header
