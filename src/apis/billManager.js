import billsMock from '__mocks__/bills.json';

const getBills = () => {
  return Promise.resolve(billsMock);
};

export { getBills };
