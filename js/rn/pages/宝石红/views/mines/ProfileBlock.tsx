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
      <View style={styles.profileContainer}>
        <View style={styles.profileRowContainer}>
          <Avatar source={{ uri: avatar }} size={'large'} rounded />
          <View style={styles.moneyContainer}>
            <Text style={styles.text}>{name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.text, { paddingTop: scale(10), paddingRight: scale(10) }]}>
                {'余额 ' + money}
              </Text>
              <ReLoadComponent onPress={onPressReload} color={'#000000'} containerStyle={{ marginTop: 5 }} />
            </View>
          </View>
        </View>
        <View style={styles.profileRowContainer}>
          {features.map(renderFeature)}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 500 / 250,
    backgroundColor: '#d9d9d9',
  },
  profileContainer: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: scale(10),
    position: 'absolute',
    marginHorizontal: scale(15),
    top: scale(10),
    paddingHorizontal: scale(25),
    width: '95%',
    alignSelf: 'center',
  },
  profileRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(25),
    alignItems: 'center',
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
    fontWeight: '600',
  },
  moneyContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
    paddingLeft: scale(30),
    paddingBottom: scale(20),
  },
})

export default ProfileBlock
