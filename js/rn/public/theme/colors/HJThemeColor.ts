import { UGThemeColor } from '../UGThemeColor'


export const HJThemeColor: { [x: string]: UGThemeColor } = {
  黑金: {
    skitType: '黑金',
    skitString: '黑金',
    tabBarBgColor: '#ffffff',
    tabNoSelectColor: '#9D9D9D',
    homeContentSubColor: '#f2f2f2', // 額度轉換Tab
    get bgColor() { return [this.tabBarBgColor, this.tabBarBgColor] },
    get navBarBgColor() { return [this.themeColor, this.themeColor] }, // 跳頁面最上面的Header顏色
    get tabSelectedColor() { return this.themeColor },
    get progressBgColor() { return [this.tabBarBgColor, this.tabBarBgColor] },
    get homeContentColor() { return this.themeLightColor }, // 真人大廳小方塊背景
    // cellBgColor: '#444',
    // CLBgColor: '#E6E6E6', // 推薦收益區塊
    get menuHeadViewColor() { return ['#fcba54', '#fbef80', '#fcba54'] },
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#ffffff',
    conversionCellColor: '#444',
    // intoViewColor: '#444',
    //moneyCellColor: '#444',
    themeColor: '#e53333',
    themeLightColor: '#FFECEC',
    isBlack: false,
    is23: false,
    yubaoBgColor: "#8E8E8E"
  },
}
