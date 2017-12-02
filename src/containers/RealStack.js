/**
 * Created by WebStorm.
 * Project: self_oui
 * User: Anton Kosiak MD
 * Date: 11/29/17
 * Time: 4:44 PM
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

class RealStack extends Component {

    render() {
        const {stack} = this.props;

        return (
            <div className={'realStack'}>
                <div>actions in progress: {stack.length}</div>
                <div>{this._getActions()}</div>
            </div>
        )
    }

    _getActions = () => {
        const {stack} = this.props;

        return stack.map((value, index) => {
            return <div key={index}>{value.meta.describe}</div>
        });
    }

}

const matStateToProps = (state) => ({
    stack: state.__realisticStack,
});

export default connect(matStateToProps)(RealStack);