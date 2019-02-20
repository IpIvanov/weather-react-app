import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './containers/App/App';
import Details from './containers/Details/Details';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const middleware = [thunk, promise]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" exact component={App} />
                <Route path="/details/:id" component={Details} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
)