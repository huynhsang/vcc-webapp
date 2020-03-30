import { createReducer } from 'redux-starter-kit';

import {
  getTopUsersRequest,
  getTopUsersSuccess,
  getTopUsersFailure,
  getPopularQuestionsRequest,
  getPopularQuestionsSuccess,
  getPopularQuestionsFailure,
} from '../actions/home';

const defaultState = {
  isGettingTopUsers: false,
  topUsers: [],
  isGettingPopularQuestions: false,
  isGettingQuestionsTopAnswered: false,
  isGettingTrendingTags: false,
  popularQuestions: [],
  questionsTopAnswered: [],
  trendingTags: []
};

const homeReducer = createReducer(defaultState, {
  [getTopUsersRequest]: state => {
    state.isGettingTopUsers = true;
  },
  [getTopUsersSuccess]: (state, action) => {
    state.isGettingTopUsers = false;
    const { payload } = action;
    state.topUsers = payload;
  },
  [getTopUsersFailure]: state => {
    state.isGettingTopUsers = false;
  },
  [getPopularQuestionsRequest]: state => {
    state.isGettingPopularQuestions = true;
  },
  [getPopularQuestionsSuccess]: (state, action) => {
    state.isGettingPopularQuestions = false;
    const { questions } = action.payload.entities;
    state.popularQuestions = questions;
  },
  [getPopularQuestionsFailure]: state => {
    state.isGettingPopularQuestions = false;
  },
});

export default homeReducer;
