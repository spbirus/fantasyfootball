import isPromise from 'is-promise';

const errorMiddleware = () => (next) => (action) => {
  if (!isPromise(action.payload)) {
    return next(action);
  }

  return next(action).catch((error) => {
    console.error(error);
    return error;
  });
};

export default errorMiddleware;
