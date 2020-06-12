import { UGUserCenterType } from "../../../redux/model/全局/UGSysConfModel";
// configs
export const placeholderLogo = 'https://s28943.pcdn.co/wp-content/uploads/2019/09/placeholder.jpg';
export const defaultNoticeLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAARVBMVEVMaXFChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfRChfSGTGvrAAAAFnRSTlMAEDbwUPirgOFBB5wft3VjksWG0S7US4iuhQAAAJlJREFUeNp90u0KhCAQheHJ0jRL+9pz/5e6e2oTJ6L3j/AIgo6iyj5xCe2keAZ6soWvdHCgk1tT8YTTJ8XNAmyHB2cOGNn+syiefrbiapXa7cVJlANzYLvcvZPSqwfnXHpw3sM+uIkx5pfzY8fCzW25lvZUNqJyGRo2LoAbiutn9qCnzch9LPQP379uVvOq6unnhqjCkv//4QupOg1ell2GMwAAAABJRU5ErkJggg==';
export const defaultMarkSixLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAbCAMAAABY1h8eAAAAbFBMVEVMaXFGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudGoudcvopmAAAAI3RSTlMAYLD3E3R4oAdP7/rnzZcwAcXR4A3sgGZTo6puSJD9QCSIHn9D/jAAAAD3SURBVHjafdLbjoMgFIXhpSjisVptPVftev93HGeLRjNxvtsfNiGAnQmzNCJVmoUGV5V+8fDSFU6GhBfJgIMv64M+XPmtzPBhaZJxb2CZPiapIRquWpy0XDVYeTImwEkgx3gARm5x9r4PMW+RGeCpLZooKyiU2aLyUJP8O1bU6GzM/aF5Cz+30UVpo2nrxRWtsfGJz/3YGNx3Fu+geP4q9p1EvJ/ZPCZHNPmxs7wfW6K7j93/96zUXVQeMN7F8foq386dr6+CwcZqUWS8VDaGEFru6SQUiSP31LD8D4uUh7Tgp8dhKnlRTjgxOuEh0QbW9cdH5x//A0zZMlamkxzIAAAAAElFTkSuQmCC';
export const defaultCustomerServiceLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAV1BMVEVMaXGZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkx6eApAAAAHHRSTlMAEfVYxtxIhjLtdOmb/NI8qAkobmWUu+WyIXsZiTPmvwAAAZ5JREFUeNrFlNuS6iAQRTvc0UBIzE3d//+dxxGhiIaM83TWS2K5qtNsGuidYWxnebZStBdDh/SjQIE/NXX3sgBYgh6V4rcgATBdUQcBuFZRxkwWkGrP5QCmO21oNIDbTguA7PY/N9EbIzD3tEf7YSsgUAUNXDaROQiq0gJl5CtYT3U8ZJERoOiAa9mIwEyHaLAcD1xPxyzgsQezwl9z3C3PCU15O+4B3pieZjxw4HnhGHOaEOnV4fkLkTZWwIMlGs8q3avlCJ3jU8dZwAMf5QCkfE/RsVnOE+K6V14WmOhIpo7ntTZcUU2u8D/k5g9yYGZr9WKqyv59oDRcKW92UAFd6TYOt80OBvaDjZEKsPtm6G0Mf7EAYytR80P/KsVwzrWvAvk4zVibj9UbBrRPfdAO4GlE3eYUluWwCCFR3iMCnnZJd6O8lZeVoQoDP514/Dc1EehLeglLBwxD4XrA1NXRA0vqeJDVS6XYrzUdnSO3w4uRiAtAGqqzJnnREsBER0gUBENfyl4P9AshuZJ+xySZ0xdc0nH4CjVbK0b65B/J3TNioVH4hwAAAABJRU5ErkJggg==';
export const defaultAdvertisement = 'http://hall-cp.zk01.cc/image/ad-photo/2020-02-03/e84146c2-fc6b-43e0-99ad-ca269cd3e899.gif';
export const defaultHeadLineLogo = 'data:image/png;base64,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';
export const defaultHomeHeaderLeftLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIkAAAA2CAMAAADEZkpbAAAAaVBMVEVMaXH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+kYmrZAAAAInRSTlMACi+6wNDaQqB++KcpmHGQsmYaijZP46si8hMDPEiEWcfrdWhu+QAABDtJREFUeNrl1+uysjYAheEVjgYBAYFyUmDd/0XWgEEFRO3Yz870+eFGzAzvJJiNeEUW+G/I2GFU40fCFhcJyRAX4izwIwENAA4vUgA28SsxvQIBlRKIaONXQjKXHO0D/rDkzEc9fiUzHwX4/xBYqPGJGl+SObY1Cce4nWNpEjAsy0xw7Kw1diTwJULyJsKg4cQEMpIdGq474Xt8h9oOoyS/O+PyIkbIFZ6Pb6r38xJU+ayEFRwupfiy0JuVoHJmJSYKLjSYC6WUPlZPt3hHNC+BOythC1kq12ivLHMXC6u3zsmmEhR4bb8oaeYlJiAUk4NAiBo3iTvKSUr3ThYHNjVLxpm7rsHor9dzsn8cesSDkNt2rcNtn5dEHBw+KOn3LlDH1h8pSY/Hs5TyfFTkxfHqHLY+rqomViOUnPQCeSf8TsnnIrLEzNdKMsdxYlwkl4MIo9CZK6CYquTg3NhPS07TBQsOglclsT7rk8wx2nHOuJXYb9wnvmg4sM/nPQfO+bwrtkpakhIY0zudZ8/d5qQ+Orbdkywvp7v1kswTPpd68WpOYlyIkrSxzSS9CheSpPn0PslIGFyqsFUSTtt/d1udLJhLPiiJyXKtJMZmSaAmHMqRZKJPzhnvl4QkvZUSG9sl+fT9SklmGEjO+e+W1JLrJWWyXeLfPSQ4ZHAr6Yyr02OJ2C5x+VBiNk343n5yIK27zcirp5IIV/WtxCZzbJdkjyUB4OvPNksKkgm0PRksLySmEuHpAeHTkpMu+WyPTRyyxaTOyXZRkk0lme4W6srWN0tiUuJOUdLRJV5+RV1S5ddv4rHnRbcsOfzjkrMKmaXg4rC6O6ZkCMWicl6WRID7qmSKftDGmCmkWNntTR+qxGwwkOrcAcsSdn7xoqTudclL9Sc/PG8lWudtl2TUJd+nS7TtkuhfLuneLREe9dtHIk30QaVfXDdNXdeAlrSZwKBq2/GoUANRp9Ogtn+zJNYDMjxqGOjli4ETw2lLtO4fG3pjWuJsXAz1ccgSWnV4r8TiwCowkz6UuKpE+L5J108wKmhXBVkDCfMkyZmMm3EFOMxxY0RvlCQcSCyk+s45MQN8hlB2rKFJpkC8F0BIF2iGIZFHCZ9lP3sk3i7Ri+M02Cxxus5hDGXPBNqRxrQNpipWArAcs8cu3xOPpPeipCMZ1NguyW07f7fE7F0WvTwSM8lusyQh+wyrUsrZ6sxLQqZAGAkg5ul6K8EkHMcTe2KhsTZKdowqrGsYNU0j7u5YJRpKqjAFUNDxG7IGKpaG4bECYBExO9jEijh/VpJ4RzyT6n+0J12i52T6XrUkxx9ebkmWLsY5EYyflECcydUSv8FTovB9wxCA8K8vSuLXUO8qKCJzcXU6YZAUQFGrP+uMvUjnJRZ+oz7NS2L8iAjL+5LIx+9UwVjSkPYJv5WatIDWC/F74QHwC/wJfwPWPxEStlYEvQAAAABJRU5ErkJggg==';
export const defaultHomeHeaderRightLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAMAAAC5dNAvAAADAFBMVEVMaXHNVS63Pyv36KufMynPWi+tOSjdhTeOLCbwzJHVcULLUC346665b1HWdEbSYjbcgFiPLCaVLSb02Jj025336Kvfiznprm336azJZzrZdEiSLSbbfEmQLSfXczy/UDjdhTjor2736KrwyIfxz5DmpmSRLSaRLCaOLCWYLyf46qzTZzH25KflpGHlqmnorWz25KfbfzblpWXad0jXdTSPKya9RCvRYTCkQTD36a3jp2j35afwzpHuv3vuvXrtvn7356rbeVrPWS/lpmWTLif025uIKSXTblHMUi7wzo7WaU/JSi3mqWWIHx/SYyz02ZvuxYX37LDz15jst3OwQCrbeVqWLifko2XdiF3bfjbei16VLie2PSq0PCrZezayPCqZLyiOLCbcgzffjl/z2Ze4PSuRLCbQXi/RYDDPWy/bfFv13p/x0ZH14KHdhjfSZjH57KzxzYz35KacMCjwy4r246PRYzD02prYdjTz1pbvyon03J2vOyqTLSedMCjmp2XptHH24aL36KnvyIf36Kr57rDy05T35qj46qvx0Y7fkGDst3Pxz4/cf1vy1JDz1pPbgTfuxoXvxYPjoWTPWS/58bS5PyvdhFzYeTXTaTHuvHb69LfglGHuwoDrsm3135zXczTVbzPz1pjtw4bNVi74667vy4b797rtvnvwzpLjnmPprmrilWfUazL46q3glVvjmlTknlqtUDrxwXjCWT7ZdVXPWSGzMiOfPC/tunfMUS7gjDrhj2TjmmrYck/su4LWcSzeiTnQXyWoLyDkh2TmqWytKBzkoWbuyY7ornXUayvlol3ekFTcg1S2NiaxLB+LGhz79LHeh0L9/LzPUy7TZirhk03im1/mpmDbgkDdi1OXKyfehTHUakzgjkbVbTHMUB/ejE/lo3C6RC/+/8OpNinggF+gMinKX0SQGx3qtHndh1eNISDae1KQIiDfkFmuNybaeVXmqXH87KT13Z/chEzafT7z0YnYeUXafC71yX63RDDZezecHxyUJSLLh17oIXrVAAAAVXRSTlMA+fim8fjznr0LN/VoBVBvzVkiHT0t8yjuEhzIfJH7/vM+wMDr7qaA3vHVkVaSXdWEw2/gt0CM0dn5t8mp5mxO5aG2rN7asavjcJi5wPXo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';
export const defaultBanners = [
  {
    id: '3',
    linkCategory: '9',
    linkPosition: '0',
    lotteryGameType: '',
    pic: 'https://cdn01.3v8l.cn/upload/t061/customise/images/m_banner_3.jpg?v=1581317567',
    realIsPopup: '0',
    realSupportTrial: '0',
    url: '/mobile/#/lottery/index/73?id=1',
  },
];
export const defaultNotices = [
  {
    addTime: '2020-02-11 13:06:23',
    content: '<p>defaultNotice</p>',
    id: '1',
    nodeId: '1',
    title: 'defaultNotice',
    type: '1',
  },
];

