import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import ReLoadComponent from '../../../public/components/tars/ReLoadComponent'
import { BZHThemeColor } from '../../../public/theme/colors/BZHThemeColor'
import { scale } from '../../../public/tools/Scale'
import Avatar from '../../../public/views/tars/Avatar'
import LinearBadge from '../../../public/views/tars/LinearBadge'

interface ProfileBlockProps {
  money: string | number;
  features: any[];
  renderFeature: (item: any, index: number) => any;
  avatar: string;
  containerStyle?: ViewStyle;
  name: string;
  onPressReload: () => any;
  level: string;
  onPressAvatar: () => any;
}

const ProfileBlock = ({
  avatar,
  money,
  features,
  renderFeature,
  containerStyle,
  name,
  onPressReload,
  level,
  onPressAvatar
}: ProfileBlockProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.redBlock}></View>
      <View style={styles.whiteBlock}>
        <View style={styles.profileContainer}>
          <Avatar uri={avatar} onPress={onPressAvatar} />
          <View style={styles.moneyContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>{name}</Text>
              <LinearBadge
                containerStyle={{ borderRadius: scale(5), width: null }}
                textStyle={{ paddingHorizontal: scale(10) }}
                title={level}
                colors={['#0080FF', '#97CBFF']}
                showIcon={false}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: scale(10) }}>
              <Text
                style={styles.text}
              >
                {'余额 ￥' + money}
              </Text>
              <ReLoadComponent
                onPress={onPressReload}
                color={'#000000'}
              />
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
    backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
    paddingBottom: scale(30)
  },
  whiteBlock: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: scale(10),
    position: 'absolute',
    marginHorizontal: scale(15),
    top: scale(10),
    paddingTop: scale(15),
    width: '95%',
    alignSelf: 'center',
  },
  profileContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(35),
  },
  featureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(35),
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
    paddingRight: scale(10)
  },
  moneyContainer: {
    flex: 1,
    paddingLeft: scale(30),
    justifyContent: 'flex-end',
    paddingBottom: scale(10),
  },
})

export default ProfileBlock
