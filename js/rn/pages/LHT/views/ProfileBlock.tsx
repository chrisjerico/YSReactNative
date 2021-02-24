import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import ReLoadBalanceComponent from '../../../public/components/tars/ReLoadBalanceComponent'
import { scale } from '../../../public/tools/Scale'
import Avatar from '../../../public/views/tars/Avatar'
import LinearBadge from '../../../public/views/tars/LinearBadge'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface ProfileBlockProps {
  profileButtons: any[]
  avatar: string
  name: string
  balance: string
  level: string
  renderProfileButton: (item: any, index: number) => any
  onPressDaySign: () => any
  onPressTaskCenter: () => any
  onPressAvatar: () => any
  showSignBadge: boolean
  currency: string
  showK?: boolean
  balanceDecimal: number
}

const ProfileBlock = ({
  avatar,
  name = '',
  balance = '',
  level,
  profileButtons = [],
  renderProfileButton,
  onPressDaySign,
  onPressTaskCenter,
  onPressAvatar,
  showSignBadge,
  currency,
  showK,
  balanceDecimal,
}: ProfileBlockProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1.25, flexDirection: 'row' }}>
        <View style={{ flex: 3.2, flexDirection: 'row', alignItems: 'center' }}>
          <Avatar onPress={onPressAvatar} uri={avatar} size={90} />
          <View style={{ paddingLeft: scale(18) }}>
            <View style={styles.nameTextContainer}>
              <View style={{ maxWidth: scale(150) }}>
                <UGText style={styles.nameText} numberOfLines={1}>
                  {name}
                </UGText>
              </View>
              <LinearBadge
                title={level}
                colors={['#55c6ff', '#91daff']}
                showIcon={false}
                size={0.5}
                containerStyle={{
                  height: scale(25),
                  marginBottom: scale(5),
                  width: null,
                }}
                textStyle={{ paddingHorizontal: scale(10) }}
              />
            </View>
            <View style={{ flexDirection: 'row', flex: 0.9 }}>
              <ReLoadBalanceComponent
                title={'余额 : '}
                iconColor={'#ff861b'}
                containerStyle={{ justifyContent: 'flex-start' }}
                size={20}
                balance={balance}
                currency={currency}
                showK={showK}
                balanceDecimal={balanceDecimal}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1, marginRight: scale(10) }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <TouchableWithoutFeedback onPress={onPressTaskCenter}>
              <FastImage
                source={{
                  uri: 'http://test05.fhptdev.com/static/vuePublic/images/my/userInfo/missionhall.png',
                }}
                style={{
                  width: '100%',
                  aspectRatio: 3.6,
                  marginBottom: scale(5),
                }}
                resizeMode={'contain'}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            {showSignBadge && (
              <TouchableWithoutFeedback onPress={onPressDaySign}>
                <FastImage
                  source={{
                    uri: 'http://test05.fhptdev.com/static/vuePublic/images/my/userInfo/dailysign.png',
                  }}
                  style={{
                    width: '100%',
                    aspectRatio: 3.6,
                    marginTop: scale(5),
                  }}
                  resizeMode={'contain'}
                />
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      </View>
      <View style={styles.profileButtonsContainer}>{profileButtons.map(renderProfileButton)}</View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 220,
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    paddingHorizontal: scale(25),
  },
  shareContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  profileButtonsContainer: {
    flex: 0.8,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  shareIdText: {
    color: '#00A600',
  },
  nameText: {
    fontWeight: '500',
    fontSize: scale(20),
    paddingRight: scale(5),
    marginBottom: scale(5),
  },
  nameTextContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    paddingBottom: scale(10),
  },
})

export default ProfileBlock
