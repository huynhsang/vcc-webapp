import React from 'react';
import styled from 'styled-components';

import UserInfo from './UserInfo';
import { team } from './VCNC-team.constant';

import { useSwipe } from '../../hooks/useSwipe';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px 5px;
`;

const ListShown = styled.div`
    width: calc(100% - 80px);
    height: 150px;
    overflow: hidden;
    position: relative;
`;

const List = styled.div`
    display: flex;
    justify-content: ${p => p.justifyContent};
    user-select: none;
    position: absolute;
    width: 100%;
    height: 100%;
`;

const UserInfoList = () => {
    const listRef = React.useRef(null);

    const [iniPos, setIniPos] = React.useState(0);
    const [scrollLength, setScrollLength] = React.useState(0);
    const [scrollLimitSize, setScrollLimitSize] = React.useState(0);

    const [justifyContent, setJustifyContent] = React.useState('start');

    const setLimitSize = () => {
        if (listRef.current) {
            const { offsetWidth, scrollWidth } = listRef.current;
            const limit = scrollWidth - offsetWidth;
            setScrollLimitSize(limit);
            if (limit > 0) {
                setJustifyContent('start');
            } else {
                setJustifyContent('center');
            }
        }
    };

    React.useEffect(() => {
        setLimitSize();
        window.addEventListener('resize', setLimitSize);
        return () => {
            window.removeEventListener('resize', setLimitSize);
        };
    }, []);

    const { listEvent = {} } = useSwipe({
        isActive: true,
        direction: 'horizontal',
        positiveLimit: Math.max(-iniPos, 0),
        negativeLimit: Math.min(0, -scrollLimitSize - iniPos),
        moveCb: length => {
            console.log(length);
            setScrollLength(length);
        },
        endCb: () => {
            setScrollLength(0);
            setIniPos(scrollLength + iniPos);
        }
    });

    const scroll = direction => () => {
        if (direction === 'left' && iniPos < 0) {
            setIniPos(Math.max(iniPos + 100, 0));
        } else if (direction === 'right' && scrollLimitSize + iniPos > 0) {
            setIniPos(Math.max(iniPos - 100, -scrollLimitSize));
        }
    };

    const userInfos = team.map(val => <UserInfo key={val.name} {...val} />);

    const toScroll = scrollLimitSize > 0;

    return (
        <Wrapper>
            {toScroll && (
                <IconButton onClick={scroll('left')}>
                    <ChevronLeft />
                </IconButton>
            )}
            <ListShown>
                <List
                    ref={listRef}
                    {...listEvent}
                    style={{ left: iniPos + scrollLength + 'px' }}
                    justifyContent={justifyContent}
                >
                    {userInfos}
                </List>
            </ListShown>
            {toScroll && (
                <IconButton onClick={scroll('right')}>
                    <ChevronRight />
                </IconButton>
            )}
        </Wrapper>
    );
};

export default UserInfoList;
