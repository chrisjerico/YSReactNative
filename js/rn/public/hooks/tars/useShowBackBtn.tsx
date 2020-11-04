import { useEffect, useState } from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import { OCEvent, OCEventType } from '../../define/OCHelper/OCBridge/OCEvent'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import { navigationRef } from '../../navigation/RootNavigation'

const useShowBackBtn = () => {
  const [showBackBtn, setShowBackBtn] = useState(false)

  const { mobileMenu } = UGStore.globalProps.sysConf

  const userTab = mobileMenu?.findIndex((item) => item?.path == '/user') > -1 ? true : false

  useEffect(() => {
    if (userTab) {
      OCEvent.addEvent(OCEventType.viewWillAppear, (event: any) => {
        if (event == 'ReactNativeVC') {
          OCHelper.call('UGNavigationController.current.viewControllers.count').then((ocCount) => {
            const show = ocCount > 1 || navigationRef?.current?.getRootState().routes.length > 1
            setShowBackBtn(show)
          })
        }
      })
    } else {
      setShowBackBtn(true)
    }
    return () => {
      OCEvent.removeEvents(OCEventType.viewWillAppear)
    }
  }, [])

  return {
    showBackBtn,
    userTab,
  }
}

export default useShowBackBtn
