import React from 'react';
import { useStateLayer } from "../../StateLayer/StateLayer";

export function useResizeHandler() {
    const [{ userListOffsetHeight }, dispatch] = useStateLayer();
    const ref = React.useRef();

    React.useEffect(() => {
        if (ref) {
            dispatch({ type: 'SET_USER_LIST_OFFSET_HEIGHT', payload: ref.current?.offsetWidth })
        }
    }, [ref]);

    React.useEffect(() => {
        const handleResize = () => {
            if (ref.current?.offsetWidth !== userListOffsetHeight) {
                dispatch({ type: 'SET_USER_LIST_OFFSET_HEIGHT', payload: ref.current?.offsetWidth });
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return { ref }
}