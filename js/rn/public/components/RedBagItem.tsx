import {RedBagDetailActivityModel} from "../network/Model/RedBagDetailActivityModel"
import {IGlobalState} from "../../redux/store/UGStore"
import {useSelector} from "react-redux"
import {useState, useEffect} from "react"
import {Alert, Image, StyleProp, TouchableWithoutFeedback, View, ViewStyle} from "react-native"
import {navigate} from "../navigation/RootNavigation"
import {PageName} from "../navigation/Navigation"
import PushHelper from "../define/PushHelper"
import FastImage, {ImageStyle} from "react-native-fast-image"
import React from 'react'
import {useDimensions} from '@react-native-community/hooks'

const RedBagItem = ({style, redBag, loginPage}: { style?: StyleProp<ViewStyle>, redBag: RedBagDetailActivityModel, loginPage?: PageName }) => {
    const {width} = useDimensions().screen
    const {isTest = false, uid = ""} = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const [redBagVisiable, setRedBagVisiable] = useState(false)
    useEffect(() => {
        if (redBag) {
            setRedBagVisiable(true)
        }
    }, [redBag])
    if (redBagVisiable) {
        return (

            <TouchableWithoutFeedback style={{width: 200}} onPress={() => {
                if (uid == "") {
                    Alert.alert("温馨提示", "该贴注册会员才能阅读，请登录后查看。", [
                        {
                            text: "已取消", onPress: () => {
                            }, style: "cancel"
                        },
                        {
                            text: "马上登录", onPress: () => {
                                loginPage ? navigate(loginPage, {}) : PushHelper.pushLogin()
                            },
                        }
                    ])
                } else if (isTest) {
                    Alert.alert("温馨提示", "请登录正式账号", [
                        {
                            text: "已取消", onPress: () => {
                            }, style: "cancel"
                        },
                        {
                            text: "马上登录", onPress: () => {
                                loginPage ? navigate(loginPage, {}) : PushHelper.pushLogin()
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
            </TouchableWithoutFeedback>)
    } else {
        return null
    }

}
export default RedBagItem
