// 调试环境配置
export const devConfig = {
  isDebug: __DEV__, // 是否本地环境
  isTest: () => {
    return true
  }, // 是否是测试环境

  skinKey: '威尼斯', // 宝石红 白曜 威尼斯 六合厅 凯时 利来 金星黑 乐橙 经典
}

// 线上环境配置（这几个站点写死经典模板）
export const releaseConfig = {
  skinKeys: {
    c242: '经典1',
    c235: '经典1',
    h003b: '经典1',
  },
}
