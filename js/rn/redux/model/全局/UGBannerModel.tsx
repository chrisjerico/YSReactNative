interface UGBannerModel {
  list: List[];
  interval: string;
}
interface List {
  id: string;
  url: string;
  linkCategory: string;
  linkPosition: string;
  pic: string;
  lotteryGameType: string;
  realIsPopup: number;
  realSupportTrial: number;
}

export default UGBannerModel