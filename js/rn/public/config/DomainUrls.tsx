import { Platform } from 'react-native'
import { ANHelper } from '../define/ANHelper/ANHelper'
import { CMD } from '../define/ANHelper/hp/CmdDefine'
import { OCHelper } from '../define/OCHelper/OCHelper'

/**
 * 所有站点的域名，key 不能随便动，否则原生那边会找不到对应的域名
 */
const DomainUrls: { [x: string]: string } = {
  zora: 'http://zhibot071f.fhptcdn.com',
  txt005: 'http://t005f.fhptcdn.com',
  cloud: 'http://t005f.fhptcdn.com',
  tx07: 'http://test07.6yc.com',
  tx08: 'http://test08.6yc.com',
  tx10: 'https://test10.6yc.com',
  tx11: 'http://test11.6yc.com',
  tx12: 'http://test12.6yc.com',
  tx19: 'http://test19.6yc.com',
  txt20: 'http://test20.6yc.com',
  txt29: 'http://test29f.fhptcdn.com',
  txt29c: 'http://t029cz.fhptcdn.com',
  txt30: 'http://test30f.fhptcdn.com',
  txt32: 'http://t005f.fhptcdn.com',
  tx58a: 'http://test58f.ccpt.site',
  tx58e: 'http://test5804.ccpt.site',
  txtada: 'http://testadaf.fhptcdn.com',
  txt60: 'http://test60f.fhptcdn.com',
  txt61: 'http://test61f.fhptcdn.com',
  txt61b: 'http://test61a.fhptcdn.com',
  txt61c: 'http://test61c.fhptcdn.com',
  txt61d: 'http://test61d.fhptcdn.com',
  txt61e: 'http://test61e.fhptcdn.com',
  tx62: 'http://test62f.ccpt.site',
  txt07: 'http://test07.6yc.com',
  txt126: 'http://t126f.fhptcdn.com',
  txt128: 'http://t128f.fhptcdn.com',
  txt131: 'http://test131.fhptcdn.com',
  txt500: 'http://t500f.fhptcdn.com',
  txt501: 'http://t501f.fhptcdn.com',
  txt502: 'http://t502f.fhptcdn.com',
  txtTest: 'http://t005f.fhptcdn.com',
  tstksm: 'http://t133f.fhptcdn.com',
  chat: 'http://test03.6yc.com',
  a002: 'https://5049uuu.com',
  c001: 'https://c47app1.com',
  c002: 'https://154977.com',
  c005: 'http://nxmdbybnbc005ojrz.playzone88.com',
  c006: 'http://370311.com',
  c011: 'https://www.hx627.com',
  c012: 'https://fjc012cpamg12aktk.org',
  c018: 'https://204421.com',
  c035: 'https://5504707.com',
  c048: 'https://dsjf43-43-f14-345-36-g54t-gfh54.com',
  c052: 'https://4924920.com',
  c053: 'https://988c53.com',
  c073: 'https://c732.vip',
  c083: 'http://t111f.fhptcdn.com',
  c084: 'https://papghawshugposwaughwsoohu.com',
  c085: 'https://xn--7-206cp03b.com',
  c085yw: 'https://x558.cc',
  c091: 'https://83f9.com',
  c092: 'https://2013tfc-555.com',
  c105_b: 'https://390qp8.com',
  c108: 'https://823653.com',
  c114: 'https://c432019.com',
  c116: 'https://1353520.com',
  c120: 'https://asafew435yrtgre.net',
  c126: 'https://jzcp44.com',
  c126b: 'https://og878.vip',
  c134: 'https://19972028.com',
  c137: 'https://7033005.com',
  c141: 'http://nhyiec141kcwvvq.phlotgame.com',
  c150: 'https://0187488.com',
  c151: 'https://xpj501501401401.vip',
  c153: 'https://9ybhq.com',
  c153b: 'https://by3680.com',
  c158: 'https://9055188.com',
  c163: 'https://c91398.com',
  c165: 'http://1875007.com',
  c169: 'http://heixxqic169cqhmszw.playzone88.com',
  c173: 'https://www.dfjt1.com',
  c175: 'http://7053fndsjfkn.com',
  c184: 'http://00fhcp.cn',
  c186: 'https://288388g.com',
  c190: 'https://549595.com',
  c193: 'https://app4906.com',
  c198: 'https://2909tycjt.com',
  c200: 'https://20181995.com',
  c201: 'https://dkcp520.com',
  c203: 'https://xpjcpapp.com',
  c205: 'https://49488888.com',
  c206: 'http://rdiuyotdhjo533fsddylvgi.com',
  c208: 'https://771771b.com',
  c211: 'https://310310app.com',
  c212: 'https://00852030.com',
  c213: 'https://fjc023cpamg023aktk.org',
  c217: 'https://9999app-sa5g6erty9r8ujtk5oi9rtg2k6e55uer9999-app.com',
  c228: 'https://app77787.co',
  c225: 'https://8393483.com',
  c235: 'https://www.hilliot.com',
  c237: 'http://app13478.com',
  c239b: 'https://5566569.com',
  c242: 'https://923368.com',
  c245: 'https://4823app.com',
  c246: 'https://547758.com',
  c251: 'https://2420app.app',
  L001: 'https://4988wap.com',
  L001gbhy: 'https://demo.gbbet.com',
  L002: 'https://7033303.com',
  h003b: 'https://betv5.com',
  h005: 'https://534023.com',
  UGCC: 'http://test20.6yc.com',
  UG29b: 'http://test29f.fhptcdn.com',
  t127f: 'http://t127f.fhptcdn.com',
}

/**
 * 初始化域名
 */
const initDomain = async (siteId?: string) => {
  switch (Platform.OS) {
    case 'ios':
      const sites = {}
      for (const k in DomainUrls) {
        sites[k.toLowerCase()] = DomainUrls[k]
      }
      const host = sites[siteId.toLowerCase()]
      host.length && OCHelper.call('AppDefine.shared.setHost:', [host])
      break
    case 'android':
      await ANHelper.callAsync(CMD.INIT_DOMAIN, DomainUrls)
      break
  }
}

// export default DomainUrls;
// export {DomainUrls, initDomain};
