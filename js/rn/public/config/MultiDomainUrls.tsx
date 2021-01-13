import {Platform} from "react-native";
import {ANHelper} from "../define/ANHelper/ANHelper";
import {CMD} from "../define/ANHelper/hp/CmdDefine";
import {OCHelper} from "../define/OCHelper/OCHelper";
import {string} from "prop-types";
import {ugLog} from "../tools/UgLog";
import { anyEmpty } from '../tools/Ext'

/**
 * 所有站点的域名，key 不能随便动，否则原生那边会找不到对应的域名
 *
 * 每个站点有多条域名，根据网速过滤出速度最快的给用户使用
 *
 */

const MultiDomainUrls: { [x: string]: Array<string> } = {
  'zora': [
    'http://zhibot071f.fhptcdn.com',
  ],
  'txt005': [
    'http://t005f.fhptcdn.com',
  ],
  'txt005c': [
    'http://t501f.fhptcdn.com',
  ],
  'tx07': [
    'http://test07.6yc.com',
  ],
  'tx08': [
    'http://test08.6yc.com',
  ],
  'tx09': [
    'http://test09.6yc.com/',
  ],
  'tx10': [
    'https://test10.6yc.com',
  ],
  'tx11': [
    'http://test11.6yc.com',
  ],
  'tx12': [
    'http://test12.6yc.com',
  ],
  'tx19': [
    'http://test19.6yc.com',
  ],
  'txt20': [
    'http://test20.6yc.com',
  ],
  'txt29': [
    'http://test29f.fhptcdn.com',
  ],
  'txt29c': [
    'http://t029cz.fhptcdn.com',
  ],
  'txt30': [
    'http://test30f.fhptcdn.com',
  ],
  'txt32': [
    'http://t005f.fhptcdn.com',
  ],
  'tx58a': [
    'http://test58f.ccpt.site',
  ],
  'tx58e': [
    'http://test5804.ccpt.site',
  ],
  'txtada': [
    'http://testadaf.fhptcdn.com',
  ],
  'txt60': [
    'http://test60f.fhptcdn.com',
  ],
  'txt61': [
    'http://test61f.fhptcdn.com',
  ],
  'txt61b': [
    'http://test61a.fhptcdn.com',
  ],
  'txt61c': [
    'http://test61c.fhptcdn.com',
  ],
  'txt61d': [
    'http://test61d.fhptcdn.com',
  ],
  'txt61e': [
    'http://test61e.fhptcdn.com',
  ],
  'tx62': [
    'http://test62f.ccpt.site',
  ],
  'txt07': [
    'http://test07.6yc.com',
  ],
  'txt126': [
    'http://t126f.fhptcdn.com',
  ],
  'txt127': [
    'http://t127f.fhptcdn.com',
  ],
  'txt128': [
    'http://t128f.fhptcdn.com',
  ],
  'txt131': [
    'http://test131.fhptcdn.com',
  ],
  'txt500': [
    'http://t500f.fhptcdn.com',
  ],
  'txt501': [
    'http://t501f.fhptcdn.com',
  ],
  'txt502': [
    'http://t502f.fhptcdn.com',
  ],
  'txtTest': [
    'http://t126f.fhptcdn.com',
  ],
  'tstksm': [
    'http://t133f.fhptcdn.com',
  ],
  'chat': [
    'http://test03.6yc.com',
  ],
  'a002': [
    'https://2021c49.com',
    'https://c49ln.com',
    'https://c49nx.com',
    'https://2022c49.com',
    'https://2020c49.com',
  ],
  'c001': [
    'https://c47c47appapp.com',
  ],
  'c002': [
    'https://66075.vip',
  ],
  'c005': [
    'http://nxmdbybnbc005ojrz.playzone88.com',
  ],
  'c011': [
    'https://www.hx627.com',
  ],
  'c012': [
    'https://fjc012cpamg12aktk.org',
    'https://0849520.com',
    'https://0849519.com',
    'https://0849518.com',
    'https://0849516.com',
  ],
  'c035': [
    'https://5504578.com',
  ],
  'c041': [
    'https://70258.com',
  ],
  'c048': [
    'https://f28z.com',
    'https://f28e.com',
    'https://f28o.com',
  ],
  'c052': [
    'https://4924920.com',
  ],
  'c053': [
    'https://988c53.com',
  ],
  'c073': [
    'https://c732.vip',
  ],
  'c083': [
    'http://t111f.fhptcdn.com',
  ],
  'c084': [
    'https://papghawshugposwaughwsoohu.com',
  ],
  'c085': [
    'https://www.ya1237888.cc',
    'https://www.ya2238888.cc',
    'https://www.ya3388888.cc',
    'https://www.ya442778111.cc',
    'https://www.ya557887.cc',
  ],
  'c085yw': [
    'https://x558.cc',
  ],
  'c091': [
    'https://83f9.com',
  ],
  'c092': [
    'https://2013qaz-555.com',
    'https://2013wsx-555.com',
    'https://2013yhn-555.com',
    'https://2013jkl-555.com',
    'https://2013egm-555.com',
  ],
  'c105b': [
    'https://390qp8.com',
  ],
  'c108': [
    'https://823653.com',
    'https://568173.com',
    'https://982112.com',
    'https://6603-app.com',
    'https://6603app.com',
    'https://69989app.com',
  ],
  'c114': [
    'https://c432019.com',
  ],
  'c115': [
    'https://6615nn.com',
    'https://6615qq.com',
    'https://6615pp.com',
    'https://6615uu.com',
    'https://6615vv.com',
  ],
  'c116': [
    'https://csj116app.com',
    'https://csj116app.co',
    'https://c116app.cc',
    'https://csj116app.cc',
    'https://app116csj.me',
  ],
  'c117': [
    'https://646482.com',
    'https://646481.com',
    'https://404061.com',
    'https://404069.com',
    'https://404079.com',
  ],
  'c120': [
    'https://asafew435yrtgre.net',
  ],
  'c126': [
    'https://jz0222.com',
    'https://jz0444.com',
    'https://jz1444.com',
    'https://jz2444.com',
    'https://jz2111.com',
  ],
  'c126b': [
    'https://bc44698.com',
    'https://b66224.com',
    'https://b62244.com',
    'https://b62224.com',
    'https://781789.com',
  ],
  'c134': [
    'https://20251997.com',
    'https://20261997.com',
    'https://20271997.com',
    'https://20141997.com',
    'https://20041997.com',
  ],
  'c137': [
    'https://7033005.com',
  ],
  'c150': [
    'https://0187488.com',
  ],
  'c151': [
    'https://xpj501501401401.vip',
  ],
  'c158': [
    'https://9055188.com',
  ],
  'c163': [
    'https://c91c91hh.com',
  ],
  'c165': [
    'https://1875883.com',
    'https://1875885.com',
    'https://1875886.com',
    'https://1875887.com',
    'https://1875005.com',
  ],
  'c169': [
    'http://heixxqic169cqhmszw.playzone88.com',
  ],
  'c173': [
    'https://www.dfjt1.com',
  ],
  'c175': [
    'https://7053bbb.com',
    'https://7053fff.vip',
    'https://7053eee.vip',
    'https://7053ccc.vip',
  ],
  'c184': [
    'http://00fhcp.cn',
  ],
  'c186': [
    'https://200300c.com',
    'https://200300d.com',
    'https://200300e.com',
    'https://288388e.com',
    'https://288388i.com',
  ],
  'c190': [
    'https://549595.com',
  ],
  'c193': [
    'https://4906211.com',
    'https://4906212.com',
    'https://49060333.com',
    'https://49060222.com',
    'https://49061111.com',
  ],
  'c198': [
    'https://2909tycjt.com',
  ],
  'c200': [
    'https://19952022.com',
    'https://19952023.com',
    'https://19952024.com',
    'https://19952025.com',
    'https://19952026.com',
  ],
  'c203': [
    'https://xpjcpapp.com',
  ],
  'c205': [
    'https://494app.club',
    'https://494app.xyz',
    'https://494app.live',
    'https://494app.me',
    'https://494app.co',
  ],
  'c206': [
    'http://rdiuyotdhjo533fsddylvgi.com',
  ],
  'c208': [
    'https://771771z.com',
    'https://771771s.com',
    'https://771771i.com',
    'https://771771j.com',
    'https://771771k.com',
  ],
  'c211': [
    'https://4dr4p8dm4.net',
  ],
  'c212': [
    'https://00852030.com',
  ],
  'c213': [
    'https://app-450-xpj.cc',
    'https://app-450-xpj.co',
    'https://app-450-xpj.com',
  ],
  'c217': [
    'https://9999app-sa5g6erty9r8ujtk5oi9rtg2k6e55uer9999-app.com',
  ],
  'c228': [
    'https://app77787.co',
  ],
  'c225': [
    'https://8393483.com',
  ],
  'c230': [
    'https://www.jdapp588.com',
  ],
  'c235': [
    'https://www.hilliot.com',
  ],
  'c237': [
    'https://13478116.com',
    'https://13478117.com',
    'https://13478118.com',
    'https://13478119.com',
    'https://13478120.com',
  ],
  'c239b': [
    'https://5566569.com',
  ],
  'c242': [
    'https://499918.com',
    'https://894556.com',
    'https://067055.com',
    'https://065155.com',
    'https://012633.com',
  ],
  'c245': [
    'https://4823app.com',
  ],
  'c246': [
    'https://847758.com',
  ],
  'c251': [
    'https://2420app.app',
  ],
  'c252': [
    'https://xg344app.com',
    'https://xggjapp7.com',
    'https://xggjapp9.com',
  ],
  'c254': [
    'https://677888c.com',
    'https://677888b.com',
    'https://677888a.com',
    'https://16689g.com',
    'https://16689f.com',
  ],
  'c257': [
    'https://hg88991.com',
  ],
  'c259': [
    'https://660598.com',
    'https://738868.com',
    'https://667568.com'
  ],
  'l001': [
    'https://4988wap.com',
  ],
  'l001gbhy': [
    'https://demo.gbbet.com',
  ],
  'l002': [
    'https://70333p.org',
    'https://70333o.org',
    'https://70333i.org',
    'https://70333u.org',
    'https://70333y.org',
  ],
  'h003b': [
    'https://betv5.com',
  ],
  'h005': [
    'https://534023.com',
  ],
  'UGCC': [
    'http://test20.6yc.com',
  ],
  'UG29b': [
    'http://test29f.fhptcdn.com',
  ],
  't127f': [
    'http://t127f.fhptcdn.com',
  ],

}

