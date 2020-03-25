import IBannerAdvBean from "./IBannerAdvBean";
import INoticeBean from "./INoticeBean";
import IGameBean from "./IGameBean";
import ICouponBean from "./ICouponBean";
import IUserBean from "../user/IUserBean";
import IRedBagBean from "./IRedBagBean";
import IFloatAdBean from "./IFloatAdBean";

export interface IHomeBeanMovies {
  id?: string, //id
  title?: string, //标题
  releaseYear?: string, //发布年月
}

/**
 * Home的Reducer数据结构
 */
export default interface IHomeBean {
  banner: IBannerAdvBean, //广告
  notice: INoticeBean, //公告
  game: IGameBean, //公告
  coupon: ICouponBean, //优惠
  userInfo: IUserBean, //个人信息
  redBag: IRedBagBean, //红包
  floatAd: Array<IFloatAdBean>, //悬浮广告

  movie: {
    title?: string, //标题
    description?: string, //描述
    movies?: Array<IHomeBeanMovies>, //电影
  }
}
