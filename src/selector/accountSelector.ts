import AppState from '../interfaces/AppState';

export const isHandlingAPISelector = (state: AppState) => (
  state.account.isHandlingAPI
);
export const errorsAPISelector = (state: AppState) => (
  state.account.errors
);