import useSignInPage from "../../public/hooks/tars/useSignInPage"
import { WNZThemeColor } from "../../public/theme/colors/WNZThemeColor"
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import SafeAreaHeader from "../../public/views/tars/SafeAreaHeader"
import Form from "../../public/views/tars/Form"
import { scale } from "../../public/tools/Scale"

const WNZSignInPage = ({ navigation }) => {
  const { account, onChangeAccount, onChanePasswordSecure, password, onChangePassword, showPassword } = useSignInPage(navigation)

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>

      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Form
          show={true}
          inputContainerStyle={{ borderWidth: scale(1), borderRadius: scale(5), backgroundColor: '#ffffff', borderColor: '#d9d9d9', paddingLeft: scale(20) }}
          inputStyle={{ paddingLeft: scale(10) }}
          placeholder={'请输入会员帐号'}
          renderLeftIcon={() =>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: scale(60) }}>
              <Text style={{ fontSize: scale(25) }}>{'帐号'}</Text>
            </View>
          }
          // value={account}
          onChangeText={onChangeAccount}
          leftIcon={{
            name: 'user-circle',
            type: 'font-awesome'
          }}
          showRightIcon={false}
          showLeftIcon={true}
        />
        <Form
          show={true}
          rightIconProps={{
            onPress: onChanePasswordSecure,
          }}
          placeholder={'请输入密码'}
          leftIcon={{
            name: 'unlock-alt',
            type: 'font-awesome'
          }}
          // value={password}
          onChangeText={onChangePassword}
          secureTextEntry={!showPassword}
          showRightIcon={false}
          showLeftIcon={false}

        />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: scale(20)
  },

})
export default WNZSignInPage