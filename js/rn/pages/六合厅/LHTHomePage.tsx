import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle';
import {IGlobalStateHelper} from '../../redux/store/IGlobalStateHelper';
import HomeBannerComponent from './components/HomeBannerComponent';
import HomeBottomToolComponent from './components/HomeBottomToolComponent';
import HomeHeaderComponent from './components/HomeHeaderComponent';
import HomeHeadlineComponent from './components/HomeHeadlineComponent';
import HomeNoticeComponent from './components/HomeNoticeComponent';
import HomeRecommendComponent from './components/HomeRecommendComponent';
import HomeTabComponent from './components/HomeTabComponent';
import {scale} from './helpers/function';

const LHTHomePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    //IGlobalStateHelper.updateUserInfo();
    NetworkRequest1.homeInfo()
      .then(value => {
        setResponse(value);
        setLoading(false);
        // ["banner", "notice", "game", "coupon", "redBag", "floatAd", "movie"]
        // notice: ["scroll", "popup", "popupSwitch", "popupInterval"]
        console.log('--------value.notice.popup--------', value.notice.popup);
      })
      .catch(error => {
        console.log('--------error--------', error);
      });
  }, []);

  const banners = response?.banner?.list
  const notices = response?.notice?.scroll
  const headlines = response?.notice?.popup

  return (
    <SafeAreaView style={loading ? styles.loadingSafeArea : styles.safeArea}>
      {loading ? (
        <UGProgressCircle />
      ) : (
        <>
          <HomeHeaderComponent />
          <ScrollView style={[styles.container]} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}>
            <HomeBannerComponent banners={banners} />
            <View style={styles.contentContainer}>
              <HomeNoticeComponent notices={notices} containerStyle={styles.subComponent} />
              <HomeRecommendComponent  containerStyle={styles.subComponent} />
              <HomeHeadlineComponent headlines={headlines} containerStyle={styles.subComponent} />
              <HomeTabComponent containerStyle={styles.subComponent} />
              <HomeBottomToolComponent />
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
