import React from 'react'
import { ImageBackground, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface ProfileBlockProps {
  curLevelInt: string
  nextLevelInt: string
  curLevelTitle: string
  nextLevelTitle: string
  taskRewardTotal: string
  backgroundImage: string
  signImage: string
  onPressSign: () => any
  showBonsTag?: boolean
  onPressBonsTag?: () => any
}

const ProfileBlock = ({ curLevelInt, nextLevelInt, curLevelTitle, nextLevelTitle, taskRewardTotal, backgroundImage, signImage, onPressSign, showBonsTag, onPressBonsTag }: ProfileBlockProps) => {
  const curLevelInt_f = parseFloat(curLevelInt) || 0
  const nextLevelInt_f = parseFloat(nextLevelInt) || 0
  const taskRewardTotal_f = parseFloat(taskRewardTotal) || 0
  const rate = nextLevelInt_f ? taskRewardTotal_f / nextLevelInt_f : 0
  const diffLevelInt_f = nextLevelInt_f - curLevelInt_f

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={{ uri: backgroundImage }} resizeMode={'stretch'}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flex: 8 }}>
            <View style={styles.taskRewardTitleContainer}>{/* <UGText style={{ fontSize: scale(25), color: '#f8f8d6' }}>
                {nextLevelTitle}
              </UGText> */}</View>
            <View style={{ flex: 2, paddingHorizontal: scale(20) }}>
              <View style={styles.experienceContainer}>
                <UGText style={styles.experience}>{taskRewardTotal_f.toFixed(2)}</UGText>
                <UGText style={styles.growText}>{'成长值'}</UGText>
              </View>
              <View
                style={{
                  width: scale(340) * (rate > 1 ? 1 : rate),
                  height: scale(2),
                  backgroundColor: '#f6fb00',
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingTop: scale(10),
                  // width: scale(400),
                  justifyContent: 'space-between',
                }}>
                <UGText style={{ color: '#fdc990', fontSize: scale(15) }}>{curLevelTitle == nextLevelTitle ? '恭喜您已经是最高等级!' : '距离下一级还差' + diffLevelInt_f}</UGText>
                <UGText style={{ color: '#fdc990', fontSize: scale(15) }}>{taskRewardTotal_f.toFixed(2) + '/' + nextLevelInt_f}</UGText>
              </View>
            </View>
          </View>
          <View style={{ flex: 3 }}>
            {showBonsTag && (
              <TouchableWithoutFeedback onPress={onPressBonsTag}>
                <FastImage source={{ uri: 'http://test60f.fhptcdn.com/images/lqfl.png' }} style={{ width: '100%', height: scale(30), marginTop: scale(10) }} resizeMode={'contain'} />
              </TouchableWithoutFeedback>
            )}
            <TouchableWithoutFeedback onPress={onPressSign}>
              <View style={styles.signContainer}>
                <ImageBackground style={{ width: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }} source={{ uri: signImage }}>
                  <UGText style={{ fontSize: scale(23), color: '#f86764' }}>{'签到'}</UGText>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 500 / 210,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  taskRewardTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },
  experienceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: scale(10),
  },
  experience: {
    fontSize: scale(50),
    color: '#f6fb00',
    fontWeight: '600',
    paddingRight: scale(10),
    paddingTop: scale(10),
  },
  growText: {
    color: '#fdc990',
    fontSize: scale(15),
    paddingBottom: scale(5),
  },
  signContainer: {
    flex: 3,
    justifyContent: 'center',
    paddingRight: scale(20),
    marginBottom: scale(20),
  },
})

export default ProfileBlock
