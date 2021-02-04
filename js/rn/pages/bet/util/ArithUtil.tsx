/**
 * 得到组合数量
 * @param arr 数组
 * @param len 组合长度
 */
const combination = (arr?: Array<any>, len?: number) => {
  let resultArr = []
  if (len <= 0 || len > arr.length) {
    return resultArr
  }
  for (let i = 0; i < arr.length; i++) {
    let tempArr = []
    tempArr.push(arr[i])
    if (len === 1) {
      resultArr.push(tempArr)
    } else {
      let x = arr.slice(i + 1)
      let newArr = combination(x, len - 1)
      for (let j = 0; j < newArr.length; j++) {
        resultArr.push(tempArr.concat(newArr[j]))
      }
    }
  }
  return resultArr
}

export {combination}
