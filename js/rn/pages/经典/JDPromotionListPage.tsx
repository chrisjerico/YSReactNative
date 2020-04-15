import React from 'react';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import {UGPromoteModel} from '../../redux/model/other/UGPromoteModel';
import JDPromotionListCP from './cp/JDPromotionListCP';
import UGBasePage from '../base/UGBasePage';
import {JDPromotionListProps, JDPromotionListStateToProps} from './JDPromotionListProps';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Skin1} from '../../public/theme/UGSkinManagers';

class JDPromotionListPage extends UGBasePage<JDPromotionListProps> {
  Tab = createMaterialTopTabNavigator();

  requestData() {
    NetworkRequest1.systeam_promotions().then(data => {
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
        this.setProps({style: data.style, dataArray: dataArray, showTopBar: dataArray.length > 1});
      } else {
        this.setProps({style: data.style, dataArray: [{title: '热门', list: data.list}]});
      }
    });
  }

  renderContent(): React.ReactNode {
    if (this.props.dataArray.length == 0) {
      return null;
    }
    var contentViews = this.props.dataArray.map((plm, idx) => {
      return <this.Tab.Screen name={plm.title} component={JDPromotionListCP} initialParams={{list: plm.list, style: this.props.style}} key={`JDPromotionListCP${idx}`} />;
    });
    return (
      <this.Tab.Navigator
        key="JDPromotionListTab"
        tabBarOptions={{
          style: {backgroundColor: 'transparent', height: this.props.showTopBar ? 50 : 0},
          labelStyle: {fontSize: 15},
          tabStyle: {width: 60},
          scrollEnabled: true,
          indicatorStyle: {marginBottom: 12, marginLeft: 10, height: 26, width: 42, borderRadius: 2, backgroundColor: Skin1.navBarBgColor[0]},
          inactiveTintColor: '#555',
          activeTintColor: 'white',
        }}>
        {contentViews}
      </this.Tab.Navigator>
    );
  }
}

export default connect(JDPromotionListStateToProps)(JDPromotionListPage);
