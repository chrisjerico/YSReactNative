import React, { useState } from 'react'
import { RefreshControl } from 'react-native'

interface RefreshControlComponentProps {
  onRefresh?: () => any;
}

const RefreshControlComponent = ({
  onRefresh,
}: RefreshControlComponentProps) => {
  const [refreshing, setRefreshing] = useState(false)
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={async () => {
        setRefreshing(true)
        try {
          onRefresh && await onRefresh()
        } catch (err) {
        } finally {
          setRefreshing(false)
        }
      }}
    />
  )
}

export default RefreshControlComponent
