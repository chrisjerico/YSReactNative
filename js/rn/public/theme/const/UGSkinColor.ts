import { skin1, Skin1 } from '../UGSkinManagers'
import { st } from './UGSkinConf'
export interface UGSkinColor<Color, Colors> {
  // 根据主题色自动生成色值
  themeColor?: Color // 主题色
  themeDarkColor?: Color // 主题色加深
  themeLightColor?: Color // 主题色加浅
  bgTextColor?: Color // bgColor上的文本颜色

  // 其他颜色
  backgroundColor: Color // 背景色
  bgColor: Colors // 背景渐变色色
  navBarBgColor: Colors // 导航条背景色
  tabBarBgColor: Color // 底部标签栏背景色
  tabNoSelectColor: Color // 底部标签栏未选中颜色
  tabSelectedColor: Color // 底部标签栏选中颜色
  cellBgColor: Color // Cell背景色
  progressBgColor: Colors // 我的页进度条背景渐变色
  menuHeadViewColor: Colors // 侧边栏顶部背景渐变色
  homeContentColor: Color // 首页内容底色
  homeContentSubColor: Color // 首页游戏列表二级菜单背景色
  CLBgColor: Color // 长龙灰色背景底色
  textColor1: Color // 字颜色 黑色
  textColor2: Color // 占位字颜色 深灰色
  textColor3: Color // 占位字颜色 淡灰色
  textColor4: Color // 反差字体 白色
  conversionCellColor: Color // 内容Cell
  intoViewColor: Color // 转入View
  moneyCellColor: Color // 金额Cell
  navBarTitleColor: Color // 导航条标题颜色
  yubaoBgColor: Color // 利息宝页背顶部景色
  promotion: Promotion<Color> // 优惠活动页
  progress: Progress<Color> // 进度条颜色
}

interface Progress<Color> {
  tintColor?: Color
  bgColor: Color
}
interface Promotion<Color> {
  headerTintColor?: Color
  headerBgColor?: Color
  listBgColor?: Color
  couponTitleColor?: Color
  selectedTabBgColor?: Color
  tabBgColor?: Color
  tabTextColor?: Color
  selectedTabTextColor?: Color
}
// const aaa1: { [key in UGSkinColor]?: any }

/**
 * 主要适配模板：经典1蓝、GPK0
 * 这几个适配完其他模板一般没什么大问题了
 *
 * 最多人用的模板：经典1蓝（占80%以上）
 * 其他多人用的模板：威尼斯、六合资料、经典18灰、GPK
 */
