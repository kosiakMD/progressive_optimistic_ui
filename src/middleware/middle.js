/**
 * Created by WebStorm.
 * Project: self_oui
 * User: Anton Kosiak MD
 * Date: 11/28/17
 * Time: 11:00 PM
 */

import { createPureAction } from '../utils/index';

const middleware = currentStore => next => action => {
    // console.log('middleware', '\n', action, '\n', currentStore, '\n', next, '\n', currentStore.subscribe);

    next(action);
};

export default middleware;