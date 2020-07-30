import { UGThemeColor } from '../UGThemeColor';

// 六合
export const LHThemeColor: { [x: string]: UGThemeColor } = {
  六合厅: {
    skitType: '六合厅',
    skitString: '六合厅',
    bgColor: ['#66B3FF', '#66B3FF'],
    get navBarBgColor() { return [this.themeColor, this.themeColor] },
    tabBarBgColor: '#ffffff',
    tabNoSelectColor: '#9D9D9D',
    get tabSelectedColor() { return this.themeColor },
    progressBgColor: ['#ffffff', '#ffffff'],
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
    themeColor: '#2894FF',
    themeLightColor: '#ACD6FF'
  },
  //六合资料
  六合资料0: {
    skitType: '六合资料0',
    skitString: '六合资料 0默认风格',
    bgColor: ['#FFFFFF', '#FFFFFF'],
    navBarBgColor: ['#ff566d', '#ff566d'],
    tabBarBgColor: '#FFFFFF',
    tabNoSelectColor: '#525252',
    tabSelectedColor: '#010101',
    progressBgColor: ['#d80000', '#fb5959'],
    homeContentColor: '#FFFFFF',
    homeContentSubColor: '#D3D3D3',
    cellBgColor: '#FFFFFF',
    CLBgColor: '#E6E6E6',
    menuHeadViewColor: ['#ff566d', '#ffbac3'],
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#FFFFFF',
    conversionCellColor: '#7BA2C2',
    intoViewColor: '#7BA2C2',
    moneyCellColor: '#9BB8CB',
  },
  六合资料1: {
    skitType: '六合资料1',
    skitString: '六合资料 1蓝色',
    bgColor: ['#FFFFFF', '#FFFFFF'],
    navBarBgColor: ['#58baf7', '#58baf7'],
    tabBarBgColor: '#FFFFFF',
    tabNoSelectColor: '#525252',
    tabSelectedColor: '#010101',
    progressBgColor: ['#d80000', '#fb5959'],
    homeContentColor: '#FFFFFF',
    homeContentSubColor: '#D3D3D3',
    cellBgColor: '#FFFFFF',
    CLBgColor: '#E6E6E6',
    menuHeadViewColor: ['#58baf7', '#a8d6f3'],
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#FFFFFF',
    conversionCellColor: '#7BA2C2',
    intoViewColor: '#7BA2C2',
    moneyCellColor: '#9BB8CB',
  },
  六合资料2: {
    skitType: '六合资料2',
    skitString: '六合资料 2渐变',
    bgColor: ['#FFFFFF', '#FFFFFF'],
    navBarBgColor: ['#b36cff', '#87d8d1'],
    tabBarBgColor: '#FFFFFF',
    tabNoSelectColor: '#525252',
    tabSelectedColor: '#010101',
    progressBgColor: ['#d80000', '#fb5959'],
    homeContentColor: '#FFFFFF',
    homeContentSubColor: '#D3D3D3',
    cellBgColor: '#FFFFFF',
    CLBgColor: '#E6E6E6',
    menuHeadViewColor: ['#b36cff', '#87d8d1'],
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#FFFFFF',
    conversionCellColor: '#7BA2C2',
    intoViewColor: '#7BA2C2',
    moneyCellColor: '#9BB8CB',
  },
  六合资料3: {
    skitType: '六合资料3',
    skitString: '六合资料 3大红',
    bgColor: ['#FFFFFF', '#FFFFFF'],
    navBarBgColor: ['#fd0202', '#fd0202'],
    tabBarBgColor: '#FFFFFF',
    tabNoSelectColor: '#525252',
    tabSelectedColor: '#010101',
    progressBgColor: ['#FEC434', '#FE8A23'],
    homeContentColor: '#FFFFFF',
    homeContentSubColor: '#D3D3D3',
    cellBgColor: '#FFFFFF',
    CLBgColor: '#E6E6E6',
    menuHeadViewColor: ['#fd0202', '#f34a4a'],
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#FFFFFF',
    conversionCellColor: '#7BA2C2',
    intoViewColor: '#7BA2C2',
    moneyCellColor: '#9BB8CB',
  },
  六合资料4: {
    skitType: '六合资料4',
    skitString: '六合资料 4粉红',
    bgColor: ['#FFFFFF', '#FFFFFF'],
    navBarBgColor: ['#fa7dc5', '#fa7dc5'],
    tabBarBgColor: '#FFFFFF',
    tabNoSelectColor: '#525252',
    tabSelectedColor: '#010101',
    progressBgColor: ['#FEC434', '#FE8A23'],
    homeContentColor: '#FFFFFF',
    homeContentSubColor: '#D3D3D3',
    cellBgColor: '#FFFFFF',
    CLBgColor: '#E6E6E6',
    menuHeadViewColor: ['#fa7dc5', '#f5c3e0'],
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#FFFFFF',
    conversionCellColor: '#7BA2C2',
    intoViewColor: '#7BA2C2',
    moneyCellColor: '#9BB8CB',
  },
  六合资料5: {
    skitType: '六合资料5',
    skitString: '六合资料 5橙色',
    bgColor: ['#FFFFFF', '#FFFFFF'],
    navBarBgColor: ['#ffa811', '#ffa811'],
    tabBarBgColor: '#FFFFFF',
    tabNoSelectColor: '#525252',
    tabSelectedColor: '#010101',
    progressBgColor: ['#d80000', '#fb5959'],
    homeContentColor: '#FFFFFF',
    homeContentSubColor: '#D3D3D3',
    cellBgColor: '#FFFFFF',
    CLBgColor: '#E6E6E6',
    menuHeadViewColor: ['#ffa811', '#f1cb8b'],
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#FFFFFF',
    conversionCellColor: '#7BA2C2',
    intoViewColor: '#7BA2C2',
    moneyCellColor: '#9BB8CB',
  },
  六合资料6: {
    skitType: '六合资料6',
    skitString: '六合资料 6深绿',
    bgColor: ['#FFFFFF', '#FFFFFF'],
    navBarBgColor: ['#85b903', '#85b903'],
    tabBarBgColor: '#FFFFFF',
    tabNoSelectColor: '#525252',
    tabSelectedColor: '#010101',
    progressBgColor: ['#d80000', '#fb5959'],
    homeContentColor: '#FFFFFF',
    homeContentSubColor: '#D3D3D3',
    cellBgColor: '#FFFFFF',
    CLBgColor: '#E6E6E6',
    menuHeadViewColor: ['#85b903', '#9fb568'],
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#FFFFFF',
    conversionCellColor: '#7BA2C2',
    intoViewColor: '#7BA2C2',
    moneyCellColor: '#9BB8CB',
  },
  六合资料7: {
    skitType: '六合资料7',
    skitString: '六合资料 7水绿',
    bgColor: ['#FFFFFF', '#FFFFFF'],
    navBarBgColor: ['#8BC34A', '#8BC34A'],
    tabBarBgColor: '#FFFFFF',
    tabNoSelectColor: '#525252',
    tabSelectedColor: '#010101',
    progressBgColor: ['#d80000', '#fb5959'],
    homeContentColor: '#FFFFFF',
    homeContentSubColor: '#D3D3D3',
    cellBgColor: '#FFFFFF',
    CLBgColor: '#E6E6E6',
    menuHeadViewColor: ['#8BC34A', '#a9c18e'],
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#FFFFFF',
    conversionCellColor: '#7BA2C2',
    intoViewColor: '#7BA2C2',
    moneyCellColor: '#9BB8CB',
  },
  六合资料8: {
    skitType: '六合资料8',
    skitString: '六合资料 8淡青',
    bgColor: ['#FFFFFF', '#FFFFFF'],
    navBarBgColor: ['#48bdb1', '#48bdb1'],
    tabBarBgColor: '#FFFFFF',
    tabNoSelectColor: '#525252',
    tabSelectedColor: '#010101',
    progressBgColor: ['#d80000', '#fb5959'],
    homeContentColor: '#FFFFFF',
    homeContentSubColor: '#D3D3D3',
    cellBgColor: '#FFFFFF',
    CLBgColor: '#E6E6E6',
    menuHeadViewColor: ['#48bdb1', '#7ab9b3'],
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#FFFFFF',
    conversionCellColor: '#7BA2C2',
    intoViewColor: '#7BA2C2',
    moneyCellColor: '#9BB8CB',
  },
  六合资料9: {
    skitType: '六合资料9',
    skitString: '六合资料 9紫色',
    bgColor: ['#FFFFFF', '#FFFFFF'],
    navBarBgColor: ['#ac77e6', '#ac77e6'],
    tabBarBgColor: '#FFFFFF',
    tabNoSelectColor: '#525252',
    tabSelectedColor: '#010101',
    progressBgColor: ['#d80000', '#fb5959'],
    homeContentColor: '#FFFFFF',
    homeContentSubColor: '#D3D3D3',
    cellBgColor: '#FFFFFF',
    CLBgColor: '#E6E6E6',
    menuHeadViewColor: ['#ac77e6', '#d7c0f1'],
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#FFFFFF',
    conversionCellColor: '#7BA2C2',
    intoViewColor: '#7BA2C2',
    moneyCellColor: '#9BB8CB',
  },
  六合资料10: {
    skitType: '六合资料10',
    skitString: '六合资料 10深蓝',
    bgColor: ['#FFFFFF', '#FFFFFF'],
    navBarBgColor: ['#3862AA', '#3862AA'],
    tabBarBgColor: '#FFFFFF',
    tabNoSelectColor: '#525252',
    tabSelectedColor: '#010101',
    progressBgColor: ['#d80000', '#fb5959'],
    homeContentColor: '#FFFFFF',
    homeContentSubColor: '#D3D3D3',
    cellBgColor: '#FFFFFF',
    CLBgColor: '#E6E6E6',
    menuHeadViewColor: ['#3862AA', '#7887a2'],
    textColor1: '#111111',
    textColor2: '#555555',
    textColor3: '#C1C1C1',
    textColor4: '#FFFFFF',
    conversionCellColor: '#7BA2C2',
    intoViewColor: '#7BA2C2',
    moneyCellColor: '#9BB8CB',
  },
};
