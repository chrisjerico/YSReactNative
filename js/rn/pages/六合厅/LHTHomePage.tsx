import React from 'react';
import {RefreshControl, ScrollView, View, PixelRatio, Dimensions, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import {IGlobalStateHelper} from '../../redux/store/IGlobalStateHelper';
import UGBasePage from '../base/UGBasePage';
import {UGLoadingType} from '../base/UGBasePageProps';
import HomeBannerComponent from './components/HomeBannerComponent';
import HomeNoticeComponent from './components/HomeNoticeComponent';
import HomeRecommendComponent from './components/HomeRecommendComponent';
import HomeHeadlineComponent from './components/HomeHeadlineComponent';
import HomeTabComponent from './components/HomeTabComponent';
import HomeBottomToolComponent from './components/HomeBottomToolComponent';
import {LHTHomeProps, LHTHomeStateToProps} from './LHTHomeProps';
import {scale} from './helpers/function';

class LHTHomePage extends UGBasePage<LHTHomeProps> {
  constructor(props: any) {
    super(props);
  }
  // 请求数据
  requestData() {
    //console.log("----------width----------", Dimensions.get('window').width)
    // console.log("----------PixelRatio.getPixelSizeForLayoutSize(414)---------", PixelRatio.getPixelSizeForLayoutSize(414))
    this.setProps({status: UGLoadingType.Success});
    /*
        this.setProps({ status: UGLoadingType.Loading });
        IGlobalStateHelper.updateUserInfo();
        NetworkRequest1.homeInfo()
            .then(value => {
                console.log("------value-----", value)
                
                this.setProps({ ...value, status: UGLoadingType.Success });
            })
            .catch(error => {
                this.setProps({ status: UGLoadingType.Failed });
            });
         */
  }

  // 成为焦点页面
  didFocus(params: LHTHomeProps) {}

  // 渲染内容
  renderContent(): React.ReactNode {
    const {banner, notice, userInfo} = this.props;
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
  }
}

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

// 绑定Redux
export default connect(LHTHomeStateToProps)(LHTHomePage);
