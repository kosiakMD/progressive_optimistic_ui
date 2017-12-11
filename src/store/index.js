/**
 * Created by WebStorm.
 * Project: self_oui
 * User: Anton Kosiak MD
 * Date: 11/28/17
 * Time: 10:14 PM
 */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducer from '../reducers';
import API from '../api';
import middleware from '../middleware/middle';

const middlewares = [
    thunk,
    middleware,
];

export const store = createStore(
    // optimism(combinedReducer),
    combinedReducer,
    {},
    compose(
        applyMiddleware(...middlewares),
    )
);

// const optimisticStore = optimism(store);

API.init(store);

export default store;
// export default optimisticStore;
