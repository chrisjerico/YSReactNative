import {View, FlatList, TouchableWithoutFeedback, Text, TouchableOpacity, Linking, Image} from "react-native"
import React, {useEffect, useState} from 'react'
import useGetHomeInfo from "../hooks/useGetHomeInfo"
import usePopUpView from "../hooks/usePopUpView"
import FastImage, {FastImageProperties} from "react-native-fast-image"
import AppDefine from "../define/AppDefine"
import AutoHeightWebView from "react-native-autoheight-webview"
import {useDimensions} from "@react-native-community/hooks"
import {httpClient} from "../network/httpClient";
import {Res} from "../../Res/icon/Resources";
import {List} from "../network/Model/PromotionsModel";
import PushHelper from "../define/PushHelper";

const PromotionsBlock = ({horizontal = false, titleVisible = true}: { horizontal?: boolean, titleVisible?: boolean }) => {
    const {couponListData,} = useGetHomeInfo(['system_promotions'])
    const [selectId, setSelectedId] = useState(-1)
    const {onPopViewPress} = usePopUpView()
    const {width, height} = useDimensions().screen
    const onPromotionItemPress = (data: List, type: 'page' | 'popup' | 'slide', onPress?: () => void) => {
        if (data?.linkUrl != "") {
            Linking.openURL(data?.linkUrl)
        } else if (data.linkCategory == 0 && data.linkPosition == 0) {
            onPopViewPress(data, type, onPress ? onPress : () => {
            })
        } else {
            PushHelper.pushCategory(data.linkCategory, data.linkPosition)
        }

    }
    return (
        <FlatList horizontal={horizontal} style={{marginTop: 10}}
                  data={couponListData?.data?.list?.filter((res, index) => index < 5)} renderItem={({item, index}) => {
            return <View style={{paddingHorizontal: 10, marginBottom: 10}}>
                <TouchableWithoutFeedback
                    onPress={onPromotionItemPress.bind(null, item, couponListData?.data?.style ?? 'popup', () => {
                        console.log("onpress::", item)
                        if (selectId == index) {
                            setSelectedId(-1)
                        } else {
                            setSelectedId(index)
                        }
                    })}>
                    <View>
                        {titleVisible && <Text style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            marginBottom: 5,
                            color: 'black'
                        }}>{item.title}</Text>}
                        <FastImageAutoHeight resizeMode={"stretch"} style={horizontal && {width: 200, height: 150}}
                                             source={{uri: item.pic}}/>
                    </View>
                </TouchableWithoutFeedback>
                {selectId == index ?
                    <View>
                        <AutoHeightWebView
                            style={{width: width - 20, backgroundColor: 'white'}}
                            viewportContent={'width=device-width, user-scalable=no'}
                            source={{
                                html: `<head><meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'><style>table{border-collapse: collapse}img{width:auto !important;max-width:100%;height:auto !important}</style><style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style></head>` + `<script>window.onload = function () {window.location.hash = 1;document.title = document.body.scrollHeight;}</script>` + `${item.content}`
                            }}
                        />
                        {item.linkUrl && item.linkUrl !== "" ?
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(item.linkUrl)
                        }}>
                            <FastImage style={{height: 100, width: 150, alignSelf: "center"}}
                                       source={{uri: httpClient.defaults.baseURL + `/images/more.gif`}}/>
                        </TouchableOpacity>: <></>}
                    </View> :
                    <></>
                }
            </View>
        }}/>
    )
}
const FastImageAutoHeight = (props: FastImageProperties) => {
    const [picHeight, setPicHeight] = useState(100)
    const {cardMargin, marginHorizontal} = usePopUpView()
    return (
        <FastImage {...props} style={[{height: picHeight}, props.style]} onLoad={(e) => {
            setPicHeight(((AppDefine.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height)
        }}/>
    )
}
export default PromotionsBlock
