import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Avatar } from 'react-native-elements'
import ReLoadComponent from '../../../../components/ReLoadComponent'
import { scale } from '../../../../helpers/function'
import { BZHThemeColor } from '../../../../public/theme/colors/BZHThemeColor'

interface ProfileBlockProps {
  money: string | number;
  features: any[];
  renderFeature: (item: any, index: number) => any;
  avatar: string;
  containerStyle?: ViewStyle;
  name: string;
  onPressReload: () => any;
}

const ProfileBlock = ({
  avatar,
  money,
  features,
  renderFeature,
  containerStyle,
  name,
  onPressReload,
}: ProfileBlockProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.redBlock}></View>
      <View style={styles.whiteBlock}>
        <View style={styles.profileContainer}>
          <Avatar source={{ uri: avatar }} size={'large'} rounded />
          <View style={styles.moneyContainer}>
            <Text style={styles.text}>{name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.text, { paddingTop: scale(10), paddingRight: scale(10) }]}>
                {'余额 ￥' + money}
              </Text>
              <ReLoadComponent onPress={onPressReload} color={'#000000'} containerStyle={{ marginTop: 5 }} />
            </View>
          </View>
        </View>
        <View style={styles.featureContainer}>
          {features.map(renderFeature)}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 500 / 270,
    backgroundColor: '#d9d9d9',
  },
  whiteBlock: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: scale(10),
    position: 'absolute',
    marginHorizontal: scale(15),
    top: scale(10),
    paddingTop: scale(15),
    paddingBottom: scale(30),
    width: '95%',
    alignSelf: 'center',
  },
  profileContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(50),
  },
  featureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: scale(30),
  },
  redBlock: {
    width: '100%',
    height: '50%',
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  text: {
    fontSize: scale(25),
    fontWeight: '400',
  },
  moneyContainer: {
    flex: 1,
    paddingLeft: scale(30),
    justifyContent: 'flex-end',
    paddingBottom: scale(10)
  },
})

export default ProfileBlock
