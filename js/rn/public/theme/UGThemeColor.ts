// 主题色
export class UGThemeColor {
  skitType = '默认'
  skitString = '默认' // 皮肤类型
  bgColor? = ['#7F9493', '#5389B3'] // 背景 渐变色
  navBarBgColor? = ['#609AC5', '#609AC5'] // 导航条背景色
  progressBgColor? = ['#d80000', '#fb5959'] // 进度条背景渐变色
  menuHeadViewColor? = ['#5f9bc6', '#fb5959'] // 侧边栏顶部背景渐变色
  tabBarBgColor? = '#8DA3B1' // Tabbar背景色
  tabNoSelectColor? = '#525252' // Tabbar未选中颜色
  tabSelectedColor? = '#010101' // Tabbar已选中颜色
  cellBgColor? = '#C1CBC9' // Cell背景色
  homeContentColor? = '#b2cde0' // 首页内容底色
  homeContentSubColor? = '#ADC8D7' // 首页游戏列表二级菜单背景色
  CLBgColor? = '#E6E6E6' // 长龙灰色背景底色
  textColor1? = '#111' // 默认字颜色 黑色
  textColor2? = '#555' // 占位字颜色 深灰色
  textColor3? = '#c1c1c1' // 占位字颜色 淡灰色
  textColor4? = '#fff' // 反差字体 白色
  conversionCellColor? = '#7BA2C2' // 内容Cell
  intoViewColor? = '#7BA2C2' // 转入View
  moneyCellColor? = '#9BB8CB' // 金额Cell
  navBarTitleColor? = '#fff'

  // 根据主题色自动生成色值
  themeColor?: string // 主题色
  themeDarkColor?: string // 主题色加深
  themeLightColor?: string // 主题色加浅
  bgTextColor?: string // bgColor上的文本颜色

  isBlack?: boolean = false
  is23?: boolean
  // 自定義
  yubaoBgColor?: string
  progressColor?: string
  // promition
  promotion?: Promotion
}

interface Promotion {
  headerTintColor?: string
  headerBgColor?: string
  listBgColor?: string
  couponTitleColor?: string
  selectedTabBgColor?: string
  tabBgColor?: string
  tabTextColor?: string
  selectedTabTextColor?: string
}

/**
 * 实用颜色
 */
export enum UGColor {
  // 主题色
  ThemeColor1 = '#006DCC',

  // 信息
  InfoColor1 = '#49afcd',

  // 成功
  SuccessColor1 = '#5BB75B',

  // 警告
  WarnningColor1 = '#FAA732',

  // 危险
  DangerColor1 = '#DA4F49',

  // 链接
  linkColor1 = '#0088CC',

  // 辅色
  RedColor1 = '#ed5565',
  RedColor2 = '#da4453',
  RedColor3 = '#fc6e51',
  RedColor4 = '#e9573f',
  YellowColor1 = '#ffce54',
  YellowColor2 = '#f6bb42',
  GreenColor1 = '#a0d468',
  GreenColor2 = '#8cc152',
  GreenColor3 = '#48cfad',
  GreenColor4 = '#37bc9b',
  BlueColor1 = '#4fc1e9',
  BlueColor2 = '#3bafda',
  BlueColor3 = '#5d9cec',
  BlueColor4 = '#4a89dc',
  PurpleColor1 = '#ac92ec',
  PurpleColor2 = '#967adc',
  PinkColor1 = '#ec87c0',
  PinkColor2 = '#d770ad',

  // 下划线、描边
  LineColor1 = '#ccc',
  LineColor2 = '#aaa',
  LineColor3 = '#eee',

  // 背景色
  BackgroundColor1 = '#FBFBFB',
  BackgroundColor2 = '#F7F7F7',
  BackgroundColor3 = '#dedede',

  // 文字颜色
  TextColor1 = '#222',
  TextColor2 = '#555',
  TextColor3 = '#888',
  TextColor4 = '#bbb',
  TextColor5 = '#ddd',
  TextColor6 = '#fff',

  //
  LoadingColor1 = '#ccd1d9',
  LoadingColor2 = '#aab2bd',

  // 占位背景色
  placeholderColor1 = '#f3f7fa',
  placeholderColor2 = '#e6e9ed',

