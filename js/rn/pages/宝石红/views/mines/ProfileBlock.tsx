import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Avatar } from 'react-native-elements'
import { scale } from '../../../../helpers/function'

interface ProfileBlockProps {
  money: string | number;
  features: any[];
  renderFeature: (item: any, index: number) => any;
  avatar: string;
  containerStyle?: ViewStyle;
}

const ProfileBlock = ({
  avatar,
  money,
  features,
  renderFeature,
  containerStyle,
}: ProfileBlockProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.redBlock}></View>
      <View style={styles.profileContainer}>
        <View style={styles.profileRowContainer}>
          <Avatar source={{ uri: avatar }} size={'large'} rounded />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              height: '100%',
              paddingLeft: scale(30),
              paddingBottom: scale(20),
            }}
          >
            <Text style={styles.text}>{'tars1987'}</Text>
            <Text style={[styles.text, { paddingTop: scale(5) }]}>
              {'余额 ' + money}
            </Text>
          </View>
        </View>
        <View style={styles.profileRowContainer}>
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
    backgroundColor: '#d9d9d9',
  },
  profileContainer: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: scale(10),
    position: 'absolute',
    marginHorizontal: scale(15),
    top: scale(10),
    paddingHorizontal: scale(25),
  },
  profileRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(25),
    alignItems: 'center'
  },
  redBlock: {
    width: '100%',
    height: '50%',
    backgroundColor: '#e53333',
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  text: {
    fontSize: scale(25),
    fontWeight: '600'
  },
})

export default ProfileBlock
