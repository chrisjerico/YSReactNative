import { ActionType, UGAction } from '../../redux/store/ActionTypes'

// store
export interface BZHSignInStore {
  isRemember: boolean;
  account: string;
  password: string | any;
}

// reducer
export const BZHSignInReducer = (
  prevState: BZHSignInStore = {
    isRemember: false,
    account: null,
    password: null,
  },
  act: UGAction<BZHSignInStore>
): BZHSignInStore => {
  if (act.type === ActionType.BZHSignInPage_SetProps) {
    return { ...prevState, ...act.props }
  } else {
    return prevState
  }
}
