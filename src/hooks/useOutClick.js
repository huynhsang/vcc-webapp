import React from 'react';
import PropTypes from 'prop-types';

const useOutClick = handleClose => {
    const outClickRef = React.useRef();

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [handleClose]);

    const handleClickOutside = event => {
        if (
            outClickRef &&
            outClickRef.current &&
            !outClickRef.current.contains(event.target)
        ) {
            handleClose();
        }
    };

    return outClickRef;
};

export default useOutClick;
