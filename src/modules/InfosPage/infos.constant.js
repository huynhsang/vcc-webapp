import { badges } from '../../component/Badge';

export const calculations = [
    {
        point: 10,
        description: 'badges_points_for_a_new'
    },
    {
        point: 5,
        description: 'badges_profile_compeleted'
    },
    {
        point: 2,
        description: 'badges_ask_a_question'
    },
    {
        point: 2,
        description: 'badges_add_an_answer'
    },
    {
        point: 1,
        description: 'badges_up_vote_on_question_or_answer',
        limit: 5
    },
    {
        point: -1,
        description: 'badges_down_vote_on_question_or_answer',
        limit: -5
    },
    {
        point: 15,
        description: 'badges_answer_approved'
    },
    {
        point: 1,
        description: 'badges_share_question_or_answer'
    },
    {
        point: 1,
        description: 'badges_login',
        limit: 1
    }
];

export const pointScale = [...badges].reverse();

export const startSteps = [
    {
        title: 'common_step',
        description: 'infos_new_step1'
    },
    {
        title: 'common_step',
        description: 'infos_new_step2'
    },
    {
        title: 'common_step',
        description: 'infos_new_step3'
    }
];
