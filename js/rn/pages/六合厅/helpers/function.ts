import AppDefine from '../../../public/define/AppDefine'

// functions
export const scale = (layout: number): number =>
  layout * (AppDefine.width / 540)

export const three = (data: any[], fillEle = { show: false }) => {
  const remainder = data.length % 3
  const patch = remainder > 0 ? 3 - (data.length % 3) : 0
  return data
    .concat(Array(patch).fill(fillEle))
    .map((ele, index) => Object.assign({}, { key: index }, ele))
}
