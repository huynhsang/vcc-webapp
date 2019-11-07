import React from 'react';

const Vote = ({
  points,
  disableUp,
  disableDown,
  isLoading,
  handleVote,
  isMobile,
  isAnswerVote
}) => {
  return (
    <ul
      className={`question-vote ${
        isAnswerVote
          ? 'answer-vote answer-vote-dislike'
          : isMobile && 'question-mobile'
      }`}
    >
      <li className="question-vote-up">
        <button
          className="wpqa_vote question_vote_up vote_allow"
          disabled={disableUp}
          onClick={() => handleVote(true)}
        >
          <i className="icon-up-dir" />
        </button>
      </li>
      {isLoading ? (
        <li
          className="li_loader"
          style={{
            display: 'block'
          }}
        >
          <span className="loader_3 fa-spin" />
        </li>
      ) : (
        <li className="vote_result" itemProp="upvoteCount">
          {points}
        </li>
      )}
      <li className="question-vote-down">
        <button
          className="wpqa_vote question_vote_down vote_allow"
          disabled={disableDown}
          onClick={() => handleVote(false)}
        >
          <i className="icon-down-dir" />
        </button>
      </li>
    </ul>
  );
};

export default Vote;
