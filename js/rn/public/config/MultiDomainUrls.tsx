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
    'http://test09.6yc.com',
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
    'http://testadaf.6yc.com',
  ],
  'txtada_b': [
    'http://testadafb.fhptcdn.com',
  ],
  'txtada_c': [
    'http://testadafc.fhptcdn.com',
  ],
  'txt60': [
    'http://test60f.6yc.com',
  ],
  'txt61': [
    'http://test61f.6yc.com',
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
    'http://t126f.6yc.com',
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
    'http://t126f.6yc.com',
  ],
  'tstksm': [
    'http://t133f.6yc.com',
  ],
  'chat': [
    'http://test03.6yc.com',
  ],
  'a002': [
    'https://2031c49.com',
    'https://2030c49.com',
    'https://2029c49.com',
    'https://2028c49.com',
    'https://2027c49.com',
  ],
  'c001': [
    'https://c47c47appapp.com',
  ],
  'c002': [
    'https://66075.vip',
    'https://66477.vip',
    'https://66260.vip',
  ],
  'c005': [
    'http://nxmdbybnbc005ojrz.playzone88.com',
  ],
  'c011': [
    'https://www.hx627.com',
  ],
  'c012': [
    'https://fjc012cpamg12aktk.org',
    'https://0849514.com',
    'https://0849519.com',
    'https://0849518.com',
    'https://0849516.com',
  ],
  'c035': [
    'https://5504578.com',
    'https://5504366.com',
    'https://5504303.com',
    'https://5504288.com',
    'https://5504266.com',
  ],
  'c041': [
    'https://70258.com',
    'https://70258.net',
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
    'https://36c53.com',
    'https://39c53.com',
    'https://57c53.com',
    'https://72c53.com',
    'https://79c53.com',
  ],
  'c073': [
    'https://c732.vip',
  ],
  'c083': [
    'http://t111f.fhptcdn.com',
  ],
  'c084': [
    'https://x2appxz.com',
    'https://ffx2888appxz.com',
    'https://x2cpapp.com',
  ],
  'c085': [
    'https://www.jmhnnn1.cc',
    'https://www.jmsfds2.cc',
    'https://www.jmsddv3.cc',
    'https://www.jmnhhn4.cc',
    'https://www.jmfgvn5.cc',
  ],
  'c085ahy': [
    'https://www.jmhnnn1.cc',
    'https://www.jmsfds2.cc',
    'https://www.jmsddv3.cc',
    'https://www.jmnhhn4.cc',
    'https://www.jmfgvn5.cc',
  ],
  'c085yw': [
    'https://x558.cc',
  ],
  'c091': [
    'https://83f9.com',
  ],
  'c092': [
    'https://2013f-666.com',
    'https://2013e-666.com',
    'https://2013d-666.com',
    'https://2013c-666.com',
    'https://2013b-666.com',
    'https://2013a-666.com',
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
    'https://c43222.com',
    'https://222c43.com',
    'https://c43zr.com',
    'https://c43qp.com',
  ],
  'c115': [
    'https://6615nn.com',
    'https://6615qq.com',
    'https://6615pp.com',
    'https://6615uu.com',
    'https://6615vv.com',
  ],
  'c116': [
    'https://58922e.com',
    'https://58933e.com',
    'https://58922d.com',
    'https://58933c.com',
    'https://58933b.com',
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
    'https://x8988.com',
    'https://x6161.com',
  ],
  'c126': [
    'https://hqcp00001.com',
    'https://hqcp00002.com',
    'https://hqcp00003.com',
    'https://hqcp00004.com',
    'https://hqcp00005.com',
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
    'https://7033633.com',
    'https://7033733.com',
  ],
  'c150': [
    'https://0187655.com',
    'https://0187688.com',
    'https://0187388.com',
    'https://0187611.com',
  ],
  'c151': [
    'https://xpj501501401401.vip',
  ],
  'c158': [
    'https://9055188.com',
    'https://9055233.com',
    'https://9055255.com',
  ],
  'c163': [
    'https://c91c91hh.com',
  ],
  'c165': [
    'https://86886cp.com',
    'https://www.81f9.com',
    'https://www.82f9.com',
    'https://www.f933.cc',
    'https://87886cp.com',
  ],
  'c169': [
    'http://heixxqic169cqhmszw.playzone88.com',
  ],
  'c173': [
    'https://www.dfjt1.com',
  ],
  'c175': [
    'https://7053ccc.cc',
    'https://7053bbb.cc',
    'https://7053eee.vip',
    'https://7053ccc.vip',
  ],
  'c184': [
    'http://00fhcp.cn',
  ],
  'c186': [
    'https://200300e.com',
    'https://200300k.com',
    'https://200300j.com',
    'https://288388d.com',
  ],
  'c190': [
    'https://474745.com',
    'https://243939.com',
    'https://141454.com',
    'https://141464.com',
    'https://489494.com',
  ],
  'c193': [
    'https://4906204.com',
    'https://4906216.com',
    'https://4906217.com',
    'https://4906213.com',
    'https://4906218.com',
  ],
  'c198': [
    'https://2909tycjt.com',
  ],
  'c200': [
    'https://19952027.com',
    'https://19952028.com',
    'https://19952029.com',
    'https://19952030.com',
    'https://19952006.com',
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
    'https://771bb771.com',
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
    'https://00998800b.com',
    'https://0980gg.com',
    'https://098545a.com',
    'https://098hg.net',
    'https://123kkdd.com',
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
    'https://13478107.com',
    'https://13478117.com',
    'https://13478118.com',
    'https://13478119.com',
    'https://13478120.com',
  ],
  'c239b': [
    'https://5566569.com',
  ],
  'c242': [
    'https://398595.com',
    'https://697896.com',
    'https://697956.com',
    'https://238698.com',
    'https://923455.com',
  ],
  'c243': [
    'https://55979711.vip',
    'https://55979722.vip',
    'https://55979733.vip',
    'https://55979744.vip',
    'https://55979755.vip',
  ],
  'c245': [
    'https://4823kcmanucxeanm.com',
    'https://4823btuenaldfpvm.com',
  ],
  'c246': [
    'https://847758.com',
  ],
  'c251': [
    'https://2420app.app',
  ],
  'c252': [
    'https://344app3.com',
    'https://3444app.com',
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
    'https://l816.com',
    'https://wf7.co',
    'https://667568.com'
  ],
  'c261': [
    'https://yl29001.com',
    'https://yl29002.com',
    'https://yl29003.com',
    'https://yl29005.com',
    'https://yl29006.com',
  ],
  'l001': [
    'https://4988wap.com',
  ],
  'l001gbhy': [
    'https://demo.gbbet.com',
  ],
  'l002': [
    'https://70333b.org',
    'https://70333k.org',
    'https://70333c.org',
    'https://70333m.org',
    'https://70333n.org',
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
