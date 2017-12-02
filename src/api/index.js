/**
 * Created by WebStorm.
 * Project: self_oui
 * User: Anton Kosiak MD
 * Date: 11/28/17
 * Time: 10:16 PM
 */

class API {

    init(store) {
        this._dispatch = store.dispatch;
    }

    post() {
        return Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(new Date());
            }, 1000);
        })
    }
}

export default new API();