//筛选过后的域名对象
let DomainUrls: { [x: string]: string } = {}

/**
 * 把速度最快的域名替换进来使用
 * @param siteUrl 速度最快的域名
 */
const recombineDomain = (siteUrl: {}) => {
  //ugLog('filterDomain siteUrl=', JSON.stringify(siteUrl))

  //默认使用第1条
  let filterDomain = {}
  for (let key in MultiDomainUrls) {
    filterDomain[key] = MultiDomainUrls[key][0]
  }

  //ugLog('filterDomain=', JSON.stringify(filterDomain))

  //重新组装成新域名对象
  DomainUrls = {
    ...filterDomain,
    ...siteUrl,
  }

  //ugLog('DomainUrls=', JSON.stringify(DomainUrls))
}

/**
 * 通知原生域名有变化
 */
const notifyDomainChanged = async (siteId?: string) => {
  //ugLog('DomainUrls 2 =', JSON.stringify(DomainUrls))

  // 不区分大小写
  const sites = {}
  for (const k in DomainUrls) {
    sites[k.toLowerCase()] = DomainUrls[k]
  }
  const host = anyEmpty(siteId) ? null : sites[siteId.toLowerCase()]?.trim()
  host?.length && ANHelper.refreshHost(host)

  switch (Platform.OS) {
    case 'ios':
      host?.length && OCHelper.call('AppDefine.shared.setHost:', [host])
      break
    case 'android':
      await ANHelper.callAsync(CMD.INIT_DOMAIN, DomainUrls);
      await ANHelper.callAsync(CMD.INIT_WHOLE_DOMAIN, MultiDomainUrls);
      break;
  }
}

/**
 * 初始化域名
 */
const initDomain = async (siteId?: string) => {
  //默认使用第1条域名初始化
  recombineDomain({})
  await notifyDomainChanged(siteId)
}

export {
  DomainUrls,
  MultiDomainUrls,
  recombineDomain,
  notifyDomainChanged,
  initDomain
};
