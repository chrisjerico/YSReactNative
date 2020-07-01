import { UGThemeColor } from '../UGThemeColor'


export const WNZThemeColor: { [x: string]: UGThemeColor } = {
  威尼斯: {
    skitType: '威尼斯',
    skitString: '威尼斯',
    bgColor: ['#ffffff', '#ffffff'],
    get navBarBgColor() { return [this.themeColor, this.themeColor] },
    get tabBarBgColor() { return this.themeColor },
    tabNoSelectColor: '#ffffff',
    tabSelectedColor: '#F1B709',
    progressBgColor: ['#FEC434', '#FE8A23'],
    homeContentColor: '#444',
    homeContentSubColor: 'black',
    cellBgColor: '#444',
    CLBgColor: '#444',
    menuHeadViewColor: ['black', 'black'],
    textColor1: 'white',
    textColor2: 'white',
    textColor3: 'white',
    textColor4: 'black',
    conversionCellColor: '#444',
    intoViewColor: '#444',
    moneyCellColor: '#444',
    themeColor: '#e53333'
  },
}
