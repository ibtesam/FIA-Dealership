import { useState } from "react";

const useGridRequest = (props) => {
    const INITIAL_VALUES = {
        offset: 0,
        searchBy: props?.searchBy ?? "",
    };
    const [gridRequest, setGridRequest] = useState(INITIAL_VALUES);

    const onSearch = (searchValue) => {
        const request = { ...gridRequest, searchBy: searchValue };
        request.offset = 0;
        setGridRequest(request);
    };

    const onDateSearch = (fromDate, toDate) => {
        const request = { ...gridRequest, fromDate: fromDate, toDate: toDate }
        setGridRequest(request)
    }

    const resetPayload = () => {
        const request = { ...gridRequest, ...INITIAL_VALUES };
        setGridRequest(request);
    };

    return {
        gridRequest,
        onSearch,
        resetPayload,
        onDateSearch
    };
};

export default useGridRequest;
