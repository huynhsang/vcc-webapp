import connect from "react-redux/es/connect/connect";
import RightSidebar from "../component/right-sidebar/RightSidebar";
import type {Filter} from "../../../global/Filter";
import CoreService from "../../../global/CoreService";
import Result from "../../../global/Result";

const accountService = CoreService.accountService;
const questionService = CoreService.questionService;
const subCategoryService = CoreService.subCategoryService;


function getTopUsers(filter: Filter, _this: RightSidebar) {
    return () => {
        filter.where = {
            realm: {
                neq: "admin_app"
            }
        };
        accountService.getTopUsersWithTheHighestPoints(filter).then((result: Result) => {
            if (result.success) {
                _this.changeStateValue('topUsers', result.data);
            }
        })
    }
}

function getTopPopularQuestions(filter: Filter, _this: RightSidebar) {
    return () => {
        questionService.getPopularQuestionsInMonth(filter).then((result: Result) => {
            if (result.success) {
                _this.changeStateValue('popularQuestions', result.data);
            }
        })
    }
}

function getQuestionsWithTopAnswers(filter: Filter, _this: RightSidebar) {
    return () => {
        questionService.getQuestionsWithTopAnswerInMonth(filter).then((result: Result) => {
            if (result.success) {
                _this.changeStateValue('questionsWithTopAnswers', result.data);
            }
        })
    }
}

function getTopTrendingTags(filter: Filter, _this: RightSidebar) {
    return () => {
        subCategoryService.getTrendingTags(filter).then((result: Result) => {
            if (result.success) {
                _this.changeStateValue('trendingTags', result.data);
            }
        })
    }
}

const RightSidebarImpl = connect(
    null,
    { getTopUsers, getTopPopularQuestions, getQuestionsWithTopAnswers, getTopTrendingTags }
)(RightSidebar);
export default RightSidebarImpl;