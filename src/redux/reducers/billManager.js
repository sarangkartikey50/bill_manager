import * as billManagerTypes from 'redux/actionTypes/billManager';
import { MONTH_MAP, MONTHLY_BUDGET } from 'constants/billManager';

const initState = {
  bills: [],
  billsById: {},
  billsLoading: false,
  billsError: {},
  categories: [],
  timeSeriesChartData: [],
};

const getBillsToBePaidByMonth = (bills) => {
  const groupByMonth = {};
  const billsById = {};
  bills.forEach((bill) => {
    const date = new Date(bill.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const key = `${month}-${year}`;
    billsById[bill.id] = bill;
    if (!groupByMonth[key]) groupByMonth[key] = [];
    groupByMonth[key].push(bill);
  });
  Object.keys(groupByMonth).forEach((key) => {
    const monthlyBillSortedArray = groupByMonth[key].sort(
      (a, b) => a.amount - b.amount
    );
    let totalAmount = 0;
    monthlyBillSortedArray.forEach((bill) => {
      totalAmount += Number(bill.amount);
      if (totalAmount <= MONTHLY_BUDGET) {
        billsById[bill.id] = { ...bill, canBePaid: true };
      } else {
        billsById[bill.id] = { ...bill, canBePaid: false };
      }
    });
  });
  return billsById;
};

const getTimeSeriesChartData = (bills) => {
  const timeSeriesObj = {};
  const timeSeriesChartData = [];
  bills.forEach((bill) => {
    const date = new Date(bill.date);
    const monthIndex = date.getMonth();
    const month = MONTH_MAP[monthIndex];
    const key = `${month}-${date.getFullYear()}`;
    let keyAmount = timeSeriesObj[key]?.amount ?? 0;
    timeSeriesObj[key] = {
      month: key,
      amount: keyAmount + Number(bill.amount),
    };
  });
  Object.keys(timeSeriesObj).forEach((key) => {
    timeSeriesChartData.push(timeSeriesObj[key]);
  });
  return timeSeriesChartData;
};

const getCategories = (bills) => {
  let categories = [];
  bills.forEach(
    (bill) =>
      !categories.includes(bill.category) && categories.push(bill.category)
  );
  return categories;
};

export default function (state = initState, { type, payload }) {
  switch (type) {
    case billManagerTypes.GET_BILLS:
      return {
        ...state,
        billsLoading: true,
        billsError: {},
      };

    case billManagerTypes.GET_BILLS_SUCCESS: {
      const billsById = getBillsToBePaidByMonth(payload);
      const timeSeriesChartData = getTimeSeriesChartData(payload);
      const bills = payload.map((bill) => billsById[bill.id]);
      const categories = getCategories(payload);
      return {
        ...state,
        billsLoading: false,
        bills,
        billsById,
        categories,
        timeSeriesChartData,
      };
    }

    case billManagerTypes.GET_BILLS_ERROR:
      return {
        ...state,
        billsLoading: false,
        bills: payload,
      };

    case billManagerTypes.DELETE_BILL: {
      let { bills } = state;
      bills = bills.filter((bill) => bill.id !== payload);
      return {
        ...state,
        bills,
      };
    }

    case billManagerTypes.UPDATE_BILL: {
      let { bills, billsById } = state;
      if (!payload.id) payload.id = bills.length;
      billsById[payload.id] = payload;
      bills = bills.map((bill) => {
        if (bill.id === payload.id) {
          return payload;
        }
        return bill;
      });
      return {
        ...state,
        bills,
      };
    }

    default:
      return state;
  }
}
