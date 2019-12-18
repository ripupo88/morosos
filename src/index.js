import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './index.css';
//Router
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
//Routes
import Admin from './layouts/Admin.js';
import login from './layouts/login.js';
//service Worker
import * as serviceWorker from './serviceWorker';
//apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'http://217.61.21.176:4000',
    headers: {
        authorization: 'Bearer ' + localStorage.getItem('token')
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Switch>
                <Route path='/admin' component={Admin} />
                <Route path='/login' component={login} />
                <Redirect from='/' to='/login' />
            </Switch>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
