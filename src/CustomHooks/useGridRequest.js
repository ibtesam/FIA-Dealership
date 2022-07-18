import {useState} from "react";
import {PAGE_SIZE} from "../constants/APIs";
const useGridRequest = () => {
  const INITIAL_VALUES = {
    FullName: "",
    Page: 1,
    Limit: PAGE_SIZE,
  };
  const [gridRequest, setGridRequest] = useState(INITIAL_VALUES);

  const onSearch = searchValue => {
    const request = {...gridRequest, FullName: searchValue.toString()};
    request.Page = 1;
    setGridRequest(request);
  };

  const onTypeFilter = type => {
    const request = {...INITIAL_VALUES, ...type};
    request.Page = 1;
    setGridRequest(request);
  };

  const onStatusFilter = status => {
    const request = {...INITIAL_VALUES, ...status};
    request.Page = 1;
    setGridRequest(request);
  };

  const onDateSearch = (fromDate, toDate) => {
    const request = {
      ...gridRequest,
      SubmittedDate: {From: fromDate, To: toDate},
    };
    setGridRequest(request);
  };

  const onPagination = page => {
    const request = {...gridRequest, Page: page - 1};
    setGridRequest({
      ...request,
    });
  };

  const resetPayload = () => {
    const request = {...INITIAL_VALUES};
    setGridRequest(request);
  };

  return {
    gridRequest,
    onSearch,
    onPagination,
    resetPayload,
    onDateSearch,
    onTypeFilter,
    onStatusFilter,
  };
};

export default useGridRequest;
