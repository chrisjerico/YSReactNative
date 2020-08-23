import React from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from '../../../public/tools/Scale'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { pop } from '../../../public/navigation/RootNavigation'
import { OCHelper } from '../../../public/define/OCHelper/OCHelper'

interface HomeHeaderProps {
  name: string;
  logo: string;
  balance: string;
  onPressMenu: () => any;
  onPressComment: () => any;
  onPressUser: () => any;
  showBalance: boolean;
  showBackBtn: boolean;
}

const HomeHeader = ({
  name,
  logo,
  balance,
  onPressMenu,
  onPressComment,
  onPressUser,
  showBalance,
  showBackBtn,
}: HomeHeaderProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: '100%',
      }}
    >
      {showBackBtn ? (
        <AntDesign
          name={'left'}
          color={'#ffffff'}
          size={scale(25)}
          onPress={() => {
            !pop() &&
              OCHelper.call(
                'UGNavigationController.current.popViewControllerAnimated:',
                [true]
              )
          }}
        />
      ) : (
          <FastImage
            source={{
              uri: logo,
            }}
            style={{ width: '30%', height: '100%' }}
            resizeMode={'contain'}
          />
        )}
      <View style={styles.rightContainer}>
        <TouchableWithoutFeedback onPress={onPressUser}>
          <Text style={styles.nameText} numberOfLines={1}>
            {name}
          </Text>
        </TouchableWithoutFeedback>
        {showBalance && (
          <TouchableWithoutFeedback onPress={onPressUser}>
            <View style={styles.balanceContainer}>
              <Text style={{ color: '#ffffff', fontSize: scale(13) }}>
                {balance}
              </Text>
              <AntDesign
                name={'pluscircle'}
                color={'#ffffff'}
                style={{ margin: 0, padding: 0, marginLeft: scale(5) }}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
        <FontAwesome
          name={'commenting'}
          size={scale(20)}
          style={{ marginRight: scale(5) }}
          color={'#ffffff'}
          onPress={onPressComment}
        />
        <TouchableWithoutFeedback onPress={onPressMenu}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name={'settings-outline'}
              size={scale(20)}
              style={{ marginRight: scale(5) }}
              color={'#ffffff'}
            />
            <Text style={{ fontSize: scale(20), color: '#ffffff' }}>
              {'菜单'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  balanceContainer: {
    backgroundColor: '#df2128',
    borderRadius: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(5),
    paddingVertical: scale(5),
    marginRight: scale(10)
  },
  nameText: {
    fontSize: scale(17),
    marginRight: scale(5),
    color: '#ffffff',
    width: '30%',
    textAlign: 'right'
  },
})

export default HomeHeader
