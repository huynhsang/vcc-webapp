import { createReducer } from 'redux-starter-kit';

import {
  getQuestionRequest,
  getQuestionSuccess,
  getQuestionFailure,
  voteQuestionDetailRequest,
  voteQuestionDetailSuccess,
  voteQuestionDetailFailure,
  voteAnswerRequest,
  voteAnswerSuccess,
  voteAnswerFailure
} from '../actions/questionDetail';

const defaultState = {
  question: null,
  isFetching: false,
  isVotingQuestion: false,
  votingAnswerId: null
};

function voteQuestionFn(state, action) {
  const { payload } = action;
  const { model } = payload;
  delete payload.model;

  const { question } = state;
  const { vote } = question;

  if (payload.action === 'up') {
    question.upVoteCount = model.upVoteCount + 1;
    if (vote) {
      question.downVoteCount = model.downVoteCount - 1;
    }
  } else if (payload.action === 'down') {
    question.downVoteCount = model.downVoteCount + 1;
    if (vote) {
      question.upVoteCount = model.upVoteCount - 1;
    }
  }

  question.vote = payload;
  state.isVotingQuestion = false;
}

function voteAnswerFn(state, action) {
  const { payload } = action;
  const { model } = payload;
  delete payload.model;

  const { answers } = state.question;
  const answer = answers.find(answer => answer.id === model.id);

  const lastVote = (answer.votes || []).find(vote => vote.id === payload.id);

  if (payload.action === 'up') {
    answer.upVoteCount = model.upVoteCount + 1;
    if (lastVote) {
      answer.downVoteCount = model.downVoteCount - 1;
    }
  } else if (payload.action === 'down') {
    answer.downVoteCount = model.downVoteCount + 1;
    if (lastVote) {
      answer.upVoteCount = model.upVoteCount - 1;
    }
  }
  answer.votes = [payload];
  state.votingAnswerId = null;
}

const questionDetailReducer = createReducer(defaultState, {
  [getQuestionRequest]: state => {
    state.isFetching = true;
  },
  [getQuestionSuccess]: (state, action) => {
    state.question = action.payload;
    state.isFetching = false;
  },
  [getQuestionFailure]: state => {
    state.isFetching = false;
  },
  [voteQuestionDetailRequest]: state => {
    state.isVotingQuestion = true;
  },
  [voteQuestionDetailSuccess]: voteQuestionFn,
  [voteQuestionDetailFailure]: state => {
    state.isVotingQuestion = false;
  },
  [voteAnswerRequest]: (state, action) => {
    state.votingAnswerId = action.payload;
  },
  [voteAnswerSuccess]: voteAnswerFn,
  [voteAnswerFailure]: state => {
    state.votingAnswerId = null;
  }
});

export default questionDetailReducer;
