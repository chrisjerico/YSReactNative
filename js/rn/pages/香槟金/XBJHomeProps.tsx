import {Skin1} from '../../public/theme/UGSkinManagers';
import {UGBasePageProps, basePageDefaultProps, UGLoadingType} from '../base/UGBasePageProps';
import {ActionType, UGAction} from '../../redux/store/ActionTypes';
import {IGlobalState} from '../../redux/store/UGStore';
import IBannerAdvBean from '../../redux/model/home/IBannerAdvBean';
import INoticeBean from '../../redux/model/home/INoticeBean';
import IGameBean from '../../redux/model/home/IGameBean';
import ICouponBean from '../../redux/model/home/ICouponBean';
import IUserBean from '../../redux/model/user/IUserBean';
import IRedBagBean from '../../redux/model/home/IRedBagBean';
import IFloatAdBean from '../../redux/model/home/IFloatAdBean';
import {PageName} from '../router/Navigation';
import {mergeProps} from '../../public/tools/FUtils';

export interface IHomeBeanMovies {
  id?: string; //id
  title?: string; //标题
  releaseYear?: string; //发布年月
}

// 声明Props
export interface XBJHomeProps extends UGBasePageProps {
  banner?: IBannerAdvBean; //广告
  notice?: INoticeBean; //公告
  game?: IGameBean; //公告
  coupon?: ICouponBean; //优惠
  userInfo?: IUserBean; //个人信息
  redBag?: IRedBagBean; //红包
  floatAd?: Array<IFloatAdBean>; //悬浮广告

  movie?: {
    title?: string; //标题
    description?: string; //描述
    movies?: Array<IHomeBeanMovies>; //电影
  };
}

// Props默认值
const defaultProps = mergeProps<XBJHomeProps>(basePageDefaultProps, {
  navbarOpstions: {hidden: true},
  tabbarOpetions: {unmountOnBlur: false},
  actType: ActionType.XBJHome_SetProps,
  pageName: PageName.XBJHomePage,
  status: UGLoadingType.Loading, //默认一进入打开 loading
});

// 更新Props到全局数据
export function XBJHomeReducer(prevState: XBJHomeProps = defaultProps, act: UGAction<XBJHomeProps>): XBJHomeProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.XBJHomeReducer};
  if (act.type === ActionType.XBJHome_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function XBJHomeStateToProps(state: IGlobalState): XBJHomeProps {
  return mergeProps(state.XBJHomeReducer, {
    userInfo: state.UserInfoReducer,
    backgroundColor: Skin1.bgColor,
    tabbarOpetions: {unmountOnBlur: false},
  });
}
