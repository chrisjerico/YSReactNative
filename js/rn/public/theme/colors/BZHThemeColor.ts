import { UGThemeColor } from '../UGThemeColor'


export const BZHThemeColor: { [x: string]: UGThemeColor } = {
  宝石红: {
    skitType: '宝石红',
    skitString: '宝石红',
    bgColor: ['#ffffff', '#ffffff'],
    get navBarBgColor() { return [this.themeColor, this.themeColor] },
    tabBarBgColor: '#ffffff',
    tabNoSelectColor: '#9D9D9D',
    get tabSelectedColor() { return this.themeColor }, // '#F1B709'
    progressBgColor: ['#FEC434', '#FE8A23'],
    homeContentColor: '#444',
    homeContentSubColor: 'black',
    cellBgColor: '#444',
    CLBgColor: '#444',
    menuHeadViewColor: ['black', 'black'],
    textColor1: '#000000',
    textColor2: 'white',
    textColor3: 'white',
    textColor4: '#ffffff',
    conversionCellColor: '#444',
    intoViewColor: '#444',
    moneyCellColor: '#444',
    themeColor: '#e53333'
  },
}
