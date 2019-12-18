//React
import React from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
//material
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import InputAdornment from '@material-ui/core/InputAdornment';
//Iconos
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import jwt from 'jsonwebtoken';
//aviso
import Snackbar from '@material-ui/core/Snackbar';
//apollo
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

//usando apollo
const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: 'http://217.61.21.176:4000/',
        headers: {
            //authorization: localStorage.getItem('token'),
            'client-name': 'Space Explorer [web]',
            'client-version': '1.0.0'
        }
    })
});
let miclient = sendData => {
    return new Promise((resolve, reject) => {
        client
            .mutate({
                mutation: gql`
                    mutation {
                        registro(
                            id: "${sendData.id}"
                            nombre: "${sendData.nombre}"
                            nif: "${sendData.nif}"
                            matricula: "${sendData.matricula}"
                            importe: ${sendData.importe}
                            motivo: "${sendData.motivo}"
                            fecha: "${sendData.fecha}"
                            cobrado: ${sendData.cobrado}
                            trabajador: "${sendData.trabajador}"
                        ) {
                            nombre
                        }
                    }
                `
            })
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
};

export default function Info(e) {
    //hooks
    let myInfo = useLocation().state;
    let param = useParams();
    console.log(myInfo);
    let isNew;
    param.id === 'nuevo' ? (isNew = true) : (isNew = false);

    const [open, setOpen] = React.useState(false);
    const [nameA, setNameA] = React.useState(isNew ? '' : myInfo.campos.nombre);
    const [nifNie, setNifNie] = React.useState(isNew ? '' : myInfo.campos.nif);
    const [matric, setMatric] = React.useState(
        isNew ? '' : myInfo.campos.matricula
    );
    const [impt, setImpt] = React.useState(isNew ? '' : myInfo.campos.importe);
    const [causa, setCausa] = React.useState(isNew ? '' : myInfo.campos.motivo);
    const [cobrado, setCobrado] = React.useState(
        isNew ? false : myInfo.campos.cobrado
    );
    const [estado, setEstado] = React.useState(
        isNew ? 'pendiente' : myInfo.campos.cobrado ? 'Cobrado' : 'pendiente'
    );
    let readOnly = isNew ? false : true;
    let user, time;
    let id = isNew ? 'algo' : myInfo.campos.id;

    //asigna valor a user
    let history = useHistory();
    const handleClick = event => {
        if (!nameA || !nifNie || !matric || !impt || !causa) {
            setOpen(true);
        } else {
            jwt.verify(localStorage.getItem('token'), 'solomoroso', function(
                err,
                decoded
            ) {
                if (err) {
                    console.log(err);
                }
                user = decoded.username;
            });
            time = Date.now();

            let sendData = {
                id,
                nombre: nameA,
                nif: nifNie,
                matricula: matric,
                importe: impt,
                motivo: causa,
                fecha: time,
                cobrado,
                trabajador: user
            };
            console.log(sendData);
            miclient(sendData)
                .then(a => {
                    console.log(a);
                })
                .catch(e => {
                    console.log(e);
                });
            history.push('/admin');
            return;
        }
    };

    const handleChange = name => event => {
        if (estado === 'pendiente') {
            setEstado('cobrado');
        } else {
            setEstado('pendiente');
        }
        setCobrado(event.target.checked);
    };
    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                ContentProps={{
                    'aria-describedby': 'message-id'
                }}
                message={<span id='message-id'>Rellene todos los campos</span>}
            />
            <div>
                <TextField
                    style={{ width: '90%' }}
                    label='Nombre y Apellidos'
                    id='inputName'
                    defaultValue={nameA}
                    size='small'
                    InputProps={{
                        readOnly
                    }}
                    //value={nameA}
                    onBlur={e => setNameA(e.target.value)}
                />
            </div>
            <div style={{ paddingTop: 25 }}>
                <TextField
                    style={{ width: '90%' }}
                    label='NIF'
                    id='inputNif'
                    defaultValue={nifNie}
                    size='small'
                    InputProps={{
                        readOnly
                    }}
                    onBlur={e => setNifNie(e.target.value)}
                />
            </div>
            <div style={{ paddingTop: 25 }}>
                <TextField
                    style={{ width: '90%' }}
                    label='Matricula'
                    id='inputmatric'
                    defaultValue={matric}
                    size='small'
                    InputProps={{
                        readOnly
                    }}
                    onBlur={e => setMatric(e.target.value)}
                />
            </div>
            <div style={{ paddingTop: 25 }}>
                <TextField
                    style={{ width: '90%' }}
                    label='Importe'
                    id='inputimpt'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>€</InputAdornment>
                        ),
                        readOnly
                    }}
                    defaultValue={impt}
                    size='small'
                    type='number'
                    onBlur={e => setImpt(e.target.value)}
                />
            </div>
            <div style={{ paddingTop: 35 }}>
                <TextField
                    style={{ width: '90%' }}
                    id='imputCausa'
                    label='Causa'
                    multiline
                    rows='4'
                    defaultValue={causa || ''}
                    variant='outlined'
                    InputProps={{
                        readOnly
                    }}
                    onBlur={e => setCausa(e.target.value)}
                />
            </div>
            <div style={{ textAlign: 'left', marginLeft: 25, marginTop: 20 }}>
                <Typography variant='caption' display='inline' gutterBottom>
                    Click cuando esté cobrado:
                </Typography>
                <Checkbox
                    disabled={isNew ? true : cobrado === true ? true : false}
                    color={'primary'}
                    checked={cobrado}
                    onChange={handleChange()}
                    value={cobrado}
                    inputProps={{
                        'aria-label': 'secondary checkbox'
                    }}
                />
                <Typography variant='button' display='inline' gutterBottom>
                    {estado}
                </Typography>
            </div>
            <div style={{ marginTop: 25 }}>
                <div style={{ display: 'inline', marginLeft: 20 }}>
                    <Fab
                        component={Link}
                        to='/admin'
                        style={{
                            backgroundColor: '#FFC0C0',
                            borderStyle: 'inset'
                        }}
                        aria-label='Atras'
                    >
                        <ArrowBackIcon />
                    </Fab>
                </div>
                <div style={{ display: 'inline', marginLeft: 150 }}>
                    <Fab
                        disabled={isNew ? false : myInfo.campos.cobrado}
                        style={{
                            backgroundColor: '#C0FFCD'
                        }}
                        aria-label='Guardar'
                        onClick={handleClick}
                    >
                        <CheckIcon />
                    </Fab>
                </div>
            </div>
        </div>
    );
}
