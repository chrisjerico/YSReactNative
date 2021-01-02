import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text,Image, TouchableOpacity, View } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import DateUtil from '../../../public/tools/andrew/DateUtil';
import { RedBagLogModel } from '../../../redux/model/other/RedBagLogModel';
import { setProps, UGBasePageProps } from '../../base/UGPage';
import { scale } from "../../../public/tools/Scale";
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import EmptyView from '../../../public/components/view/empty/EmptyView';
import { anyEmpty, arrayEmpty } from '../../../public/tools/Ext';
import { ugLog } from '../../../public/tools/UgLog';
import { PromotionConst } from '../const/PromotionConst';
interface JDPromotionTablePage {
  pageTitle?: string,//界面名称数据
  titleArray?: Array<string>,// 按钮名称数据
  levelArray?: Array<string>,// 下拉名称数据
}



const JDPromotionTablePage = ({ pageTitle,titleArray}:{pageTitle?:string,titleArray?: Array<string>,}) => {


  let { current: v } = useRef<JDPromotionTablePage>(
    {
      pageTitle:pageTitle,
      titleArray : titleArray,
      levelArray:["全部下线","1级下线","2级下线","3级下线","4级下线","5级下线","6级下线","7级下线","8级下线","9级下线","10级下线"],
    }
  )
 
  
  //初始化
  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: pageTitle },
      didFocus: () => {
        v.pageTitle = pageTitle;
        v.titleArray = titleArray;
      }
    })
  }, [])


  // setTitleArray(pageTitle);
  


  return (
    <View style={styles.container}>
      <View style ={{flexDirection: 'row',height:scale(44),backgroundColor:Skin1.textColor4}}>
      {v.titleArray?.map((title, idx) => {
        return (
          <View  style ={{borderBottomWidth:scale(1),borderColor:Skin1.textColor3,flexDirection: 'row',justifyContent: 'center',height:scale(44), width:AppDefine.width/v.titleArray?.length,}}>
            <Text style ={{flexDirection: 'row',textAlign: 'center', fontSize: 12,color:Skin1.textColor1,marginTop:10}}>
              {title}
            </Text>
            <Image style={[{ height: 18, width: 18, marginTop: 10 }]} source={{ uri: 'https://appstatic.guolaow.com/web/images/zxkf.png' }} />

          </View>
        )
      })}
      </View>
    </View >
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin1.isBlack ? Skin1.CLBgColor : '#F1F2F5'
  },

});

export default JDPromotionTablePage

