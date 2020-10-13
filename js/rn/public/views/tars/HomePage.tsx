import { ReactElement } from 'react'
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
  renderRestComponent: () => ReactElement
  uid: string
  isTest: boolean
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
  uid,
  isTest,
  redBagLogo,
  redBag,
  roulette,
  floatAds,
}: HomePageProps) => {
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
        <SafeAreaHeader headerColor={themeColor}></SafeAreaHeader>
        <List
          uniqueKey={pagekey}
          scrollEnabled={true}
          removeClippedSubviews={true}
          data={items}
          refreshing={refreshing}
          onRefresh={async () => {
            try {
              await refresh()
              PushHelper.pushAnnouncement(announcements)
            } catch (error) {}
          }}
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
