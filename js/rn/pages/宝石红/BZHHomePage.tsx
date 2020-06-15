import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import PushHelper from '../../public/define/PushHelper';
import APIRouter from '../../public/network/APIRouter';
import { HomeGamesModel } from '../../public/network/Model/HomeGamesModel';
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle';
import { IGameIconListItem } from '../../redux/model/home/IGameBean';
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import UGUserModel from '../../redux/model/全局/UGUserModel';
import { IGlobalStateHelper } from "../../redux/store/IGlobalStateHelper";
import { IGlobalState } from '../../redux/store/UGStore';
import NavButton from './views/NavButton';
import { scale } from './helpers/function';
import Banner from './views/Banner';
import BannerBlock from './views/homes/BannerBlock';
import Header from './views/homes/Header';
import NavBlock from './views/homes/NavBlock';
import NoticeBlock from './views/homes/NoticeBlock';
import TicketBlock from './views/homes/TicketBlock';
import TabButton from './views/TabButton';

const BZHHomePage = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>(null);
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { uid, avatar, usr, balance }: UGUserModel = userStore

  useEffect(() => {
    Promise.all([
      APIRouter.system_banners(),
      APIRouter.notice_latest(),
      APIRouter.game_homeGames(),
      APIRouter.lhcdoc_lotteryNumber(),
      APIRouter.lhcdoc_categoryList()
    ]).then((response) => {
      setResponse({
        banner: response[0]?.data?.data,
        notice: response[1]?.data?.data,
        game: response[2]?.data?.data,
        lottery: response[3]?.data?.data,
        popular: response[4]?.data?.data
      });
      setLoading(false);
    }).catch((error) => {
      // console.log("--------error-------",error)
    })
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('-----成為焦點-----')
      IGlobalStateHelper.updateUserInfo()
    });

    return unsubscribe;
  }, [navigation]);

  const populars = response?.popular ?? []
  const banners: [] = response?.banner?.list ?? []
  const notices: [] = response?.notice?.scroll ?? []
  // const headlines: [] = response?.notice?.popup ?? defaultHeadLines
  // const tabs: [] = response?.game?.icons ?? []
  const navs: [] = response?.game?.navs.sort((nav: any) => -nav.sort) ?? []
  // const numbers: [] = response?.lottery?.numbers?.split(',') ?? []
  // const numColors: [] = response?.lottery?.numColor?.split(',') ?? []
  // const numSxs: [] = response?.lottery?.numSx?.split(',') ?? []
  // let lotterys: any[] = numbers.map((number, index) => ({
  //   number,
  //   color: numColors[index],
  //   sx: numSxs[index]
  // }))

  // lotterys = [
  //   ...lotterys.slice(0, 6),
  //   {
  //     showMore: true
  //   },
  //   ...lotterys.slice(6)
  // ]
  // const date = response?.lottery?.issue

  const onPressSignOut = () => {
    // APIRouter.user_logout().then(async response => {
    //   const { status } = response
    //   console.log('-----status-----', status)
    //   if (status == 200) {
    //     console.log("-----登出成功囉-----")
    //     UGStore.dispatch({ type: ActionType.Clear_User });
    //     UGStore.save();
    //   }
    // }).catch((error) => {
    //   console.log("--------error-------", error)
    // })
  }

  const gotoUserCenter = (userCenterType: UGUserCenterType) => {
    // console.log("------userCenterType------", userCenterType)
    PushHelper.pushUserCenterType(userCenterType);
  }

  const gotoCategory = (category: string | number, position: string | number) => {
    // console.log("-----category-----", category)
    // console.log("-----position-----", position)
    PushHelper.pushCategory(category, position)
  }

  const gotoHomeGame = (game: HomeGamesModel | IGameIconListItem) => {
    // console.log("---------game---------", game)
    PushHelper.pushHomeGame(game)
  }

  const goToNotice = (message: string) => {
    PushHelper.pushNoticePopUp(message)
  }

  const gotoWebView = (url: string) => {
    PushHelper.openWebView(url)
  }

  return (
    <SafeAreaView style={loading ? styles.loadingSafeArea : styles.safeArea}>
      {loading ? (
        <UGProgressCircle />
      ) : (
          <>
            <Header
              name={usr}
              money={balance}
            />
            <ScrollView style={[styles.container]} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} />}>
              <BannerBlock
                banners={banners}
                renderBanner={(item, index) => {
                  const { linkCategory, linkPosition, pic } = item
                  return <Banner key={index} pic={pic} onPress={() => {
                    gotoCategory(linkCategory, linkPosition)
                  }} />
                }}
              />
              <NoticeBlock
                notices={notices}
                onPressNotice={({ value }) => goToNotice(value)}
              />
              <NavBlock
                navs={navs}
                renderNav={(item, index) => {
                  const { icon, name, logo } = item;
                  return <NavButton key={index} logo={icon ? icon : logo} title={name} onPress={() => gotoHomeGame(item)} />
                }}
              />
              <View style={styles.contentContainer}>
                <TicketBlock
                  containerStyle={styles.subComponent}
                  tickets={populars}
                  renderTicket={(item, index) => {
                    const { name, icon } = item;
                    return <TabButton key={index} logo={icon} mainTitle={name} />
                  }}
                />
              </View>
            </ScrollView>
          </>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingSafeArea: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#e53333',
    flex: 1,
  },
  container: {
    backgroundColor: '#f6f6f6',
  },
  contentContainer: {
    paddingHorizontal: scale(5),
    paddingTop: scale(10),
  },
  subComponent: {
    marginTop: scale(10),
  },
});

export default BZHHomePage;
