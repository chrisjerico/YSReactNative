import React, { useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ReLoadComponent from '../../../../components/ReLoadComponent'
import { scale } from '../../../../helpers/function'
import PushHelper from '../../../../public/define/PushHelper'

interface ProfileBlockProps {
  profileButtons: any[];
  avatar: string;
  name: string;
  level?: string;
  balance: string;
  renderProfileButton: (item: any, index: number) => any;
  onPressDaySign: () => any;
  onPressTaskCenter: () => any;
  onPressReload: () => any;
}

const Tag = ({ title, color, onPress }) => (
  <TouchableOpacity
    style={{
      width: scale(126),
      aspectRatio: 126 / 28,
      borderRadius: 20,
      backgroundColor: color,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <Text style={{ color: '#ffffff' }}>{title}</Text>
    <Icon type={'AntDesign'} name={'link'} size={scale(20)} color={'#ffffff'} />
  </TouchableOpacity>
)

const ProfileBlock = ({
  avatar,
  name = '',
  level = '',
  balance = '',
  profileButtons = [],
  renderProfileButton,
  onPressDaySign,
  onPressTaskCenter,
  onPressReload,
}: ProfileBlockProps) => {

  return (
    <View style={styles.container}>
      <View style={{ flex: 1.25, flexDirection: 'row' }}>
        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end' }}>
          <Avatar
            size={'large'}
            rounded
            onPress={() => PushHelper.pushUserCenterType(12)}
            source={{ uri: avatar }}
          />
          <View style={{ paddingLeft: scale(30) }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1.5,
                alignItems: 'flex-end',
              }}
            >
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: scale(20),
                  paddingRight: scale(5),
                }}
              >
                {name}
              </Text>
              {/* <Badge status={'error'} value={level} textStyle={{ fontSize: scale(20) }} /> */}
            </View>
            <View
              style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
            >
              <Text>{'余额 : '}</Text>
              <Text style={{ color: '#ff861b', marginRight: scale(10) }}>
                {balance}
              </Text>
              <ReLoadComponent onPress={onPressReload} color={'#ff861b'} />
            </View>
          </View>
        </View>
        <View style={{ flex: 1, paddingRight: scale(10) }}>
          <View
            style={{
              flex: 1.5,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <Tag
              title={'任务中心'}
              color={'rgb(91, 91, 220)'}
              onPress={onPressTaskCenter}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Tag
              title={'每日签到'}
              color={'#FFD306'}
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
})

export default ProfileBlock
