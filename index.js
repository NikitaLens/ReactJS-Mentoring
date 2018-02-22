import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Switch, Router, Route, hashHistory, browserHistory } from 'react-router-dom';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import UserPage from './userpage.jsx';
import PostLine from './postline.jsx';
import LoginPage from './loginpage.jsx';
//import './stylesless.less';
import './styles.scss';

const history = createHistory(browserHistory);

const initialState = {};
const composedEnhancers = compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)
const store = createStore(reducer, initialState, composedEnhancers);

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Switch>                
                <Route exact path="/" component={PostLine}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/:nick" component={UserPage}/>
            </Switch>
        </Router>
    </Provider>
), document.getElementById('app'));
