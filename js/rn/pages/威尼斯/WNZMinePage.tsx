import React from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import useMemberItems from '../../public/hooks/useMemberItems'
import GameButton from '../../views/GameButton'
import Header from './views/Header'
import ButtonGroup from './views/mines/ButtonGroup'
import ToolBlock from './views/mines/ToolBlock'
import { IGlobalState } from '../../redux/store/UGStore'
import { useSelector } from 'react-redux'
import UGUserModel from '../../redux/model/全局/UGUserModel'

const WNZMinePage = () => {
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { avatar, balance, usr }: UGUserModel = userStore
  const { UGUserCenterItem } = useMemberItems()

  const tools = UGUserCenterItem.slice(0, 4)

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        name={usr}
      />
      <ScrollView
        style={styles.container}
        scrollEnabled={true}
        refreshControl={<RefreshControl refreshing={false} />}
      >
        <View
          style={{
            width: '100%',
            aspectRatio: 500 / 200,
            backgroundColor: 'red',
          }}
        ></View>
        <ButtonGroup
          leftLogo={
            'http://test10.6yc.com/views/mobileTemplate/23/images/chongzhi.png'
          }
          rightLogo={
            'http://test10.6yc.com/views/mobileTemplate/23/images/tixian.png'
          }
          leftTitle={'充值'}
          rightTitle={'提现'}
        />
        <ToolBlock
          title={'常用工具'}
          tools={tools}
          renderTool={(item, index) => {
            const { code, name, logo } = item
            return (
              <GameButton
                key={index}
                logo={logo}
                title={name}
                containerStyle={{ width: '25%', aspectRatio: 1 }}
                circleColor={'transparent'}
              />
            )
          }}
        />
        <ToolBlock
          title={'个人信息'}
          tools={tools}
          renderTool={(item, index) => {
            const { code, name, logo } = item
            return (
              <GameButton
                key={index}
                logo={logo}
                title={name}
                containerStyle={{ width: '25%', aspectRatio: 1 }}
                circleColor={'transparent'}
              />
            )
          }}
        />
        <ToolBlock
          title={'投注记录'}
          tools={tools}
          renderTool={(item, index) => {
            const { code, name, logo } = item
            return (
              <GameButton
                key={index}
                logo={logo}
                title={name}
                containerStyle={{ width: '25%', aspectRatio: 1 }}
                circleColor={'transparent'}
              />
            )
          }}
        />
        <ToolBlock
          title={'优惠活动'}
          tools={tools}
          renderTool={(item, index) => {
            const { code, name, logo } = item
            return (
              <GameButton
                key={index}
                logo={logo}
                title={name}
                containerStyle={{ width: '25%', aspectRatio: 1 }}
                circleColor={'transparent'}
              />
            )
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0D0D0',
  },
  safeArea: {
    backgroundColor: '#BF242A',
    flex: 1,
  },
})

export default WNZMinePage
