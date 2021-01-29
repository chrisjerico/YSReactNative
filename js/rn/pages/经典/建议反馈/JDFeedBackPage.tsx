
import { View, Text, FlatList, StyleSheet, RefreshControl, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import React, { useEffect, useRef, useState, Component } from 'react'
import { setProps } from '../../base/UGPage';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { UGSignInHistoryModel } from '../../../redux/model/other/UGSignInHistoryModel';
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import PushHelper from '../../../public/define/PushHelper';
import { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel';
import { push } from '../../../public/navigation/RootNavigation';
import { PageName } from '../../../public/navigation/Navigation';
import { img_images, img_vueTemplate } from '../../../Res/icon';

const JDFeedBackPage = () => {
  const [list, setList] = useState<Array<UGSignInHistoryModel>>([
    {
      idKey:'1',
      name: '在线客服',
      imgUrl: img_images('zxkf'),
      remark: '游戏过程中遇到问题（如充值提款等），请联系在线客服以便我们为您及时处理。',
    },
    {
      idKey:'2',
      name: '建议反馈',
      imgUrl: img_vueTemplate('jyfk'),
      remark: '如果您对游戏或者平台有好的建议可以行进提交，官方客服会在48小时内进行回复。我们会参考您的反馈不断优化我们的产品和服务。',
    },
    {
      idKey:'3',
      name: '投诉建议',
      imgUrl: img_images('tsjy'),
      remark: '为了让平台所有会员获得最好的服务，维护会员权益，我们为会员提供出款监督服务，如出款遇到恶意拖延、不出款等问题可以提出投诉！我们会尽快为您解决。',
    },
    {
      idKey:'4',
      name: '反馈记录',
      imgUrl: img_vueTemplate('fkjl'),
      remark: '为了让平台所有会员获得最好的服务，维护会员权益，我们为会员提供出款监督服务，如出款遇到恶意拖延、不出款等问题可以提出投诉！我们会尽快为您解决。',
    }
  ])


  useEffect(() => {

    setProps({
      navbarOpstions: { hidden: false, title: '建议反馈', back: true },
    })

  }, [])

  // 渲染列表项
  const _renderItem = ({ index, item }) => {

    console.log(index);

    return (
      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
        if (item.idKey == '1') {
          PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          // OCHelper.call('UGNavigationController.current.pushVCWithUserCenterItemType:', [14])
        } 
        else if (item.idKey == '2') {
          push(PageName.JDWriteMessagePage, {feedType:0})
        } 
        else if (item.idKey == '3') {
          push(PageName.JDWriteMessagePage, {feedType:1})
        }
        else if (item.idKey == '4') {
          OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{
            selectors: 'AppDefine.viewControllerWithStoryboardID:;.navigationItem[setTitle:][setFeedType:]',
            args1: ['UGFeedBackRecordController'],
          }, true])
        }
       

      }}>
        <Image style={[{ height: 40, width: 40, marginTop: 25 }]} source={{ uri: item.imgUrl }} />
        <View style={[{ flex: 1, marginTop: 14 }]}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[{ fontSize: 15, color: Skin1.textColor1, marginHorizontal: 10, marginVertical: 5, }]}>{item.name}</Text>
            <View style={{ flex: 1 }} />
            <Text style={[{ fontSize: 20, color: Skin1.textColor1 }]}>{'›'}</Text>
          </View >
          <View style={[{ height: 1.5, backgroundColor: '#AEAEAE', marginLeft: 11, marginTop: 8 }]}></View>
          <Text style={[{ fontSize: 13, color: Skin1.textColor2, marginLeft: 10, marginTop: 10, marginRight: 70 }]}>{item.remark}</Text>
        </View>
      </TouchableOpacity>
    );
  }


  return (
    <FlatList
      style={[{ flex: 1, marginLeft: 10, marginRight: 10, backgroundColor: Skin1.textColor4 }]}
      data={list} // 数据源
      renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
      showsVerticalScrollIndicator={false} // 当此属性为true的时候，显示一个垂直方向的滚动条，默认为: true
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false} // 当此属性为true的时候，显示一个水平方向的滚动条，默认为: true
    />
  )

}

export default JDFeedBackPage