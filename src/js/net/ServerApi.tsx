
const _path = "/wjapp/api.php?";

/**
 * 服务器接口
 */
export const ServerApi = {
  //主页相关
  HOME_BANNER: _path + 'c=system&a=banners',//主页广告banner
  HOME_NOTICE: _path + 'c=notice&a=latest',//主页公告
  HOME_GAME: _path + 'c=game&a=homeGames',//主页游戏
  HOME_COUPON: _path + 'c=system&a=promotions',//主页优惠活动

  //用户相关
  USER_INFO: _path + 'c=user&a=info',//用户信息


};
