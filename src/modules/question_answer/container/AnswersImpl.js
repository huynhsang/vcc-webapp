import connect from "react-redux/es/connect/connect";
import AnswersUI from "../component/AnswersUI";

const mapStateToProps = (state, ownProps) => {
    return {
        answers: ownProps.answers,
        question: ownProps.question,
    }
};

const AnswersImpl = connect(
    mapStateToProps,
    {}
)(AnswersUI);
export default AnswersImpl;