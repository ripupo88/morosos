const appStyle = theme => ({
    text: {
        padding: theme.spacing(2, 2, 0)
    },
    paper: {
        paddingBottom: 50
    },
    list: {
        marginBottom: theme.spacing(2)
    },
    subheader: {
        backgroundColor: theme.palette.background.paper
    },
    Link: {
        textDecoration: 'none'
    },
    grow: {
        flexGrow: 1
    },
    wrapper: {
        position: 'relative',
        top: '0',
        height: '100vh'
    },
    mainPanel: {
        overflow: 'auto',
        position: 'relative',
        float: 'right',
        maxHeight: '100%',
        width: '100%',
        overflowScrolling: 'touch'
    },
    content: {
        marginTop: '70px',
        padding: '30px 15px',
        minHeight: 'calc(100vh - 123px)'
    },
    appBar: {
        width: '100%',
        top: 'auto',
        bottom: 0
    },
    map: {
        marginTop: '70px'
    }
});

export default appStyle;
