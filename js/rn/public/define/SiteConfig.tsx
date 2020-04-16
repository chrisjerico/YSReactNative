/**
 * 站点配置
 */
export const SiteConfig = {
  c199: {
    name: 'c199',
    domain: 'www.baidu.com',
  },
  c208: {
    name: 'c208',
    domain: 'www.baidu.com',
  },
};

/**
 * 附站点配置
 */
export const StationConfig = {
  a: {
    name: 'a',
    domain: 'www.baidu.com',
  },
  b: {
    name: 'b',
    domain: 'www.baidu.com',
  },
};

export class SiteModel {
  siteId: string; // 站点id
  type: string; // 打包类型
  appName: string; // app名
  appId: string; // bundleId
  host: string; // 接口域名
  uploadId: string; // 上传ID
  uploadNum: string; // 上传编号
}
