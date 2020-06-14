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
import { ActionType } from '../../redux/store/ActionTypes';
import { updateUserInfo, IGlobalStateHelper } from "../../redux/store/IGlobalStateHelper";
import { IGlobalState, UGStore } from '../../redux/store/UGStore';
import TabComponent from './components/TabComponent';
import {
  defaultAdvertisement,
  defaultBanners,
  defaultBottomTools,
  defaultCustomerServiceLogo,
  defaultDowloadUrl,
  defaultHeadLineLogo,
  defaultHeadLines,
  defaultHomeHeaderLeftLogo,
  defaultHomeHeaderRightLogo,
  defaultMainTabs,
  defaultMarkSixLogo,
  defaultNavs,
  defaultNoticeLogo,
  defaultNotices
} from './helpers/config';
import { scale } from './helpers/function';
import Banner from './views/Banner';
import BottomTool from './views/BottomTool';
import BannerBlock from './views/homes/BannerBlock';
import BottomToolBlock from './views/homes/BottomToolBlock';
import Header from './views/homes/Header';
import HeadlineBlock from './views/homes/HeadlineBlock';
import NavBlock from './views/homes/NavBlock';
import NoticeBlock from './views/homes/NoticeBlock';
import LotteryBall from './views/LotteryBall';
import NavButton from './views/NavButton';
import TabButton from './views/TabButton';
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo';

const LHTHomePage = ({ navigation }) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>(null);
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { uid, avatar, usr }: UGUserModel = userStore
  console.log("------LHTHomePage uid-----", uid)

  // const {
  //   loading,
  //   banner,
  //   homeGames,
  // } = useGetHomeInfo(['system_banners', 'notice_latest', 'game_homeGames', 'lhcdoc_lotteryNumber', 'lhcdoc_categoryList'])
  useEffect(() => {
    Promise.all([
      APIRouter.system_banners(),
      APIRouter.notice_latest(),
      APIRouter.game_homeGames(),
      APIRouter.lhcdoc_lotteryNumber(),
      APIRouter.lhcdoc_categoryList()
    ]).then((response) => {
      console.log("------lottery-----",response[3]?.data?.data)
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
      updateUserInfo()
    });

    return unsubscribe;
  }, []);

  const banners = response?.banner?.data?.list
  const populars = response?.popular ?? []
  const notices = response?.notice?.scroll ?? defaultNotices
  const headlines = response?.notice?.popup ?? defaultHeadLines
  const tabs = response?.game?.data?.icons ?? []
  const navs = response?.game?.data?.navs.sort((nav: any) => -nav.sort) ?? defaultNavs
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

  const onPressSignOut = () => {
    // PushHelper.pushLogout().then(response => {
    //   console.log('-----response-----', response)
    //   IGlobalStateHelper.updateUserInfo()
    // })
    APIRouter.user_logout().then(async response => {
      const { status } = response
      console.log('-----status-----', status)
      if (status == 200) {
        console.log("-----登出成功囉-----")
        // await OCHelper.call('UGUserModel.setCurrentUser:', []);
        // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
        // await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]);
        UGStore.dispatch({ type: ActionType.Clear_User });
        UGStore.save();
      }
    }).catch((error) => {
      console.log("--------error-------", error)
    })
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
              avatar={avatar}
              name={usr}
              showLogout={uid ? true : false}
              leftLogo={defaultHomeHeaderLeftLogo}
              rightLogo={defaultHomeHeaderRightLogo}
              onPressSignOut={onPressSignOut}
              onPressSignIn={PushHelper.pushLogin}
              onPressSignUp={PushHelper.pushRegister}
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
              <View style={styles.contentContainer}>
                <NoticeBlock
                  containerStyle={styles.subComponent}
                  notices={notices}
                  logo={defaultNoticeLogo}
                  onPressNotice={({ value }) => goToNotice(value)}
                />
                <NavBlock
                  containerStyle={styles.subComponent}
                  navs={navs}
                  lotterys={lotterys}
                  date={date}
                  advertisement={defaultAdvertisement}
                  markSixLogo={defaultMarkSixLogo}
                  customerServiceLogo={defaultCustomerServiceLogo}
                  onPressSavePoint={() => gotoUserCenter(UGUserCenterType.存款)}
                  onPressGetPoint={() => gotoUserCenter(UGUserCenterType.取款)}
                  onPressAd={() => gotoUserCenter(UGUserCenterType.六合彩)}
                  onPressSmileLogo={() => gotoUserCenter(UGUserCenterType.在线客服)}
                  renderNav={(item, index) => {
                    const { icon, name, logo } = item;
                    return (
                      <NavButton key={index} logo={icon ? icon : logo} title={name} nav={item} onPress={() => gotoHomeGame(item)} />
                    );
                  }}
                  renderLottery={(item, index) => {
                    const { number, color, sx } = item;
                    return <LotteryBall key={index} score={number} color={color} text={sx} showMore={index == 6} onPress={() => gotoUserCenter(UGUserCenterType.六合彩)} />;
                  }}
                />
                <HeadlineBlock
                  containerStyle={styles.subComponent}
                  headlines={headlines}
                  headLineLogo={defaultHeadLineLogo}
                  onPressHeadline={({ value }) => goToNotice(value)}
                />
                <TabComponent
                  containerStyle={styles.subComponent}
                  mainTabs={defaultMainTabs}
                  leftTabs={populars}
                  rightTabs={tabs}
                  renderLeftTab={(item, index) => {
                    // console.log('--------tab------', item);
                    const { name, icon } = item;
                    return <TabButton key={index} logo={icon} mainTitle={name} onPress={() => {
                      // console.log("-----不知道要跳到哪----", item)
                    }} />;
                  }}
                  renderRightTab={(item, index) => {
                    // console.log('--------tab------', item);
                    const { logo, icon, title } = item;
                    return <TabButton key={index} logo={logo ? logo : icon} mainTitle={title} onPress={() => gotoHomeGame(item)}
                    />;
                  }}
                />
                <BottomToolBlock
                  tools={defaultBottomTools}
                  renderBottomTool={(item, index) => {
                    const { logo, userCenterType } = item;
                    return (
                      <BottomTool key={index} logo={logo} onPress={() => {
                        if (userCenterType) {
                          gotoUserCenter(userCenterType)
                        } else {
                          gotoWebView(defaultDowloadUrl)
                        }
                      }} />
                    );
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
