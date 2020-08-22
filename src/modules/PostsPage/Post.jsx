import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LabelIcon from '@material-ui/icons/Label';
import i18n from 'i18next';
import { getUserName } from '../../utils/get-user-name';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { errorAlertFn, successAlertFn } from '../../actions/alertConfirm';
import { deletePost } from '../../services/post.service';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
    display: flex;
    padding: 20px 0;
    justify-content: space-between;
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    min-height: 0;
    padding-right: 10px;
`;

const ImgCover = styled.div`
    background-position: center;
    background-color: black;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('${(p) => p.img}');
    width: 150px;
    border: 2px solid black;
    cursor: pointer;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 1.3em;
    margin-bottom: 5px;
    cursor: pointer;
`;

const Resume = styled.div`
    color: #636363;
    cursor: pointer;
`;

const MainCharacter = styled.div``;

const Time = styled.time`
    color: #979797;
`;

const CharacterInfos = styled.div``;

const TagsWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 3px 0;
    & svg {
        margin-right: 5px;
        font-size: 16px;
    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
`;

const Post = ({
    errorAlert,
    successAlert,
    post,
    viewPost,
    isAdmin,
    history
}) => {
    const {t} = useTranslation();
    const {
        title,
        resume,
        imageList,
        characterList = [],
        created,
        tagList
    } = post;

    const coverImage = (imageList || [])[0];
    const imageUrl = coverImage ? coverImage.lrg : '';

    const characterNames = React.useMemo(
        () =>
            characterList
                .map((u) => {
                    const { experiences = [] } = u;
                    let experience;

                    experiences.forEach((val, key) => {
                        if (key === 0 || val.isWorking) {
                            experience = val;
                        } else if (
                            new Date(val.startDate).getTime() <
                            new Date(experience).getTime()
                        ) {
                            experience = val;
                        }
                    });

                    return `${getUserName(u)} ${
                        experience ? `(${experience.company})` : ''
                    }`;
                })
                .join(', '),
        [characterList]
    );

    const tagsRender = tagList
        .map((val) =>
            val ? val[i18n.language === 'vi' ? 'nameVi' : 'nameEn'] : ''
        )
        .join(', ');

    const gotoEditPost = () => {
        history.push(`/posts/${post.id}/edit`);
    };

    const deletePostClick = () => {
        deletePost(post)
            .then(() => {
                successAlert(t('posts_delete_success'));
                history.push('/posts');
            })
            .catch((err) => errorAlert(err.response.data.error.message));
    };

    return (
        <Wrapper>
            <ContentWrapper>
                <Title onClick={viewPost}>{title}</Title>
                <Resume onClick={viewPost}>{resume}</Resume>
                {tagsRender && (
                    <TagsWrapper>
                        <LabelIcon />
                        {tagsRender}
                    </TagsWrapper>
                )}
                <CharacterInfos>
                    <MainCharacter>{characterNames}</MainCharacter>
                    <Time dateTime={created}>
                        {` ${new Date(created).toDateString()}`}
                    </Time>
                </CharacterInfos>
            </ContentWrapper>
            {imageUrl && <ImgCover onClick={viewPost} img={imageUrl} alt="" />}
            {isAdmin && (
                <ButtonsWrapper>
                    <IconButton onClick={gotoEditPost}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={deletePostClick}>
                        <DeleteIcon />
                    </IconButton>
                </ButtonsWrapper>
            )}
        </Wrapper>
    );
};

const mapDispatchToProps = (dispatch) => ({
    errorAlert: (text) => dispatch(errorAlertFn(text)),
    successAlert: (text) => dispatch(successAlertFn(text))
});

export default connect(null, mapDispatchToProps)(Post);
