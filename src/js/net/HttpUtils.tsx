import ServerHttp from "./ServerHttp";
import {ServerApi} from "./ServerApi";

/**
 * 请求主页接口数据
 *
 * @private
 */
export async function requestHome() {
  //模拟 4个接口请求数据
  let response1 = await fetch(
    'https://facebook.github.io/react-native/movies.json',
  );

  let banner = await ServerHttp({}, ServerApi.HOME_BANNER, false);
  let notice = await ServerHttp({}, ServerApi.HOME_NOTICE, false);
  let game = await ServerHttp({}, ServerApi.HOME_GAME, false);
  let coupon = await requestCoupon();
  let userInfo = await ServerHttp({}, ServerApi.USER_INFO, false);
  let responseJson1 = await response1.json();

  return {
    banner: banner,
    notice: notice,
    game: game,
    coupon: coupon,
    userInfo: userInfo,
    movie: responseJson1,
  };
}


/**
 * 请求优惠券接口数据
 *
 * @private
 */
export async function requestCoupon() {
  let coupon = await ServerHttp({}, ServerApi.HOME_COUPON, false);

  return coupon;
}
