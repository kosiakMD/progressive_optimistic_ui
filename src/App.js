import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import TodoList from './containers/TodoList';
import RealStack from './containers/RealStack';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to Progressive Optimistic UI</h1>
                    </header>
                    <p className="App-intro">
                        Each odd submit will be failed. Delay result - 2 seconds.
                    </p>
                    <RealStack/>
                    <TodoList/>
                </div>
            </Provider>
        );
    }
}

export default App;
