
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, Image, TouchableOpacity, View, Platform, Alert } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { skin1, Skin1 } from '../../../public/theme/UGSkinManagers';
import DateUtil from '../../../public/tools/andrew/DateUtil';
import { RedBagLogModel } from '../../../redux/model/other/RedBagLogModel';
import { setProps, UGBasePageProps } from '../../base/UGPage';
import { scale } from "../../../public/tools/Scale";
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import EmptyView from '../../../public/components/view/empty/EmptyView';
import { anyEmpty, arrayEmpty } from '../../../public/tools/Ext';
import { ugLog } from '../../../public/tools/UgLog';
import { PromotionConst } from '../const/PromotionConst';
import { Badge, Button } from 'react-native-elements';
import UGDropDownPicker from '../../bank/add/view/UGDropdownPicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import { NSValue } from '../../../public/define/OCHelper/OCBridge/OCCall';
import { UGStore } from '../../../redux/store/UGStore';
import { JDInviteCodeGenerateCP } from '../cp/JDInviteCodeGenerateCP';
import { InviteCodeModel } from '../Model/InviteCodeModel';
import { number } from 'prop-types';
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface JDPromotionCodeListPage {
  pageTitle?: string,//界面名称数据
  titleArray?: Array<string>,// 按钮名称数据

  //===列表数据====================================
  pageSize?: number//每页多少条数据
  pageNumber?: number,//当前显示第几页

  items?: Array<InviteCodeModel>//界面数据
  state: {
    showFoot?: number//控制foot， 0：点击重新加载   1：'数据加载中…  2 ：已加载全部数据(空)
    isRefreshing?: boolean//下拉刷新开始结束
    isLastPage?: boolean //是否是最后一页
  },
  //===弹窗====================================
  codeCP?: JDInviteCodeGenerateCP,
}

