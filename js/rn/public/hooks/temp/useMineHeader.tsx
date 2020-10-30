import { useEffect, useState } from 'react'
import { OCEvent, OCEventType } from '../../define/OCHelper/OCBridge/OCEvent'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import { navigationRef, pop } from '../../navigation/RootNavigation'

const useMindeHeader = () => {
  const [showBackBtn, setShowBackBtn] = useState(false)

  useEffect(() => {
    OCEvent.addEvent(OCEventType.viewWillAppear, (event: any) => {
      if (event == 'ReactNativeVC') {
        OCHelper.call(
          'UGNavigationController.current.viewControllers.count'
        ).then((ocCount) => {
          const show =
            ocCount > 1 ||
            navigationRef?.current?.getRootState().routes.length > 1
          setShowBackBtn(show)
        })
      }
    })
  }, [])

  const goBack = () => {
    !pop() &&
      OCHelper.call(
        'UGNavigationController.current.popViewControllerAnimated:',
        [true]
      )
  }
  return {
    showBackBtn,
    goBack,
  }
}

export default useMindeHeader
