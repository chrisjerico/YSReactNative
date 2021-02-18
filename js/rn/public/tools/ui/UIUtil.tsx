/**
 * 清除多余的HTML标签
 * @param text
 */
const clearExHtml = (text?: string): string => {
  return text?.replace(/font/g, 'span').replace(/color="#/g, 'style=\"color:#')
}

/**
 * 清除所有的HTML标签
 * @param text
 */
const clearAllHtml = (text?: string): string => {
  return text?.replace(/<[^>]+>/g, '')
}

export {
  clearExHtml,
  clearAllHtml,
}
