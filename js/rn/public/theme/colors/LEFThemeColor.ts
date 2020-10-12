import { UGThemeColor } from '../UGThemeColor'


export const LEFThemeColor: { [x: string]: UGThemeColor } = {
  乐FUN: {
    skitType: '乐FUN',
    skitString: '乐FUN',
    tabBarBgColor: '#E5E5E5',
    tabNoSelectColor: '#F6F6F6',
    homeContentSubColor: '#f2f2f2', // 額度轉換Tab
    get bgColor() { return [this.tabBarBgColor, this.tabBarBgColor] },
    get navBarBgColor() { return [this.themeColor, this.themeColor] }, // 跳頁面最上面的Header顏色
    get tabSelectedColor() { return this.themeColor },
    get progressBgColor() { return [this.tabBarBgColor, this.tabBarBgColor] },
    get homeContentColor() { return this.themeLightColor }, // 真人大廳小方塊背景
    // cellBgColor: '#444',
    // CLBgColor: '#E6E6E6', // 推薦收益區塊
    get menuHeadViewColor() { return [this.themeColor, this.themeColor] },
    textColor1: '#333333',
    textColor2: '#FFB400',
    textColor3: '#C1C1C1',
    textColor4: '#ffffff',
    conversionCellColor: '#444',
    // intoViewColor: '#444',
    //moneyCellColor: '#444',
    themeColor: '#293D52',
    themeLightColor: '#FFECEC',
    isBlack: false,
    is23: false,
    yubaoBgColor: "#8E8E8E"
  },
}
