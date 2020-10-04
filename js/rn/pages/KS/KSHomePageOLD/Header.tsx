import { View, Text, StyleSheet } from "react-native"
import { useDimensions } from "@react-native-community/hooks"
import React from 'react'
import { IGlobalState, UGStore } from "../../../redux/store/UGStore"
import FastImage from "react-native-fast-image"
const Header = () => {
  const { width } = useDimensions().screen
  const sysStore = UGStore.globalProps.sysConf;
  const { mobile_logo = "" } = sysStore
  return (
    <View style={{ width: width - 10, marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: "#1d2128", paddingVertical: 5 }}>
      <FastImage resizeMode={'contain'} style={{ width: 44, height: 44 }} source={{ uri: mobile_logo }} />
      <View style={{ height: '80%', width: 1, backgroundColor: "#444" }}></View>
      <View style={{ marginLeft: 20, justifyContent: 'space-around' }}>
        <Text style={{ color: "#cea458", fontSize: 10, marginBottom: 5 }}>特别</Text>
        <Text style={{ color: "#cea458", fontSize: 10 }}>赞助</Text>
      </View>
      <View style={styles.brandContainer}>
        <FastImage resizeMode={'contain'} style={{ width: 25, height: 25, marginBottom: 6 }} source={{ uri: "https://a06frontweb.cathayfund.com/cdn/A06FM/img/sponsor_wgjj.26f0b33.png" }} />
        <Text style={styles.title}>维冈竞技</Text>
      </View>
      <View style={styles.brandContainer}>
        <FastImage resizeMode={'contain'} style={{ width: 25, height: 25, marginBottom: 6 }} source={{ uri: "https://a06frontweb.cathayfund.com/cdn/A06FM/img/sponsor_lwks.8418f60.png" }} />
        <Text style={styles.title}>勒沃库森</Text>
      </View>
      <View style={styles.brandContainer}>
        <FastImage resizeMode={'contain'} style={{ width: 25, height: 25, marginBottom: 6 }} source={{ uri: "https://a06frontweb.cathayfund.com/cdn/A06FM/img/sponsor_flmns.02406e3.png" }} />
        <Text style={styles.title}>弗鲁米嫩塞</Text>
      </View>
      <View style={styles.brandContainer}>
        <FastImage resizeMode={'contain'} style={{ width: 25, height: 25, marginBottom: 6 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/22/images/aggb.png" }} />
        <Text style={styles.title}>奥格斯堡</Text>
      </View>
    </View >
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 10,
    color: "#bbbbbb"
  },
  brandContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1
  }
})
export default Header