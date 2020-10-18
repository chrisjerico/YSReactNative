import React from 'react'
import { StyleSheet } from 'react-native'
import Dash from 'react-native-dash'
import { WNZThemeColor } from '../../../public/theme/colors/WNZThemeColor'
import { scale } from '../../../public/tools/Scale'
import Button from '../../../public/views/tars/Button'

interface MenuProps {
  title: string
  onPress?: () => any
}
const Menu = ({ title, onPress }: MenuProps) => {
  return (
    <>
      <Button containerStyle={styles.menuConatiner} title={title} titleStyle={styles.menuTitle} onPress={onPress} />
      <Dash style={styles.dash} dashGap={2} dashLength={4} dashThickness={1} dashColor={'#d9d9d9'} />
    </>
  )
}

const styles = StyleSheet.create({
  menuConatiner: {
    width: '100%',
    aspectRatio: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: scale(23),
    color: WNZThemeColor.威尼斯.themeColor,
  },
  dash: {
    width: '100%',
    height: scale(1),
  },
})

export default Menu
