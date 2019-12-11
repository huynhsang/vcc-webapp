export const updateEntityVoted = (entity, newVote ) => {
    const { voted } = entity;
    if (newVote === 'up') {
        entity.upVoteCount += 1;
        if (voted === 'down') {
            entity.downVoteCount -= 1;
        }
    } else if (newVote === 'down') {
        entity.downVoteCount += 1;
        if (voted === 'up') {
            entity.upVoteCount -= 1;
        }
    }
    entity.voted = newVote;
}