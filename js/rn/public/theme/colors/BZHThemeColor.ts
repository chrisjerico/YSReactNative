import { UGThemeColor } from '../UGThemeColor'


export const BZHThemeColor: { [x: string]: UGThemeColor } = {
  宝石红: {
    skitType: '宝石红',
    skitString: '宝石红',
    bgColor: ['#f6f6f6', '#f6f6f6'],
    get navBarBgColor() { return [this.themeColor, this.themeColor] },
    tabBarBgColor: '#ffffff',
    tabNoSelectColor: '#9D9D9D',
    get tabSelectedColor() { return this.themeColor },
    progressBgColor: ['#FEC434', '#FE8A23'],
    get homeContentColor() { return this.themeLightColor }, // 真人大廳小方塊背景
    homeContentSubColor: '#f6f6f6', // 額度轉換Tab // #ffffff
    // cellBgColor: '#444',
    // CLBgColor: '#E6E6E6', // 推薦收益區塊
    get menuHeadViewColor() { return [this.themeColor, this.themeColor] },
    // textColor1: '#000000',
    // textColor2: '#000000',
    // textColor3: '#000000',
    // textColor4: '#ffffff',
    // conversionCellColor: '#444',
    // intoViewColor: '#444',
    // moneyCellColor: '#444',
    themeColor: '#e53333',
    themeLightColor: '#FFECEC'
  },
}
