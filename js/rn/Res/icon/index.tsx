
type ImageType = 'png' | 'jpg' | 'gif' | 'svg'

export enum UGImageHost {
  test5 = 'http://test05.6yc.com',
  test10 = 'http://test10.fhptdev.com',
  t132f = 'http://t132f.fhptcdn.com',

  //   https://appstatic.guolongling.com
  // git仓库的图片
  git = 'https://appstatic.guolongling.com',
}

// 替换掉pType中的 {p1}、{p2} 会得到完整路径
function getImage(host: string, pType: string, p1: string, p2?: string, suffix: ImageType = 'png') {
  // 不传host默认使用当前站点的接口域名
  !host?.length && (host = UGImageHost.test10)

  // 替换 pType 中的 {p1}、{p2}
  let path: string
  if (p2?.length) {
    path = pType.replace(/\{p1\}/, p1)
    path = path.replace(/\{p2\}/, p2)
  } else {
    path = pType.replace(/\{p1\}.*/, p1)
  }
  return host + '/' + path + '.' + suffix
}

// 线上服务器的图片
export const getHtml5Image = (id: number, path: string, type: ImageType = 'png') => {
  if (id) {
    return getImage(undefined, 'views/mobileTemplate/{p1}/images/{p2}', id?.toString(), path, type)
  } else {
    return img_images(path, type)
  }
}
export const img_mobileTemplate = (id: number, path: string, type: ImageType = 'png') => getImage(undefined, 'views/mobileTemplate/{p1}/images/{p2}', id?.toString(), path, type)
export const img_home = (path: string, type: ImageType = 'png') => getImage(undefined, 'views/home/images/{p1}', path, undefined, type)
export const img_platform = (siteId: string, path?: string, type: ImageType = 'png') => getImage(undefined, 'platform/{p1}/images/{p2}', siteId, path, type)
export const img_images = (path: string, type: ImageType = 'png') => getImage(undefined, 'images/{p1}', path, undefined, type)
export const img_fullPath = (path: string, type: ImageType = 'png') => getImage(undefined, '{p1}', path, undefined, type)
export const img_vueTemplate = (path: string, type: ImageType = 'png') => getImage(undefined, 'static/vueTemplate/vue/images/{p1}', path, undefined, type)
// git服务器的图片
export const img_assets = (path: string, type: ImageType = 'png') => getImage(UGImageHost.git, 'assets/{p1}', path, undefined, type) 
export const img_root = (path: string, type: ImageType = 'png') => getImage(UGImageHost.git, '{p1}', path, undefined, type)
export const img_doy = (path: string, type: ImageType = 'png') => getImage(UGImageHost.git, 'doy/{p1}', path, undefined, type)

export const useHtml5Image = (host?: UGImageHost) => ({ getHtml5Image, img_mobileTemplate, img_home, img_platform, img_images, img_assets, })

