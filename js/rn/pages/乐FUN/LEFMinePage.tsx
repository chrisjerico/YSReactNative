import React, { useRef } from 'react'
import MineHeaderComponent from '../../public/components/temp/MineHeaderComponent'
import {RefreshControl, ScrollView} from 'react-native'
import PickAvatarComponent from '../../public/components/temp/PickAvatarComponent'
import RefreshControlComponent from '../../public/components/temp/RefreshControlComponent'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/temp/useMinePage'
import {PageName} from '../../public/navigation/Navigation'
import {BZHThemeColor} from '../../public/theme/colors/BZHThemeColor'
import {scale} from '../../public/tools/Scale'
import {useHtml5Image} from '../../public/tools/tars'
import BottomGap from '../../public/views/temp/BottomGap'
import Button from '../../public/views/temp/Button'
import GameButton from '../../public/views/temp/GameButton'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import UserCenterItem from '../../public/views/temp/UserCenterItem'
import {UGUserCenterType} from '../../redux/model/全局/UGSysConfModel'
import config from './config'
import ProfileBlock from './views/ProfileBlock'
import {ugLog} from "../../public/tools/UgLog";
import {LEFThemeColor} from "../../public/theme/colors/LEFThemeColor";
import {pop, push} from "../../public/navigation/RootNavigation";
import HomeHeader from "./views/HomeHeader";
import MineHeader from "../../public/views/temp/MineHeader";
import { JDAvatarListCP } from '../经典/cp/JDAvatarListCP'

const LEFMinePage = () => {
  const {getHtml5Image} = useHtml5Image()
  const {
    pickAvatarComponentRef,
    onPressAvatar,
    onSaveAvatarSuccess,
    value,
    sign,
  } = useMinePage({
    homePage: PageName.LEFHomePage,
    defaultUserCenterLogos: config?.defaultUserCenterLogos,
  })
  const { current: v } = useRef<{} & JDAvatarListCP>({});
  const {
    balance,
    taskRewardTotal,
    userCenterItems,
    curLevelGrade,
    usr,
    isTest,
    avatar,
    unreadMsg,
  } = value

  const {signOut} = sign

  // data handle
  const profileUserCenterItems = [{
    name: '充值',
    logo: 'http://test61c.fhptcdn.com/views/mobileTemplate/30/images/recharge.png',
    code: UGUserCenterType.存款,
  },
    {
      name: '提现',
      logo: 'http://test61c.fhptcdn.com/views/mobileTemplate/30/images/recharge.png',
      code: UGUserCenterType.取款,
    }]
  const listUserCenterItems = userCenterItems?.slice(0, userCenterItems?.length) ?? []

  return (
    <>
      <SafeAreaHeader
        headerColor={LEFThemeColor.乐FUN.themeColor}
      >
        <MineHeader
          title={'会员中心'}
          titleColor={LEFThemeColor.乐FUN.textColor2}
          onPressBackBtn={pop}
          showCustomerService={true}
          customerIcon={'menu-fold'}
          onPressCustomerService={()=>{
            PushHelper.pushRightMenu("1")
          }}
        />
      </SafeAreaHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: LEFThemeColor.乐FUN.homeContentSubColor,
        }}
        // refreshControl={<RefreshControlComponent onRefresh={() => { }} />} 暂时注释掉
      >
        <ProfileBlock
          balance={balance}
          taskRewardTotal={taskRewardTotal}
          onPressAvatar={() => {
            v?.showAvatarList && v?.showAvatarList();
          }}
          level={curLevelGrade}
          avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
          name={usr}
          features={profileUserCenterItems}
          renderFeature={(item, index) => {
            const {logo, name, code} = item

            //ugLog('features item=',item)
            return (
              <GameButton
                key={index}
                showSecondLevelIcon={false}
                containerStyle={{
                  width: scale(180),
                  height: scale(66),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: scale(60),
                  paddingRight: scale(44),
                  flexDirection: 'row',
                  borderRadius: scale(999),
                  borderWidth: scale(2),
                  borderColor: LEFThemeColor.乐FUN.textColor2,
                }}
                imageContainerStyle={{width: '50%'}
                }
                titleContainerStyle={{aspectRatio: 3}}
                titleStyle={{fontSize: scale(24), fontWeight: '300'}}
                enableCircle={false}
                logo={logo}
                title={name}
                onPress={() => PushHelper.pushUserCenterType(code)}
              />
            )
          }}
        />
        {
          listUserCenterItems?.map((item, index) => {
            const {code, name, logo} = item
            return (
              <UserCenterItem
                key={index}
                containerStyle={{
                  backgroundColor: '#ffffff',
                  aspectRatio: 490 / 68,
                }}
                arrowColor={'#AAAAAA'}
                titleStyle={{fontSize: scale(22)}}
                title={name}
                logo={logo}
                unreadMsg={unreadMsg || 0}
                showUnreadMsg={code == 9}
                onPress={() => {
                  PushHelper.pushUserCenterType(code)
                }}
              />
            )
          })
        }
        <Button
          title={'退出登录'}
          containerStyle={{
            backgroundColor: '#ffffff',
            marginHorizontal: scale(25),
            marginVertical: scale(15),
            borderRadius: scale(7),
            height: scale(70),
          }}
          titleStyle={{color: 'grey', fontSize: scale(21)}}
          onPress={signOut}
        />
        <BottomGap/>
      </ScrollView>
      <JDAvatarListCP c_ref={v} />
    </>
  )
}

export default LEFMinePage
