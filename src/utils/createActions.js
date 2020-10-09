import camelCase from 'lodash/camelCase';

export default function createActions(types) {
  const actions = {};
  Object.values(types).forEach(type => {
    actions[camelCase(type)] = payload => ({ type, payload });
  });
  return actions;
}