  // 半透明背景色
  shadowColor1 = '#00000088',
  shadowColor2 = '#00000088',

  // 透明背景色
  transparent = '#00000000',

  // 禁用
  disableColor1 = '#EFF3F8',
  disableColor2 = '#FCFAF2',

  // 按钮
  buttonColor1 = '',
  buttonColor2 = '',
  buttonColor3 = '',
  buttonColor4 = '',

  // 导航条
  NavigationBarColor1 = '',

  // 标签栏
  TabbarColor1 = '',
}

/**
绿色 / 蓝色
#000000 #003300 #006600 #009900 #00CC00 #00FF00
#000033 #003333 #006633 #009933 #00CC33 #00FF33
#000066 #003366 #006666 #009966 #00CC66 #00FF66
#000099 #003399 #006699 #009999 #00CC99 #00FF99
#0000CC #0033CC #0066CC #0099CC #00CCCC #00FFCC
#0000FF #0033FF #0066FF #0099FF #00CCFF #00FFFF

红色 / 蓝色
#000000	#330000	#660000	#990000	#CC0000	#FF0000
#000033	#330033	#660033	#990033	#CC0033	#FF0033
#000066	#330066	#660066	#990066	#CC0066	#FF0066
#000099	#330099	#660099	#990099	#CC0099	#FF0099
#0000CC	#3300CC	#6600CC	#9900CC	#CC00CC	#FF00CC
#0000FF	#3300FF	#6600FF	#9900FF	#CC00FF	#FF00FF

红色 / 绿色
#000000	#330000	#660000	#990000	#CC0000	#FF0000
#003300	#333300	#663300	#993300	#CC3300	#FF3300
#006600	#336600	#666600	#996600	#CC6600	#FF6600
#009900	#339900	#669900	#999900	#CC9900	#FF9900
#00CC00	#33CC00	#66CC00	#99CC00	#CCCC00	#FFCC00
#00FF00	#33FF00	#66FF00	#99FF00	#CCFF00	#FFFF00

大地色系
#333333	#663333	#993333	#CC3333
#333366	#663366	#993366	#CC3366
#333399	#663399	#993399	#CC3399
#3333CC	#6633CC	#9933CC	#CC33CC
#336633	#666633	#996633	#CC6633
#336666	#666666	#996666	#CC6666
#336699	#666699	#996699	#CC6699
#3366CC	#6666CC	#9966CC	#CC66CC
#339933	#669933	#999933	#CC9933
#339966	#669966	#999966	#CC9966
#339999	#669999	#999999	#CC9999
#3399CC	#6699CC	#9999CC	#CC99CC
#33CC33	#66CC33	#99CC33	#CCCC33
#33CC66	#66CC66	#99CC66	#CCCC66
#33CC99	#66CC99	#99CC99	#CCCC99
#33CCCC	#66CCCC	#99CCCC	#CCCCCC

柔和色
#666666	#996666	#CC6666	#FF6666
#666699	#996699	#CC6699	#FF6699
#6666CC	#9966CC	#CC66CC	#FF66CC
#6666FF	#9966FF	#CC66FF	#FF66FF
#669966	#999966	#CC9966	#FF9966
#669999	#999999	#CC9999	#FF9999
#6699CC	#9999CC	#CC99CC	#FF99CC
#6699FF	#9999FF	#CC99FF	#FF99FF
#66CC66	#99CC66	#CCCC66	#FFCC66
#66CC99	#99CC99	#CCCC99	#FFCC99
#66CCCC	#99CCCC	#CCCCCC	#FFCCCC
#66CCFF	#99CCFF	#CCCCFF	#FFCCFF
#66FF66	#99FF66	#CCFF66	#FFFF66
#66FF99	#99FF99	#CCFF99	#FFFF99
#66FFCC	#99FFCC	#CCFFCC	#FFFFCC
#66FFFF	#99FFFF	#CCFFFF	#FFFFFF

灰色
#000000 #111111
#222222 #333333
#444444 #555555
#666666 #777777
#888888 #999999
#AAAAAA #BBBBBB
#CCCCCC #DDDDDD
#EEEEEE #FFFFFF
 */
