import React, { useCallback } from "react";

const useFilter = () => {
    const [filter, setFilter] = React.useState({
        "title": {
            value: null,
            exact: false
        },
        "is_active": {
            value: true,
            exact: true
        }
    });

    const doFilter = useCallback(async (value) => {
        setFilter((v) => ({
            ...v,
            title: {
                ...v.title,
                value: value
            }
        }));
    }, [filter]);

    return {
        filter, doFilter
    };
}

export default useFilter;