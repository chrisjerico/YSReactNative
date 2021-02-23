import React, { memo } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../theme/UGSkinManagers';
import {anyEmpty} from "../../tools/Ext";
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface MineHeaderProps {
  showRightTitle?: boolean
  onPressRightTitle?: () => any
  title?: string
  renderHeader?: () => any
  onPressBackBtn?: () => any
  showBackBtn?: boolean
  rightTitle?: string
  rightButton?: JSX.Element
  backBtnColor?: string
  titleStyle?: StyleProp<TextStyle>
  rightTitleStyle?: StyleProp<TextStyle>
  titleIcon?: string
  onPressTitle?: () => any
}

const MineHeader = ({ showRightTitle = false,
  onPressRightTitle,
  title,
  renderHeader,
  showBackBtn = false,
  onPressBackBtn,
  rightTitle,
  rightButton,
  backBtnColor = '#ffffff',
  titleStyle,
  rightTitleStyle,
  titleIcon =null,
  onPressTitle }: MineHeaderProps) => {
  return (
    <View style={styles.container}>
      {showBackBtn ? (
        <TouchableWithoutFeedback onPress={onPressBackBtn}>
          <View style={{ flex: 1, alignItems: 'flex-start', height: '100%', justifyContent: 'center' }}>
            <AntDesign name={'left'} color={backBtnColor} size={scale(25)} />
          </View>
        </TouchableWithoutFeedback>
      ) : (
          <View style={{ flex: 1 }} />
        )}
      {renderHeader ? renderHeader() :
        <DefaultHeader title={title} rightTitle={rightTitle} rightButton={rightButton} showRightTitle={showRightTitle} titleStyle={titleStyle} rightTitleStyle={rightTitleStyle}
          onPressRightTitle={onPressRightTitle}
          titleIcon={titleIcon}
          onPressTitle={onPressTitle} />}
    </View>
  )
}

const DefaultHeader = ({ title, showRightTitle, onPressRightTitle, rightTitle, rightButton, titleStyle, rightTitleStyle, titleIcon, onPressTitle }) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={onPressTitle}>
          <View style={{ flex: 1, alignItems: 'center',  justifyContent: 'center', flexDirection: 'row' }}>
            <UGText style={[styles.headerTitle, titleStyle,]}>{title}</UGText>
            {!anyEmpty(titleIcon) &&
              <Icon
                style={{marginLeft: 1}}
                size={scale(25)}
                name={titleIcon}
                color={'#ffffff'}/> }
          </View>
        </TouchableWithoutFeedback>
      </View>
      {showRightTitle ? (
        <TouchableWithoutFeedback onPress={onPressRightTitle}>
          <View style={{ flex: 1, alignItems: 'flex-end', height: '100%', justifyContent: 'center' }}>
            {
              rightButton ? rightButton : <UGText style={[styles.rightTextStyle, rightTitleStyle]}>{rightTitle ?? '客服'}</UGText>
            }
          </View>
        </TouchableWithoutFeedback>
      ) : (
          <View style={{ flex: 1 }} />
        )}
    </>
  )
}
const styles = StyleSheet.create({
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
    fontWeight: '500',
  },
  rightTextStyle: {
    color: '#ffffff',
    fontSize: scale(22),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
})

export default memo(MineHeader)
