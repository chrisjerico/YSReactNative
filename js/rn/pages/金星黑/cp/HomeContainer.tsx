import React from 'react'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { Dimensions } from 'react-native';
let dataProvider = new DataProvider((r1, r2) => {
  return r1 !== r2;
});
const { width } = Dimensions.get('screen')
const _layoutProvider = new LayoutProvider(
  index => {
    switch (index) {
      case 0:
        return 1
      case 1:
      case 2:
        return 2
      case 3:
      case 4:
        return 1
      case 5:
      case 6:
        return 2
      case 7:
        return 1
    }
  },
  (type, dim) => {
    switch (type) {
      case 1:
        dim.width = width - 20;
        dim.height = 130;
        break;
      case 2:
        dim.width = (width - 30) / 2;
        dim.height = 104;
        break;
      default:
        dim.width = 0;
        dim.height = 0;
    }
  }
);
const HomeContainer = () => {
  const rowRenderer
  return (
    <RecyclerListView
      rowRenderer={this.rowRenderer}
      dataProvider={dataProvider.cloneWithRows(this._generateArray(300))}
      layoutProvider={this.layoutProvider}
    // onScroll={this.checkRefetch}
    // renderFooter={this.renderFooter}
    />
  )
}
//1 普通彩票 2 真人视讯 3 捕鱼游戏 4 电子游戏 5 棋牌游戏 6 体育赛事；7=导航链接

const HomeData = [{
  title: "热门游戏",
  icon: "http://test05.6yc.com/views/mobileTemplate/18/images/01.png",
  seriesId: 0
}, {
  title: "彩票",
  icon: "http://test05.6yc.com/views/mobileTemplate/18/images/02.png",
  seriesId: 1
}, {
  title: "棋牌",
  icon: "http://test05.6yc.com/views/mobileTemplate/18/images/03.png",
  seriesId: 5
}, {
  title: "真人视讯",
  icon: "http://test05.6yc.com/views/mobileTemplate/18/images/04.png",
  seriesId: 2
}, {
  title: "捕鱼",
  icon: "http://test05.6yc.com/views/mobileTemplate/18/images/05.png",
  seriesId: 3
}, {
  title: "体育",
  icon: "http://test05.6yc.com/views/mobileTemplate/18/images/06.png",
  seriesId: 6
}, {
  title: "电竞",
  icon: "http://test05.6yc.com/views/mobileTemplate/18/images/07.png",
  seriesId: 7
}, {
  title: "电子",
  icon: "http://test05.6yc.com/views/mobileTemplate/18/images/08.png",
  seriesId: 4
}]