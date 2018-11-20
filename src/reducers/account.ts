import { USER_LOGINING_REGISTERING, USER_LOGINED_REGISTERED, USER_LOGINED_REGISTER_ERROR } from '../constants';
import { AccountState } from '../interfaces/AccountState';

const initAccountState: AccountState = {
  isHandlingAPI: false,
  errors: [],
};

const AccountReducer = (state: AccountState = initAccountState, action: any) => {
  switch (action.type) {
    case USER_LOGINING_REGISTERING: {
      return { 
        ...state,
        isHandlingAPI: true,
      };
    }
    case USER_LOGINED_REGISTERED: {
      return { 
        ...state,
        isHandlingAPI: false,
        errors: action.data || [],
      };
    }
    case USER_LOGINED_REGISTER_ERROR: {
      return { 
        isHandlingAPI: false,
        errors: action.data || [],
      };
    }
    default:
      return state;
  }
}

export default AccountReducer;