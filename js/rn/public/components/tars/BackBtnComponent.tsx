import { memo } from 'react'
import useShowBackBtn from '../../hooks/tars/useShowBackBtn'
import { PageName } from '../../navigation/Navigation'
import { navigate, pop } from '../../navigation/RootNavigation'

interface MineHeaderComponentProps {
  homePage?: PageName
  renderHeader: ({ showBackBtn, onPressBackBtn }: { showBackBtn: boolean; onPressBackBtn: () => any }) => any
}

const BackBtnComponent = ({ renderHeader, homePage }: MineHeaderComponentProps) => {
  const { showBackBtn, userTab } = useShowBackBtn()

  const onPressBackBtn = userTab
    ? pop
    : () => {
        homePage && navigate(homePage)
      }
  return renderHeader && renderHeader({ showBackBtn, onPressBackBtn })
}

export default memo(BackBtnComponent)
