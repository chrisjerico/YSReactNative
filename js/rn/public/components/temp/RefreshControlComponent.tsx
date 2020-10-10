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
        try {
          if (!refreshing) {
            setRefreshing(true)
            onRefresh && (await onRefresh())
          }
        } catch (error) {
          console.log('-----error-----', error)
        } finally {
          setRefreshing(false)
        }
      }}
    />
  )
}

export default RefreshControlComponent
