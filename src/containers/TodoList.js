/**
 * Created by WebStorm.
 * Project: self_oui
 * User: Anton Kosiak MD
 * Date: 11/28/17
 * Time: 11:03 PM
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTodo, deleteTodoItem, retryAddTodo} from '../actions/TodoActions';
import List from '../components/List';

class TodoList extends Component {

    constructor() {
        super();

        this.state = {
            value: '',
        }
    }

    render() {
        const {todoList, retryAction} = this.props;
        const {value} = this.state;

        return (
            <div>
                <input onChange={this._onChange} value={value}/>
                <button onClick={this._onCLick}>Button</button>
                <div className={'todoList'}>
                    <List list={todoList} retry={retryAction}/>
                </div>
            </div>
        )
    }

    _onCLick = () => {
        const {value} = this.state;
        if (!value) return;
        const {addTodo} = this.props;
        // addTodo([i++]);
        this.setState({value: ''});
        addTodo({text: value});
    }

    _onChange = (event) => {
        this.setState({value: event.target.value});
    }

}

const mapDispatchToProps = {
    addTodo,
    retryAction: retryAddTodo,
};

const mapStateToProps = (store) => {
    return {
        todoList: store.todo.todoList,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);