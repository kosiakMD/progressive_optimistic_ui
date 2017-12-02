/**
 * Created by WebStorm.
 * Project: self_oui
 * User: Anton Kosiak MD
 * Date: 11/28/17
 * Time: 11:09 PM
 */

import { INIT_TODO_LIST, SUCCESS_TODO_LIST, FAIL_TODO_LIST } from './index';
import { getId, OUI_PENDING, OUI_SUCCESS, OUI_FAIL } from '../optimism';
import {createPureAction} from "../utils/index";

export const initTodoList = createPureAction(INIT_TODO_LIST);

export const addTodoToList = (todoItem, id) => ({
    type: INIT_TODO_LIST,
    meta: {
        optimistic: true,
        describe: 'Try add to list with ID #' +id,
        type: OUI_PENDING,
        id,
        optimisticUpdate: (getState) => {
            let nextList = [...getState().todo.todoList];
            nextList.push({...todoItem});
            return {
                payload: nextList
            };
        },
        updater: (getState, data) => {
            let nextList = [...getState().todo.todoList];
            let nextAction;
            if (data.date) {
                nextList.push({...todoItem, date: data.date});
                nextAction = {
                    payload: nextList
                };
            } else if (data.error) {
                nextList.push({...todoItem, error: data.error});
                nextAction = {
                    payload: nextList
                };
            }
            return nextAction;
        },
    }
});

export const successTodoList = (id, data) => ({
    payload: data,
    type: SUCCESS_TODO_LIST,
    meta: {
        optimistic: true,
        type: OUI_SUCCESS,
        id,
    }
});

export const failTodoList = (id, data) => ({
    payload: data,
    type: FAIL_TODO_LIST,
    meta: {
        optimistic: true,
        type: OUI_FAIL,
        id,
    }
});

export const deleteTodoItem = (todoItemId) => (dispatch, getState) => {
    const index = getState().__realState.todo.todoList.findIndex(item => item.id === todoItemId);
    const itemToRetry = getState().__realState.todo.todoList.splice(index, 1)[0];
    // const newList = [...getState().__realState.todo.todoList];
    // dispatch(initTodoList(newList));
    return itemToRetry;
}

export const retryAddTodo = (todoItemId) => dispatch => {
    const itemToRetry = dispatch(deleteTodoItem(todoItemId));
    dispatch(addTodo({text: itemToRetry.text}));
}

export const addTodo = (todoItem) => (dispatch, getState) => {
    // let newList = [...getState().todo.todoList];
    // newList.push(todoItem);
    const id = getId();
    dispatch(addTodoToList({...todoItem, id}, id));
    const time = 2e3;
    setTimeout(() => {
        if (id % 2) {
            console.log('failTodoList', id);
            dispatch(failTodoList(id, {error: 'Error message'}));
        } else {
            console.log('successTodoList', id);
            dispatch(successTodoList(id, {date: new Date()}));
        }
    }, time)
};