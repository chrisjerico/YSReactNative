import { UGThemeColor } from '../UGThemeColor'

const themeColor = '#ffffff'
const tabBarBgColor = '#ffffff'
const themeLightColor = '#FFECEC'

export const BYThemeColor: { [x: string]: UGThemeColor } = {
  白曜: {
    skitType: '白曜',
    skitString: '白曜',
    tabBarBgColor: tabBarBgColor,
    tabNoSelectColor: '#9D9D9D',
    homeContentSubColor: '#6C6C6C', // 額度轉換Tab
    bgColor: [tabBarBgColor, tabBarBgColor],
    navBarBgColor: [themeColor, themeColor],
    tabSelectedColor: '#000000',
    progressBgColor: [tabBarBgColor, tabBarBgColor],
    homeContentColor: themeLightColor,
    menuHeadViewColor: [themeColor, themeColor],
    textColor1: '#111111',
    textColor2: '#000000',
    textColor3: '#C1C1C1',
    textColor4: '#ffffff',
    conversionCellColor: '#444',
    themeColor: themeColor,
    themeLightColor: themeLightColor,
    isBlack: false,
    is23: false,
    yubaoBgColor: '#8E8E8E',
    promotion: {
      headerBgColor: themeColor,
      headerTintColor: '#000000',
      listBgColor: themeColor,
      tabBgColor: themeColor,
      selectedTabBgColor: '#d9d9d9',
    },
    progress: {
      tintColor: '#000000',
      bgColor: themeColor,
    },
    // navBarTitleColor: 'red',
    // bgTextColor: 'red',
  },
}