const JDPromotionCodeListPage = ({ pageTitle, titleArray }: { pageTitle?: string, titleArray?: Array<string>, }) => {

  //调用sysConf
  const { inviteCode } = UGStore.globalProps.sysConf

  let { current: v } = useRef<JDPromotionCodeListPage>(
    {
      pageTitle: '邀请码',
      titleArray: [inviteCode.displayWord, "招募类型", "创建时间", "注册会员", "操作",],
      items: [],
      pageSize: 50,
      pageNumber: 1,
      state: {
        showFoot: 0,
        isRefreshing: true,
        isLastPage: false,
      },
      codeCP: {}
    }
  )

  /**
 * 初始化
 * @param item
 */
  useEffect(() => {
    setProps({
      navbarOpstions: {
        hidden: false, title: inviteCode.displayWord, back: true,
        rightComponent:
          <Button
            title={'生成' + inviteCode.displayWord}
            buttonStyle={{ backgroundColor: Skin1.themeColor, width: 120, }}
            titleStyle={{ fontSize: 16 }}
            onPress={() => rightClicked()}
          />
      },
      didFocus: () => {
        onHeaderRefresh()
      }
    })

  }, [])

  /**
    * 跳到生成邀请码界面
    *
    */
  function rightClicked() {
    console.log('跳到生成邀请码界面');

    v.codeCP?.showSalaryAlert && v.codeCP?.showSalaryAlert()
    setProps()
  }
  /**
 * 下拉刷新
 *
 */
  const onHeaderRefresh = () => {
    v.state.isRefreshing = true
    v.pageNumber = 1
    console.log('下拉刷新');
    inviteCodeListData()
  }
  /**
  * 点击（上拉）加载更多数据
  *
  */
  const onFooterRefresh = () => {
    v.pageNumber++
    console.log('上拉加载');
    v.state.showFoot = 1
    setProps()
    inviteCodeListData()
  }
  /**
* 点击刷新
*
*/
  function onEndReached() {
    console.log('onEndReached');
    console.log('showFoot ==', v.state.showFoot);

    //如果是正在加载中或没有更多数据了，则返回
    if (v.state.showFoot != 0) {
      console.log('正在加载中或没有更多数据了，则返回');
      return;
    }
    //如果当前页大于或等于总页数，那就是到最后一页了，返回
    if (v.state.isLastPage) {
      console.log('当前页大于或等于总页数，那就是到最后一页了，则返回');
      return;
    }
    //是否已是下拉刷新 返回
    if (v.state.isRefreshing) {
      console.log('已是下拉刷新 返回  ');
      return;
    }
    //获取数据
    onFooterRefresh();
  }
  /**
   * 根据数据是数组还是字典返回数据
   *
   */
  function returnData(data: any) {
    if (Array.isArray(data)) {
      return data;
    } else {
      return data['list']
    }
  }

  /**
   * 得到邀请码列表数据
   *
   */
  function inviteCodeListData() {

    console.log('得到邀请码列表数据===', v.pageNumber);
    api.team.inviteCodeList(v.pageNumber, v.pageSize).useSuccess(({ data }) => {

      console.log('data =', data);
      let dicData = data;
      let arrayData = returnData(dicData);
      if (arrayData.length == 0) {
        console.log('进来了：==================');
        v.state.isLastPage = true;
        v.state.showFoot = 2
        v.state.isRefreshing = false;
        setProps();
        return;
      }
      if (v.pageNumber == 1) {
        v.state.isRefreshing = false
        v.items.length = 0
        v.items = JSON.parse(JSON.stringify(arrayData))
        // console.log('v.state.isRefreshing ====', v.state.isRefreshing);
      }
      else {
        v.items = v.items.concat(JSON.parse(JSON.stringify(arrayData)))
      }
      v.state.showFoot = 0
      if (arrayData.length < v.pageSize) {
        console.log('进来了：==================', v.state.isLastPage);
        v.state.isLastPage = true;
        v.state.showFoot = 2
      }
      else {
        v.state.isLastPage = false;
        v.state.showFoot = 0
      }
      console.log('网络数据长度：', arrayData.length);
      console.log('showFoot==', v.state.showFoot);

      setProps()

    });
  }

  /**
   * 开启关闭邀请码
   *
   */
  function updateInviteCodeStatus(id: number, status: number) {
    let params = {
      id: id,
      status: status,
    }
    api.team.updateInviteCodeStatus(params).useSuccess(({ data }) => {
      console.log('成功了');
      onHeaderRefresh()
      let titleStr: string = status ? '开启' : '关闭';
      Alert.alert('提示',
        '现在状态为' + titleStr,
        [
          {
            text: '确定',
            onPress: () => {
            },
          },
        ])

    });
  }

  /**
  * 数据为空展示页面
  *
  */
  const _renderListEmptyComp = () => {
    return (
      <View style={{
        flex: 1,
        height: AppDefine.height,
        borderColor: '#E4E7EA',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <UGText style={[{ color: Skin1.textColor3, }, styles.listEmpty,]}>暂无更多数据</UGText>
      </View>
    );
  }

  /**
* 上拉加载布局
*
*/
  const renderFooter = () => {
    if (v.state.showFoot === 0) {
      return (
        <TouchableOpacity style={{ paddingBottom: 150 }} onPress={() => {

        }}
        >
          <View style={styles.foot}>
            <UGText style={[styles.footText, { color: Skin1.textColor2 }]}>
              上拉加载
              </UGText>
          </View>
        </TouchableOpacity>
      );
    } else if (v.state.showFoot === 1) {
      return (
        <TouchableOpacity style={{ paddingBottom: 150 }} onPress={() => {
          // onEndReached()  //测试的时候可以打开，打开也没有影响
        }}
        >
          <View style={styles.foot}>
            <ActivityIndicator />
            <UGText style={[styles.footText, { color: Skin1.textColor2 }]}>
              正在加载...
            </UGText>
          </View>
        </TouchableOpacity>
      );
    } else if (v.state.showFoot === 2) {
      return (
        <TouchableOpacity style={{ paddingBottom: 150 }} onPress={() => {
          // onEndReached()//测试的时候可以打开，打开也没有影响
        }}
        >
          <View style={styles.foot}>
            <UGText style={[styles.footText, { color: Skin1.textColor2 }]}>

            </UGText>

          </View>
        </TouchableOpacity>
      );
    }
  }
  /**
* 按钮背景色
*
*/
  function btnBgColor(item: InviteCodeModel) {

    if (item?.status === '1') {
      return Skin1.themeColor;
    } else {
      return Skin1.CLBgColor;
    }
  }

  /**
* 渲染列表项
*
*/
  const _renderItem = ({ index, item }) => {
    {
      return (
        <View style={[styles.viewItem, { backgroundColor: Skin1.textColor4, borderBottomWidth: 1, borderBottomColor: Skin1.textColor3, alignItems: 'center' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: AppDefine.width / 5, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
            <UGText style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, }}>
              {item.invite_code}
            </UGText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: AppDefine.width / 5, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
            <UGText style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, }}>
              {item.user_type_txt}
            </UGText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: AppDefine.width / 5, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
            <UGText style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, }}>
              {item.created_time}
            </UGText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: AppDefine.width / 5, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
            <UGText style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, }}>
              {item.used_num}
            </UGText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, height: scale(66), alignItems: 'center' }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, backgroundColor: btnBgColor(item), borderRadius: 5 }}
              onPress={() => {

                if (item?.status === '1') {
                  //开启或者关闭
                  updateInviteCodeStatus(parseInt(item.id), 0)
                } else {
                  //开启或者关闭
                  updateInviteCodeStatus(parseInt(item.id), 1)
                }

              }}>
              <UGText style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(18), color: item?.status === '1'?  Skin1.textColor4 : skin1.textColor2 }}>
                {item?.status === '1'? '关闭' : '开启' }
              </UGText>
            </TouchableOpacity>
          </View>
        </View>

      );
    }
  }
  return (
    [<View style={styles.container}>
      <View style={{}}>
        {inviteCode.canUseNum != '0' && <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: Skin1.CLBgColor, borderBottomColor: Skin1.textColor3, borderBottomWidth: 1, }}>
          <UGText style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, }}>
            {'每个' + inviteCode.displayWord + '可以使用' + inviteCode.canUseNum + '次'}
          </UGText>
        </View>}
        <View style={{ flexDirection: 'row', height: scale(66), backgroundColor: Skin1.CLBgColor }}>
          {v.titleArray?.map((title, idx) => {
            return (
              <TouchableOpacity style={{ borderBottomWidth: scale(1), borderColor: Skin1.textColor3, flexDirection: 'row', justifyContent: 'center', flex: 1, width: AppDefine.width / v.titleArray?.length, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}
                onPress={() => {
                }}>
                <UGText style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, }}>
                  {title}
                </UGText>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      <View style={{}}>
        <FlatList
          data={v.items}
          renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={_renderListEmptyComp()} // 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element
          //下拉刷新
          //设置下拉刷新样式
          refreshControl={
            <RefreshControl
              title={"正在加载..."} //android中设置无效
              colors={[Skin1.textColor2]} //android
              tintColor={Skin1.textColor2} //ios
              titleColor={Skin1.textColor2}
              refreshing={v.state.isRefreshing}
              // refreshing={isHeader}
              onRefresh={() => {
                onHeaderRefresh(); //下拉刷新加载数据
              }}
            />
          }
          //设置上拉加载
          ListFooterComponent={() => renderFooter()}
          onEndReachedThreshold={0.01}//上拉刷新测试发现经常不触发
          onEndReached={() => {
            onEndReached()
          }}
          onContentSizeChange={() => {
            console.log('onContentSizeChange');
          }}
        />
      </View>
    </View >,
    <JDInviteCodeGenerateCP {...{
      c_ref: v.codeCP, reloadBlock: () => {
        onHeaderRefresh()
      }
    }} />]
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin1.isBlack ? Skin1.CLBgColor : '#F1F2F5'
  },
  item: {
    flex: 1,
    borderColor: '#E4E7EA',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: scale(22)
  },
  loadMore: {
    alignItems: "center"
  },
  indicator: {
    color: "red",
    margin: scale(10)
  },
  foot: {
    height: scale(60),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  footText: {
    fontSize: scale(22),
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  viewItem: {
    flexDirection: 'row',
    height: scale(66),
  },
  listEmpty: {
    fontSize: scale(22),
    marginTop: scale(15),
  },
  capital_type_picker: {
    height: scale(66),
    padding: scale(8),
    position: 'absolute',
    width: '100%',
  },
});

export default JDPromotionCodeListPage
