import React, { useEffect } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import PushHelper from '../../public/define/PushHelper';
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo';
import useMemberItems from '../../public/hooks/useMemberItems';
import { HomeGamesModel } from '../../public/network/Model/HomeGamesModel';
import { IGameIconListItem } from '../../redux/model/home/IGameBean';
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import UGUserModel from '../../redux/model/全局/UGUserModel';
import { IGlobalStateHelper, updateUserInfo } from '../../redux/store/IGlobalStateHelper';
import { IGlobalState } from '../../redux/store/UGStore';
import FeatureList from '../../views/FeatureList';
import Header from '../宝石红/views/mines/Header';
import { scale } from './helpers/function';
import NavButton from './views/NavButton';

const BZHMinePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { avatar, balance }: UGUserModel = userStore
  const { UGUserCenterItem } = useMemberItems()

  const {
    //loading,
    homeGames,
  } = useGetHomeInfo([
    'game_homeGames',
  ])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateUserInfo()
    })
    return unsubscribe
  }, [])


  const navs = homeGames?.data?.navs?.sort((nav: any) => -nav.sort).slice(0, 4) ?? []

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('-----成為焦點-----')
      IGlobalStateHelper.updateUserInfo()
    })
    return unsubscribe;
  }, []);

  // functions
  const gotoHome = () => {
    navigation.navigate('LHTHomePage')
  }

  const gotoUserCenter = (userCenterType: UGUserCenterType) => {
    PushHelper.pushUserCenterType(userCenterType);
  }

  const gotoHomeGame = (game: HomeGamesModel | IGameIconListItem) => {
    // console.log("---------game---------", game)
    PushHelper.pushHomeGame(game)
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <Header
        avatar={avatar}
        money={balance}
        features={navs}
        renderFeature={(item, index) => {
          const { icon, title } = item
          return (
            <NavButton
              key={index}
              logo={icon}
              title={title}
              onPress={() => gotoHomeGame(item)}
            />)
        }}
      />
      <ScrollView style={styles.container} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} />}>
        {UGUserCenterItem?.map((item, index) => {
          const { code, name, logo } = item
          return (
            <FeatureList
              key={index}
              title={name}
              logo={logo}
              onPress={() => gotoUserCenter(code)}
            />
          )
        })}
        <View style={styles.signOutBlock}>
          <TouchableOpacity style={styles.signOutContainer}>
            <Text style={styles.signOutText}>{'退出登录'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#e53333',
  },
  container: {
    backgroundColor: '#ffffff',
  },
  signOutBlock: {
    backgroundColor: '#d9d9d9',
    width: '100%',
    aspectRatio: 540 / 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signOutContainer: {
    width: '90%',
    backgroundColor: '#ffffff',
    height: '80%',
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  signOutText: {
    color: '#e53333',
    fontSize: 20
  }
});

export default BZHMinePage;
