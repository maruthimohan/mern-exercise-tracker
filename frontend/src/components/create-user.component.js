import React, { Component } from 'react';
import {
    TextField,
    Button
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import CustomizedSnackbar from './customized-snack-bar.component';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resetSnackBarProperties = this.resetSnackBarProperties.bind(this);
        this.state = {
            username: '',
            snackbar: {
                open: false,
                message: '',
                isError: false
            }
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
        };
        console.log(newUser);

        this.setState({
            username: ''
        });

        /**
         * AXIOS
         * Save the newUser to the MongoDB
         */
        axios.post('http://localhost:5000/users/add', newUser)
            .then(res => {
                console.log(res.data);
                /**
                 * SnackBar
                 * Open the snackbar on saving the record
                 */
                this.setState({
                    snackbar: {
                        open: true,
                        message: 'Welcome to the club, OY!',
                        isError: false
                    }
                });
                // Set a timeout to close the SnackBar
                setTimeout(this.resetSnackBarProperties, 3000);
            }).catch((err) => {
                console.log(err.response);
                /**
                 * SnackBar
                 * Open the snackbar on saving the record
                 */
                this.setState({
                    snackbar: {
                        open: true,
                        message: 'Oops, something went wrong. Could you please try again?',
                        isError: true
                    }
                });
                // Set a timeout to close the SnackBar
                setTimeout(this.resetSnackBarProperties, 3000);
            });
    }

    resetSnackBarProperties() {
        this.setState((state) => {
            /**
             * REACT NESTED STATE
             * In the case of a nested state,
             * we need to reconstruct the nested object
             * Nested State is not auto-updated by React
             */
            const { snackbar } = { ...state };
            const snackbarState = snackbar;
            snackbarState.open = false;
            return {
                snackbar: snackbarState
            };
        });
    }

    render() {
        return (
            <div>
                <h3 style={{ textAlign: "center" }}>Create New User</h3>
                <form autoComplete="off" className="main-form" onSubmit={this.onSubmit}>
                    <div className="form-field">
                        <TextField
                            id="username"
                            label="Username"
                            size="medium"
                            required={true}
                            error={false}
                            helperText="Please enter a valid Username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-field save-button center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<SaveIcon />}
                            type="submit"
                        >
                            Create User
                    </Button>
                    </div>
                </form>
                <CustomizedSnackbar
                    open={this.state.snackbar.open}
                    isError={this.state.snackbar.isError}
                    message={this.state.snackbar.message}
                />
            </div>
        )
    }
}