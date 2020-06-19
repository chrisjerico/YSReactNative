import {BottomTabBarOptions} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import * as React from 'react';
import {Provider} from 'react-redux';
import {PageName} from '../../public/navigation/Navigation';
import {Router} from '../../public/navigation/Router';
import {updateUserInfo} from '../../redux/store/IGlobalStateHelper';
import {UGStore} from '../../redux/store/UGStore';
import TransitionPage from '../base/TransitionPage';
import LHTHomePage from '../六合厅/LHTHomePage';
import LHTMinePage from '../六合厅/LHTMinePage';
import BZHHomePage from '../宝石红/BZHHomePage';
import BZHMinePage from '../宝石红/BZHMinePage';
import JDPromotionListPage from '../经典/JDPromotionListPage';
import {NavigationContainer} from '@react-navigation/native';
import ZHTYLoginPage from '../综合体育/ZHTYLoginPage';
import ZHTYRegisterPage from '../综合体育/ZHTYRegisterPage';
import ZHTYMinePage from '../综合体育/ZHTYMinePage';
import ZHTYHomePage from '../综合体育/ZHTYHomePage';
import LCHomePage from "../乐橙/LCHomePage";
import ZLHomePage from '../尊龙/ZLHomePage';
import ZLLoginPage from '../尊龙/ZLLoginPage';
import AppDefine from '../../public/define/AppDefine';
import {navigationRef} from '../../public/navigation/RootNavigation';
import ZLHomeMine from '../尊龙/ZLHomeMine';
import ZLRegisterPage from '../尊龙/ZLRegisterPage';
import {IGlobalStateHelper} from '../../redux/store/IGlobalStateHelper';
import LCMinePage from "../乐橙/LCMinePage";
import XBJHomePage from '../香槟金/XBJHomePage';
import XBJLoginPage from '../香槟金/XBJLoginPage';
import XBJMinePage from '../香槟金/XBJMinePage';
import XBJRegisterPage from '../香槟金/XBJRegisterPage';
import UpdateVersionPage from './UpdateVersionPage';
import LCTransferPage from "../乐橙/LCTransferPage";
import LXBView from "../乐橙/component/minePage/LXBView";

// TabbarController
class TabBarController extends React.Component<{ navigation: StackNavigationProp<{}> }> {
    newProps = {
        hideNavBar: true,
        hideTabBar: true,
    };
    tabBarOptions: BottomTabBarOptions = {};

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        navigation.setOptions({headerStyle: {height: 0}});
    }

    render() {
        return (
            <Router.TabNavigator initialRouteName={PageName.UpdateVersionPage} screenOptions={{tabBarVisible: false}}
                                 tabBarOptions={this.tabBarOptions}>
                <Router.TabScreen name={PageName.LXBView} component={LXBView} />
                <Router.TabScreen name={PageName.LCTransferPage} component={LCTransferPage} />
                <Router.TabScreen name={PageName.LCMinePage} component={LCMinePage}/>
                <Router.TabScreen name={PageName.LCHomePage} component={LCHomePage}/>
                <Router.TabScreen name={PageName.UpdateVersionPage} component={UpdateVersionPage}/>
                <Router.TabScreen name={PageName.TransitionPage} component={TransitionPage}/>
                <Router.TabScreen name={PageName.JDPromotionListPage} component={JDPromotionListPage}/>
                <Router.TabScreen name={PageName.XBJLoginPage} component={XBJLoginPage}/>
                <Router.TabScreen name={PageName.XBJRegisterPage} component={XBJRegisterPage}/>
                <Router.TabScreen name={PageName.XBJMinePage} component={XBJMinePage}/>
                <Router.TabScreen name={PageName.XBJHomePage} component={XBJHomePage}/>
                <Router.TabScreen name={PageName.ZHTYLoginPage} component={ZHTYLoginPage}/>
                <Router.TabScreen name={PageName.ZHTYRegisterPage} component={ZHTYRegisterPage}/>
                <Router.TabScreen name={PageName.ZHTYMinePage} component={ZHTYMinePage}/>
                <Router.TabScreen name={PageName.ZLHomePage} component={ZLHomePage}/>
                <Router.TabScreen name={PageName.ZLMinePage} component={ZLHomeMine}/>
            </Router.TabNavigator>
        );
    }
}

const UGApplication = () => {
    return (
        <Provider store={UGStore.store}>
            <NavigationContainer onStateChange={() => {
                IGlobalStateHelper.updateUserInfo()
            }} ref={navigationRef}>
                <Router.StackNavigator headerMode="screen">
                    <Router.StackScreen name="Tabbar" component={TabBarController}/>
                    <Router.StackScreen options={{headerShown: false}} name={PageName.ZLLoginPage}
                                        component={ZLLoginPage}/>
                    <Router.StackScreen options={{headerShown: false}} name={PageName.ZLRegisterPage}
                                        component={ZLRegisterPage}/>
                    <Router.StackScreen options={{headerShown: false}} name={PageName.JDPromotionListPage}
                                        component={JDPromotionListPage}/>
                </Router.StackNavigator>
            </NavigationContainer>
        </Provider>
    )
}
export default UGApplication
// NavController