export const skinColors: UGSkinColor<st<string>, st<string[]>> = {
  themeColor: {
    默认: null, // 根据导航条颜色自动获取
    宝石红: '#e53333',
    白曜: '#ffffff',
    黑金: '#fcba54',
    金星黑: '#000000',
    凯时: '#000000',
    乐橙: '#FEC434',
    乐FUN: '#293D52',
    六合厅: '#4285f4',
    利来: '#999999',
    威尼斯: '#BF242A',
    doyWallet: '#3567de',
  },

  progress: {
    tintColor: {
      get 默认() { return skin1.themeColor },
      白曜: '#000000',
      金星黑: '#ffffff',
      凯时: '#ffffff',
    },
    bgColor: {
      默认: '#fff',
      get 白曜() {
        return skin1.themeColor
      },
      金星黑: '#000000',
      凯时: '#000000',
    },
  },

  // 优惠活动页
  promotion: {
    headerBgColor: {
      默认: null,
      get 白曜() {
        return Skin1.themeColor
      },
      get 宝石红() {
        return Skin1.themeColor
      },
      金星黑: '#000000',
      凯时: '#000000',
      乐橙: '#ffffff',
      get 六合厅() {
        return Skin1.themeColor
      },
      get 威尼斯() {
        return Skin1.themeColor
      },
    },

    headerTintColor: {
      默认: '#fff',
      白曜: '#000',
    },
    listBgColor: {
      默认: null,
      get 白曜() {
        return Skin1.themeColor
      },
      凯时: '#000000',
    },
    tabBgColor: {
      默认: null,
      get 白曜() {
        return Skin1.themeColor
      },
      凯时: '#000000',
    },
    selectedTabBgColor: {
      默认: null,
      白曜: '#d9d9d9',
      凯时: '#000000',
    },
    selectedTabTextColor: {
      默认: null,
      get 宝石红() {
        return Skin1.themeColor
      },
      凯时: 'red',
      乐橙: '#ffffff',
      get 六合厅() {
        return Skin1.themeColor
      },
      get 威尼斯() {
        return Skin1.themeColor
      },
    },
    couponTitleColor: {
      默认: '#ffffff',
      六合厅: '#000000',
    },
    tabTextColor: {
      默认: '#000',
      凯时: '#fff',
      六合厅: '#000000',
    },
  },

  // 利息宝页背顶部景色
  yubaoBgColor: {
    默认: '#8E8E8E',
    利来: '#444',
  },

  backgroundColor: {
    默认: '#fff',
    GPK0黑: '#171717',
    尊龙: '#171717',
    香槟金1黑: '#111',
    黑金: '#1a1a1e',
    经典21黑: '#0D0D0D',
    金星黑: '#000',
    doyWallet: '#f6f6f9'
  },

  // 背景色
  bgColor: {
    默认: ['#FFFFFF', '#FFFFFF'],
    黑金: ['#1a1a1e', '#000000'],
    经典1蓝: ['#7F9493', '#5389B3'],
    经典2红: ['#d19885', '#904a6e'],
    经典3金: ['#B48A46', '#8A5C3E'],
    经典4绿: ['#78BC67', '#4DB48B'],
    经典5褐: ['#913D3E', '#EAAD72'],
    经典6淡蓝: ['#61A8B4', '#C7F3E5'],
    经典7深蓝: ['#486869', '#436363'],
    经典8紫: ['#934FB4', '#9146A0'],
    经典9深红: ['#871113', '#871B1F'],
    经典10橘黄: ['#FC7008', '#FC7008'],
    经典11橘红: ['#B52A18', '#8F1115'],
    经典12星空蓝: ['#008CAC', '#00A9CA'],
    经典13紫: ['#9800B7', '#46D8D6'],
    经典14粉: ['#FFBED4', '#FEC1D5'],
    经典15淡蓝: ['#4CAEDC', '#5DC3EB'],
    经典16深紫: ['#4300DA', '#5800EE'],
    经典17金黄: ['#FECC0A', '#FE9C08'],
    经典18天空灰: ['#B3B3B3', '#B3B3B3'],
    经典19忧郁蓝: ['#00B2FF', '#005ED6'],
    经典21黑: ['#0D0D0D', '#0D0D0D'],
    金星黑: ['#000000', '#000000'],
    凯时: ['gray', 'gray'],
    乐橙: ['#f4f4f4', '#f4f4f4'],
    利来: ['#f5f5f9', '#f5f5f9'],
    石榴红: ['#F5F5F5', '#F5F5F5'],
    GPK0黑: ['#171717', '#171717'],
    综合体育: ['#F1F1F1', '#F1F1F1'],
    香槟金0金: ['#B9B0AB', '#B9B0AB'],
    香槟金1黑: ['#111', '#111'],
    香槟金2紫: ['#3F3B58', '#3F3B58'],
    香槟金3红: ['#B93030', '#B93030'],
    香槟金4浅蓝: ['#6CB8D3', '#6CB8D3'],
    香槟金5绿: ['#369C74', '#369C74'],
    香槟金6蓝: ['#5262AF', '#5262AF'],
    香槟金7小红: ['#D76589', '#D76589'],
    新年红: ['#F5F5F5', '#F5F5F5'],
    尊龙: ['#171717', '#171717'],
  },

  // 导航条背景色
  navBarBgColor: {
    默认: ['#609AC5', '#609AC5'],
    白曜: ['#000000', '#000000'],
    宝石红: ['#e53333', '#e53333'],
    黑金: ['#000000', '#000000'],
    经典1蓝: ['#609AC5', '#609AC5'],
    经典2红: ['#73315C', '#73315C'],
    经典3金: ['#7E503C', '#7E503C'],
    经典4绿: ['#58BEA4', '#58BEA4'],
    经典5褐: ['#662E3E', '#662E3E'],
    经典6淡蓝: ['#2E647C', '#2E647C'],
    经典7深蓝: ['#3F5658', '#3F5658'],
    经典8紫: ['#814689', '#814689'],
    经典9深红: ['#880506', '#880506'],
    经典10橘黄: ['#FF8705', '#FF8705'],
    经典11橘红: ['#8B2B2A', '#8B2B2A'],
    经典12星空蓝: ['#68A7A0', '#68A7A0'],
    经典13紫: ['#9533DD', '#9533DD'],
    经典14粉: ['#EFCFDD', '#EFCFDD'],
    经典15淡蓝: ['#66C6EA', '#66C6EA'],
    经典16深紫: ['#6505E6', '#6505E6'],
    经典17金黄: ['#FFAF06', '#FFAF06'],
    经典18天空灰: ['#C1C1C1', '#C1C1C1'],
    经典19忧郁蓝: ['#4CABFA', '#4CABFA'],
    经典21黑: ['#101010', '#101010'],
    金星黑: ['#2C2E36', '#2C2E36'],
    简约0蓝: ['#4463A5', '#4463A5'],
    简约1红: ['#fb8787', '#e45353'],
    凯时: ['#2C2E36', '#2C2E36'],
    乐橙: ['#FEC434', '#FEC434'],
    六合厅: ['#4285f4', '#4285f4'],
    六合资料: ['#3862AA', '#3862AA'],
    利来: ['#999999', '#999999'],
    石榴红: ['#CC022C', '#CC022C'],
    GPK0黑: ['#333333', '#333333'],
    金沙: ['#323232', '#323232'],
    火山橙: ['#f08c34', '#eb3323'],
    综合体育: ['#46ABFF', '#46ABFF'],
    天空蓝: ['#3278EE', '#819EFF'],
    威尼斯: ['#BF242A', '#BF242A'],
    香槟金0金: ['#987960', '#B0937D'],
    香槟金1黑: ['#333', '#333'],
    香槟金2紫: ['#50506E', '#50506E'],
    香槟金3红: ['#D24646', '#D24646'],
    香槟金4浅蓝: ['#50A0BE', '#50A0BE'],
    香槟金5绿: ['#46AA82', '#46AA82'],
    香槟金6蓝: ['#526ddd', '#526dDd'],
    香槟金7小红: ['#F07DA0', '#F07DA0'],
    新年红: ['#DE1C27', '#DE1C27'],
    尊龙: ['#333333', '#333333'],
    doyWallet: ['#1F65E6', '#3581F5'],
  },

  // 底部标签栏背景色
  tabBarBgColor: {
    默认: '#fff',
    经典1蓝: '#8DA3B1',
    经典2红: '#DFB9B5',
    经典3金: '#DFC8A1',
    经典4绿: '#B6DDB6',
    经典5褐: '#FBE0B8',
    经典6淡蓝: '#C5EAE7',
    经典7深蓝: '#ABC2B4',
    经典8紫: '#D1A4D7',
    经典9深红: '#DE9595',
    经典10橘黄: '#FFB666',
    经典11橘红: '#DC7D6E',
    经典12星空蓝: '#98BEBB',
    经典13紫: '#C367D7',
    经典14粉: '#FEC1D5',
    经典15淡蓝: '#5DC3EB',
    经典16深紫: '#A766F7',
    经典17金黄: '#FFE066',
    经典18天空灰: '#D9D9D9',
    经典19忧郁蓝: '#8CB9F4',
    经典21黑: '#313131',
    金星黑: '#2C2E36',
    简约0蓝: '#F4F4F4',
    简约1红: '#F4F4F4',
    凯时: '#2C2E36',
    乐FUN: '#E5E5E5',
    石榴红: '#CC022C',
    GPK0黑: '#313131',
    金沙: '#323232',
    火山橙: '#262223',
    天空蓝: '#F4F4F4',
    威尼斯: '#000000',
    香槟金0金: '#F5F1EF',
    香槟金1黑: '#262223',
    香槟金2紫: '#3F3B58',
    香槟金3红: '#D8AAAA',
    香槟金4浅蓝: '#DBF5FF',
    香槟金5绿: '#C8E2D2',
    香槟金6蓝: '#C6C6EA',
    香槟金7小红: '#FFD8E4',
    新年红: '#DE1C27',
    尊龙: '#313131',
  },

  // 底部标签栏未选中颜色
  tabNoSelectColor: {
    默认: '#000',
    白曜: '#9D9D9D',
    宝石红: '#9D9D9D',
    黑金: '#9D9D9D',
    经典1蓝: '#525252',
    经典21黑: '#999999',
    金星黑: '#999999',
    简约0蓝: '#525252',
    简约1红: '#525252',
    凯时: '#999999',
    乐橙: '#9a9a9a',
    乐FUN: '#999999',
    六合厅: '#9D9D9D',
    六合资料: '#525252',
    利来: '#999999',
    石榴红: '#999999',
    GPK0黑: '#999999',
    金沙: '#999999',
    火山橙: '#999999',
    综合体育: '#999999',
    天空蓝: '#525252',
    威尼斯: '#9D9D9D',
    香槟金0金: '#A1A1A0',
    香槟金1黑: '#919191',
    香槟金2紫: '#919192',
    香槟金3红: '#865151',
    香槟金4浅蓝: '#398099',
    香槟金5绿: '#1C7841',
    香槟金6蓝: '#36389C',
    香槟金7小红: '#C2446C',
    新年红: '#999999',
    尊龙: '#FFFFFF',
  },

  // 底部标签栏选中颜色
  tabSelectedColor: {
    默认: '#fff',
    白曜: '#000000',
    宝石红: '#e53333',
    经典1蓝: '#010101',
    经典21黑: '#FFFFFF',
    金星黑: '#F1B709',
    简约0蓝: '#010101',
    简约1红: '#010101',
    凯时: '#F1B709',
    乐橙: '#E0811A',
    六合厅: '#4285f4',
    六合资料: '#010101',
    利来: '#DE4431',
    石榴红: '#F1B709',
    金沙: '#aab647',
    火山橙: '#eb3323',
    综合体育: '#6B54F5',
    天空蓝: '#010101',
    get 威尼斯() {
      return skin1.themeColor
    },
    香槟金0金: '#987960',
    香槟金1黑: '#927E6D',
    香槟金2紫: '#967C6D',
    香槟金3红: '#852626',
    香槟金4浅蓝: '#0A4E66',
    香槟金5绿: '#003D18',
    香槟金6蓝: '#1B1C4E',
    香槟金7小红: '#730C2C',
    新年红: '#F1B709',
    尊龙: '#F1B709',
  },

  // Cell背景色
  cellBgColor: {
    默认: '#fff',
    经典1蓝: '#C1CBC9',
    经典2红: '#DFB9B5',
    经典3金: '#DFC8A1',
    经典4绿: '#B6DDB6',
    经典5褐: '#F7E2C0',
    经典6淡蓝: '#C5EAE7',
    经典7深蓝: '#ABC2B4',
    经典8紫: '#D1A4D7',
    经典9深红: '#D1A4D7',
    经典10橘黄: '#FFB666',
    经典11橘红: '#DC7D6E',
    经典12星空蓝: '#98BEBB',
    经典13紫: '#C367D7',
    经典14粉: '#FEC1D5',
    经典15淡蓝: '#5DC3EB',
    经典16深紫: '#A766F7',
    经典17金黄: '#FFE066',
    经典18天空灰: '#D9D9D9',
    经典19忧郁蓝: '#8CB9F4',
    经典21黑: '#181818',
    金星黑: '#444',
    凯时: '#444',
    GPK0黑: '#181818',
    香槟金1黑: '#181818',
    尊龙: '#181818',
  },

  // 我的页进度条背景渐变色
  progressBgColor: {
    默认: ['#d80000', '#fb5959'],
    白曜: ['#fff', '#fff'],
    金星黑: ['#FEC434', '#FE8A23'],
    简约0蓝: ['#FEC434', '#FE8A23'],
    简约1红: ['#FEC434', '#FE8A23'],
    凯时: ['#FEC434', '#FE8A23'],
    乐橙: ['#FEC434', '#FE8A23'],
    利来: ['#ffffff', '#999999'],
    石榴红: ['#FEC434', '#FE8A23'],
    天空蓝: ['#FEC434', '#FE8A23'],
    香槟金1黑: ['#FEC434', '#FE8A23'],
    新年红: ['#FEC434', '#FE8A23'],
    尊龙: ['#FEC434', '#FE8A23'],
  },

  // 侧边栏顶部背景渐变色
  menuHeadViewColor: {
    默认: ['#5f9bc6', '#fb5959'],
    白曜: ['#fff', '#fff'],
    宝石红: ['#e53333', '#e53333'],
    经典1蓝: ['#5f9bc6', '#fb5959'],
    经典2红: ['#bf338e', '#fb95db'],
    经典3金: ['#bf7555', '#efb398'],
    经典4绿: ['#49a791', '#7cead3'],
    经典5褐: ['#a06577', '#f1adc4'],
    经典6淡蓝: ['#4c91a9', '#85d2ec'],
    经典7深蓝: ['#65898c', '#9fd3d8'],
    经典8紫: ['#c161c3', '#f889fb'],
    经典9深红: ['#c30808', '#f98080'],
    经典10橘黄: ['#ffa33f', '#fbd2a5'],
    经典11橘红: ['#d24040', '#dc9191'],
    经典12星空蓝: ['#22667b', '#5fc5e2'],
    经典13紫: ['#aa83e8', '#dbc5ff'],
    经典14粉: ['#e499b0', '#fecfdd'],
    经典15淡蓝: ['#5ebee5', '#addef3'],
    经典16深紫: ['#9041fd', '#c19bf5'],
    经典17金黄: ['#ffc344', '#ffe1a2'],
    经典18天空灰: ['#c1c1c1', '#ececec'],
    经典19忧郁蓝: ['#4ba2fa', '#64d0ef'],
    经典21黑: ['#323232', '#323232'],
    金星黑: ['#000000', '#000000'],
    简约0蓝: ['#fa7dc5', '#f5c3e0'],
    简约1红: ['#fa7dc5', '#f5c3e0'],
    凯时: ['black', 'black'],
    乐橙: ['#FEC434', '#FEC434'],
    六合厅: ['#4285f4', '#4285f4'],
    六合资料: ['#3862AA', '#7887a2'],
    利来: ['#555555', '#555555'],
    石榴红: ['#d7213a', '#f99695'],
    GPK0黑: ['#323232', '#323232'],
    金沙: ['#ff566d', '#ffbac3'],
    火山橙: ['#ff566d', '#ffbac3'],
    天空蓝: ['#fa7dc5', '#f5c3e0'],
    威尼斯: ['#BF242A', '#fb5959'],
    香槟金0金: ['#7C6657', '#B7A28F'],
    香槟金1黑: ['#7C6657', '#B7A28F'],
    香槟金2紫: ['#2B2744', '#50506E'],
    香槟金3红: ['#5E2523', '#90595A'],
    香槟金4浅蓝: ['#4782A4', '#5A91B1'],
    香槟金5绿: ['#306346', '#5D795B'],
    香槟金6蓝: ['#373A8C', '#595DA7'],
    香槟金7小红: ['#8B304A', '#9F4964'],
    新年红: ['#e63534', '#f99695'],
    尊龙: ['#323232', '#323232'],
  },

  // 首页内容底色
  homeContentColor: {
    默认: '#fff',
    白曜: '#FFECEC',
    黑金: '#fefefe',
    经典1蓝: '#b7cbdd',
    经典2红: '#d0aeb7',
    经典3金: '#d2bea6',
    经典4绿: '#c4e5c7',
    经典5褐: '#c1a8aa',
    经典6淡蓝: '#c1e1e6',
    经典7深蓝: '#acbdbe',
    经典8紫: '#d7b6e3',
    经典9深红: '#cd908d',
    经典10橘黄: '#ffc280',
    经典11橘红: '#dba497',
    经典12星空蓝: '#ade5ed',
    经典13紫: '#ccadee',
    经典14粉: '#ffe7ee',
    经典15淡蓝: '#b1e2f3',
    经典16深紫: '#b680f8',
    经典17金黄: '#ffe280',
    经典18天空灰: '#e0e0e0',
    经典19忧郁蓝: '#a1ccff',
    经典21黑: '#606060',
    金星黑: '#444444',
    凯时: '#444',
    乐橙: '#f3f3f3',
    GPK0黑: '#343434',
    香槟金0金: '#CBC6C3',
    香槟金1黑: '#5B5B5B',
    香槟金2紫: '#7E7C8D',
    香槟金3红: '#C27876',
    香槟金4浅蓝: '#A8CEE0',
    香槟金5绿: '#89BBA3',
    香槟金6蓝: '#8D969D',
    香槟金7小红: '#D79CAF',
    尊龙: '#343434',
  },

  // 首页游戏列表二级菜单背景色
  homeContentSubColor: {
    默认: '#ADC8D7',
    白曜: '#6C6C6C',
    宝石红: '#f2f2f2',
    黑金: '#f2f2f2',
    经典1蓝: '#ADC8D7',
    经典2红: '#D19885',
    经典3金: '#B48A46',
    经典4绿: '#78BC67',
    经典5褐: '#EAAD72',
    经典6淡蓝: '#4361A3',
    经典7深蓝: '#4DB48B',
    经典8紫: '#934FB4',
    经典9深红: '#9B292F',
    经典10橘黄: '#E58645',
    经典11橘红: '#B52A18',
    经典12星空蓝: '#22BDD1',
    经典13紫: '#DCA4EA',
    经典14粉: '#F9CFDF',
    经典15淡蓝: '#6EC4E5',
    经典16深紫: '#6A3BEA',
    经典17金黄: '#F4D36C',
    经典18天空灰: '#c1c1c1',
    经典19忧郁蓝: '#49CEFC',
    经典21黑: '#757575',
    金星黑: '#000000',
    简约0蓝: '#D3D3D3',
    简约1红: '#D3D3D3',
    凯时: 'black',
    乐橙: '#ffffff',
    乐FUN: '#f2f2f2',
    六合厅: '#f2f2f2',
    六合资料: '#D3D3D3',
    利来: '#ffffff',
    石榴红: '#E8A3B3',
    GPK0黑: '#353535',
    金沙: '#D3D3D3',
    火山橙: '#D3D3D3',
    天空蓝: '#D3D3D3',
    威尼斯: '#f2f2f2',
    香槟金1黑: '#353535',
    新年红: '#F4C9CD',
    尊龙: '#353535',
  },

  // 长龙灰色背景底色
  CLBgColor: {
    默认: '#E6E6E6',
    金星黑: '#444',
    凯时: '#444',
    乐橙: '#fff',
    GPK0黑: '#202122',
    香槟金1黑: '#202122',
    尊龙: '#202122',
    经典21黑: '#202122',
  },

  // 字颜色 黑色
  textColor1: {
    默认: '#111111',
    金星黑: '#ffffff',
    凯时: 'white',
    乐FUN: '#333333',
    GPK0黑: '#FEFEFE',
    香槟金1黑: '#FEFEFE',
    尊龙: '#FEFEFE',
    经典21黑: '#FEFEFE',
    威尼斯: '#333333',
    doyWallet: '#19202C',
  },

  // 占位字颜色 深灰色
  textColor2: {
    默认: '#555',
    白曜: '#000000',
    黑金: '#6b6c6c',
    金星黑: '#ffffff',
    凯时: 'white',
    乐橙: '#9a9a9a',
    乐FUN: '#FFB400',
    GPK0黑: '#C1C1C1',
    香槟金1黑: '#C1C1C1',
    尊龙: '#C1C1C1',
    经典21黑: '#C1C1C1',
    doyWallet: '#585A5E',
  },

  // 占位字颜色 淡灰色
  textColor3: {
    默认: '#C1C1C1',
    金星黑: '#a0a0a0',
    凯时: 'white',
    GPK0黑: '#555555',
    香槟金1黑: '#555555',
    尊龙: '#555555',
    乐FUN: '#C1C1C1',
    经典21黑: '#555555',
    doyWallet: '#8E929A',
  },

  // 反差字体 白色
  textColor4: {
    默认: '#fff',
    金星黑: '#000000',
    凯时: 'black',
    GPK0黑: '#000000',
    香槟金1黑: '#000000',
    尊龙: '#000000',
    经典21黑: '#000000',
  },

  // 内容Cell
  conversionCellColor: {
    默认: '#7BA2C2',
    白曜: '#444',
    宝石红: '#444',
    黑金: '#444',
    金星黑: '#444',
    凯时: '#444',
    乐橙: '#f5b65d',
    乐FUN: '#444',
    六合厅: '#444',
    利来: '#444',
    威尼斯: '#444',
    经典21黑: '#444',
  },

  // 转入View
  intoViewColor: {
    默认: '#7BA2C2',
    金星黑: '#444',
    凯时: '#444',
    乐橙: '#f5b65d',
    利来: '#444',
  },

  // 金额Cell
  moneyCellColor: {
    默认: '#9BB8CB',
    金星黑: '#444',
    凯时: '#444',
    乐橙: '#f3a839',
    利来: '#444',
  },

  // 导航条标题颜色
  navBarTitleColor: {
    默认: '#fff',
  },
}
