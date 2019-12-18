import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
//lista
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import { ListItemIcon } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

export default function ResList(props) {
    const classes = useStyles();
    let campos = props.infoSent;
    return (
        <List key={campos.id} className={classes.root}>
            <ListItem
                component={Link}
                to={{
                    pathname: `/admin/${campos.nif}`,
                    state: { campos }
                }}
            >
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={campos.nombre}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component='span'
                                variant='body2'
                                className={classes.inline}
                                color='textPrimary'
                            >
                                {campos.importe}€ -{' '}
                                {campos.cobrado ? 'cobrado' : 'Pendiente'}
                                <br />
                            </Typography>
                            {campos.fecha}
                        </React.Fragment>
                    }
                />
                <ListItemIcon>
                    {campos.cobrado ? (
                        <CheckCircleIcon htmlColor='green' />
                    ) : (
                        <WarningIcon htmlColor='red' />
                    )}
                </ListItemIcon>
            </ListItem>
        </List>
    );
}
