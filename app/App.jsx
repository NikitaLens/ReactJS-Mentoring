import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Switch, Router, Route, hashHistory, browserHistory, Redirect } from 'react-router-dom';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers';
import LoginPage from './pages/LoginPage';
import PostLine from './pages/PostLine';
import UserPage from './pages/UserPage';
import PrivateRoute from "./components/PrivateRoute";
import './styles.scss';

const history = createHistory(browserHistory);

const initialState = {};
const composedEnhancers = compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(reducer, initialState, composedEnhancers);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={PostLine}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <PrivateRoute exact path="/:nick" component={UserPage}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
