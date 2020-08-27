import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReLoadComponent from '../../../public/components/tars/ReLoadComponent'
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
  onPressReload: () => any;
  onPressAvatar: () => any;
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
  onPressReload,
  onPressAvatar,
}: ProfileBlockProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1.25, flexDirection: 'row' }}>
        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end' }}>
          <Avatar onPress={onPressAvatar} uri={avatar} />
          <View style={{ paddingLeft: scale(18), paddingBottom: scale(25) }}>
            <View style={styles.nameTextContainer}>
              <Text style={styles.nameText} numberOfLines={1}>
                {name}
              </Text>
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
            <View
              style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
            >
              <Text style={{ fontSize: scale(23) }}>{'余额 : '}</Text>
              <Text
                style={{ color: '#ff861b', fontSize: scale(23) }}
                numberOfLines={1}
              >
                {balance}
              </Text>
              <ReLoadComponent onPress={onPressReload} color={'#ff861b'} />
            </View>
          </View>
        </View>
        <View style={{ flex: 1, paddingRight: scale(10) }}>
          <View style={styles.taskBadge}>
            <LinearBadge
              title={'任务中心'}
              colors={['#9393FF', 'rgb(91, 91, 220)']}
              onPress={onPressTaskCenter}
            />
          </View>
          <View style={styles.signBadge}>
            <LinearBadge
              title={'每日签到'}
              colors={['#FFD306', '#C6A300']}
              onPress={onPressDaySign}
            />
          </View>
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
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareIdText: {
    color: '#00A600',
  },
  taskBadge: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: scale(5),
  },
  signBadge: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  nameText: {
    fontWeight: '600',
    fontSize: scale(20),
    paddingRight: scale(5),
    marginBottom: scale(5),
  },
  nameTextContainer: {
    flexDirection: 'row',
    flex: 1.5,
    alignItems: 'flex-end',
  },
})

export default ProfileBlock
