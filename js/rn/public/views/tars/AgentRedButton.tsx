import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { scale } from '../../../public/tools/Scale'

interface AgentRedButton {
  toggle: boolean;
  onPressRightButton: () => any;
  onPressLeftButton: () => any;
}

const AgentRedButton = ({
  toggle = false,
  onPressRightButton,
  onPressLeftButton,
}: AgentRedButton) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPressLeftButton}>
        <View
          style={[
            styles.textContainer,
            styles.leftButton,
            toggle ? {} : styles.enableTextContainer,
          ]}
        >
          <Text style={[styles.text, toggle ? {} : styles.enableText]}>
            {'普通用戶'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onPressRightButton}>
        <View
          style={[
            styles.textContainer,
            styles.rightButton,
            toggle ? styles.enableTextContainer : {},
          ]}
        >
          <Text style={[styles.text, toggle ? styles.enableText : {}]}>
            {'注册代理'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: scale(150),
    aspectRatio: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: scale(5),
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: scale(15),
  },
  enableText: {
    color: '#ffffff',
  },
  enableTextContainer: {
    backgroundColor: '#007aff',
  },
  leftButton: {
    borderTopLeftRadius: scale(5),
    borderBottomLeftRadius: scale(5),
  },
  rightButton: {
    borderTopRightRadius: scale(5),
    borderBottomRightRadius: scale(5),
  },
})

export default AgentRedButton
