import { UGThemeColor } from '../UGThemeColor'

export const WNZThemeColor: { [x: string]: UGThemeColor } = {
  威尼斯: {
    skitType: '威尼斯',
    skitString: '威尼斯',
    tabBarBgColor: '#ffffff',
    tabNoSelectColor: '#9D9D9D',
    homeContentSubColor: '#f2f2f2', // 額度轉換Tab
    get bgColor() {
      return [this.tabBarBgColor, this.tabBarBgColor]
    },
    get navBarBgColor() {
      return [this.themeColor, this.themeColor]
    }, // 跳頁面最上面的Header顏色
    get tabSelectedColor() {
      return this.themeColor
    },
    get progressBgColor() {
      return [this.tabBarBgColor, this.tabBarBgColor]
    },
    get homeContentColor() {
      return this.themeLightColor
    }, // 真人大廳小方塊背景
    // cellBgColor: '#444',
    // CLBgColor: '#E6E6E6', // 推薦收益區塊
    get menuHeadViewColor() {
      return [this.themeColor, this.themeColor]
    },
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#ffffff',
    conversionCellColor: '#444',
    // intoViewColor: '#444',
    //moneyCellColor: '#444',
    themeColor: '#BF242A',
    themeLightColor: '#FFECEC',
    isBlack: false,
    is23: false,
    yubaoBgColor: '#8E8E8E',
    headerTintColor: '#ffffff',
    get progressColor() {
      return this.themeColor
    },
  },
}
