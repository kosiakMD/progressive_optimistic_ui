/**
 * Created by WebStorm.
 * Project: self_oui
 * User: Anton Kosiak MD
 * Date: 11/28/17
 * Time: 10:18 PM
 */
import { combineReducers } from 'redux';
import todo from './todo';
import optimism from '../optimism';

export default optimism(combineReducers({
    todo,
}));