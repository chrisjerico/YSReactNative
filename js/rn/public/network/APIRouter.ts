import {httpClient} from './httpClient';
import {HomeGamesModel} from './Model/HomeGamesModel';
//api 統一在這邊註冊
//httpClient.["method"]<DataModel>
class APIRouter {
  static getHomeGames = () => {
    return httpClient.get<HomeGamesModel>('api.php?c=game&a=homeGames');
  };
  static getBanner = () => {
    return httpClient.get('api.php?c=system&a=banners');
  };
  static getNotice = () => {
    return httpClient.get('api.php?c=notice&a=latest');
  };
  static getCouponList = () => {
    return httpClient.get('api.php?c=system&a=promotions');
  };
  static getUserInfo = () => {
    return httpClient.get('api.php?c=user&a=info');
  };
  static getRedBag = () => {
    return httpClient.get('api.php?c=activity&a=redBagDetail');
  };
  static getFloatAd = () => {
    return httpClient.get('api.php?c=system&a=floatAds');
  };
}
export default APIRouter;
