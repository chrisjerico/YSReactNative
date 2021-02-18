import React, { useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, Modal, Platform, StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { Res } from '../../Res/icon/Res'
import AppDefine from '../define/AppDefine'
import APIRouter from '../network/APIRouter'
import { ActivitySettingModel } from '../network/Model/ActivitySettingModel'
import { RedBagDetailActivityModel } from '../network/Model/RedBagDetailActivityModel'
import { scale } from '../tools/Scale'
import { ugLog } from '../tools/UgLog'
import TouchableImage from '../views/tars/TouchableImage'
import Button from '../views/temp/Button'

interface RedBagModalProps {
  show?: any
  onPress?: () => any
  redBag?: any
  activitySetting?: ActivitySettingModel
  bagSkin?: string
}

const RedBagModal = ({ show, onPress, redBag, bagSkin, activitySetting }: RedBagModalProps) => {
  const [hide, setHide] = useState(false)
  const [redBagData, setRedBagData] = useState(redBag)
  // const [bagSkin, setBagSkin] = useState(activitySetting?.data?.redBagSkin)

  const requestBag = async () => {
    if (!UGUserModel.checkLogin()) return

    const response = await APIRouter.request_redbag(redBag.id)

    ugLog('response ===', response)
    if (response.data.code == 0) {
      Alert.alert(null, "恭喜您获得了" + response.data.data + "元红包", [
        {
          text: "确认",
          onPress: () => {
            onPress()
          },
        },

      ])
    } else {
      Alert.alert(null, response.data.msg, [
        {
          text: "确认",
          onPress: () => {
            onPress()
          },
        },
      ])
    }
  }

  useEffect(() => {
  }, [redBagData])


  function butName() {

    if (redBagData.canGet) {
      return '立即开抢'
    } else if (redBagData.attendedTimes) {
      return '已参与活动'
    } else {
      return '立即开抢'
    }
  }
  return (
    <Modal
      style={{ zIndex: 2 }}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setHide(false);
      }}>
      <View style={styles.container}>
        <View style={styles.bg_container} />
        <View style={styles.redBagImage}>
          <ImageBackground
            source={{ uri: bagSkin?.includes("red_pack_big_niu") ? bagSkin : Res.redBg }}
            resizeMode='contain'
            style={styles.image} >
            <View style={[styles.imageContainer, Platform.OS == 'ios' ? { marginTop: scale(75) } : undefined]}>
              <View style={bagSkin?.includes("red_pack_big_niu") ? styles.niu_col : styles.col}>
                <Text style={styles.title}>帐号：</Text>
                <Text style={styles.text}>{redBagData.username}</Text>
              </View>
              <View style={bagSkin?.includes("red_pack_big_niu") ? styles.niu_col : styles.col}>
                <Text style={styles.title}>红包余额：</Text>
                <Text style={styles.text}>{redBagData.leftAmount}</Text>
              </View>
              <View style={bagSkin?.includes("red_pack_big_niu") ? styles.niu_col : styles.col}>
                <Text style={styles.title}>可抢红包：</Text>
                <Text style={styles.text}>{redBagData.leftCount}</Text>
              </View>
              <View style={bagSkin?.includes("red_pack_big_niu") ? styles.niu_col : styles.col}>
                <Button
                  title={butName()}
                  onPress={requestBag}
                  containerStyle={styles.button}
                  titleStyle={{ color: '#ffffff' }}
                />
              </View>
              {bagSkin?.includes("red_pack_big_niu") ? null :
                <View style={styles.row}>
                  <Text style={[styles.title, { color: '#FFC950', alignSelf: 'center' }]}>活动介绍</Text>
                  <ScrollView style={styles.redBagIntro}>
                    <Text style={[styles.title, { color: '#ffffff' }]}>{activitySetting?.data?.redBagIntro}</Text>
                  </ScrollView>
                </View>
              }
            </View>
          </ImageBackground>
        </View>
      </View>
      <View style={styles.closeDialog}>
        <TouchableWithoutFeedback
          onPress={onPress}>
          <Image
            style={styles.image}
            source={{ uri: Res.closeDialog }} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  bg_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  redBagImage: {
    height: '60%',
    width: '100%',
    marginTop: '30%',
  },
  closeDialog: {
    position: 'absolute',
    width: scale(35),
    height: scale(35),
    marginTop: scale(220),
    marginLeft: scale(450),
  },
  col: {
    flexDirection: 'row',
    height: scale(60),
    width: scale(200),
    justifyContent: 'center',
  },
  niu_col: {
    flexDirection: 'row',
    height: scale(45),
    width: scale(200),
    justifyContent: 'center',
    marginLeft: scale(-10),
  },
  row: {
    flexDirection: 'column',
    width: scale(270),
  },
  title: {
    color: '#ef6c74'
  },
  text: {
    color: 'black'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: scale(35),
  },
  button: {
    borderWidth: scale(1),
    borderColor: '#F4F4F4',
    borderRadius: scale(2),
    width: scale(120),
    height: scale(50),
    backgroundColor: '#DC4F43',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  redBagIntro: {
    height: scale(270)
  }
})

export default RedBagModal
