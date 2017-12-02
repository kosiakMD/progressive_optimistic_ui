/**
 * Created by WebStorm.
 * Project: self_oui
 * User: Anton Kosiak MD
 * Date: 11/28/17
 * Time: 10:19 PM
 */

import { INIT_TODO_LIST } from '../actions';
import { createReducer } from '../utils/index';

const defaultState = {
    todoList: []
};

export default createReducer(defaultState, (state, action) => {
    switch (action.type) {

        case INIT_TODO_LIST: {
            return {
                ...state,
                todoList: action.payload,
            }
        }
        default: {
            return state;
        }
    }
})