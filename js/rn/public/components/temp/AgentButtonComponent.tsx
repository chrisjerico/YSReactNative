import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { scale } from '../../tools/Scale'
import { AgentType } from '../../models/Enum'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface AgentButtonComponentProps {
  onChangeAgent: (toggle: AgentType) => any;
  show: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
}

const AgentButtonComponent = ({
  onChangeAgent,
  show,
  containerStyle
}: AgentButtonComponentProps) => {
  const [toggle, setToggle] = useState(AgentType.用户注册)

  useEffect(() => {
    onChangeAgent && onChangeAgent(toggle)
  }, [])

  if (show) {
    return (
      <View style={[styles.container, containerStyle]}>
        <TouchableWithoutFeedback
          onPress={() => {
            setToggle(AgentType.用户注册)
            onChangeAgent && onChangeAgent(AgentType.用户注册)
          }}
        >
          <View
            style={[
              styles.textContainer,
              styles.leftButton,
              toggle ? {} : styles.enableTextContainer,
            ]}
          >
            <UGText style={[styles.text, toggle ? {} : styles.enableText]}>
              {'普通用戶'}
            </UGText>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setToggle(AgentType.代理注册)
            onChangeAgent && onChangeAgent(AgentType.代理注册)
          }}
        >
          <View
            style={[
              styles.textContainer,
              styles.rightButton,
              toggle ? styles.enableTextContainer : {},
            ]}
          >
            <UGText style={[styles.text, toggle ? styles.enableText : {}]}>
              {'注册代理'}
            </UGText>
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

export default AgentButtonComponent
