import React from "react"
import { View, Text, StyleProp, ViewStyle } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { TouchableOpacity } from "react-native-gesture-handler"
import { PageName } from "../../../../public/navigation/Navigation"
import { push } from "../../../../public/navigation/RootNavigation"
import { api } from "../../../../public/network/NetworkRequest1/NetworkRequest1"
import { skin1 } from "../../../../public/theme/UGSkinManagers"
import { sc } from "../../../../public/tools/Scale"
import { hideLoading, showLoading } from "../../../../public/widget/UGLoadingCP"
import UGUserModel from "../../../../redux/model/全局/UGUserModel"
import { UGStore } from "../../../../redux/store/UGStore"
import { img_assets } from "../../../../Res/icon"

interface HomeFriendReferralProps {
  visible: boolean
  onPress?: () => void
  containerStyle: StyleProp<ViewStyle>
}

export const HomeFriendReferralCP = ({ visible, onPress, containerStyle }: HomeFriendReferralProps) => {
  if (!visible) return null

  return (
    <TouchableOpacity style={[{ borderRadius: sc(10), backgroundColor: skin1.homeContentColor, flexDirection: 'row', height: sc(40), alignItems: 'center' }, containerStyle]} onPress={onPress ?? (() => {
      // 去收益推荐，或申请代理页
      if (!UGUserModel.checkLogin()) return
      showLoading()
      api.team.agentApplyInfo().useSuccess(({ data }) => {
        hideLoading()
        const { reviewStatus } = data
        if (reviewStatus == 2) {
          push(PageName.JDRecommendedIncomePage)
        } else {
          push(PageName.JDAgentPage, { item: data })
        }
      })
    })}>
      <FastImage source={{ uri: img_assets('icon-icon3-b') }} style={{ marginLeft: sc(15), height: '65%', aspectRatio: 1 }} />
      <Text style={{ marginLeft: sc(5), fontSize: sc(21) }}>推荐好友赚取丰厚的佣金，好运齐分享哦！</Text>
    </TouchableOpacity >
  )
}