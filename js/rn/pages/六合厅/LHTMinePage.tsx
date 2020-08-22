import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Button } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper from '../../public/define/PushHelper'
import useLogOut from '../../public/hooks/tars/useLogOut'
import useMemberItems from '../../public/hooks/useMemberItems'
import { PageName } from '../../public/navigation/Navigation'
import {
  navigate,
  navigationRef,
  pop,
} from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import BottomGap from '../../public/views/tars/BottomGap'
import FeatureList from '../../public/views/tars/FeatureList'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { UGStore } from '../../redux/store/UGStore'
import config from './config'
import ProfileBlock from './views/ProfileBlock'
import ProfileButton from './views/ProfileButton'
import { getHtml5Image } from '../../public/tools/tars'
import PickAvatarComponent from '../宝石红/components/PickAvatarComponent'
import { Toast } from '../../public/tools/ToastUtils'

const LHTMinePage = (props) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const { setProps } = props
  const { logOut } = useLogOut({
    onSuccess: () => {
      navigate(PageName.LHTHomePage, {})
    },
  }) // stores
  const {
    avatar,
    usr,
    balance,
    unreadMsg,
    isTest,
  }: UGUserModel = UGStore.globalProps.userInfo

  // effects
  const { UGUserCenterItem } = useMemberItems()

  const [showBackBtn, setShowBackBtn] = useState(false)
  const [avatarListLoading, setAvatarListLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [avatarList, setAvatarList] = useState([])

  const getAvatarList = async () => {
    try {
      setAvatarListLoading(true)
      const value = await APIRouter.system_avatarList()
      const avatarList = value?.data?.data ?? []
      setAvatarList(avatarList)
    } catch (error) {
    } finally {
      setAvatarListLoading(false)
    }
  }

  useEffect(() => {
    getAvatarList()
    setProps({
      didFocus: async () => {
        OCHelper.call(
          'UGNavigationController.current.viewControllers.count'
        ).then((ocCount) => {
          const show =
            ocCount > 1 ||
            navigationRef?.current?.getRootState().routes.length > 1
          setShowBackBtn(show)
        })
      },
    })
  }, [])

  return (
    <>
      <SafeAreaHeader headerColor={LHThemeColor.六合厅.themeColor}>
        {showBackBtn ? (
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <AntDesign
              name={'left'}
              color={'#ffffff'}
              size={scale(25)}
              onPress={() => {
                !pop() &&
                  OCHelper.call(
                    'UGNavigationController.current.popViewControllerAnimated:',
                    [true]
                  )
              }}
            />
          </View>
        ) : (
            <View style={{ flex: 1 }} />
          )}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>{'我的'}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        >
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.headerTitle}>{'客服'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaHeader>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControlComponent />}
      >
        <ProfileBlock
          onPressAvatar={() => !isTest && setVisible(true)}
          profileButtons={config?.profileButtons}
          name={usr}
          avatar={isTest ? getHtml5Image(18, 'money-2') : avatar}
          // level={curLevelGrade}
          balance={balance}
          onPressDaySign={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.每日签到)
          }}
          onPressTaskCenter={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.任务中心)
          }}
          onPressReload={async () => {
            const { data } = await APIRouter.user_balance_token()
            UGStore.dispatch({
              type: 'merge',
              userInfo: { balance: data.data.balance },
            })
          }}
          renderProfileButton={(item, index) => {
            const { title, logo, userCenterType } = item
            return (
              <ProfileButton
                key={index}
                title={title}
                logo={logo}
                onPress={() => {
                  PushHelper.pushUserCenterType(userCenterType)
                }}
              />
            )
          }}
        />
        {UGUserCenterItem?.map((item, index) => {
          const { code, name, logo } = item
          return (
            <FeatureList
              key={index}
              title={name}
              logo={logo}
              unreadMsg={unreadMsg}
              showUnreadMsg={code == 9}
              onPress={() => PushHelper.pushUserCenterType(code)}
            />
          )
        })}
        <Button
          title={'退出登录'}
          buttonStyle={styles.logOutButton}
          onPress={logOut}
          activeOpacity={1}
        />
        <BottomGap />
      </ScrollView>
      <PickAvatarComponent
        themeColor={LHThemeColor.六合厅.themeColor}
        loading={avatarListLoading}
        visible={visible}
        initAvatar={
          isTest
            ? 'http://test05.6yc.com/views/mobileTemplate/18/images/money-2.png'
            : avatar
        }
        avatars={avatarList}
        onPressSave={async ({ url, filename }) => {
          try {
            UGStore.dispatch({ type: 'merge', userInfo: { avatar: url } })
            const value = await APIRouter.task_changeAvatar(filename)
            if (value?.data?.code == 0) {
              Toast('修改头像成功')
            } else {
              Toast('修改头像失败')
            }
          } catch (err) {
            Toast(err)
          } finally {
            setVisible(false)
          }
        }}
        onPressCancel={() => {
          setVisible(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  logOutButton: {
    backgroundColor: '#ff861b',
    marginHorizontal: scale(25),
    marginVertical: scale(25),
    height: scale(70),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

export default LHTMinePage
