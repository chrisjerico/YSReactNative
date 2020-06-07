import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Badge, Icon} from 'react-native-elements';
import {scale} from '../helpers/function';
import MineButton from '../views/MineButton';
import PushHelper from '../../../public/define/PushHelper';

interface MineProfileComponentProps {
  mineButtons: any[];
}

const MineProfileComponent = ({mineButtons = []}: MineProfileComponentProps) => (
  <View style={styles.container}>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 3, flexDirection: 'row', alignItems: 'flex-end'}}>
        <Avatar size={'medium'} rounded onPress={() => PushHelper.pushUserCenterType(12)} />
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
    <View style={styles.mineButtonContainer}>
      {mineButtons.map((button, index) => (
        <MineButton key={index} {...button} />
      ))}
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
  mineButtonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareIdText: {
    color: '#00A600',
  },
});

export default MineProfileComponent;
