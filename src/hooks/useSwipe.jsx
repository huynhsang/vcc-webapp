import * as React from 'react';

type Direction = 'horizontal' | 'vertical';

interface UseSwipeParams {
    isActive: Boolean;
    direction?: Direction;
    positiveLimit: number;
    negativeLimit: number;
    moveCb: (longueur: number) => void;
    startCb?: () => void;
    endCb?: () => void;
}

/**
 * UseSwipe hook
 *
 * @param isActive if we ennable component to swipe
 * @param direction there are two direction 'horizontal' or 'vertical'
 * @param positiveLimit (en px) the maximum size to scroll in positive direction
 * @param negativeLimit (en px) the maximum size to scroll in negative direction
 * @param moveCb pointer move callback
 * @param startCb pointer down callback
 * @param endCb pointer up callback
 * @returns {listEvent, isScrolling}
 *   listEvent: is used to assign to Component
 *   isScrolling if event is running
 *
 */
export function useSwipe({
    direction = 'horizontal',
    startCb = () => {},
    moveCb,
    endCb = () => {},
    positiveLimit,
    negativeLimit,
    isActive
}: UseSwipeParams) {
    const timeoutRef = React.useRef(0);
    React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const [isSwipeStarted, setIsSwipeStarted] = React.useState(false);
    const [firstPosition, setFirstPosition] = React.useState(0);
    const [isScrolling, setIsScrolling] = React.useState(false);

    const isBrowserTouch = 'ontouchstart' in document.documentElement;

    const attributToget = direction === 'horizontal' ? 'clientX' : 'clientY';

    const getPosition = (
        ev: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent
    ) => {
        return (isBrowserTouch ? ev.touches[0] : ev)[attributToget];
    };

    React.useEffect(() => {
        const action = isBrowserTouch ? 'touchmove' : 'mousemove';
        document.addEventListener(action, swipeMove);
        return () => {
            document.removeEventListener(action, swipeMove);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSwipeStarted]);

    React.useEffect(() => {
        const action = isBrowserTouch ? 'touchend' : 'mouseup';
        document.addEventListener(action, swipeEnd);
        return () => {
            document.removeEventListener(action, swipeEnd);
        };
    });

    /**
     * Handle the pointer on the chapters rendered
     */
    const swipeStart = (ev: React.MouseEvent | React.TouchEvent) => {
        ev.stopPropagation();
        ev.preventDefault();

        if (isSwipeStarted) {
            return;
        }

        const position = getPosition(ev);

        setIsSwipeStarted(true);
        setFirstPosition(position);
        startCb();
    };

    /**
     * Move the left or right during the holding mouse
     */
    const swipeMove = (ev: MouseEvent | TouchEvent) => {
        ev.stopPropagation();
        ev.preventDefault();
        const position = getPosition(ev);

        const scrollSize = position - firstPosition;

        // In ios, function hanldeMove is catched even if the movement is 0
        if (!isSwipeStarted || scrollSize === 0) {
            return;
        }

        if (!isScrolling) {
            setIsScrolling(true);
        }

        if (scrollSize < 0) {
            if (scrollSize > negativeLimit) {
                moveCb(scrollSize);
            } else {
                moveCb(negativeLimit);
            }
        } else if (scrollSize > 0) {
            if (scrollSize < positiveLimit) {
                moveCb(scrollSize);
            } else {
                moveCb(positiveLimit);
            }
        }
    };

    /**
     * Delay for preventing the propagation after scroll
     */
    const setScrollingStop = () => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(function() {
            setIsScrolling(false);
        }, 100);
    };

    /**
     * Handle event when the user stop scrolling
     */
    const swipeEnd = async (ev?: MouseEvent | TouchEvent) => {
        if (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        }
        if (isSwipeStarted) {
            setIsSwipeStarted(false);
            setScrollingStop();
            endCb();
        }
    };

    const listEvent = isActive
        ? isBrowserTouch
            ? {
                  onTouchStart: swipeStart
              }
            : {
                  onMouseDown: swipeStart
              }
        : {};

    return { listEvent, isScrolling };
}
