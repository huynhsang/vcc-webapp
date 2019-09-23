import connect from 'react-redux/es/connect/connect';
import RightSidebar from './RightSidebar';
import type { Filter } from '../../../global/Filter';
import CoreService from '../../../global/CoreService';
import Result from '../../../global/Result';

const accountService = CoreService.accountService;
const questionService = CoreService.questionService;
const subCategoryService = CoreService.subCategoryService;

function getTopUsers(filter: Filter, cb) {
  return () => {
    filter.where = {
      realm: {
        neq: 'admin_app',
      },
      emailVerified: true,
    };
    accountService
      .getTopUsersWithTheHighestPoints(filter)
      .then((result: Result) => {
        if (result.success) {
          cb(result.data);
        }
      });
  };
}

function getTopPopularQuestions(filter: Filter, cb) {
  return () => {
    questionService
      .getPopularQuestionsInMonth(filter)
      .then((result: Result) => {
        if (result.success) {
          cb(result.data);
        }
      });
  };
}

function getQuestionsWithTopAnswers(filter: Filter, cb) {
  return () => {
    questionService
      .getQuestionsWithTopAnswerInMonth(filter)
      .then((result: Result) => {
        if (result.success) {
          cb(result.data);
        }
      });
  };
}

function getTopTrendingTags(filter: Filter, cb) {
  return () => {
    subCategoryService.getTrendingTags(filter).then((result: Result) => {
      if (result.success) {
        cb(result.data);
      }
    });
  };
}

const RightSidebarImpl = connect(
  null,
  {
    getTopUsers,
    getTopPopularQuestions,
    getQuestionsWithTopAnswers,
    getTopTrendingTags,
  }
)(RightSidebar);
export default RightSidebarImpl;
