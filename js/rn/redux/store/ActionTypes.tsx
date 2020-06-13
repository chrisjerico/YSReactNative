/**
 * Arc
 *
 * 所有 redux 的 Action
 */

import { Action } from 'redux';
import { IGlobalState } from './UGStore';

export enum ActionType {
  None,
  UpdateAll,
  // 公共数据
  UpdateUserInfo,
  UpdateSysConf,
  UpdateSkin,
  // 香槟金
  XBJHome_SetProps,
  XBJMine_SetProps,
  XBJRegister_SetProps,
  JDPromotionList_SetProps,
  XBJLogin_SetProps,
  UpdateVersion_SetProps,
  Transition_SetProps,
  // 综合体育
  ZHTYHomePage_SetProps,
  ZHTYMinePage_SetProps,
  ZHTYLoginPage_SetProps,
  ZHTYRegisterPage_SetProps, // 声明UGAction
  // 六合厅
  LHTHome_SetProps,
  Clear_User,
}

// 声明UGAction
export interface UGAction<P = {}> extends Action {
  type: ActionType;
  state?: IGlobalState;
  props?: P;
}
