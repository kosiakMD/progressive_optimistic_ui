export const bindArgsToTheEnd = (fn, ...boundArgs) => (...args) => fn(...args, ...boundArgs);

// export const bindToContext = (context, ...methods) => {
//     methods.forEach((method) => {
//         context[method] = context[method].bind(context);
//     });
// };
//
// export function splitArray(array, splitNumber) {
//     let result = [];
//     let resultIndex = 0;
//
//     array.map((element, index.js) => {
//         let tempArray = result[resultIndex];
//         if ( tempArray ) {
//             tempArray.push(element);
//         } else {
//             result[resultIndex] = [element];
//         }
//         let nextIndex = index.js + 1;
//         if ( !(nextIndex % splitNumber) ) resultIndex++;
//     });
//
//     return result;
// }

export const createReducer = (defaultState, reducer) => {

    const reducerFunction = (state = defaultState, action, id) => {
        let result;

        if ( !!id && !!action.id && (id !== action.id) ) {
            result = state;
        } else {
            result = reducer(state, action);
        }

        return result;
    }

    reducerFunction.bindId = (id) => bindArgsToTheEnd(reducerFunction, id);

    return reducerFunction;
}

export const bindIdToReducer = (fn, id) => bindArgsToTheEnd(fn, id);

export const createPureAction = (type) => (payload, id) => {
    return { type, payload, id }
};

export const createAsyncAction = (type) => async dispatch => (payload, id)=> {
    return { type, payload, id }
};
