import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle';
import HomeBannerComponent from './components/HomeBannerComponent';
import HomeBottomToolComponent from './components/HomeBottomToolComponent';
import HomeHeaderComponent from './components/HomeHeaderComponent';
import HomeHeadlineComponent from './components/HomeHeadlineComponent';
import HomeNoticeComponent from './components/HomeNoticeComponent';
import HomeRecommendComponent from './components/HomeRecommendComponent';
import HomeTabComponent from './components/HomeTabComponent';
import { defaultHeadLineLogo, defaultCustomerServiceLogo, defaultMarkSixLogo, defaultAdvertisement, defaultBanners, defaultHeadLines, defaultHomeBottomTools, defaultHomeHeaderLeftLogo, defaultHomeHeaderRightLogo, defaultNavs, defaultNoticeLogo, defaultNotices } from './helpers/config';
import { scale } from './helpers/function';

const LHTHomePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    //IGlobalStateHelper.updateUserInfo();
    // NetworkRequest1.user_info().then(
    //   value => console.log('------value-----',value)
    // ).catch(error => console.log('------error-----',error))
    NetworkRequest1.homeInfo()
      .then(value => {
        setResponse(value);
        setLoading(false);
        console.log("---------value.game.navs---------",value.game.navs)
        //console.log("-----coupon-----",value.coupon)
        //  ["存取款", "", "任务大厅", "开奖网", "长龙助手", "", "优惠活动", "利息宝", "QQ客服", "聊天室"]
        // ["banner", "notice", "game:{navs, icons}", "coupon", "redBag", "floatAd", "movie"]
        // notice: ["scroll", "popup", "popupSwitch", "popupInterval"]
        //console.log('--------value.game.icons--------', value.game.icons);
      })
      .catch(error => {
        // console.log('--------error--------', error);
      });
  }, []);

  const banners = response?.banner?.list??defaultBanners
  const notices = response?.notice?.scroll??defaultNotices
  const headlines = response?.notice?.popup??defaultHeadLines
  const tabs = response?.game?.icons??[]
  const navs = response?.game?.navs??defaultNavs

  return (
    <SafeAreaView style={loading ? styles.loadingSafeArea : styles.safeArea}>
      {loading ? (
        <UGProgressCircle />
      ) : (
        <>
          <HomeHeaderComponent leftLogo={defaultHomeHeaderLeftLogo} rightLogo={defaultHomeHeaderRightLogo}/>
          <ScrollView style={[styles.container]} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} />}>
            <HomeBannerComponent banners={banners} />
            <View style={styles.contentContainer}>
              <HomeNoticeComponent  containerStyle={styles.subComponent} notices={notices} logo={defaultNoticeLogo}/>
              <HomeRecommendComponent  containerStyle={styles.subComponent} navs={navs} advertisement={defaultAdvertisement} markSixLogo={defaultMarkSixLogo} customerServiceLogo={defaultCustomerServiceLogo}/>
              <HomeHeadlineComponent  containerStyle={styles.subComponent} headlines={headlines} headLineLogo={defaultHeadLineLogo}/>
              <HomeTabComponent  containerStyle={styles.subComponent} tabs={tabs}/>
              <HomeBottomToolComponent tools={defaultHomeBottomTools}/>
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
