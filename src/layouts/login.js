//apollo client
//apollo client
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//import { createBrowserHistory } from 'history';
import { Redirect } from 'react-router-dom';
// import { resolve } from 'dns';
// const history = createBrowserHistory({ forceRefresh: false });

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://material-ui.com/'>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: 'http://217.61.21.176:4000/',
        headers: {
            authorization: localStorage.getItem('token'),
            'client-name': 'Space Explorer [web]',
            'client-version': '1.0.0'
        }
    })
});

let miclient = (user, pass) => {
    return new Promise((resolve, reject) => {
        client
            .query({
                query: gql`
                    query {
                        login(username: "${user}", password: "${pass}") {
                            token
                            user
                        }
                    }
                `
            })
            .then(result => resolve(result))
            .catch(error => console.log(error));
    });
};

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        textAlign: 'center',
        width: '75%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function SignIn() {
    const classes = useStyles();
    const [loged, setLoged] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    let handleChangeMail = e => {
        setUser(e.target.value);
    };
    let handleChangePass = e => {
        setPass(e.target.value);
    };
    let entrando = async e => {
        setUser('');
        setPass('');
        console.log('click');
        e.preventDefault();
        let loginUser = await miclient(user, pass);
        if (!loginUser) {
            console.log(user);
            return;
        }
        let token = loginUser.data.login.token;
        localStorage.setItem('token', token);
        setLoged(localStorage.getItem('token') || '');
    };
    if (loged !== '') return <Redirect to='/admin' />;
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                {/* <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar> */}
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>
                <Typography component='h1' variant='h5'>
                    {loged}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        value={user}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='user'
                        label='Usuario'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        onChange={handleChangeMail}
                    />
                    <TextField
                        value={pass}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Contraseña'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        onChange={handleChangePass}
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        onClick={entrando}
                    >
                        Entrar
                    </Button>
                </form>
            </div>
        </Container>
    );
}
