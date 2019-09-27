/* eslint-disable no-param-reassign */
// We can reassign state because it is proxied via immer
// WARNING: change reassign behaviour to pure if we ditch immer

export function defaultThunkRequest(state) {
  state.isFetching = true;
  state.fetchingError = null;
}

export const defaultThunkSuccess = (state) => {
  state.isFetching = false;
};

export function defaultThunkFailure(state, action) {
  state.isFetching = false;
  state.fetchingError = action.payload;
}
