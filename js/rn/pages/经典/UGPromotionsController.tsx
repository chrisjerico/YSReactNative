import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PromoteTableView from './View/PromoteTableView';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import {UGPromoteModel} from '../../redux/model/other/UGPromoteModel';
import {Skin1} from '../../public/theme/UGSkinManagers';
import {NavigationContainer} from '@react-navigation/native';

interface IProps {}
interface IState {
  dataArray: Array<{category?: string; title: string; list: Array<UGPromoteModel>}>;
}

export default class UGPromotionsController extends Component<IProps, IState> {
  Tab = createMaterialTopTabNavigator();
  style: 'slide' | 'popup' | 'page' = 'page'; // slide折叠、popup弹窗、page内页
  showTopBar = false;

  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
    };
  }
  componentDidMount() {
    NetworkRequest1.systeam_promotions().then(data => {
      this.style = data.style;

      if (data.showCategory) {
        var temp: {[x: number]: Array<UGPromoteModel>} = [];
        data.list.map(pm => {
          var list = (temp[pm.category] = temp[pm.category] ?? []);
          list.push(pm);
        });

        var dataArray: Array<{category: string; title: string; list: Array<UGPromoteModel>}> = [];
        dataArray.push({category: '0', title: '全部', list: data.list});
        for (var k in temp) {
          var title = data.categories[k];
          if (!title) {
            continue;
          }
          var obj = dataArray.objectWithValue(title, 'title');
          if (obj) {
            obj.list = obj.list.concat(temp[k]);
          } else {
            dataArray.push({category: k, title: title, list: temp[k]});
          }
        }
        this.showTopBar = dataArray.length > 1;
        this.setState({dataArray: dataArray});
      } else {
        this.setState({dataArray: [{title: '热门', list: data.list}]});
      }
    });
  }

  render() {
    if (this.state.dataArray.length == 0) {
      return null;
    }
    var contentViews = this.state.dataArray.map((plm, idx) => {
      return <this.Tab.Screen name={plm.title} component={PromoteTableView} initialParams={{list: plm.list, style: this.style}} key={idx} />;
    });
    return (
      <NavigationContainer>
        <this.Tab.Navigator
          tabBarOptions={{
            style: {backgroundColor: 'transparent', height: this.showTopBar ? 50 : 0},
            labelStyle: {fontSize: 15},
            tabStyle: {width: 60},
            scrollEnabled: true,
            indicatorStyle: {marginBottom: 12, marginLeft: 10, height: 26, width: 42, borderRadius: 2, backgroundColor: Skin1.navBarBgColor[0]},
            inactiveTintColor: '#555',
            activeTintColor: 'white',
          }}>
          {contentViews}
        </this.Tab.Navigator>
      </NavigationContainer>
    );
  }
}
