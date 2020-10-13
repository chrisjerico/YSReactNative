import React, { memo, ReactElement, useCallback } from 'react'
import { ListRenderItem } from 'react-native'
import PushHelper from '../../define/PushHelper'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import Activitys, { FloatAd, Roulette } from './Activitys'
import List from './List'
import ProgressCircle from './ProgressCircle'
import SafeAreaHeader from './SafeAreaHeader'

interface HomePageProps {
  themeColor: string
  loading: boolean
  pagekey: string
  refreshing: boolean
  refresh: () => any
  announcements: any[]
  items: readonly any[]
  renderItem: ListRenderItem<any>
  ListHeaderComponent: () => ReactElement
  ListFooterComponent: () => ReactElement
  renderRestComponent?: () => ReactElement
  renderHeader?: () => ReactElement
  uid?: string
  isTest?: boolean
  redBagLogo: string
  redBag: RedBagDetailActivityModel
  roulette: Roulette[]
  floatAds: FloatAd[]
}

const HomePage = ({
  themeColor,
  loading,
  pagekey,
  refreshing,
  announcements,
  refresh,
  items,
  renderItem,
  ListFooterComponent,
  ListHeaderComponent,
  renderRestComponent,
  renderHeader,
  uid,
  isTest,
  redBagLogo,
  redBag,
  roulette,
  floatAds,
}: HomePageProps) => {
  const onRefresh = useCallback(async () => {
    try {
      await refresh()
      PushHelper.pushAnnouncement(announcements)
    } catch (error) {}
  }, [announcements])

  if (loading) {
    return (
      <>
        <SafeAreaHeader headerColor={themeColor} />
        <ProgressCircle />
      </>
    )
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={themeColor}>{renderHeader && renderHeader()}</SafeAreaHeader>
        <List
          uniqueKey={pagekey}
          scrollEnabled={true}
          removeClippedSubviews={true}
          data={items}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={renderItem}
          ListFooterComponent={ListFooterComponent}
        />
        <Activitys uid={uid} isTest={isTest} refreshing={refreshing} redBagLogo={redBagLogo} redBag={redBag} roulette={roulette} floatAds={floatAds} />
        {renderRestComponent && renderRestComponent()}
      </>
    )
  }
}

export default HomePage
