import React from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { pop } from '../../public/navigation/RootNavigation'
import Header from '../../views/Header'
import { Input, CheckBox, Button, Icon } from 'react-native-elements'
import { scale } from '../../helpers/function'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BZHSignInPage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        color={'#e53333'}
        title={'登陆'}
        onPressBack={pop}
        onPressCustomerService={() => { }}
      />
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#ffffff',
            width: '95%',
            aspectRatio: 485 / 375,
            alignSelf: 'center',
            borderRadius: scale(5),
            marginTop: scale(15),
            paddingHorizontal: scale(25),
          }}
        >
          <View style={{ flex: 25 }} />
          <View
            style={{
              flex: 160,
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
            <TouchableOpacity style={{ flexDirection: 'row' }}>
              <Icon
                type={'feather'}
                name={'check'}
                color={'#ffffff'}
                containerStyle={{
                  backgroundColor: 'blue',
                  aspectRatio: 1,
                  justifyContent: 'center',
                }}
                size={scale(20)}
              />
              <Text style={{ paddingLeft: scale(10) }}>{'记住密码'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 15 }} />
          <View style={{ flex: 115, justifyContent: 'space-between' }}>
            <Button
              title={'立即登陆'}
              buttonStyle={{ backgroundColor: '#EA0000', width: '100%' }}
              titleStyle={{ color: '#ffffff' }}
            />
            <Button
              title={'快速注册'}
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
              flex: 75,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <TouchableOpacity>
              <Text>{'免费试玩'}</Text>
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

export default BZHSignInPage
