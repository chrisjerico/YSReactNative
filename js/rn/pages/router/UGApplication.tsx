import * as React from 'react';
import {Provider} from 'react-redux';
import {UGStore} from '../../redux/store/UGStore';
import {StackNavigationProp, createStackNavigator} from '@react-navigation/stack';
import {BottomTabBarOptions} from '@react-navigation/bottom-tabs';
import {Router} from '../../public/navigation/Router';
import {PageName} from '../../public/navigation/Navigation';
import UpdateVersionPage from './UpdateVersionPage';
import TransitionPage from '../base/TransitionPage';
import XBJLoginPage from '../香槟金/XBJLoginPage';
import XBJRegisterPage from '../香槟金/XBJRegisterPage';
import XBJMinePage from '../香槟金/XBJMinePage';
import JDPromotionListPage from '../经典/JDPromotionListPage';
import XBJHomePage from '../香槟金/XBJHomePage';
import {NavigationContainer} from '@react-navigation/native';
import ZHTYLoginPage from '../综合体育/ZHTYLoginPage';
import ZHTYRegisterPage from '../综合体育/ZHTYRegisterPage';
import ZHTYMinePage from '../综合体育/ZHTYMinePage';
import ZHTYHomePage from '../综合体育/ZHTYHomePage';
import SLHHomePage from "../石榴红/SLHHomePage";
import ZLHomePage from '../尊龙/ZLHomePage';
import ZLLoginPage from '../尊龙/ZLLoginPage';
import AppDefine from '../../public/define/AppDefine';
import {navigationRef} from '../../public/navigation/RootNavigation';
import ZLHomeMine from '../尊龙/ZLHomeMine';
import ZLRegisterPage from '../尊龙/ZLRegisterPage';
import {IGlobalStateHelper} from '../../redux/store/IGlobalStateHelper';
import SLHMinePage from "../石榴红/SLHMinePage";

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
            <Router.TabNavigator initialRouteName={PageName.SLHMinePage} screenOptions={{tabBarVisible: false}}
                                 tabBarOptions={this.tabBarOptions}>
                <Router.TabScreen name={PageName.SLHMinePage} component={SLHMinePage}/>
                <Router.TabScreen name={PageName.SLHHomePage} component={SLHHomePage}/>
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
