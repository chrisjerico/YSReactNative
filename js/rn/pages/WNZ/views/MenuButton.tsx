import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Dash from 'react-native-dash'
import { skinColors } from '../../../public/theme/const/UGSkinColor'
import { scale } from '../../../public/tools/Scale'
import Button from '../../../public/views/tars/Button'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface MenuProps {
  title: string
  onPress?: () => any
  subTitle?: string
  showSubTitle?: boolean
}
const MenuButton = ({ title, onPress, subTitle, showSubTitle }: MenuProps) => {
  return (
    <>
      <Button containerStyle={styles.menuConatiner} title={title} titleStyle={styles.menuTitle} onPress={onPress} />
      {showSubTitle && <UGText style={styles.subTitle}>{subTitle}</UGText>}
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
    color: skinColors.themeColor.威尼斯,
  },
  dash: {
    width: '100%',
    height: scale(1),
  },
  subTitle: {
    alignSelf: 'center',
    color: skinColors.themeColor.威尼斯,
    fontSize: scale(23),
    marginBottom: scale(10),
  },
})

export default MenuButton
