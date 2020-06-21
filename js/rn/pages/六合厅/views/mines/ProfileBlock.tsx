import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Badge, Icon } from 'react-native-elements';
import { scale } from '../../../../helpers/function';
import PushHelper from '../../../../public/define/PushHelper';

interface ProfileBlockProps {
  profileButtons: any[];
  avatar: string;
  name: string;
  level: string;
  balance: string;
  renderProfileButton: (item: any, index: number) => any
}

const ProfileBlock = ({ avatar, name = '', level = '', balance = '', profileButtons = [], renderProfileButton }: ProfileBlockProps) => (
  <View style={styles.container}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end' }}>
        <Avatar size={'medium'} rounded onPress={() => PushHelper.pushUserCenterType(12)} source={{ uri: avatar }} />
        <View style={{ paddingLeft: scale(30) }}>
          <View style={{ flexDirection: 'row', flex: 2, alignItems: 'flex-end' }}>
            <Text style={{ fontWeight: '500', fontSize: scale(25), paddingRight: scale(5) }}>{name}</Text>
            <Badge status={'error'} value={level} textStyle={{ fontSize: scale(20) }} />
          </View>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <Text>{'余额'}</Text>
            <Text>{balance}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 2, justifyContent: 'flex-end' }}>
        <View style={styles.shareContainer}>
          <Text>{'分享'}</Text>
          <Icon type={'AntDesign'} name={'link'} size={10} color={'#4F4F4F'} reverse />
        </View>
        <View style={styles.shareContainer}>
          <Text>{'邀请码'}</Text>
          <Text>{'|'}</Text>
          <Text style={styles.shareIdText}>{3099936}</Text>
        </View>
      </View>
    </View>
    <View style={styles.profileButtonsContainer}>
      {profileButtons.map(renderProfileButton)}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 205,
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
});

export default ProfileBlock;
