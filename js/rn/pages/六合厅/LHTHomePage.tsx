import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle';
import {IGlobalStateHelper} from '../../redux/store/IGlobalStateHelper';
import {XBJHomeProps} from '../香槟金/XBJHomeProps';
import HomeBannerComponent from './components/HomeBannerComponent';
import HomeBottomToolComponent from './components/HomeBottomToolComponent';
import HomeHeaderComponent from './components/HomeHeaderComponent';
import HomeHeadlineComponent from './components/HomeHeadlineComponent';
import HomeNoticeComponent from './components/HomeNoticeComponent';
import HomeRecommendComponent from './components/HomeRecommendComponent';
import HomeTabComponent from './components/HomeTabComponent';
import {scale} from './helpers/function';
import {useSafeArea} from 'react-native-safe-area-context';

const LHTHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<XBJHomeProps>();
  const {top} = useSafeArea();

  useEffect(() => {
    IGlobalStateHelper.updateUserInfo();
    NetworkRequest1.homeInfo()
      .then(value => {
        setResponse(value);
        //setLoading(true);
        setLoading(false);
        console.log('--------response--------', response);
      })
      .catch(error => {
        setLoading(false);
        console.log('--------error--------', error);
      });
  }, []);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <UGProgressCircle />
        </View>
      ) : (
        <>
          <HomeHeaderComponent />
          <ScrollView style={[styles.container]} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}>
            <HomeBannerComponent />
            <View style={styles.contentContainer}>
              <HomeNoticeComponent containerStyle={styles.subComponent} />
              <HomeRecommendComponent containerStyle={styles.subComponent} />
              <HomeHeadlineComponent containerStyle={styles.subComponent} />
              <HomeTabComponent containerStyle={styles.subComponent} />
              <HomeBottomToolComponent />
            </View>
          </ScrollView>
        </>
      )}
    </View>
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
