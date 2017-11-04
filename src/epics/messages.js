export default (action$, store) => {
  return action$
    .ofType('SESSION_HWID_FULFILLED')
    .switchMap((action) => { //mergeMap
      return store.getState().feathers.socketio.service(process.env.REACT_APP_ROUTE_API_V1 + 'message')
        .find()
        .map((payload) => {
          return { type: 'MESSAGE_FULFILLED', payload: payload };
        })
        .takeUntil(action$.ofType('MESSAGE_CANCELLED'))
        .catch((error) => {
          return [{ type: 'MESSAGE_REJECTED', payload: error }];
        })
        .startWith({ type: 'MESSAGE_PENDING' });
    });
}