export const defaultHeadLines = [
  {
    addTime: '2020-05-26 19:47:30',
    content: 'defaultHeadLine',
    id: '4',
    nodeId: '2',
    title: 'defaultHeadLine',
    type: '1',
  },
];

export const defaultNavs = [
  {
    logo: 'https://7478.com/img/img_xstj.1c6a8ad8.png',
    title: 'nav', //'小心推荐',
  },
  {
    logo: 'https://7478.com/img/img_lhds.7bc9420c.png',
    title: 'nav', //'六合大神',
  },
  {
    logo: 'https://7478.com/img/img_lhtk.5ac9bdb6.png',
    title: 'nav', //'六合图库',
  },
  {
    logo: 'https://7478.com/img/img_gssh.b3d55b8e.png',
    title: 'nav', //'公式杀号',
  },
  {
    logo: 'https://7478.com/img/img_zbkj.baa51f42.png',
    title: 'nav', //'直播开奖',
  },
  {
    logo: 'data:image/png;base64,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',
    title: 'nav', //'历史开奖',
  },
  {
    logo: 'https://7478.com/img/img_lts.d0db9070.png',
    title: 'nav', //'聊天室',
  },
  {
    logo: 'https://7478.com/img/img_tmzs.6ca018b9.png',
    title: 'nav', //'挑码助手',
  },
];

