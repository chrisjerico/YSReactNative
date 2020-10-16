import { UGThemeColor } from '../UGThemeColor'


export const HJThemeColor: { [x: string]: UGThemeColor } = {
  黑金: {
    skitType: '黑金',
    skitString: '黑金',
    tabBarBgColor: '#ffffff',
    tabNoSelectColor: '#9D9D9D',
    homeContentSubColor: '#f2f2f2', // 額度轉換Tab
    bgColor: ['#1a1a1e', '#000000'],
    navBarBgColor: ['#000000', '#000000'],
    get tabSelectedColor() { return this.themeColor },
    get progressBgColor() { return ['#4e4e4e', '#030303', '#4e4e4e'] },
    homeContentColor: '#fefefe',
    // cellBgColor: '#444',
    // CLBgColor: '#E6E6E6', // 推薦收益區塊
    get menuHeadViewColor() { return ['#fcba54', '#fbef80', '#fcba54'] },
    textColor1: '#111111',
    textColor2: '#6b6c6c',
    textColor3: '#C1C1C1',
    textColor4: '#ffffff',
    conversionCellColor: '#444',
    // intoViewColor: '#444',
    //moneyCellColor: '#444',
    themeColor: '#fcba54',
    themeLightColor: '#fbef80',
    isBlack: false,
    is23: false,
    yubaoBgColor: "#8E8E8E"
  },
}