/**
 * Created by WebStorm.
 * Project: self_oui
 * User: Anton Kosiak MD
 * Date: 11/28/17
 * Time: 11:42 PM
 */

export const OUI_PENDING = '@@optimist/PENDING';
export const OUI_SUCCESS = '@@optimist/SUCCESS';
export const OUI_FAIL = '@@optimist/FAIL';

export const genId = function*() {
    let index = 0;
    while(true) {
        yield index++;
    }
};
const _id = genId();

export const getId = () => _id.next().value;

let realState = {};
let optimistState = {};
const stack = new Map();
const realisticStack = new Map();

const getRealState = () => realState;
const getOptimisticState = () => ({...optimistState});

export default (reducer) => {
    console.log('optimism init');

    return (state, action) => {

        if (state === undefined || action.type === '@@redux/INIT') {
            realState = reducer(state, action);
            optimistState = {...realState};
        } else {
            if (action.meta && action.meta.optimistic) {
                console.log('action.meta.optimistic', action.meta.id, action.meta.type);
                if (action.meta.type === OUI_PENDING) {
                    stack.set(action.meta.id, action);
                    realisticStack.set(action.meta.id, action);
                } else if (action.meta.type === OUI_SUCCESS) {
                    const actionToApply = stack.get(action.meta.id);
                    const {optimisticResponse, updater} = actionToApply.meta;
                    if (updater) {
                        const nextAction = updater(getRealState, action.payload);
                        realState = reducer(state, {...actionToApply, ...nextAction});
                    } else if (optimisticResponse) {
                        const nextAction = optimisticResponse(getRealState);
                        realState = reducer(state, {...actionToApply, ...nextAction});
                    } else {
                        realState = reducer(state, actionToApply);
                    }
                    stack.delete(action.meta.id);
                    realisticStack.delete(action.meta.id);
                } else if (action.meta.type === OUI_FAIL) {
                    const actionToApply = stack.get(action.meta.id);
                    const {updater} = actionToApply.meta;
                    if (updater) {
                        const nextAction = updater(getRealState, action.payload);
                        realState = reducer(state, {...actionToApply, ...nextAction});
                    }
                    stack.delete(action.meta.id);
                    realisticStack.delete(action.meta.id);
                }
            } else {
                realState = reducer(state, action);
            }

            optimistState = {...realState};

            stack.forEach((actionToApply) => {
                const {optimisticResponse, optimisticUpdate} = actionToApply.meta;
                if (optimisticUpdate) {
                    const nextAction = optimisticUpdate(getOptimisticState);
                    optimistState = reducer(optimistState, {...actionToApply, ...nextAction});
                } else if (optimisticResponse) {
                    const nextAction = optimisticResponse(getOptimisticState);
                    optimistState = reducer(optimistState, {...actionToApply, ...nextAction});
                } else {
                    optimistState = reducer(optimistState, actionToApply);
                }
            });
        }

        return {
            ...optimistState,
            get __realState() {
                return realState
            },
            get __realisticStack() {
                return Array.from(realisticStack.values());
            }
        };
    };
}