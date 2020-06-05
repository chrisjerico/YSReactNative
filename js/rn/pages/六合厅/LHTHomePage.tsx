import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {IGlobalState} from '../../redux/store/UGStore';
import HomeBannerComponent from './components/HomeBannerComponent';
import HomeBottomToolComponent from './components/HomeBottomToolComponent';
import HomeHeadlineComponent from './components/HomeHeadlineComponent';
import HomeNoticeComponent from './components/HomeNoticeComponent';
import HomeRecommendComponent from './components/HomeRecommendComponent';
import HomeTabComponent from './components/HomeTabComponent';
import {scale} from './helpers/function';

const LHTHomePage = () => {
  const LHTHomePageProps = useSelector((state: IGlobalState) => state.LHTHomeReducer);
  const {banner, notice} = LHTHomePageProps;
  debugger;
  return (
    <ScrollView style={styles.container} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}>
      <HomeBannerComponent reducerData={banner} />
      <View style={styles.contentContainer}>
        <HomeNoticeComponent containerStyle={styles.subComponent} reducerData={notice} />
        <HomeRecommendComponent containerStyle={styles.subComponent} />
        <HomeHeadlineComponent containerStyle={styles.subComponent} />
        <HomeTabComponent containerStyle={styles.subComponent} />
        <HomeBottomToolComponent />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
