import { AppState, Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Skin1 } from "../../../public/theme/UGSkinManagers";
import { scale } from "../../../public/tools/Scale";
import AppDefine from "../../../public/define/AppDefine";
import UGinviteInfoModel from "../../../redux/model/全局/UGinviteInfoModel";
import { anyEmpty } from "../../../public/tools/Ext";

interface JDPromotionYJCP {
  list?: Array<UGinviteInfoModel>,//tab界面名称数据
  selItemContent?: string,
  onRoad?:() => void,
}


export const JDPromotionYJCP = (props: JDPromotionYJCP) => {

  const [list, setList] = useState<Array<UGinviteInfoModel>>([])
  const [selItemContent, setSelItemContent] = useState<string>('')
  //初始化
  useEffect(() => {
    setList(props?.list)

  }, [])



  /**
* 点击
* 
*/
  function onPressItem(item: UGinviteInfoModel) {
    falseItem()
    item.isPress = true
    setSelItemContent(item.content)
    props?.onRoad()
  }

  /**
* 全部取false
* 
*/
  function falseItem() {
    {
      list?.map((obj, idx) => {
        obj.isPress = false
      })
    }
  }

  return <View style={{
    paddingTop: 0,
    borderBottomColor: Skin1.textColor3,
    borderBottomWidth: 1,
  }}>
    <Text style={{ fontSize: scale(24), paddingVertical: scale(20), marginLeft: scale(20), color: Skin1.textColor1 }} >{'佣金比例'}</Text>
    {/* 样式1 */}
   {!(AppDefine.siteId =='c085') && <View style={{ alignItems: 'center', }} >
      <View style={{ flexDirection: 'row', paddingTop: 0, borderColor: Skin1.textColor3, borderRadius: 5, overflow: 'hidden', borderWidth: 1, backgroundColor: Skin1.CLBgColor, height: 260, width: AppDefine.width - 30 }} >
        <View style={{ flexDirection: 'column', backgroundColor: '#C4CBCC', width: 100, height: 260 }} >
          {list?.map((obj, idx) => {
            return (

              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderBottomWidth: scale(1), borderColor: Skin1.textColor3, height: 35, backgroundColor: obj?.isPress ? Skin1.CLBgColor : '#C4CBCC', }}
                onPress={() => {
                  onPressItem(obj)
                }}>
                <Text style={{ textAlign: 'center', fontSize: scale(20), color: obj?.isPress ? 'red' : Skin1.textColor1, }}>
                  {obj?.title}
                </Text>

              </TouchableOpacity>
            )
          })}
        </View>

        <View style={{ flexDirection: 'row', backgroundColor: Skin1.CLBgColor, flex: 1, height: 260 }} >
          <Text style={{ fontSize: scale(20), paddingVertical: scale(20), marginHorizontal: scale(20), color: Skin1.textColor1, textAlign: 'left' }}>
            {anyEmpty(selItemContent) ? list[0]?.content : selItemContent}
          </Text>
        </View>
      </View>
    </View>}
    {/* 样式2  */}
    {AppDefine.siteId =='c085' && <View style={{ alignItems: 'center', }} >
      <View style={{ flexDirection: 'column',width: '100%', }} >
        {list?.map((obj, idx) => {
          return (
            <View style={{marginHorizontal:10, alignItems: 'center', justifyContent: 'center', borderBottomWidth: scale(1), borderColor: Skin1.textColor3,  }}>
            
              <Text style={{marginVertical:10, textAlign: 'left', fontSize: scale(20), color:  Skin1.textColor1, }}>
                {obj?.content}
              </Text>

            </View>
          )
        })}
      </View>

    </View>}
    <View style={{ height: 10 }} ></View>
  </View>

}
