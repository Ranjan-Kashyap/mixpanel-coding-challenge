import {useCallback, useReducer} from 'react';

const dataFetchReducer = () => (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        isLoading: false,
        isError: false,
        data: null,
      };
    case 'FETCH_START':
      return {
        isLoading: true,
        isError: false,
        data: null,
      };
    case 'FETCH_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        isLoading: false,
        isError: true,
        data: null,
      };
    default:
      throw new Error();
  }
};

const experimentsVariants = ['A', 'B'];
const apiFunction = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const result =
        experimentsVariants[
          Math.floor(Math.random() * experimentsVariants.length)
        ];
      resolve(result);
    }, 5000);
  });

const useApiData = () => {
  const [state, dispatch] = useReducer(dataFetchReducer(), {
    isLoading: false,
    isError: false,
    data: null,
  });
  const request = useCallback(async () => {
    dispatch({type: 'FETCH_START'});
    try {
      const result = await apiFunction();

      dispatch({type: 'FETCH_SUCCESS', payload: result});
      return result;
    } catch (error) {
      dispatch({type: 'FETCH_FAILURE'});
      return error;
    }
  }, []);

  return [state, request];
};

export default useApiData;
