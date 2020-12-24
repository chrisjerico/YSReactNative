
import AppDefine from '../../../public/define/AppDefine';
import React, { useEffect, useRef, useState, Component } from 'react'
import { setProps } from '../../base/UGPage';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { TextInput } from 'react-native-gesture-handler'
import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-elements';

import { UGSignInHistoryModel } from '../../../redux/model/other/UGSignInHistoryModel';
import { Toast } from '../../../public/tools/ToastUtils';
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import { NSValue } from '../../../public/define/OCHelper/OCBridge/OCCall';
import { OCEventType } from '../../../public/define/OCHelper/OCBridge/OCEvent';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { showLoading, showSuccess } from '../../../public/widget/UGLoadingCP';
import { UGStore } from '../../../redux/store/UGStore';

interface JDWriteMessagePage {
  list?: UGSignInHistoryModel[]
}

const itemWith = (AppDefine.width - 120) / 3;

const JDWriteMessagePage = () => {


  const [list, setList] = useState<Array<UGSignInHistoryModel>>([
    {
      idKey: 'add',
      imgUrl: 'https://appstatic.guolaow.com/assets/addimg.png',
    },

  ])


  Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };
  Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };

  function openPhotoPick(cnt: number) {
    if (Platform.OS) {

      // 打开原生相册
      OCHelper.call('UGNavigationController.current.presentViewController:animated:completion:', [{
        selectors: 'TZImagePickerController.alloc.initWithMaxImagesCount:delegate:[setAllowPickingVideo:][setDidFinishPickingPhotosHandle:]',
        args1: [cnt],
        args2: [false],
        args3: [NSValue.Block(['Object', 'Object', 'Number'], OCEventType.TZImagePickerControllerDidFinishPickingPhotosHandle)]
      }, true]);
      // 上传图片
      OCHelper.removeEvents(OCEventType.TZImagePickerControllerDidFinishPickingPhotosHandle)
      OCHelper.addEvent(OCEventType.TZImagePickerControllerDidFinishPickingPhotosHandle, ({ 0: imgs }: { 0: string[] }) => {
        if (imgs?.length) {
          imgs.forEach((url) => {
            list.unshift({ idKey: 'img', imgUrl: url, })
          })
          setProps()
        }
      })
    } else {
      //TODO Android
    }
  }


  // cell 点击方法
  function itemAddAction(item: UGSignInHistoryModel, index: number) {

    if (list.length >= 4) {
      Toast('最多添加3张图片')
      return;
    }

    if (item.idKey == 'add') {
      //+加条数据
      openPhotoPick(4 - list?.length)
    }

  }

  function itemDelAction(item: UGSignInHistoryModel, index: number) {
    //+减条数据
    list.remove(item)
    setList(Object.assign([], list))

  }

  function checkinImg(item: UGSignInHistoryModel) {

    var returnStr = false;
    if (item.idKey == 'img') {
      returnStr = true
    }
    return returnStr;
  }

  useEffect(() => {

    setProps({
      navbarOpstions: { hidden: false, title: '建议反馈' },
      didFocus: () => {
        AppDefine.checkHeaderShowBackButton((show) => {
          setProps({ navbarOpstions: { back: show } });
        })
      }
    })

  }, [])


  // 渲染列表项
  const _renderItem = ({ index, item }) => {

    return (
      <View key={item.key} style={styles.itemViewStyle}>
        <TouchableOpacity style={[{ backgroundColor: '#E7EAEA', height: itemWith, width: itemWith, }]} onPress={() => {
          itemAddAction(item, index)
        }}>
          <ImageBackground style={[{ height: itemWith, width: itemWith }]} source={{ uri: item.imgUrl }}>
            {checkinImg(item) && <TouchableOpacity onPress={() => {
              itemDelAction(item, index)
            }}>
              <View style={[{ height: 40, width: 40, }]}>
                <Image style={[{ height: 25, width: 25, marginTop: 2, marginLeft: 2 }]} source={{ uri: 'https://appstatic.guolaow.com/web/platform/c069/templates/images/close.png' }} />

              </View>
            </TouchableOpacity>}
          </ImageBackground>

        </TouchableOpacity>
      </View>

    );
  }

  console.log('list = ', list);


  return (
    <View style={[{ backgroundColor: Skin1.textColor4 }]}>

      <View style={[{ marginHorizontal: 15 }]}>

        <Text style={[{ fontSize: 18, color: Skin1.textColor1, marginTop: 30, }]}>{'反馈类型：提交建议'}</Text>

        <TextInput style={{ marginTop: 20, borderColor: '#d9d9d9', height: 120, paddingHorizontal: 10, borderWidth: AppDefine.onePx, color: Skin1.textColor1, }}
          placeholder={'请输入反馈内容'}
          multiline
          maxLength={200} />

        <View style={[{
          height: itemWith * 2 + 15, marginTop: 30,
        }]}>
          <FlatList
            style={[{ flex: 1, marginLeft: 10 }]}
            data={list} // 数据源
            renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
            showsVerticalScrollIndicator={false} // 当此属性为true的时候，显示一个垂直方向的滚动条，默认为: true
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false} // 当此属性为true的时候，显示一个水平方向的滚动条，默认为: true
            numColumns={3}

          />

        </View>


        <Button
          title="提交"
          style={{ marginTop: 50, }}
          onPress={() => {

          }}
        />
      </View>
    </View>
  )
}

export default JDWriteMessagePage

const styles = StyleSheet.create({

  itemViewStyle: {
    height: itemWith,
    width: itemWith,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    // justifyContent: 'center',//控制子元素垂直居中
    alignItems: 'center',

  },

});
