import {
  Alert,
  Dimensions, FlatList, Image, ImageBackground, Platform,
  SafeAreaView, StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Skin1 } from '../theme/UGSkinManagers'
import { pop } from '../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useRef, useState } from 'react'
import { api } from '../network/NetworkRequest1/NetworkRequest1'
import { number, string } from 'prop-types'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { NSValue } from '../define/OCHelper/OCBridge/OCCall'
import { OCEventType } from '../define/OCHelper/OCBridge/OCEvent'
import { showLoading, showSuccess } from '../widget/UGLoadingCP'
import { UGSignInHistoryModel } from '../../redux/model/other/UGSignInHistoryModel'
import AppDefine from '../define/AppDefine'
import { Toast } from '../tools/ToastUtils'

export const FeedbackSubmitView = ({ route }) => {
  const [content, setContent] = useState('')
  const { current: imgPaths } = useRef<Array<string>>([])
  const [list, setList] = useState<Array<UGSignInHistoryModel>>([
    {
      idKey: 'add',
      imgUrl: 'https://appstatic.guolaow.com/assets/addimg.png',
    },

  ])

  const submit = () => {
    content.length >= 10 ? api.user.addFeedback(route.params.type, '', content).promise.then((data) => {
      Alert.alert(data.data.msg, '', [
        {
          text: '好',
          onPress: () => {
            pop()
          },
        },
      ])
    }) : Alert.alert('内容长度不得小于10');
  }

  // cell 点击方法
  const itemAddAction = (item: UGSignInHistoryModel, index: number) => {
    if (list.length >= 4) {
      Toast('最多添加3张图片')
      return;
    }
    if (item.idKey == 'add') {
      //+加条数据
      openPhotoPick(4 - list?.length)
    }
  }

  const checkinImg = (item: UGSignInHistoryModel) => {

    var returnStr = false;
    if (item.idKey == 'img') {
      returnStr = true
    }
    return returnStr;
  }

  const itemDelAction = (item: UGSignInHistoryModel, index: number) => {
    list.remove(item)
    setList(Object.assign([], list))

  }

  const openPhotoPick = (cnt: number) => {
    if (Platform.OS) {
      // 打开原生相册
      OCHelper.call('UGNavigationController.current.presentViewController:animated:completion:', [{
        selectors: 'TZImagePickerController.alloc.initWithMaxImagesCount:delegate:[setAllowPickingVideo:][setDidFinishPickingPhotosHandle:]',
        args1: [cnt],
        args2: [false],
        args3: [NSValue.Block(['Object', 'Object', 'Number'], OCEventType.TZImagePickerControllerDidFinishPickingPhotosHandle)]
      }, true]);
      // Block回调
      OCHelper.removeEvents(OCEventType.TZImagePickerControllerDidFinishPickingPhotosHandle)
      OCHelper.addEvent(OCEventType.TZImagePickerControllerDidFinishPickingPhotosHandle, (args: [imgs: string[], assets: [], isSelectOriginalPhoto: boolean]) => {
        const imgURLs = args[0]
        if (imgURLs?.length) {
          showLoading()
          api.user.uploadFeedback(imgURLs).useSuccess(({ data, msg }) => {
            showSuccess(msg)
            // console.log('返回的数据'+JSON.stringify(data));
            let dic = data;
            // console.log("输出最初的字典元素: ");
            for (var key in dic) {
              // console.log("key: " + key + " ,value: " + dic[key]);
              if (key == 'url') {
                imgPaths?.push(dic[key])
              }
            }
            //上传成功
            console.log('上传成功');
            //上传后台得到数据url
            imgURLs.forEach((url) => {
              list.unshift({ idKey: 'img', imgUrl: url, })
            })
            // setProps()

          });
        }

      })
    } else {
      //TODO Android
    }
  }

  return (
    <View style={{flex: 1, paddingBottom: 60}}>
      <Header />
      <View style={{ paddingHorizontal: 20, paddingTop: 24, backgroundColor: '#f5f5f9', flex: 1 }}>
        <Text style={{ color: Skin1.textColor2 }}>反馈类型：{route?.params?.type == 0 ? '提交建议' : '我要投诉'} </Text>
        <TextInput
          multiline={true}
          style={{ backgroundColor: 'white', minHeight: 200, marginTop: 12, marginHorizontal: 16 }}
          placeholder={`请输入${route?.params?.type == 0 ? '反馈' : '投诉'}内容`}
          placeholderTextColor={Skin1.textColor3}
          onChangeText={(text) => setContent(text)}
        />
        <FlatList
          style={[{ flex: 1, marginLeft: 10 }]}
          data={list} // 数据源
          renderItem={({ index, item }) => {
            return (
              <View key={item.key} style={styles.itemViewStyle}>
                <TouchableOpacity style={[{ backgroundColor: '#E7EAEA', height: itemWith, width: itemWith, }]} onPress={() => {
                  itemAddAction(item, index)
                }}>
                  <ImageBackground style={[{ flex: 1 }]} source={{ uri: item.imgUrl }}>
                    {checkinImg(item) && (
                      <TouchableOpacity style={[{ flexDirection: 'row' }]} onPress={() => {
                        itemDelAction(item, index)
                      }}>
                        <View style={{ flex: 1 }} />
                        <View style={[{ height: 40, width: 40, marginTop: 0, flexDirection: 'row' }]}>
                          <View style={{ flex: 1 }} />
                          <Image style={[{ height: 25, width: 25, marginRight: 0 }]} source={{ uri: 'https://appstatic.guolaow.com/web/platform/c069/templates/images/close.png' }} />
                        </View>
                      </TouchableOpacity>
                    )
                    }
                  </ImageBackground>

                </TouchableOpacity>
              </View>

            );
          }} // 从数据源中挨个取出数据并渲染到列表中
          showsVerticalScrollIndicator={false} // 当此属性为true的时候，显示一个垂直方向的滚动条，默认为: true
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false} // 当此属性为true的时候，显示一个水平方向的滚动条，默认为: true
          numColumns={3}

        />
        <TouchableWithoutFeedback disabled={content.length == 0} onPress={submit}>
          <View style={{
            backgroundColor: content.length == 0 ? '#d19798' : '#d82e2f',
            marginTop: 12,
            alignItems: 'center',
            paddingVertical: 16,
            borderRadius: 4,
            marginHorizontal: 36
          }}>
            <Text style={{ color: '#fff' }}>提交</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const Header = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Skin1.themeColor, borderBottomColor: '#cccccc', borderBottomWidth: 1 }}>
      <View style={{
        backgroundColor: Skin1.themeColor,
        width: Dimensions.get('screen').width,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
        <Text style={{
          paddingTop: 15,
          paddingBottom: 15,
          textAlign: 'center',
          fontSize: 17,
          width: '100%',
          alignSelf: 'center',
          color: Skin1.navBarTitleColor,
        }}>建议反馈</Text>
        <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => pop()}>
          <Icon size={33} color={Skin1.navBarTitleColor} name={'angle-left'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>)
}

const itemWith = (AppDefine.width - 120) / 3;
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
})
