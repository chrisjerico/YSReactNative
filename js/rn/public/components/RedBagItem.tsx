import {RedBagDetailActivityModel} from "../network/Model/RedBagDetailActivityModel"
import {IGlobalState, UGStore} from "../../redux/store/UGStore"
import {useState, useEffect} from "react"
import {Alert, Image, StyleProp, TouchableWithoutFeedback, View, ViewStyle} from "react-native"
import {navigate} from "../navigation/RootNavigation"
import {PageName} from "../navigation/Navigation"
import PushHelper from "../define/PushHelper"
import FastImage, {ImageStyle} from "react-native-fast-image"
import React from 'react'
import {useDimensions} from '@react-native-community/hooks'
import { UGUserCenterType } from "../../redux/model/全局/UGSysConfModel"

/**
 * 红包

 *
 * @param redBag
 * @param loginPage
 * @constructor
 */
const RedBagItem = ({style, redBag, loginPage}: { style?: StyleProp<ViewStyle>, redBag: RedBagDetailActivityModel, loginPage?: PageName }) => {
    const {isTest = false, uid = ""} = UGStore.globalProps.userInfo
    const [redBagVisiable, setRedBagVisiable] = useState(false)
    useEffect(() => {
        if (redBag?.data != null) {
            setRedBagVisiable(true)
        }
    }, [redBag])
    return (
        redBagVisiable ?
            <TouchableWithoutFeedback onPress={() => {
                if (uid == "") {
                    Alert.alert("温馨提示", "您还未登录", [
                        {
                            text: "取消", onPress: () => {
                            }, style: "cancel"
                        },
                        {
                            text: "马上登录", onPress: () => {
                                loginPage ? navigate(loginPage, {}) : PushHelper.pushUserCenterType(UGUserCenterType.登录页)
                            },
                        }
                    ])
                } else if (isTest) {
                    Alert.alert("温馨提示", "请登录正式账号", [
                        {
                            text: "取消", onPress: () => {
                            }, style: "cancel"
                        },
                        {
                            text: "马上登录", onPress: () => {
                                loginPage ? navigate(loginPage, {}) : PushHelper.pushUserCenterType(UGUserCenterType.登录页)
                            },
                        }
                    ])
                } else {
                    PushHelper.pushRedBag(redBag)
                }
            }}>
                <View style={[{width: 120, right: 20, top: 80, position: "absolute", flexDirection: "row"}, style]}>
                    <FastImage
                        style={[{width: 95, height: 95, zIndex: 100}]}
                        source={{uri: redBag?.data?.redBagLogo}}>
                    </FastImage>
                    <TouchableWithoutFeedback onPress={() => {
                        setRedBagVisiable(false)
                    }}>
                        <Image style={{width: 25, height: 25, marginLeft: 10}}
                               source={{uri: "dialog_close"}}/>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback> : <></>)
}
export default RedBagItem
