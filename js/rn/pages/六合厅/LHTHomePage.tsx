import React from 'react';
import { RefreshControl, ScrollView, View, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import { IGlobalStateHelper } from '../../redux/store/IGlobalStateHelper';
import UGBasePage from '../base/UGBasePage';
import { UGLoadingType } from '../base/UGBasePageProps';
import HomeBannerComponent from './cp/HomeBannerComponent';
import HomeNoticeComponent from './cp/HomeNoticeComponent';
import HomeRecommendComponent from './cp/HomeRecommendComponent'
import HomeHeadlineComponent from './cp/HomeHeadlineComponent'
import HomeTabComponent from './cp/HomeTabComponent'
import HomeBottomToolComponent from './cp/HomeBottomToolComponent'
import { LHTHomeProps, LHTHomeStateToProps } from './LHTHomeProps';

class LHTHomePage extends UGBasePage<LHTHomeProps> {
    constructor(props: any) {
        super(props);
    }
    // 请求数据
    requestData() {
        this.setProps({ status: UGLoadingType.Success });
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
    didFocus(params: LHTHomeProps) { }

    // 渲染内容
    renderContent(): React.ReactNode {
        const { banner, notice, userInfo } = this.props;
        return (
            <ScrollView
                style={{ backgroundColor: '#D0D0D0' }}
                scrollEnabled={true}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                        }}
                    />
                }>
                <HomeBannerComponent reducerData={banner} />
                <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                    <HomeNoticeComponent reducerData={notice} />
                    <HomeRecommendComponent />
                    <HomeHeadlineComponent containerStyle={{ marginTop: 10 }} />
                    <HomeTabComponent containerStyle={{ marginTop: 10 }} />
                    <HomeBottomToolComponent containerStyle={{ marginTop: 10 }} />
                </View>
            </ScrollView>)
    };
}

// 绑定Redux
export default connect(LHTHomeStateToProps)(LHTHomePage);