import React from 'react';

const useOutClick = handleClose => {
    const outClickRef = React.useRef();

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
