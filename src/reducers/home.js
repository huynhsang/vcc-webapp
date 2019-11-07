import { createReducer } from 'redux-starter-kit';

import {
  getTopUsersRequest,
  getTopUsersSuccess,
  getTopUsersFailure,
  getPopularQuestionsRequest,
  getPopularQuestionsSuccess,
  getPopularQuestionsFailure,
  getQuestionsTopAnsweredRequest,
  getQuestionsTopAnsweredSuccess,
  getQuestionsTopAnsweredFailure,
  getTrendingTagsRequest,
  getTrendingTagsSuccess,
  getTrendingTagsFailure
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
  [getQuestionsTopAnsweredRequest]: state => {
    state.isGettingQuestionsTopAnswered = true;
  },
  [getQuestionsTopAnsweredSuccess]: (state, action) => {
    state.isGettingQuestionsTopAnswered = false;
    const { questions } = action.payload.entities;
    state.questionsTopAnswered = questions;
  },
  [getQuestionsTopAnsweredFailure]: state => {
    state.isGettingQuestionsTopAnswered = false;
  },
  [getTrendingTagsRequest]: state => {
    state.isGettingTrendingTags = true;
  },
  [getTrendingTagsSuccess]: (state, action) => {
    state.isGettingTrendingTags = false;
    const { payload } = action;
    state.trendingTags = payload;
  },
  [getTrendingTagsFailure]: state => {
    state.isGettingTrendingTags = false;
  }
});

export default homeReducer;
