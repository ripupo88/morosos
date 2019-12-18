import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
//componente
import ResList from '../components/List/resList';
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
let miclient = (termino, objetivo) => {
    return new Promise((resolve, reject) => {
        client
            .query({
                query: gql`
                     {
                        busqueda(termino: "${termino}", objetivo: "${objetivo}") {                            
                            id
                            nombre
                            nif
                            matricula
                            importe
                            motivo
                            fecha
                            cobrado
                            trabajador  
                        }
                    }
                `
            })
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
};

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 'auto'
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        textAlign: 'left'
    }
}));

export default function Search() {
    const [age, setAge] = React.useState('nif');
    let [busqueda, setBusqueda] = useState('');
    let [respuesta, setRespuesta] = useState(null);

    const classes = useStyles();
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setAge(event.target.value);
    };
    let handleClick = () => {
        miclient(busqueda, age)
            .then(res => {
                setRespuesta(res.data.busqueda);
            })
            .catch(e => {
                setRespuesta('error');
            });
    };

    return (
        <div>
            <div>
                <form
                    onSubmit={e => e.preventDefault()}
                    className={classes.root}
                    noValidate
                    autoComplete='off'
                >
                    <TextField
                        id='outlined-basic'
                        label='Introduce Datos'
                        variant='outlined'
                        margin='dense'
                        onChange={e => setBusqueda(e.target.value)}
                    />
                </form>
            </div>
            <div>
                <FormControl
                    margin='dense'
                    variant='outlined'
                    className={classes.formControl}
                >
                    <InputLabel
                        ref={inputLabel}
                        id='demo-simple-select-outlined-label'
                    >
                        Buscar
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        value={age}
                        onChange={handleChange}
                        labelWidth={labelWidth}
                    >
                        {/* <MenuItem value={10}>
                            <em>NIF</em>
                        </MenuItem> */}
                        <MenuItem value={'nif'}>NIF</MenuItem>
                        <MenuItem value={'matricula'}>Matricula</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    style={{ marginTop: 10 }}
                    onClick={handleClick}
                    variant='outlined'
                >
                    Buscar
                </Button>
            </div>
            <Divider variant='middle' />
            <div>
                {respuesta === null ? (
                    <Typography component='div'>
                        <Box fontWeight={200} m={5}>
                            Los resultados aparecerán aquí
                        </Box>
                    </Typography>
                ) : respuesta[0] === undefined ? (
                    <Typography component='div'>
                        <Box fontWeight={200} m={5}>
                            No se obtuvieron resultados
                        </Box>
                    </Typography>
                ) : respuesta === 'error' ? (
                    <Typography component='div'>
                        <Box fontWeight={200} m={5}>
                            Error de conexión, Compruebe su conexión a internet
                            y si el problema persiste contacte con el
                            administrador
                        </Box>
                    </Typography>
                ) : (
                    respuesta.map((info, i) => {
                        console.log(i);
                        return <ResList key={i} infoSent={info} />;
                    })
                )}
            </div>
        </div>
    );
}
