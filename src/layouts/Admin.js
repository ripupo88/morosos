import React, { useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

// @material-ui/core components
// core components
//appbar
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Person from '@material-ui/icons/Person';

import GridItem from '../components/Grid/GridItem';
import GridContainer from '../components/Grid/GridContainer';

//views
import Search from '../views/search';
import Info from '../views/info';

//import routes from 'routes.js';
import styles from '../assets/styles/adminStyle';

//import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';
// const switchRoutes = (
//     <Switch>
//         {routes.map((prop, key) => {
//             if (prop.layout === '/admin') {
//                 return (
//                     <Route
//                         exact
//                         path={prop.layout + prop.path}
//                         component={prop.component}
//                         key={key}
//                         {...(prop.routes !== undefined ? prop.routes : null)}
//                     />
//                 );
//             }
//             return null;
//         })}
//         <Redirect from='/admin' to='/admin/dashboard' />
//     </Switch>
// );

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
    const [loged, setLoged] = useState(localStorage.getItem('token') || '');
    const classes = useStyles();
    if (loged === '') return <Redirect to='/login' />;
    return (
        <div>
            <div
                style={{
                    textAlign: 'center',
                    maxWith: '50%',
                    paddingTop: '10%',
                    paddingBottom: '50px'
                }}
            >
                <Switch>
                    <Route exact path='/admin'>
                        <Search />
                    </Route>
                    <Route path='/admin/:id'>
                        <Info />
                    </Route>
                </Switch>
            </div>
            <div>
                <AppBar
                    color='inherit'
                    position='fixed'
                    className={classes.appBar}
                >
                    <Toolbar>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <IconButton
                                    disabled={
                                        window.location.pathname !== '/admin'
                                    }
                                    component={Link}
                                    to='/admin/nuevo'
                                    color='inherit'
                                >
                                    <Person />
                                </IconButton>
                            </GridItem>
                        </GridContainer>
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    );
}
