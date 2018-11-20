import AppState from '../interfaces/AppState';

export const appSelector = (state: AppState) => (
    state.global.isLoadingApp
);