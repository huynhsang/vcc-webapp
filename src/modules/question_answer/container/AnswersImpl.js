import connect from "react-redux/es/connect/connect";
import AnswersUI from "../component/AnswersUI";
import type {Answer} from "../../../domain/Answer";
import CoreService from "../../../global/CoreService";
import Result from "../../../global/Result";

const answerService = CoreService.answerService;

/**
 * The method ensure every user should login before continue answer the question
 * @param isAuthenticated: {Boolean} Is authenticated
 * @param _this: {AnswersUI} The answer UI
 * @param redirect: {any} The router redirect
 * @return {Function}
 */
function leaveAnswerValidation(isAuthenticated: boolean, _this: AnswersUI, redirect: any) {
    return () => {
        if (!isAuthenticated) {
            console.log(isAuthenticated);
            return redirect.push('/login');
        }
        _this.changeStateValue('leaveAnswer', true);
    }
}

function createNewAnswer(answerBody: string, questionId: number, _this: AnswersUI) {
    return () => {
        const descrLength: number = answerBody.length / 3;
        const answerRequest: Answer = {
            body: answerBody,
            description: answerBody.substring(0, descrLength),
            questionId: questionId,
        };
        answerService.create(answerRequest).then((result: Result) => {
            if (result.success) {
                let answers = _this.getDataFromState("answers") || [];
                answers.unshift(result.data);
                _this.changeStateValue("answers", answers);
            }
        }).catch((err) => {
            // To do: handle error
        })
    }
}

const mapStateToProps = (store, ownProps) => {
    return {
        answers: ownProps.answers,
        question: ownProps.question,
        redirect: ownProps.redirect,
        isAuthenticated: store.AppAuth.isAuthenticated,
    }
};

const AnswersImpl = connect(
    mapStateToProps,
    {leaveAnswerValidation, createNewAnswer}
)(AnswersUI);
export default AnswersImpl;