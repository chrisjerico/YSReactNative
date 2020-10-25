import { UGThemeColor } from '../UGThemeColor'

export const JXHThemeColor: { [x: string]: UGThemeColor } = {
  金星黑: {
    skitType: '金星黑',
    skitString: '金星黑',
    bgColor: ['#000000', '#000000'],
    navBarBgColor: ['#2C2E36', '#2C2E36'],
    tabBarBgColor: '#2C2E36',
    tabNoSelectColor: '#FFFFFF',
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
    navBarTitleColor: '#fff',
    isBlack: true,
    promotion: {
      headerTintColor: '#ffffff',
      headerBgColor: '#000000',
    },
    get progressColor() {
      return this.themeColor
    },
    themeColor: '#000000',
  },
}
