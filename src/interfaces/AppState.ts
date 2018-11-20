import { HomePageState } from './HomePageState';
import { GlobalState } from './GlobalState';
import { AccountState } from './AccountState';

interface AppState {
  home: HomePageState,
  global: GlobalState,
  account: AccountState
}

export default AppState;