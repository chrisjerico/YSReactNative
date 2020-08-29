import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import ReLoadBalanceComponent from '../../../public/components/tars/ReLoadBalanceComponent'
import { scale } from '../../../public/tools/Scale'
import Avatar from '../../../public/views/tars/Avatar'
import LinearBadge from '../../../public/views/tars/LinearBadge'

interface ProfileBlockProps {
  profileButtons: any[];
  avatar: string;
  name: string;
  balance: string;
  level: string;
  renderProfileButton: (item: any, index: number) => any;
  onPressDaySign: () => any;
  onPressTaskCenter: () => any;
  onPressAvatar: () => any;
  shoeSignBadge: boolean;
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
  shoeSignBadge,
}: ProfileBlockProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1.25, flexDirection: 'row' }}>
        <View style={{ flex: 3.2, flexDirection: 'row', alignItems: 'center' }}>
          <Avatar onPress={onPressAvatar} uri={avatar} size={90} />
          <View style={{ paddingLeft: scale(18) }}>
            <View style={styles.nameTextContainer}>
              <View style={{ maxWidth: scale(150) }}>
                <Text style={styles.nameText} numberOfLines={1}>
                  {name}
                </Text>
              </View>
              <LinearBadge
                title={level}
                colors={['#FFD306', '#C6A300']}
                showIcon={false}
                size={0.5}
                containerStyle={{
                  height: scale(25),
                  marginBottom: scale(5),
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', flex: 0.9 }}>
              <ReLoadBalanceComponent
                title={'余额 : '}
                color={'#ff861b'}
                containerStyle={{ justifyContent: 'flex-start' }}
                size={20}
                balance={balance}
              />
            </View>
          </View>
        </View>
        <View
          style={{ flex: 1, marginRight: scale(10), marginBottom: scale(40) }}
        >
          <TouchableWithoutFeedback onPress={onPressTaskCenter}>
            {/* <View style={styles.taskBadge}> */}
            <FastImage
              source={{
                uri:
                  'http://test05.6yc.com/static/vuePublic/images/my/userInfo/missionhall.png',
              }}
              style={{ width: '100%', height: '100%' }}
              resizeMode={'contain'}
            />
            {/* </View> */}
          </TouchableWithoutFeedback>
          {/* <View style={styles.signBadge}>
            {shoeSignBadge && (
              <FastImage
                source={{
                  uri:
                    'http://test05.6yc.com/static/vuePublic/images/my/userInfo/missionhall.png',
                }}
                style={{
                  width: scale(100),
                  aspectRatio: 3,
                  backgroundColor: 'red',
                }}
                resizeMode={'contain'}
              />
            )}
          </View> */}
        </View>
      </View>
      <View style={styles.profileButtonsContainer}>
        {profileButtons.map(renderProfileButton)}
      </View>
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
  // taskBadge: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   alignItems: 'flex-end',
  // },
  signBadge: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
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
