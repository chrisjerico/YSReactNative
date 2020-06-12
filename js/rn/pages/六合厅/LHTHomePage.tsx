import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import PushHelper from '../../public/define/PushHelper';
import APIRouter from '../../public/network/APIRouter';
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle';
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import TabComponent from './components/TabComponent';
import {
  defaultAdvertisement,
  defaultBanners,
  defaultCustomerServiceLogo,
  defaultHeadLineLogo,
  defaultHeadLines,
  defaultBottomTools,
  defaultHomeHeaderLeftLogo,
  defaultHomeHeaderRightLogo,
  defaultMarkSixLogo,
  defaultNavs,
  defaultNoticeLogo,
  defaultNotices
} from './helpers/config';
import { scale } from './helpers/function';
import Banner from './views/homes/Banner';
import BottomToolBar from './views/homes/BottomToolBar';
import Header from './views/homes/Header';
import Headline from './views/homes/Headline';
import Nav from './views/homes/Nav';
import Notice from './views/homes/Notice';
import { HomeGamesModel } from '../../public/network/Model/HomeGamesModel';
import { IGameIconListItem } from '../../redux/model/home/IGameBean';

const LHTHomePage = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>(null);
  const [userIsLogIn, setUserIsLogIn] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    Promise.all([
      APIRouter.system_banners(),
      APIRouter.notice_latest(),
      APIRouter.game_homeGames(),
      APIRouter.lhcdoc_lotteryNumber(),
      APIRouter.lhcdoc_categoryList()
    ]).then((response) => {
      // console.log('--------data-------',response[0].data.data)
      setResponse({
        banner: response[0]?.data?.data,
        notice: response[1]?.data?.data,
        game: response[2]?.data?.data,
        lottery: response[3]?.data?.data,
        popular: response[4]?.data?.data
      });
      setLoading(false);
    })
      .catch((err) => {
        // console.log("----err----",err)
      })
    const unsubscribe = navigation.addListener('focus', () => {
      APIRouter.user_info().then(response => {
        // console.log('-----成為焦點-----', response?.data)
        const { uid, avatar, usr } = response?.data?.data
        if (uid) {
          setUserIsLogIn(true)
          setName(usr)
          setAvatar(avatar)
        }
      }).catch(error => {
        console.log('--------error-------', error)
      })
    });

    return unsubscribe;
  }, [navigation]);

  const populars = response?.popular ?? []
  const banners: [] = response?.banner?.list ?? defaultBanners
  const notices: [] = response?.notice?.scroll ?? defaultNotices
  const headlines: [] = response?.notice?.popup ?? defaultHeadLines
  const tabs: [] = response?.game?.icons ?? []
  const navs: [] = response?.game?.navs.sort((nav: any) => -nav.sort) ?? defaultNavs
  const numbers: [] = response?.lottery?.numbers?.split(',') ?? []
  const numColors: [] = response?.lottery?.numColor?.split(',') ?? []
  const numSxs: [] = response?.lottery?.numSx?.split(',') ?? []
  let lotterys: any[] = numbers.map((number, index) => ({
    number,
    color: numColors[index],
    sx: numSxs[index]
  }))

  lotterys = [
    ...lotterys.slice(0, 6),
    {
      showMore: true
    },
    ...lotterys.slice(6)
  ]
  const date = response?.lottery?.issue

  const onPressSignOut = async () => {
    await PushHelper.pushLogout()
    setUserIsLogIn(false)
  }

  const onPressAd = () => {
  }

  const onPressLotteryBall = () => {
  }

  const gotoUserCenter = (userCenterType: UGUserCenterType) => {
    PushHelper.pushUserCenterType(userCenterType);
  }

  const gotoCategory = (category: string | number, position: string | number) => {
    PushHelper.pushCategory(category, position)
  }

  const gotoHomeGame = (game: HomeGamesModel | IGameIconListItem) => {
    PushHelper.pushHomeGame(game)
  }

  const goToNotice = (message: string) => {
    PushHelper.pushNoticePopUp(message)
  }

  return (
    <SafeAreaView style={loading ? styles.loadingSafeArea : styles.safeArea}>
      {loading ? (
        <UGProgressCircle />
      ) : (
          <>
            <Header
              avatar={avatar}
              name={name}
              showLogout={userIsLogIn}
              leftLogo={defaultHomeHeaderLeftLogo}
              rightLogo={defaultHomeHeaderRightLogo}
              onPressSignOut={onPressSignOut}
              onPressSignIn={PushHelper.pushLogin}
              onPressSignUp={PushHelper.pushRegister}
            />
            <ScrollView style={[styles.container]} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} />}>
              <Banner banners={banners} onPressBanner={({ linkCategory, linkPosition }) => {
                gotoCategory(linkCategory, linkPosition)
              }} />
              <View style={styles.contentContainer}>
                <Notice
                  containerStyle={styles.subComponent}
                  notices={notices}
                  logo={defaultNoticeLogo}
                  onPressNotice={({ value }) => goToNotice(value)}
                />
                <Nav
                  containerStyle={styles.subComponent}
                  navs={navs}
                  lotterys={lotterys}
                  date={date}
                  advertisement={defaultAdvertisement}
                  markSixLogo={defaultMarkSixLogo}
                  customerServiceLogo={defaultCustomerServiceLogo}
                  onPressSavePoint={() => gotoUserCenter(UGUserCenterType.存款)}
                  onPressGetPoint={() => gotoUserCenter(UGUserCenterType.取款)}
                  onPressAd={onPressAd}
                  onPressSmileLogo={() => gotoUserCenter(UGUserCenterType.在线客服)}
                  onPressLotteryBall={onPressLotteryBall}
                  onPressNav={(nav) => {
                    gotoHomeGame(nav)
                  }}
                />
                <Headline
                  containerStyle={styles.subComponent}
                  headlines={headlines}
                  headLineLogo={defaultHeadLineLogo}
                  onPressHeadline={({ value }) => goToNotice(value)}
                />
                <TabComponent
                  containerStyle={styles.subComponent}
                  leftTabs={populars}
                  rightTabs={tabs}
                  onPressTab={({ category, gameId }) => {
                    gotoCategory(category, gameId)
                  }}
                  date={date}
                />
                <BottomToolBar
                  tools={defaultBottomTools}
                  onPressBottomTool={({ userCenterType }) => gotoUserCenter(userCenterType)}
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
    backgroundColor: '#2894FF',
    flex: 1,
  },
  container: {
    backgroundColor: '#D0D0D0',
  },
  contentContainer: {
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
  },
  subComponent: {
    marginBottom: scale(10),
  },
});

export default LHTHomePage;
