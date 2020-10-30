import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BaseScreen } from './component/BaseScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
import CheckBox from '@react-native-community/checkbox'
import { navigate } from '../../public/navigation/RootNavigation'
import { PageName } from '../../public/navigation/Navigation'
import useSignInPage from '../../public/hooks/tars/useSignInPage'

const LCLoginPage = () => {
    const { sign, value, onChange, navigateTo, show, slideCodeRef, valid  } = useSignInPage({
        homePage: PageName.LCHomePage,
        signUpPage: PageName.LCRegisterPage,
    })
    const {onChangePassword, onChangeAccount, onChangeSlideCode, onChangeRemember} = onChange
    const {remember, account, password}  = value
    const { signIn, tryPlay } = sign
    const { navigateToSignUpPage } = navigateTo

    return (
        <BaseScreen screenName={"登录"}>
            <View style={{marginHorizontal: 24, top: 46}}>
                <View style={{
                    flexDirection: "row",
                    paddingVertical: 16,
                    paddingHorizontal: 4,
                    borderBottomWidth: 1,
                    borderColor: "#dddddd"
                }}>
                    <Icon style={{marginRight: 12}} size={25} color={"gold"} name={"user-o"}/>
                    <TextInput style={{flex: 1}} defaultValue={account || ""} onChangeText={(text) => onChangeAccount(text)} placeholder={'请输入账号'}/>
                </View>
                <View style={{
                    marginTop: 8,
                    flexDirection: "row",
                    paddingVertical: 16,
                    paddingHorizontal: 4,
                    borderBottomWidth: 1,
                    borderColor: "#dddddd"
                }}>
                    <Icon style={{marginRight: 12}} size={25} color={"gold"} name={"unlock-alt"}/>
                    <TextInput style={{flex: 1}} defaultValue={password || ""} onChangeText={(text) => onChangePassword(text)} placeholder={'请输入密码'}/>
                </View>
                {/*<View style={{flexDirection: "row", alignItems: "center", paddingTop: 24}}>*/}
                {/*    <CheckBox*/}
                {/*        boxType={'square'}*/}
                {/*        style={{height: 20, width: 20, borderColor: "black"}}*/}
                {/*        value={remember}*/}
                {/*        onValueChange={() => onChangeRemember(!remember)}*/}
                {/*    />*/}
                {/*    <Text style={{paddingLeft: 8}}>记住密码</Text>*/}
                {/*</View>*/}
                {/*<View style={{paddingTop: 16}}>*/}
                {/*    {valid ? <TouchableOpacity style={{*/}
                {/*        marginTop: 8,*/}
                {/*        backgroundColor: "gold",*/}
                {/*        borderRadius: 4,*/}
                {/*        borderBottomWidth: 1,*/}
                {/*        borderColor: "#dddddd"*/}
                {/*    }} onPress={signIn} >*/}
                {/*        <Text style={{alignSelf: "center", paddingVertical: 20, color: "black"}}>登录</Text>*/}
                {/*    </TouchableOpacity> : <TouchableOpacity disabled={true} style={{*/}
                {/*        marginTop: 8,*/}
                {/*        backgroundColor: "#ffefae",*/}
                {/*        borderRadius: 4,*/}
                {/*        borderBottomWidth: 1,*/}
                {/*        borderColor: "#dddddd"*/}
                {/*    }} onPress={signIn}>*/}
                {/*        <Text style={{alignSelf: "center", paddingVertical: 20, color: "#ddd"}}>登录</Text>*/}
                {/*    </TouchableOpacity>}*/}
                {/*    <TouchableOpacity style={{*/}
                {/*        marginTop: 8,*/}
                {/*        backgroundColor: "#dedede",*/}
                {/*        borderRadius: 4,*/}
                {/*        borderBottomWidth: 1,*/}
                {/*        borderColor: "#dddddd"*/}
                {/*    }} onPress={navigateToSignUpPage}>*/}
                {/*        <Text style={{alignSelf: "center", paddingVertical: 20, color: "black"}}>马上注册</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={{*/}
                {/*        marginTop: 8,*/}
                {/*        backgroundColor: "#dedede",*/}
                {/*        borderRadius: 4,*/}
                {/*        borderBottomWidth: 1,*/}
                {/*        borderColor: "#dddddd"*/}
                {/*    }} onPress={tryPlay}>*/}
                {/*        <Text style={{alignSelf: "center", paddingVertical: 20, color: "black"}}>免费试玩</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={{*/}
                {/*        marginTop: 8,*/}
                {/*        backgroundColor: "#dedede",*/}
                {/*        borderRadius: 4,*/}
                {/*        borderBottomWidth: 1,*/}
                {/*        borderColor: "#dddddd"*/}
                {/*    }} onPress={() => navigate(PageName.LCHomePage)}>*/}
                {/*        <Text style={{alignSelf: "center", paddingVertical: 20, color: "black"}}>返回首页</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
            </View>
        </BaseScreen>
    )
}

export default LCLoginPage
