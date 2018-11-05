import { APP_LOADED, APP_LOADING } from '../constants';
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
    case APP_LOADED: {
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