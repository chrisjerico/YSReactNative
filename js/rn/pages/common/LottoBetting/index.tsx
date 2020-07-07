import { View, Button, Text, TouchableOpacity } from "react-native"
import Modal from 'react-native-modal';
import LottoSelector from "../LottoSelector/LottoSelector";
import React, { useRef, useState } from 'react'
import { LottoContextProvider, LottoContext } from "./LottoContext";
import Headers from './Header';
import { useDimensions } from "@react-native-community/hooks";
import LottoContent from "./LottoContent";
const LottoBetting = () => {
  const [tab, setTab] = useState(0)
  const { width } = useDimensions().screen
  return (
    <LottoContextProvider>
      <View style={{ backgroundColor: 'white', flex: 1, }}>
        <Headers />
        <View style={{ width, height: 45, flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
          <View style={{ flex: 1, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>投注区</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>聊天室</Text>
          </View>
        </View>
        <LottoContent />
        <LottoContext.Consumer>
          {value => {
            return (
              <>
                <Modal
                  hideModalContentWhileAnimating={false}
                  hasBackdrop={false}
                  swipeDirection={null}
                  style={{ margin: 0 }}
                  isVisible={value.showModal}>
                  <LottoSelector />
                </Modal>
              </>)
          }}
        </LottoContext.Consumer>

      </View>
    </LottoContextProvider>
  )
}
export default LottoBetting