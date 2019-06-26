import connect from "react-redux/es/connect/connect";
import MainPage from "../component/content/MainPage";
import CoreService from "../../../global/CoreService";
import type {Filter} from "../../../global/Filter";
import Result from "../../../global/Result";

const questionService = CoreService.questionService;

const orderMaps = {
    'recent-questions': 'updated DESC',
    'most-answered': 'numberOfAnswers DESC',
    'most-visited': 'numberOfViews DESC',
    'most-voted': 'numberOfVotes DESC',
};

function getQuestions(filter: Filter, show: String, _this: MainPage): void {
    return () => {
        filter.where = {
            isHidden: false,
            isVerified: true,
        };
        if (show === 'no-answers') filter.where.numberOfAnswers = 0;
        filter.where = JSON.stringify(filter.where);
        if (show) filter.order = orderMaps[show];
        let questions = _this.getDataFromState("data");
        questionService.findAll(filter).then((result: Result) => {
            if (result.success) {
                questions = questions.concat(result.data);
                _this.changeStateValue("data", questions);

            }
        });
    }
}

const MainPageImpl = connect(
    null,
    {getQuestions}
)(MainPage);
export default MainPageImpl;