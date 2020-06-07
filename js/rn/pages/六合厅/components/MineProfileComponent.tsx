import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Badge, Icon} from 'react-native-elements';
import {scale} from '../helpers/function';
import MineButton from '../views/MineButton';

const MineProfileComponent = () => (
  <View style={{width: '100%', aspectRatio: 540 / 205, borderBottomWidth: 1, borderColor: '#d9d9d9', paddingHorizontal: scale(25)}}>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 3, flexDirection: 'row', alignItems: 'flex-end'}}>
        <Avatar size={'medium'} rounded />
        <View style={{paddingLeft: scale(30)}}>
          <View style={{flexDirection: 'row', flex: 2, alignItems: 'flex-end'}}>
            <Text style={{fontWeight: '500', fontSize: scale(25), paddingRight: scale(5)}}>{'我帅'}</Text>
            <Badge status={'error'} value={'VIP0'} />
          </View>
          <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
            <Text>{'余额'}</Text>
            <Text>{'0.00'}</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 2, justifyContent: 'flex-end'}}>
        <View style={styles.shareBlock}>
          <Text>{'分享'}</Text>
          <Icon type={'AntDesign'} name={'link'} size={10} color={'#4F4F4F'} reverse />
        </View>
        <View style={styles.shareBlock}>
          <Text>{'邀请码'}</Text>
          <Text>{'|'}</Text>
          <Text style={styles.shareId}>{3099936}</Text>
        </View>
      </View>
    </View>
    <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
      <MineButton />
      <MineButton />
      <MineButton />
    </View>
  </View>
);

const styles = StyleSheet.create({
  shareBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shareId: {
    color: '#00A600',
  },
});

export default MineProfileComponent;
