import { APP_LOADED, APP_LOADING, USER_LOGINED_REGISTERED } from '../constants';
import { GlobalState } from '../interfaces/GlobalState';

const initGlobalState: GlobalState = {
  isLoadingApp: false,
  user: {
    username: '',
    email: '',
    bio: null,
    token: '',
    image: null,
  }
};

const GlobalReducer = (state: GlobalState = initGlobalState, action: any) => {
  switch (action.type) {
    case APP_LOADING: {
      return { 
        ...state,
        isLoadingApp: true,
      };
    }

    case USER_LOGINED_REGISTERED:

    case APP_LOADED: {
      console.log('actions', action)
      return { 
        ...state,
        isLoadingApp: false,
        user: action.data || initGlobalState.user,
      };
    }
    default:
      return state;
  }
}

export default GlobalReducer;