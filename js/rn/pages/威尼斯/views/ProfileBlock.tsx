import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { scale } from '../../../public/tools/Scale'

interface ProfileBlockProps {
  taskReward: string;
  taskRewardTitle: string;
  taskRewardTotal: string;
  backgroundImage: string;
}

const ProfileBlock = ({ taskReward, taskRewardTitle, taskRewardTotal, backgroundImage }: ProfileBlockProps) => {

  const taskReward_f = parseFloat(taskReward) || 0
  const taskRewardTotal_f = parseFloat(taskRewardTotal) || 0
  const rate = taskRewardTotal_f ? (taskReward_f / taskRewardTotal_f) : 0

  return (
    <View style={styles.imageBackgroundContainer}>
      <ImageBackground style={styles.image} source={{ uri: backgroundImage }}>
        <View style={styles.taskRewardTitleContainer}>
          <Text style={{ fontSize: scale(25), color: '#f8f8d6' }}>
            {taskRewardTitle}
          </Text>
        </View>
        <View style={{ flex: 2, paddingHorizontal: scale(20) }}>
          <View style={styles.experienceContainer}>
            <Text style={styles.experience}>{taskReward_f}</Text>
            <Text style={styles.growText}>{'成长值'}</Text>
          </View>
          <View
            style={{
              width: scale(400) * rate,
              height: scale(2),
              backgroundColor: '#f6fb00',
            }}
          />
          <View
            style={{ flex: 1, flexDirection: 'row', paddingTop: scale(10), width: scale(400), justifyContent: 'space-between' }}
          >
            <Text style={{ color: '#fdc990', fontSize: scale(15) }}>
              {rate == 1000 ? '恭喜您已经是最高等级!' : ''}
            </Text>
            <Text style={{ color: '#fdc990', fontSize: scale(15) }}>
              {taskReward_f + '/' + taskRewardTotal_f}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0D0D0',
  },
  imageBackgroundContainer: {
    width: '100%',
    aspectRatio: 500 / 200,
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
    fontSize: scale(60),
    color: '#f6fb00',
    fontWeight: '800',
    paddingRight: scale(10),
  },
  growText: {
    color: '#fdc990',
    fontSize: scale(15),
    paddingBottom: scale(5),
  },
})

export default ProfileBlock
