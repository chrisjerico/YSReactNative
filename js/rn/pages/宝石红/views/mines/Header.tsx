import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface HeaderProps {
  title: string;
}
const Header = ({ title = '' }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 50,
    backgroundColor: '#e53333',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 25,
  },
})

export default Header
