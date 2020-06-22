import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { scale } from '../../helpers/function'
import { pop } from '../../public/navigation/RootNavigation'
import Header from '../../views/Header'

const BZHRegisterPage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        color={'#e53333'}
        title={'注册'}
        onPressBack={pop}
        onPressCustomerService={() => { }}
      />
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#ffffff',
            width: '95%',
            aspectRatio: 485 / 655,
            alignSelf: 'center',
            borderRadius: scale(5),
            marginTop: scale(15),
            paddingHorizontal: scale(25),
          }}
        >
          <View style={{ flex: 25 }} />
          <View
            style={{
              flex: 440,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Input
              placeholder={'请输入会员帐号'}
              containerStyle={{ padding: 0, height: 10 }}
            />
            <Input
              placeholder={'请输入密码'}
              secureTextEntry={true}
              containerStyle={{ padding: 0, height: 10 }}
            />
            <Input
              placeholder={'请输入密码'}
              secureTextEntry={true}
              containerStyle={{ padding: 0, height: 10 }}
            />
            <Input
              placeholder={'请输入密码'}
              secureTextEntry={true}
              containerStyle={{ padding: 0, height: 10 }}
            />
            <Input
              placeholder={'请输入密码'}
              secureTextEntry={true}
              containerStyle={{ padding: 0, height: 10 }}
            />
            <Input
              placeholder={'请输入密码'}
              secureTextEntry={true}
              containerStyle={{ padding: 0, height: 10 }}
            />
          </View>
          <View style={{ flex: 70 }} />
          <View style={{ flex: 50, justifyContent: 'space-between' }}>
            <Button
              title={'注册'}
              buttonStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#F0F0F0',
                borderWidth: scale(1),
                width: '100%',
              }}
              titleStyle={{ color: '#EA0000' }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 65,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <TouchableOpacity>
              <Text>{'返回登录'}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>{'返回首页'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#e53333',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
})
export default BZHRegisterPage
