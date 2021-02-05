import React, { useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, Modal, StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { Res } from '../../Res/icon/Res'
import APIRouter from '../network/APIRouter'
import { RedBagDetailActivityModel } from '../network/Model/RedBagDetailActivityModel'
import { scale } from '../tools/Scale'
import { ugLog } from '../tools/UgLog'
import TouchableImage from '../views/tars/TouchableImage'
import Button from '../views/temp/Button'

interface RedBagModalProps {
  show?: any
  onPress?: () => any
  redBag?: RedBagDetailActivityModel
}

const RedBagModal = ({ show, onPress, redBag }: RedBagModalProps) => {
  const [hide, setHide] = useState(false)
  const [redBagData, setRedBagData] = useState(redBag)

  const requestBag = async () => {
    if (!redBag.data.hasLogin) {
      UGUserModel.checkLogin()
      return
    }
    const response = await APIRouter.request_redbag(redBag.data.id)
    Alert.alert(null, response.data.msg, [
      { text: "确认" },
    ])
    await APIRouter.activity_redBagDetail().then((value) => {
      if (value.data.code == 0) {
        setRedBagData(value.data)
      }
    })
  }

  useEffect(()=> {
  }, [redBagData])

  ugLog("redBagData=", redBagData)
  return (
    <Modal 
      style={{ zIndex: 2}}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setHide(false);
      }}>
      <View style={styles.container}>
        <View style={styles.bg_container} />
        <View style={styles.redBagImage}>
          <ImageBackground 
            source={{ uri: Res.redBg }}
            style={styles.image} >
            <View style={styles.imageContainer}>
              <View style={styles.col}>
                <Text style={styles.title}>帐号：</Text>
                <Text style={styles.text}>{redBagData.data.username}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.title}>红包余额：</Text>
                <Text style={styles.text}>{redBagData.data.leftAmount}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.title}>可抢红包：</Text>
                <Text style={styles.text}>{redBagData.data.leftCount}</Text>
              </View>
              <View style={[styles.col, {justifyContent: 'center'}]}>
                <Button
                  title={redBagData.data.hasLogin? (redBagData.data.canGet == 0 && redBagData.data.attendedTimes > 0 ? '已参与活动' : '立即开抢') : '登录抢红包'}
                  onPress={requestBag}
                  containerStyle={styles.button}
                  titleStyle={{ color: '#ffffff'}}
                />
              </View>
              <View style={styles.row}>
                <Text style={[styles.title, {color: '#FFC950', alignSelf: 'center'}]}>活动介绍</Text>
                <Text style={[styles.title, {color: '#ffffff'}]}>{redBagData.data.intro.replace('<br />', '')}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.closeDialog}>
          <TouchableWithoutFeedback
            onPress={onPress}>
            <Image 
              style={styles.image}
              source={{ uri: Res.closeDialog }}/>
          </TouchableWithoutFeedback>
        </View>
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
    flexDirection: 'column'
  },
  redBagImage: { 
    height: '60%',
    width: '70%',
    marginTop: '30%', 
    marginLeft: scale(20),
  },
  closeDialog: { 
    width: scale(37), 
    height: scale(37), 
    marginTop: '35%', 
    marginLeft: scale(10),
  },
  col: { 
    flexDirection: 'row',
    height: scale(70),
    width: scale(200),
  },
  row: { 
    flexDirection: 'column',
    width: scale(200),
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
    marginTop: scale(20),
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
  }
})

export default RedBagModal
