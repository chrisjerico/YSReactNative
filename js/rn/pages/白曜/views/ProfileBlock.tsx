import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { BZHThemeColor } from '../../../public/theme/colors/BZHThemeColor'
import { scale } from '../../../public/tools/Scale'
import Avatar from '../../../public/views/tars/Avatar'
import LinearBadge from '../../../public/views/tars/LinearBadge'
import ReLoadBalanceComponent from '../../../public/components/tars/ReLoadBalanceComponent'
import {BYThemeColor} from "../../../public/theme/colors/BYThemeColor";

interface ProfileBlockProps {
  balance: string | number;
  features: any[];
  renderFeature: (item: any, index: number) => any;
  avatar: string;
  containerStyle?: ViewStyle;
  name: string;
  level: string;
  onPressAvatar: () => any;
}

const ProfileBlock = ({
  avatar,
  balance,
  features,
  renderFeature,
  containerStyle,
  name,
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
              <ReLoadBalanceComponent
                animatedContainerStyle={{ marginTop: scale(3) }}
                title={'余额 ¥ '}
                titleStyle={{ fontSize: scale(22) }}
                balance={balance}
                balanceStyle={{ color: '#000000', fontSize: scale(22) }}
                color={'#000000'}
                size={20}
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
    aspectRatio: 500 / 250,
    backgroundColor: BYThemeColor.白曜.homeContentSubColor,
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
    backgroundColor: BYThemeColor.白曜.themeColor,
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
