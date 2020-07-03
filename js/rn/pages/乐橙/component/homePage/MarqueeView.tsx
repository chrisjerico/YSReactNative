import {Dimensions, Image, View, Text, ScrollView, TouchableHighlight} from "react-native";
import * as React from "react";
import {MarqueeHorizontal} from 'react-native-marquee-ab';
import {useState} from "react";
import Modal from 'react-native-modal';
import AutoHeightWebView from "react-native-autoheight-webview";

const width = Dimensions.get("screen").width

interface MarqueeViewProps {
    textArr: string[]
}

export const MarqueeView = ({textArr}: MarqueeViewProps) => {
    const [popupVisible, setPopupVisible] = useState(false)
    const [popupContent, setPopupContent] = useState("")
    const getTextList = () => {
        return textArr.map((value, index) => {
            return {label: index.toString(), value}
        })
    }

    const getContent = () => {
        return {
            html: `<head>
            <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>
            <style>img{width:auto !important;max-width:100%;height:auto !important}</style>
            <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>
          </head>` +
                `<script>
            window.onload = function () {
              window.location.hash = 1;
              document.title = document.body.scrollHeight;
            }
          </script>` + popupContent
        }
    }
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
            backgroundColor: "white",
            borderRadius: 20,
            marginVertical: 6
        }}>
            <Image style={{height: 15, width: 15, marginLeft: 10}}
                   source={{uri: 'https://flyclipart.com/thumb2/bulletin-board-bulletin-notice-icon-with-png-and-vector-format-586196.png'}}/>
            <MarqueeHorizontal
                textList={getTextList()}
                separator={width - 90}
                speed={60}
                width={width - 55}
                height={30}
                direction={'left'}
                reverse={false}
                textStyle={{fontSize: 16, color: '#FF0000'}}
                onTextClick={(item) => {
                    setPopupContent(item.content)
                    setPopupVisible(true)
                }}
            />
            <Modal isVisible={popupVisible}>
                <View style={{
                    height: 270,
                    width: Dimensions.get("screen").width,
                    alignSelf: "center",
                    paddingHorizontal: 20,
                }}>
                    <View style={{
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        height: 50,
                        justifyContent: "center",
                        backgroundColor: "rgba(242,242,242, 0.9)",
                        borderBottomWidth: 1,
                        borderBottomColor: "#cccccc"
                    }}/>
                    <Text style={{
                        alignSelf: "center",
                        position: "absolute",
                        height: 50,
                        top: 15,
                        fontSize: 16.5,
                        fontWeight: "bold"
                    }}>公告</Text>
                    <AutoHeightWebView
                        style={{
                            width: width - 40,
                            backgroundColor: 'white',
                        }}
                        viewportContent={'width=device-width, user-scalable=no'}
                        source={getContent()}/>
                    <View style={{
                        flexDirection: "row", backgroundColor: 'white',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        justifyContent: "center"
                    }}>
                        <TouchableHighlight underlayColor={"#cccccc"} style={{
                            marginBottom: 10,
                            width: 164,
                            height: 54,
                            borderRadius: 4,
                            borderColor: "#CCCCCC",
                            borderWidth: 1,
                            justifyContent: "center"
                        }} onPress={() => setPopupVisible(false)}>
                            <Text style={{alignSelf: "center"}}>取消</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
