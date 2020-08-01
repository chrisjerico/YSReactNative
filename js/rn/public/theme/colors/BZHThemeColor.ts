import { UGThemeColor } from '../UGThemeColor'


export const BZHThemeColor: { [x: string]: UGThemeColor } = {
  宝石红: {
    skitType: '宝石红',
    skitString: '宝石红',
    // bgColor: ['#FF9797', '#FF9797'],
    get bgColor() { return [this.homeContentSubColor, this.homeContentSubColor] },
    get navBarBgColor() { return [this.themeColor, this.themeColor] },
    tabBarBgColor: '#ffffff',
    tabNoSelectColor: '#9D9D9D',
    get tabSelectedColor() { return this.themeColor },
    progressBgColor: ['#ffffff', '#ffffff'],
    get homeContentColor() { return this.themeLightColor }, // 真人大廳小方塊背景
    homeContentSubColor: '#D0D0D0', // 額度轉換Tab // #ffffff
    // cellBgColor: '#444',
    // CLBgColor: '#E6E6E6', // 推薦收益區塊
    get menuHeadViewColor() { return [this.themeColor, this.themeColor] },
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#ffffff',
    conversionCellColor: '#444',
    // intoViewColor: '#444',
    // moneyCellColor: '#444',
    themeColor: '#e53333',
    themeLightColor: '#FFECEC'
  },
}
