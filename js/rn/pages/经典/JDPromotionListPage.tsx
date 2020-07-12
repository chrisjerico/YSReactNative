import React from 'react';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import { UGPromoteModel } from '../../redux/model/other/UGPromoteModel';
import JDPromotionListCP from './cp/JDPromotionListCP';
import UGBasePage from '../base/UGBasePage';
import { JDPromotionListProps, JDPromotionListStateToProps } from './JDPromotionListProps';
import { connect } from 'react-redux';
import { Skin1 } from '../../public/theme/UGSkinManagers';
import ScrollableTabView, { TabBarProps } from 'react-native-scrollable-tab-view';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import AppDefine from '../../public/define/AppDefine';
import chroma from 'chroma-js';
import { UGColor } from '../../public/theme/UGThemeColor';

class JDPromotionListPage extends UGBasePage<JDPromotionListProps> {
  style1: '背景透明' | '背景不透明' = '背景透明'; // 标题栏样式

  constructor(props) {
    super(props);
    if ('c217'.indexOf(AppDefine.siteId) != -1) {
      this.style1 = '背景不透明';
    }
  }

  didFocus(params: JDPromotionListProps): void { }

  requestData() {
    NetworkRequest1.systeam_promotions().then(data => {
      if (data.showCategory) {
        const temp: { [x: number]: Array<UGPromoteModel> } = [];
        data.list.map(pm => {
          let list = temp[pm.category];
          if (!list) {
            list = [];
          }
          temp[pm.category] = list;
          list.push(pm);
        });

        const dataArray: Array<{ category: string; title: string; list: Array<UGPromoteModel> }> = [];
        dataArray.push({ category: '0', title: '全部', list: data.list });
        for (const k in temp) {
          const title = data.categories[k];
          if (!title) {
            continue;
          }
          const obj = dataArray.filter(v => {
            return v.title == title;
          })[0];
          if (obj) {
            obj.list = obj.list.concat(temp[k]);
          } else {
            dataArray.push({ category: k, title: title, list: temp[k] });
          }
        }
        this.setProps({ style: data.style, dataArray: dataArray, showTopBar: dataArray.length > 1 });
      } else {
        this.setProps({ style: data.style, dataArray: [{ title: '热门', list: data.list }] });
      }
    });
  }

  // 顶部标题栏
  renderTabBar(props: TabBarProps & { hidden: boolean; titles: string[], style?: '背景透明' | '背景不透明' }) {
    if (props.hidden) {
      return null;
    }
    const { titles = [] } = props;
    if (props.style === '背景不透明') {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: props.hidden ? 0 : 43, backgroundColor: 'chroma(Skin1.themeColor).brighten(0.4).hex()' }}>
          <View style={{ position: 'absolute', left: 0, top: 42, width: AppDefine.width, height: 1, backgroundColor: '#ccc' }} />
          {titles.map((title, idx) => {
            return (
              <View>
                <Text
                  onPress={() => {
                    props.goToPage(idx);
                  }}
                  style={{
                    marginTop: 8,
                    marginHorizontal: 8,
                    height: 27,
                    paddingTop: 6,
                    textAlign: 'center',
                    fontSize: 15,
                    color: idx == props.activeTab ? '#DD0000' : UGColor.TextColor1,
                    borderRadius: 3,
                  }}>
                  {title}
                </Text>
                <View style={{ marginTop: 7, height: idx == props.activeTab ? 1.5 : 0, backgroundColor: '#DD0000' }} />
              </View>
            );
          })}
        </View>
      );
    }

    return (
      <View style={{ marginLeft: 5, flexDirection: 'row', height: props.hidden ? 0 : 45 }}>
        {titles.map((title, idx) => {
          return (
            <Text
              onPress={() => {
                props.goToPage(idx);
              }}
              style={{
                marginTop: 11,
                marginHorizontal: 2,
                paddingHorizontal: 5,
                height: 27,
                paddingTop: 6,
                backgroundColor: idx == props.activeTab ? Skin1.themeColor : 'transparent',
                textAlign: 'center',
                fontSize: 15,
                color: idx == props.activeTab ? 'white' : Skin1.bgTextColor,
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
    const { dataArray = [], showTopBar = true } = this.props;
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
              style={this.style1}
            />
          );
        }}>
        {contentViews}
      </ScrollableTabView>
    );
  }
}

export default connect(JDPromotionListStateToProps)(JDPromotionListPage);
