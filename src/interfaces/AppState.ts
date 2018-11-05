import { HomePageState } from './HomePageState';
import { GlobalState } from './GlobalState';

interface AppState {
  home: HomePageState,
  global: GlobalState
}

export default AppState;