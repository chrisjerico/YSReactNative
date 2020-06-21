import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { scale } from '../../helpers/function';

interface HeaderProps {
  money: string
  features: any[]
  renderFeature: (item: any, index: number) => any
  avatar: string
}

const Header = ({ money = '0.0000', features, renderFeature, avatar }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.redContainer}>
        <Text style={styles.title}>{"会员中心"}</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileRowContainer}>
          <Avatar source={{ uri: avatar }} size={'large'} rounded />
          <View style={{ flex: 1, justifyContent: 'flex-end', height: '100%', paddingLeft: scale(30), paddingBottom: scale(20) }}>
            <Text style={styles.text}>{"tars1987"}</Text>
            <Text style={[styles.text, { paddingTop: scale(5) }]}>{"余额 " + money}</Text>
          </View>
        </View>
        <View style={styles.profileRowContainer}>
          {
            features.map(renderFeature)
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 330,
    backgroundColor: '#d9d9d9',
    alignItems: 'center'
  },
  redContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#e53333',
    alignItems: 'center',
    borderBottomLeftRadius: scale(30),
    borderBottomRightRadius: scale(30)
  },
  title: {
    color: '#ffffff',
    fontSize: 25
  },
  profileContainer: {
    backgroundColor: '#ffffff',
    width: '90%',
    height: '75%',
    position: 'absolute',
    bottom: scale(30),
    borderRadius: scale(10)
  },
  profileRowContainer: {
    flex: 1,
    paddingHorizontal: scale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontWeight: '500',
    fontSize: scale(25)
  }
});

export default Header;