export const defaultFeatures = [
  {
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAALVBMVEVMaXE0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNsxW0r6AAAADnRSTlMAiM27C+1D3JkwHXthsbvXp2IAAADDSURBVHjapZXtDoMgDEUvWsqX8v6POxu3ROKoN9v5YTQ5iIV6ASBt6R4pVxg19SeiApDUCQrQbEQOc7K9aQeWw6vwECtBcFwyfDab28QAHz0cZcTaexRGhLYCRjR+FmXL6zf2sWppcbrhV1HWPucq7ufY5UYcxc20JrgTBlFsnAKPor7vRIsv2lM9eyV4opUSP19aPTFfRGGnZov5b3n4Bee3kG8Kvs34xiWgRfp3pQOAjhQ6pOjYo4OUj2YULuzp4+MFyO4g/6NmsTUAAAAASUVORK5CYII=',
    title: '我的钱包',
    userCenterType: UGUserCenterType.资金明细,
  },
  {
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAKlBMVEVMaXE/sXw/sXw/sXw/sXw/sXw/sXw/sXw/sXw/sXw/sXw/sXw/sXw/sXzOh7uKAAAADXRSTlMAiJap3gz00Xclu1o8V3uehQAAAMBJREFUeNrNlUEOxCAIRVGkgNb7X3ewmaSxGZHFLPpWNnmhQMwXAEj46A4HC4Gh3LewAlDpAQqBjOKYHHA0JsDmKbiomQxmI2xAk4aYv9+Uav5ZPD/EOtqlgHht89yLdIktULEEK0Kzc40MQ9x7aOpm/5bt1GTa4EjqiPPdOD1R601zxJl/iIRlQdVJlL4EJ7GtxTz3KLggUXiYt4jEjxgRuPH3SLfn7rGsemxpQvRF6wmHVDj2wkEajuZw2Iefjw+oKB/TyMMiwAAAAABJRU5ErkJggg==',
    title: '帐户讯息',
    userCenterType: UGUserCenterType.个人信息,
  },
  {
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEVMaXHnTDznTDznTDznTDznTDznTDznTDznTDznTDznTDznTDznTDznTDznTDznTDznTDznTDznTDznTDyzPJcZAAAAE3RSTlMAZCLbSzztlhF3LvqiywWvjb5XDCsD4gAAAT9JREFUeNrVlUuWhSAMBQlBDBBAZf97bczh0T4/OOhR10ikjJeoqL5JHpbV2nUBn9QD2riMoXQCZmf0l0ITzFGUKyHOMNFu+YynKWTG02WYvTpqLVvPelTV5w7sDKkTZBx/Mu1i3B6XKMW32MRZvTDfitoxO/0qpiVI5iW9iFwaPBZBuiRFYShGMcSPIzHJPVuC9CgSuDrKUMn1wAHdi2TLCUu34lQuTH8XQXdgKBrVMf9e3KiznURbSn7rYy7F7u8LvolYSpSyfvys/R5PMi9K0OC+AK0EllWmWid4NcCHmi4p5aqP9OwRtu8ixaGpdy8mObR7bnPvGZnULYQsN/ubeFkW7/sYSyVkk45WMqIVPFQgbo1joHZm49ZWpu8s+LtJMsfe+2iusddyYTX3nXAxHHdvpwfdlV9DwHzZf38A968wfs8I3SQAAAAASUVORK5CYII=',
    title: '安全中心',
    userCenterType: UGUserCenterType.安全中心,
  },
  {
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAUVBMVEVMaXHmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLmfiLd8AGVAAAAGnRSTlMA86vNLTRUiJZp3PwDHRQGQwxenoN4teW8kHWf/5gAAAEMSURBVHjazdLpjoMwDEZRGzekIQs7tN/7P+hoWhWEldBZpNHc30eW7IQGRjl2tKWcljvEaXKAYkvN6QCvVE7DbrLFpnqHBqcNG3Tn8PozeKF8/wxGc+gSCnCESvosbD10XX7iTTtOedjWqvRn54mz+l+mAAUqjr88z8xH5qvwnWUEcF+C0bqgYDkFa2leLfEEBsZetYH7EvTEFXsjfRaGGBixd/EAzVi9uqcH7LCuADewb5ZpBWjEg+Mb2AtsoM5705IAQwlOgO+J6AY0lFxNJTizR3o8zvpcrnzwBUtqZ3BPOxytygXqBfAMcLfBXBMZNJWHVLD0bMjCiqhLJDBk2tcZbhnXmOeQ8aE+AEDGSndo1DbXAAAAAElFTkSuQmCC',
    title: '我的报表',
    userCenterType: UGUserCenterType.彩票注单记录,
  },
  {
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAh1BMVEVMaXH/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axv/axvmT+23AAAALHRSTlMAbPzAsAoBUPBg3uPWu0zRJQX4pzwtEDUa9I8DtWVzmcl6FB7rrIJXoF1EhbYZC/4AAAF/SURBVHjahdTZbqtAEEXRYyab2YDBYzw7vsnd//99ESgRmG6S9YZUUnWf6kIj611eQlQ9C/2mdvkRf2jaW8lA5WvCkVbpVmlMK51o/wkQh76kYOUCnGTjx4DbSJ3gHWAlixmQD461A1xZJMBavSICljJsANdoMZMhA44augH/ZAiBTEOBAwdL2Eah7IVz40Qbe+slcDB6HGWKwKnV2ydALdMFOBejb1k0d8DzhymSyWYOkGRBd+IHQCW7d1qLJE9zWmdfdsGJobSZKJvnDCyOe1ktXXrbdNbILtzSVXjHbLW6Sioup9rS9j+t/MPXNz+FSIYdwD0M+lDPQLm3rp+7GbyHHNugVw5QFYOLRQBu2MuKn/U77F/20eB9DyTxhx0wOdJ1O1o/+RGGh3QxfwlNNh/53CuIwLnpb2vAG8d6X4zEYZfhUy9qTFt5wFUvbg6GWIllpvOH14sBFmstINUvng5wr6Uuo2m3EoiWkraw+yOUZNOtZZksNS2onLS76xc8j0xKSGRebgAAAABJRU5ErkJggg==',
    title: '团队报表',
    userCenterType: UGUserCenterType.彩票注单记录,
  },
  {
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAANlBMVEVMaXHXQXfXQXfXQXfXQXfXQXfXQXfXQXfXQXfXQXfXQXfXQXfXQXfXQXfXQXfXQXfXQXfXQXenXbMOAAAAEXRSTlMAMt34ewiriOtXFr0ol9BnRZowxHsAAAFOSURBVHja3ZTbcsMgDAUFSJirbf3/z1YWtDEzQKev3ZcksDkcORMAgPB0vMadSPBQLP+GLU9e9/amZKK8hnqsqUEMBLDiJdiRxDwBHHOFPVWyACT3gD3HvxVLfFHW4sUDcSn6UfRLMbq35+51x2RepD9OTRWUyJx3orGcPZrHxLQWCXttG0FpIkV8oVuX446nj4g8gCCUk3PQjyfB9jkSil2f4EzfoglvLxgd5kog3M/WtZm6OA6kX3As79ZilJ0Cgg4Q96JpXSXST8R0IA0iZGY7Eb2uqHj//F/dRDyZcxdDK3nMRT0IgE41+xlhItY+blKTACgw54l4t6VumlYCJyJZqWTUzJxJLymXQJ/RSGy/oqo9F7W6izCSWRaRNP4K/SKNLAT7IRcNETXX6gO/Zx/xWm68wjW88kjtJyqtQ6dg9R9qglbOW+dCvhIoXwfzKSNyQTjsAAAAAElFTkSuQmCC',
    title: '投注记录',
    userCenterType: UGUserCenterType.彩票注单记录,
  },
  {
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAANlBMVEVMaXEavJwavJwavJwavJwavJwavJwavJwavJwavJwavJwavJwavJwavJwavJwavJwavJwavJytiFGDAAAAEXRSTlMA99UvmAm94bNBW4XrHspNbi24jE4AAAEoSURBVHjapZTrcoQgDEa/gEG5w/u/bA2zawtrzXR6fqBOzsQQMuA3qjORocJbP4nQsKYLRksXqQ92PJKLSGnXxDDSuXw8i3yIRg34FK3/JiTxjMWnyKWvRMaNuK3a7oFJDKlkAPviJcYiUu+Fx+Pwb4oEf4o2WkjzG3CuG67gImbqZC3Jf57FKi0Y26jPIhdxsjjPIqyEpUqjiOIUeSVNdLJKkX/L+P8a2Vy71vtYrj5qJ+NJcms1tqyc9Tw9joF0frs36U4Mu8uQjs5Qm8WL0FeOfCsiFJn/UpKM1C5mqrci/BkLQDwfzLELG2si4EdSYxXxusgoOk0EauqCLiI7XXzRSESHiTFzo/M0X6XkMZOky27JwDVkLLT+wkNh64MGleooHRZPfAH4wCTS6817wAAAAABJRU5ErkJggg==',
    title: '消息中心',
    userCenterType: UGUserCenterType.任务中心,
  },
  {
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAOVBMVEVMaXGbWbabWbabWbabWbabWbabWbabWbabWbabWbabWbabWbabWbabWbabWbabWbabWbabWbabWbbI3OfbAAAAEnRSTlMAk8HYsPlQCZzwF3goNEKHbWBZkIeEAAABfklEQVR42qVV65qEIAiVyTTv1vs/7EJGOE5ts9/yYxzlyOUIpAaxet5QHKgH0dsh4QE4M3C6Q5ga8TciRJfy2rbZ4jYFM4ZGqmLVisCs9iUpC7i87Igjd5lCRE3CBfJEZ4IUnARnOdQBSbi5uHa+8AmKC46QZx6EyyqS1i2ejvxCCO1VppUzCkxb1fV0Y6teRdkkkSWvLsWTxcS7hdzwJgWAkPqXAsl6OgMx05F72670t+PHsEkQVoANZokjk+/aYiAG5hMZiK/sd7fgmtaTYTpPGOd+w6C2KR1YNCI8U3yrkuBwFfVxRaPB3PDCBNr2+gAoeiITT+IjA+NJdDT0ZAQshw4w0q6EhcDyF+DXrvtk0m/JfE8PE+4sEx7R2yfhN0/IPurxhCz5uSikzNarMqvvZQZD4S4h9X1XhLL7VogOY2ZyK99a35vL8KvUvl2N8pftOnftqvT9ACDcq5ueTyNFkBdDysiQGpAwjr293xnHkh8G6dNo/v+w93efjx+wxy3Z0Nh48AAAAABJRU5ErkJggg==',
    title: '设置中心',
    userCenterType: UGUserCenterType.全民竞猜,
  },
];

