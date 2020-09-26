import React from 'react'
import useMindeHeader from '../../../public/hooks/tars/useMineHeader'
import HomeHeader, { HomeHeaderProps } from '../views/HomeHeader'

const MineHeaderComponent = (props: HomeHeaderProps) => {
  const { showBackBtn } = useMindeHeader()
  return <HomeHeader {...props} showBackBtn={showBackBtn} />
}

export default MineHeaderComponent
