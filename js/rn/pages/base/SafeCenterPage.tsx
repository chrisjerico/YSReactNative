import React, { useRef } from 'react'
import { Animated, Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import FormComponent from '../../public/components/tars/FormComponent'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'

const Form = ({ title, placeholder }) => (
  <>
    <Text style={{ paddingLeft: '3%', marginBottom: 10 }}>{title}</Text>
    <FormComponent
      placeholder={placeholder}
      visible
      containerStyle={{ paddingHorizontal: '3%' }}
      leftIconContainerStyle={{ width: null, marginRight: null }}
      placeholderTextColor={'#8E8E8E'}
      inputStyle={{ fontSize: 13 }}
    />
  </>
)

const A = ({ tabLabel }) => {
  return (
    <View style={{ flex: 1, marginTop: 35 }}>
      <Form title={'原登录密码'} placeholder={'请输入原登录密码'} />
      <Form title={'新密码'} placeholder={'请输入6到13位长度的密码'} />
      <Form title={'确认新密码'} placeholder={'请输入6到13位长度的密码'} />
      <Button title={'提交'} titleStyle={{ color: '#ffffff' }} containerStyle={styles.button} />
    </View>
  )
}

const B = ({ tabLabel }) => {
  return (
    <View style={{ flex: 1, marginTop: 35 }}>
      <Form title={'旧取款密码'} placeholder={'请输入旧取款密码'} />
      <Form title={'新密码'} placeholder={'请输4位数字取款新密码'} />
      <Form title={'确认新密码'} placeholder={'请输4位数字取款新密码'} />
      <Button title={'提交'} titleStyle={{ color: '#ffffff' }} containerStyle={styles.button} />
    </View>
  )
}

const SafeCenterPage = () => {
  const x = useRef(new Animated.Value(83)).current
  const inAnimated = useRef(false)

  const move = (index: number) => {
    Animated.timing(x, {
      toValue: index ? 297 : 82,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      inAnimated.current = false
    })
  }

  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'安全中心'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          style={{ flex: 1 }}
          renderTabBar={(props) => {
            const { tabs, activeTab, goToPage } = props
            return (
              <>
                <View style={{ width: '100%', height: 40, flexDirection: 'row' }}>
                  {tabs?.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          if (!inAnimated.current) {
                            inAnimated.current = true
                            goToPage(index)
                            move(index)
                          }
                        }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: '#000000', fontSize: 12 }}>{item}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })}
                </View>
                <Animated.View style={{ width: 50, backgroundColor: '#000000', height: 5, transform: [{ translateX: x }] }} />
              </>
            )
          }}>
          <A tabLabel={'登录密码'} />
          <B tabLabel={'取款密码'} />
        </ScrollableTabView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Skin1.themeColor,
    width: 300,
    aspectRatio: 7,
    borderRadius: 5,
    alignSelf: 'center',
  },
})

export default SafeCenterPage