export const defaultProfileButtons = [
  {
    title: '我要充值',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAhFBMVEVMaXH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8NoezaAAAAK3RSTlMAeT33/kvu+xYCyvIFcim3iKIK1pvrOIIewd5UqV6wWDNm0I4SCETmTpXF+M2xIAAAAT5JREFUeNqN0OeWgyAUBOARjIItxmhM73Xn/d9vj0ZM2UX9/nEY7gD413XsyWN8QZ+UtUCh24aNMbotaQh8y+5O6qyeVQlbJb6NWXGP8RlnwdYD3wI2wtu2c+KOrSKa0tjfFT7p16Y7E6lTntZTl5NzGMaRbWSOhtpka5KLOd4Jl43jahOXZbxLNHCo7yLwMpP8o3jMclbCGYy5xy6hadcLdvvRqMWsSJ9WG1QudfEpyia0WWqo1Sqtr66BTNJGwPy0VwXt5SfQSHWU02oBtryQdjdwGDk86HKQAgEHCaByyQEmAOZr9jsAgHLZx1eobNlnjFoi2WOEJ6f3zcaEna4wos7kAm8cn1YC7/ZBz5NbI0vO3Q8MbmEJetNCknJpBia2oAMg0u1yjW+CNak+zvkJ/sj9qviAJ1V3hzGefgGcsK0Pe5ychwAAAABJRU5ErkJggg==',
    userCenterType: UGUserCenterType.取款,
  },
  {
    title: '我要提现',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAclBMVEVMaXH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+MC121AAAAJXRSTlMAERYCuoH9qt1mj0qYXr3N73npC6D6n+EvprEe8jfFVdU+rQOGYAGmhQAAANdJREFUeNrN0+cKwzAMRtHPaZw6e4+me+j9X7EBle7KhlLo/SXwQRiDIae2XWU8yM3W5SagqVJSXrqo6JL/CR3XOg/oVlt/WFXQU/HLqv0ppzclD2oZHgp6X3+vRiO0xC8amrlDuoYhpw4gt1qQYz+H39/Rl2Gx8blISTCPj7gmwI6ZFWaTi6MotsIBaGiqscAdkPKUynABjDyNMkyAjKdMgHysedIybBWUoSmjZEgR4CV9n3jWB9+Cs8JA13bIVV0ZcnuGDmlXuPrzz8Vw5eZ2CAsHFuTDGVr2omSvHclzAAAAAElFTkSuQmCC',
    userCenterType: UGUserCenterType.取款,
  },
  {
    title: '资金明细',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAkFBMVEVMaXH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+X6JXfAAAAL3RSTlMAqtfdtOK77zNmDgb+di76S/U9pQqfFESU8jjJA68bjFzpKmvCYVWZfHIl0kiDt2iWfhMAAAGuSURBVHjazZTZbqswEEAnTgwUs4SdEgIJ2UPb+f+/62AHcAvct0r3SIxt6djjRQP0HEyegc49YB5MsX1EDhoNIp5hioeEDSNbGvO/FuN/i6IESbhGolbizey5KJFRDGqpSg9zJUbYc1Iil4MLECi5Vd3UcjWKIYX2Ja5GcQfkfJbrQczFGZ1L5cjBZhTxCoUHLg4EjQifkOBE9OswzB0cOT6Kjw1OxGX+Xvw6vU1x2UTcwSypr4uqO4swf4vO3Zoh3P8v17OMGT2uB3cf6OJxsxpgL+0UAwj67O0o8hQ0Enm1FYTRkZZIChjFFehcOy9O96hwInsQ3wv9Pc6Ut0pbVMhZUlSqOeB0pQC0XmJFiDer6y2d2owzWTMfiAVwym4tiBFEXZJKcFY25jtiviC6QOcNtZ8BG0S+fnGUlSwoPLIsKwWFO2LwEk1PuxwH8SAo7AzDiFMKLW0D+j1prLvU/GfqduZlLB9x373OzXVdYVOgfg39NRo9Z/IwsAtV5Halyr4BnOcOkWy3B9nksCQGT3uHA4YA4Atmm9qJgxI/Jw8KtmCyJ3g5C3xWN0B8A0vxrdroB81PAAAAAElFTkSuQmCC',
    userCenterType: UGUserCenterType.银行卡管理,
  },
];

