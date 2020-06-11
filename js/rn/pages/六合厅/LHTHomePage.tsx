import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import PushHelper from '../../public/define/PushHelper';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle';
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import TabComponent from './components/TabComponent';
import {
  defaultAdvertisement,
  defaultBanners,
  defaultCustomerServiceLogo,
  defaultHeadLineLogo,
  defaultHeadLines,
  defaultHomeBottomTools,
  defaultHomeHeaderLeftLogo,
  defaultHomeHeaderRightLogo,
  defaultLeftTabs, defaultMarkSixLogo,
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

const LHTHomePage = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>(null);
  const [userIsLogIn, setUserIsLogIn] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    NetworkRequest1.homeInfo()
      .then(value => {
        setResponse(value);
        setLoading(false);
        console.log('--------value-------', value.lotteryNumber)
        //  ["存取款", "", "任务大厅", "开奖网", "长龙助手", "", "优惠活动", "利息宝", "QQ客服", "聊天室"]
        // ["banner", "notice", "game:{navs, icons}", "coupon", "redBag", "floatAd", "movie"]
        // notice: ["scroll", "popup", "popupSwitch", "popupInterval"]
      })
      .catch(error => {
        // console.log('--------error--------', error);
      });
    const unsubscribe = navigation.addListener('focus', () => {
      NetworkRequest1.user_info().then(value => {
        console.log('-----成為焦點-----', value)
        const { uid, avatar, usr } = value
        if (uid) {
          setUserIsLogIn(true)
          setName(usr)
          setAvatar(avatar)
        }
      })
    });

    return unsubscribe;
  }, [navigation]);

  const banners: [] = response?.banner?.list ?? defaultBanners
  const notices: [] = response?.notice?.scroll ?? defaultNotices
  const headlines: [] = response?.notice?.popup ?? defaultHeadLines
  const tabs: [] = response?.game?.icons ?? []
  const navs: [] = response?.game?.navs.sort((nav: any) => -nav.sort) ?? defaultNavs
  const numbers: [] = response?.lotteryNumber?.numbers?.split(',') ?? []
  const numColors: [] = response?.lotteryNumber?.numColor?.split(',') ?? []
  const numSxs: [] = response?.lotteryNumber?.numSx?.split(',') ?? []
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
  const date = response?.lotteryNumber?.issue

  const onPressSignOut = async () => {
    await PushHelper.pushLogout()
    setUserIsLogIn(false)
  }

  const onPressSavePoint = () => {
    PushHelper.pushUserCenterType(UGUserCenterType.存款)
  }

  const onPressGetPoint = () => {
    PushHelper.pushUserCenterType(UGUserCenterType.取款)
  }

  const onPressAd = () => {

  }

  const onPressSmileLogo = () => {
    //PushHelper.pushLogin()
  }

  const onPressLotteryBall = () => {

  }

  const onPressNav = (nav: any) => {
    PushHelper.pushHomeGame(nav)
  }

  const onPressBanner = (banner: any) => {
    // console.log("-----banner-----",banner)
    const { linkCategory, linkPosition } = banner;
    PushHelper.pushCategory(linkCategory, linkPosition);
  };

  const onPressHeadline = () => {

  }

  const onPressBottomTool = (userCenterType: UGUserCenterType) => {
    PushHelper.pushUserCenterType(userCenterType)
  }

  const onPressNotice = () => {
    PushHelper.pushCategory(9, 10)
  }

  const onPressTab = ({category,gameId, gameCode}) => {
    // console.log("-----category-----",category)
    // console.log("-----gameCode-----",gameCode)
    PushHelper.pushCategory(category,gameId)
  }

  return (
    <SafeAreaView style={loading ? styles.loadingSafeArea : styles.safeArea}>
      {loading ? (
        <UGProgressCircle />
      ) : (
          <>
            <Header avatar={avatar} name={name} showLogout={userIsLogIn} leftLogo={defaultHomeHeaderLeftLogo} rightLogo={defaultHomeHeaderRightLogo} onPressSignOut={onPressSignOut} onPressSignIn={PushHelper.pushLogin} onPressSignUp={PushHelper.pushRegister} />
            <ScrollView style={[styles.container]} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} />}>
              <Banner banners={banners} onPressBanner={onPressBanner} />
              <View style={styles.contentContainer}>
                <Notice containerStyle={styles.subComponent} notices={notices} logo={defaultNoticeLogo} onPressNotice={onPressNotice} />
                <Nav
                  containerStyle={styles.subComponent}
                  navs={navs}
                  lotterys={lotterys}
                  date={date}
                  advertisement={defaultAdvertisement}
                  markSixLogo={defaultMarkSixLogo}
                  customerServiceLogo={defaultCustomerServiceLogo}
                  onPressSavePoint={onPressSavePoint}
                  onPressGetPoint={onPressGetPoint}
                  onPressAd={onPressAd}
                  onPressSmileLogo={onPressSmileLogo}
                  onPressLotteryBall={onPressLotteryBall}
                  onPressNav={onPressNav}
                />
                <Headline containerStyle={styles.subComponent} headlines={headlines} headLineLogo={defaultHeadLineLogo} onPressHeadline={onPressHeadline} />
                <TabComponent containerStyle={styles.subComponent} leftTabs={defaultLeftTabs} rightTabs={tabs} onPressTab={onPressTab} date={date} lotterys={lotterys}/>
                <BottomToolBar tools={defaultHomeBottomTools} onPressBottomTool={onPressBottomTool} />
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
