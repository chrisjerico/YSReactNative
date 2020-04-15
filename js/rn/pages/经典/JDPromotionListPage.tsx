import React from 'react';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import {UGPromoteModel} from '../../redux/model/other/UGPromoteModel';
import JDPromotionListCP from './cp/JDPromotionListCP';
import UGBasePage from '../base/UGBasePage';
import {JDPromotionListProps, JDPromotionListStateToProps} from './JDPromotionListProps';
import {connect} from 'react-redux';
import {Skin1} from '../../public/theme/UGSkinManagers';
import ScrollableTabView, {TabBarProps} from 'react-native-scrollable-tab-view';
import {Text} from 'react-native-elements';
import {View} from 'react-native';

class JDPromotionListPage extends UGBasePage<JDPromotionListProps> {
  requestData() {
    NetworkRequest1.systeam_promotions().then(data => {
      if (data.showCategory) {
        const temp: {[x: number]: Array<UGPromoteModel>} = [];
        data.list.map(pm => {
          let list = (temp[pm.category] = temp[pm.category]);
          if (!list) {
            list = [];
          }
          list.push(pm);
        });

        const dataArray: Array<{category: string; title: string; list: Array<UGPromoteModel>}> = [];
        dataArray.push({category: '0', title: '全部', list: data.list});
        for (const k in temp) {
          const title = data.categories[k];
          if (!title) {
            continue;
          }
          const obj = dataArray.objectWithValue(title, 'title');
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

  // 顶部标签栏
  renderTabBar(props: TabBarProps & {hidden: boolean; titles: string[]}) {
    if (props.hidden) {
      return null;
    }
    const {titles = []} = props;
    return (
      <View style={{marginLeft: 5, flexDirection: 'row', height: props.hidden ? 0 : 45}}>
        {titles.map((title, idx) => {
          return (
            <Text
              onPress={() => {
                props.goToPage(idx);
              }}
              style={{
                marginTop: 11,
                marginHorizontal: 5,
                width: 42,
                height: 27,
                paddingTop: 6,
                backgroundColor: idx == props.activeTab ? Skin1.themeColor : 'transparent',
                textAlign: 'center',
                fontSize: 15,
                color: idx == props.activeTab ? 'white' : '#eee',
                borderRadius: 3,
                overflow: true,
              }}>
              {title}
            </Text>
          );
        })}
      </View>
    );
  }

  renderContent(): React.ReactNode {
    const {dataArray = [], showTopBar = true} = this.props;
    if (dataArray.length == 0) {
      return null;
    }
    var contentViews = dataArray.map(plm => {
      return <JDPromotionListCP list={plm.list} style2={this.props.style} />;
    });

    return (
      <ScrollableTabView
        renderTabBar={(props: TabBarProps) => {
          return (
            <this.renderTabBar
              {...props}
              titles={dataArray.map(plm => {
                return plm.title;
              })}
              hidden={!showTopBar}
            />
          );
        }}>
        {contentViews}
      </ScrollableTabView>
    );
  }
}

export default connect(JDPromotionListStateToProps)(JDPromotionListPage);
