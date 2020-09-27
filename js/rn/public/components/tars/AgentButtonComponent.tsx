import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle, StyleProp, TextStyle } from 'react-native'
import { scale } from '../../tools/Scale'
import { AgentType } from '../../models/Enum'

interface AgentButtonComponentProps {
  onChangeAgent: (toggle: AgentType) => any
  visible: boolean
  containerStyle?: StyleProp<ViewStyle>
  enableToggleContainerStyle?: StyleProp<ViewStyle>
  enableTextStyle?: StyleProp<TextStyle>
}

const AgentButtonComponent = ({ onChangeAgent, visible, containerStyle, enableToggleContainerStyle, enableTextStyle }: AgentButtonComponentProps) => {
  const [toggle, setToggle] = useState(AgentType.用户注册)

  useEffect(() => {
    onChangeAgent && onChangeAgent(toggle)
  }, [])

  if (visible) {
    return (
      <View style={[styles.container, containerStyle]}>
        <TouchableWithoutFeedback
          onPress={() => {
            setToggle(AgentType.用户注册)
            onChangeAgent && onChangeAgent(AgentType.用户注册)
          }}>
          <View style={[styles.textContainer, styles.leftButton, toggle == AgentType.用户注册 ? [styles.enableToggleContainer, enableToggleContainerStyle] : {}]}>
            <Text style={[styles.text, toggle == AgentType.用户注册 ? [styles.enableText, enableTextStyle] : {}]}>{'普通用戶'}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setToggle(AgentType.代理注册)
            onChangeAgent && onChangeAgent(AgentType.代理注册)
          }}>
          <View style={[styles.textContainer, styles.rightButton, toggle == AgentType.代理注册 ? [styles.enableToggleContainer, enableToggleContainerStyle] : {}]}>
            <Text style={[styles.text, toggle == AgentType.代理注册 ? [styles.enableText, enableTextStyle] : {}]}>{'注册代理'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  } else {
    return null
  }
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
  enableToggleContainer: {
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

export default AgentButtonComponent
