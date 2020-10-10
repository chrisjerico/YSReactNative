import React from 'react'
import useMindeHeader from '../../hooks/tars/useMineHeader'
import MineHeader from '../../views/tars/MineHeader'

interface MineHeaderComponentProps {
  showCustomerService?: boolean;
  onPressCustomerService?: () => any;
  title?: string;
  renderHeader?: () => any;
}

const MineHeaderComponent = (props: MineHeaderComponentProps) => {
  const { showBackBtn, goBack } = useMindeHeader()

  return (
    <MineHeader showBackBtn={showBackBtn} onPressBackBtn={goBack} {...props} />
  )
}


export default MineHeaderComponent
