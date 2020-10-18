import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbar(props) {
    const classes = useStyles();
    let open = props.open;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        open = false;
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {
                    !props.isError ?
                    (
                        <Alert onClose={handleClose} severity="success">
                            {props.message}
                        </Alert>
                    ) : 
                    (
                        <Alert onClose={handleClose} severity="error">
                            {props.message}
                        </Alert>
                    )
                }
            </Snackbar>
        </div>
    );
}
