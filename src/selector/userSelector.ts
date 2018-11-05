import AppState from '../interfaces/AppState';

export const userSelector = (state: AppState) => (
    state.global.user
);