export const defaultBottomTools = [
  {
    logo: 'data:image/png;base64,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',
    userCenterType: UGUserCenterType.QQ客服,
  },
  {
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAAB0CAMAAACmGr7BAAAAolBMVEVMaXHr6+vr6+vr6+vr6+vr6+vr6+vi4uLr6+vr6+v///9ChfTr6+uGsfhmZmb+qkfMzMytra319fXR4v2FhYXb6P19q/ikxvqzzvvx9v6Vu/np8f64uLhZlPVKivVzc3PE2fz/+vOOtvn6+vt0pfejo6OPj4//8N7/2q/y8vJpnveZmZn+xYG70/vCwsL/6Mz+t2P+sFPW1tZOh+lljNOfsdcWfeBJAAAACnRSTlMA1yHYn2BE/MkP+Rv84QAABIBJREFUeNrt221XqkwUgOHq6ME24z4wkq8IKqIpamWd///Xnj2ASUCGjXUeprk/uKa3tbrWniErucp202y0DKZARqvRvLkqr9liqyAAJQqCFWs1S5C/r1cBKFWwuv6dQ942EqRq0MbtG2WLg5Lx1m1G+YuDovFft7lZqj7PBgeF4430GrsCpVsl19vrAJQuuBbK5goUb9UkZisAxQta9DyWgfKxm2TPqr9rGwEoX9BIjqb6h9OAH5BxxeAHxDRTMzVTMzXzXzG3c8+s0Lh9V2PmYG5Wrldf5sfKtSdmORbLfl2Z2w+VHbgzzTlAl9beoF7M6sP0AGAstms/HmdNmd7HBzKgia9Ho7VJtWvKNM+rW2dmv1OhWd2ZE6jUuubMO6jUUDNrzuz0j83W63W7X9IkqDcz6LUrNRzUmrltV6xXa+awXbVaM2c/i9mB9xsNVWEO4VRbZaY5ghP11Dmbvfeb6UuQZv4fmb1OoZ56zBmUNJRnGgZUznZYjZihkxQSMkIfuAgoZhVikMnF8ELMUaHLb1oHkxyLVpHBUWSJaWEhG6hXtO+/LiWYo7ZnFupe/hJkI+cWCWx0DQCOCztCKztNB7PT5FgS/zRzNDZLmldVDs9hQsLkYFucVhYxM/k+ZOI091yOBLP9zr9NKtb5DJOMRSa5ckzIJcP0Ela+dSXkbAJnMG07Ootp55JgjkzKI26h0dqj5hPBmXted1ASwDlM6gRTTDqbtcdcewukmDMoaxsfUugQ05P/k1fMK9u0PG2HLj8EcbRwMeIi143fK8UkS1m99EN3/VN/2ZM9mxyLvU7Z8J0E56ALIMEcmKL2dlKo5yVM6iuZYKf5iIvDmkHc3vfTFSenDBPG5sl61ZjylyCGjr+AbNxG37V2gr1wHERXhtk/qfRG1ZjylyAX3RD3b5h4yKFCmqcEE4anlB0oMOUvQcwuYS7QMPDtOPfiCREnLY8VvhQTOrPuMS/xjbui3gDg4mczQh9xl2daGIlP2UGhAxP4BX9D6cTOdeqDizNDAzFy0coxuY+GePQZHOV2EmK6sCSYRWdeOZ0On5+f29Njn2UyF9F2DQjF8YzsCI3jlnWTmTo88wW57Asy4W6cVU43f0ranC9lETqIuBAyfwEcQzwexRBDiHMzTmYlIaYLJsM8HSnLeoRz8xGd0EY7trjEtPkBxJ1EmTqN8rNJfRnz4c873cOZuTsjfd669x0QTEjb+UJ5dPrutzPvE9QDLR6n0w3t1uXj55hUwrTRNzJMtsi5SL0wiOscQnxdul/KFFtUwO7JCxs55g4XDDLMMH47G48wzDCpb2FSS9q9GxLSw1RmmtxisEvF7ECHfMV3fdfZFLanp+QhYar1EgvylfU0VYtZ/nPzcQlqMQm6XP59eXn5u7yPx/iwpJR+XdADKROhykxybpb6VV6aqZmaqZmaqZmaqZmqMWc1ZnqVv/eBV+O7iubmWfVVu+OvWH3u+JMdZ1/fjavvrdZ3ymumZmqmZmqmZmqmZmqmZmqmZmqmZmqmZmqmZmrmh8wf0X8MhGiIbjHSkwAAAABJRU5ErkJggg==',
    userCenterType: UGUserCenterType.取款,
  },
  {
    logo: 'data:image/png;base64,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',
    userCenterType: UGUserCenterType.银行卡管理,
  },
];

export const defaultLeftTabs = [
  {
    key: 1,
    logo: 'https://7478.com/img/1201.4cc317f2.png',
    mainTitle: '六合彩',
    subTitle: '一週開三期',
    showSubTitle: true,
  },
  {
    key: 2,
    logo: 'https://7478.com/img/1301.23846282.png',
    mainTitle: '北京PK10',
    subTitle: '全天44期',
    showSubTitle: true,
  },
  {
    key: 3,
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAOCAMAAABEkI/mAAAAG1BMVEUzMzNMaXEzMzMzMzMzMzMzMzMzMzMzMzMzMzPyvRPcAAAACXRSTlOAAHoqQmgKC2pkuzJFAAAAX0lEQVR42qWTQQoAMQgDk6jt/v/FC3sQYS8Bc3MYoVQFyZMlVR6OWBhkCF8UQ7EwGOgMzcK4Qke3JQsjMZJtWRg1y2rLwtAs1ZaFV82rZ68+bDWqzZJs15M8+fwuwMIvpeEDaoZuTa4AAAAASUVORK5CYII=',
    mainTitle: '更多彩种',
    subTitle: '好挣好玩',
    showSubTitle: true,
  },
];
