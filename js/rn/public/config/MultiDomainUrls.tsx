import {Platform} from "react-native";
import {ANHelper} from "../define/ANHelper/ANHelper";
import {CMD} from "../define/ANHelper/hp/CmdDefine";
import { OCHelper } from "../define/OCHelper/OCHelper";
import {string} from "prop-types";
import {ugLog} from "../tools/UgLog";

/**
 * 所有站点的域名，key 不能随便动，否则原生那边会找不到对应的域名
 *
 * 每个站点有多条域名，根据网速过滤出速度最快的给用户使用
 *
 */

const MultiDomainUrls: {[x:string]: Array<string>} = {
  'zora': [
    'http://zhibot071f.fhptcdn.com',
    'http://zhibot071f.fhptcdn.com',
  ],
  'txt005': [
    'http://t005f.fhptcdn.com',
    'http://t005f.fhptcdn.com',
  ],
  'cloud': [
    'http://t005f.fhptcdn.com',
    'http://t005f.fhptcdn.com',
  ],
  'tx07': [
    'http://test07.6yc.com',
    'http://test07.6yc.com',
  ],
  'tx08': [
    'http://test08.6yc.com',
    'http://test08.6yc.com',
  ],
  'tx10': [
    'https://test10.6yc.com',
    'https://test10.6yc.com',
  ],
  'tx11': [
    'http://test11.6yc.com',
    'http://test11.6yc.com',
  ],
  'tx12': [
    'http://test12.6yc.com',
    'http://test12.6yc.com',
  ],
  'tx19': [
    'http://test19.6yc.com',
    'http://test19.6yc.com',
  ],
  'txt20': [
    'http://test20.6yc.com',
    'http://test20.6yc.com',
  ],
  'txt29': [
    'http://test29f.fhptcdn.com',
    'http://test29f.fhptcdn.com',
  ],
  'txt29c': [
    'http://t029cz.fhptcdn.com',
    'http://t029cz.fhptcdn.com',
  ],
  'txt30': [
    'http://test30f.fhptcdn.com',
    'http://test30f.fhptcdn.com',
  ],
  'tx58a': [
    'http://test58f.ccpt.site',
    'http://test58f.ccpt.site',
  ],
  'tx58e': [
    'http://test5804.ccpt.site',
    'http://test5804.ccpt.site',
  ],
  'txtada': [
    'http://testadaf.fhptcdn.com',
    'http://testadaf.fhptcdn.com',
  ],
  'txt60': [
    'http://test60f.fhptcdn.com',
    'http://test60f.fhptcdn.com',
  ],
  'txt61': [
    'http://test61f.fhptcdn.com',
    'http://test61f.fhptcdn.com',
  ],
  'txt61b': [
    'http://test61a.fhptcdn.com',
    'http://test61a.fhptcdn.com',
  ],
  'txt61c': [
    'http://test61c.fhptcdn.com',
    'http://test61c.fhptcdn.com',
  ],
  'txt61d': [
    'http://test61d.fhptcdn.com',
    'http://test61d.fhptcdn.com',
  ],
  'txt61e': [
    'http://test61e.fhptcdn.com',
    'http://test61e.fhptcdn.com',
  ],
  'tx62': [
    'http://test62f.ccpt.site',
    'http://test62f.ccpt.site',
  ],
  'txt07': [
    'http://test07.6yc.com',
    'http://test07.6yc.com',
  ],
  'txt126': [
    'http://t126f.fhptcdn.com',
    'http://t126f.fhptcdn.com',
  ],
  'txt127f': [
    'http://t127f.fhptcdn.com',
    'http://t127f.fhptcdn.com',
  ],
  'txt128': [
    'http://t128f.fhptcdn.com',
    'http://t128f.fhptcdn.com',
  ],
  'txt131': [
    'http://test131.fhptcdn.com',
    'http://test131.fhptcdn.com',
  ],
  'txt500': [
    'http://t500f.fhptcdn.com',
    'http://t500f.fhptcdn.com',
  ],
  'txt501': [
    'http://t501f.fhptcdn.com',
    'http://t501f.fhptcdn.com',
  ],
  'txt502': [
    'http://t502f.fhptcdn.com',
    'http://t502f.fhptcdn.com',
  ],
  'txtTest': [
    'http://t005f.fhptcdn.com',
    'http://t005f.fhptcdn.com',
  ],
  'tstksm': [
    'http://t133f.fhptcdn.com',
    'http://t133f.fhptcdn.com',
  ],
  'chat': [
    'http://test03.6yc.com',
    'http://test03.6yc.com',
  ],
  'a002': [
    'https://5049uuu.com',
    'https://5049uuu.com',
  ],
  'c001': [
    'https://c47app1.com',
    'https://c47app1.com',
  ],
  'c002': [
    'https://154977.com',
    'https://154977.com',
  ],
  'c005': [
    'http://nxmdbybnbc005ojrz.playzone88.com',
    'http://nxmdbybnbc005ojrz.playzone88.com',
  ],
  'c006': [
    'http://370311.com',
    'http://370311.com',
  ],
  'c011': [
    'https://www.hx627.com',
    'https://www.hx627.com',
  ],
  'c012': [
    'https://0849513.com',
    'https://0849513.com',
  ],
  'c018': [
    'https://204421.com',
    'https://204421.com',
  ],
  'c035': [
    'https://5504707.com',
    'https://5504707.com',
  ],
  'c048': [
    'https://dsjf43-43-f14-345-36-g54t-gfh54.com',
    'https://dsjf43-43-f14-345-36-g54t-gfh54.com',
  ],
  'c052': [
    'https://4924920.com',
    'https://4924920.com',
  ],
  'c053': [
    'https://988c53.com',
    'https://988c53.com',
  ],
  'c073': [
    'https://c732.vip',
    'https://c732.vip',
  ],
  'c083': [
    'http://t111f.fhptcdn.com',
    'http://t111f.fhptcdn.com',
  ],
  'c084': [
    'https://papghawshugposwaughwsoohu.com',
    'https://papghawshugposwaughwsoohu.com',
  ],
  'c085': [
    'https://xn--7-206cp03b.com',
    'https://xn--7-206cp03b.com',
  ],
  'c085yw': [
    'https://x558.cc',
    'https://x558.cc',
  ],
  'c091': [
    'https://83f9.com',
    'https://83f9.com',
  ],
  'c092': [
    'https://2013tfc-555.com',
    'https://2013tfc-555.com',
  ],
  'c105_b': [
    'https://390qp8.com',
    'https://390qp8.com',
  ],
  'c108': [
    'https://823653.com',
    'https://823653.com',
  ],
  'c114': [
    'https://c432019.com',
    'https://c432019.com',
  ],
  'c116': [
    'https://13532033.com',
    'https://13532033.com',
  ],
  'c117': [
    'https://822323.com',
    'https://822323.com',
  ],
  'c120': [
    'https://asafew435yrtgre.net',
    'https://asafew435yrtgre.net',
  ],
  'c126': [
    'https://jzcp44.com',
    'https://jzcp44.com',
  ],
  'c126b': [
    'https://og878.vip',
    'https://og878.vip',
  ],
  'c134': [
    'https://19972029.com',
    'https://19972029.com',
  ],
  'c137': [
    'https://7033005.com',
    'https://7033005.com',
  ],
  'c141': [
    'http://nhyiec141kcwvvq.phlotgame.com',
    'http://nhyiec141kcwvvq.phlotgame.com',
  ],
  'c150': [
    'https://0187488.com',
    'https://0187488.com',
  ],
  'c151': [
    'https://xpj501501401401.vip',
    'https://xpj501501401401.vip',
  ],
  'c153': [
    'https://9ybhq.com',
    'https://9ybhq.com',
  ],
  'c153b': [
    'https://by3680.com',
    'https://by3680.com',
  ],
  'c158': [
    'https://9055188.com',
    'https://9055188.com',
  ],
  'c163': [
    'https://c91398.com',
    'https://c91398.com',
  ],
  'c165': [
    'https://1875006.com',
    'https://1875006.com',
  ],
  'c169': [
    'http://heixxqic169cqhmszw.playzone88.com',
    'http://heixxqic169cqhmszw.playzone88.com',
  ],
  'c173': [
    'https://www.dfjt1.com',
    'https://www.dfjt1.com',
  ],
  'c175': [
    'http://7053fndsjfkn.com',
    'http://7053fndsjfkn.com',
  ],
  'c184': [
    'http://00fhcp.cn',
    'http://00fhcp.cn',
  ],
  'c186': [
    'https://200300g.com',
    'https://200300g.com',
  ],
  'c190': [
    'https://www677272.com',
    'https://www677272.com',
  ],
  'c193': [
    'https://4906app.com',
    'https://4906app.com',
  ],
  'c198': [
    'https://2909tycjt.com',
    'https://2909tycjt.com',
  ],
  'c200': [
    'https://20181995.com',
    'https://20181995.com',
  ],
  'c201': [
    'https://dkcp520.com',
    'https://dkcp520.com',
  ],
  'c203': [
    'https://xpjcpapp.com',
    'https://xpjcpapp.com',
  ],
  'c205': [
    'http://494.best',
    'http://494.best',
  ],
  'c206': [
    'http://rdiuyotdhjo533fsddylvgi.com',
    'http://rdiuyotdhjo533fsddylvgi.com',
  ],
  'c208': [
    'https://771aa771.com',
    'https://771aa771.com',
  ],
  'c211': [
    'https://310310app.com',
    'https://310310app.com',
  ],
  'c212': [
    'https://00852030.com',
    'https://00852030.com',
  ],
  'c213': [
    'https://4501071.com',
    'https://4501071.com',
  ],
  'c217': [
    'https://9999app-sa5g6erty9r8ujtk5oi9rtg2k6e55uer9999-app.com',
    'https://9999app-sa5g6erty9r8ujtk5oi9rtg2k6e55uer9999-app.com',
  ],
  'c228': [
    'https://app77787.co',
    'https://app77787.co',
  ],
  'c225': [
    'https://8393483.com',
    'https://8393483.com',
  ],
  'c235': [
    'https://www.hilliot.com',
    'https://www.hilliot.com',
  ],
  'c237': [
    'http://app13478.com',
    'http://app13478.com',
  ],
  'c239b': [
    'https://5566569.com',
    'https://5566569.com',
  ],
  'c242': [
    'https://239269.com',
    'https://239269.com',
  ],
  'c245': [
    'https://4823app.com',
    'https://4823app.com',
  ],
  'c246': [
    'https://547758.com',
    'https://547758.com',
  ],
  'c251': [
    'https://2420app.app',
    'https://2420app.app',
  ],
  'L001': [
    'https://4988wap.com',
    'https://4988wap.com',
  ],
  'L001gbhy': [
    'https://demo.gbbet.com',
    'https://demo.gbbet.com',
  ],
  'L002': [
    'https://70333h.com',
    'https://70333h.com',
  ],
  'h003b': [
    'https://betv5.com',
    'https://betv5.com',
  ],
  'h005': [
    'https://534023.com',
    'https://534023.com',
  ],
  'UGCC': [
    'http://test20.6yc.com',
    'http://test20.6yc.com',
  ],
  'UG29b': [
    'http://test29f.fhptcdn.com',
    'http://test29f.fhptcdn.com',
  ],

}

//筛选过后的域名对象
let DomainUrls: {[x:string]:string} = {}

/**
 * 把速度最快的域名替换进来使用
 * @param siteUrl 速度最快的域名
 */
const refreshDomain = (siteUrl: {}) => {
  //默认使用第1条
  let filterDomain = {}
  for (let key in MultiDomainUrls) {
    filterDomain[key] = MultiDomainUrls[key][0]
  }

  ugLog('filterDomain=', JSON.stringify(filterDomain))

  //重新组装成新域名对象
  DomainUrls = {
    ...filterDomain,
    ...siteUrl,
  }

  ugLog('DomainUrls=', JSON.stringify(DomainUrls))
}

/**
 * 初始化域名
 */
const initDomain = async (siteId?: string) => {
  //默认使用第1条域名初始化
  refreshDomain({})

  switch (Platform.OS) {
    case 'ios':
      const host = DomainUrls[siteId];
      host.length && OCHelper.call('AppDefine.shared.setHost:', [host]);
      break;
    case 'android':
      await ANHelper.callAsync(CMD.INIT_DOMAIN, DomainUrls);
      break;
  }
}

export {DomainUrls, MultiDomainUrls, initDomain};
