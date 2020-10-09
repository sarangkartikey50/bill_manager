import * as billManagerTypes from 'redux/actionTypes/billManager';

const initState = {
  bills: [],
  billsLoading: false,
  billsError: {},
};

export default function(state = initState, { type, payload }) {
  switch(type) {
    case billManagerTypes.GET_BILLS: 
      return {
        ...state,
        billsLoading: true,
        billsError: {},
      };

    case billManagerTypes.GET_BILLS_SUCCESS: 
      return {
        ...state,
        billsLoading: false,
        bills: payload,
      };

    case billManagerTypes.GET_BILLS_ERROR:
      return {
        ...state,
        billsLoading: false,
        bills: payload,
      };

    default: return state;
  }
}