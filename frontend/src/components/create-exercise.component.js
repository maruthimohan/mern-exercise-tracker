import React, { Component } from 'react';
import {
    TextField,
    MenuItem,
    Button
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import CustomizedSnackbar from './customized-snack-bar.component';
import axios from 'axios';
import '../styles/create-exercise.component.css';

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
            snackbar: {
                open: false,
                message: '',
                isError: false
            }
        }
        /**
         * Binding the methods to the Component
         */
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        /**
         * Bind Snackbar related methods
         */
        this.showSnackbar = this.showSnackbar.bind(this);
        this.hideSnackbar = this.hideSnackbar.bind(this);
        /**
         * Bind navigation related methods
         */
        this.setWindowLocationToHome = this.setWindowLocationToHome.bind(this);
        this.navigateToHomePage = this.navigateToHomePage.bind(this);
    }

    componentDidMount() {
        /**
         * AXIOS
         * Load the Users from the MongoDB
         */
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    showSnackbar(message, isError) {
        this.setState({
            snackbar: {
                isError: isError,
                message: message,
                open: true
            }
        });
        // Set timeout to close the snackbar
        setTimeout(this.hideSnackbar, 2000);
    }

    hideSnackbar() {
        this.setState((state) => {
            const { snackbar } = {...state};
            const snackbarCurrentState = snackbar;
            snackbarCurrentState.open = false;
            // Return the new snackbar state object
            return {
                snackbar: snackbarCurrentState
            };
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        };
        console.log(exercise);
        /**
         * AXIOS
         * Save exercise log to MongoDB
         */
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(
                res => {
                    console.log(res.data);
                    this.showSnackbar('That\'s Tight! Keep going OY!', false);
                    // Navigate to the home page
                    this.navigateToHomePage();
                }
            ).catch((err) => {
                console.log(err.response);
                this.showSnackbar('Oops! Something went wrong. Could you please try again?', true);
            });
        
    }

    navigateToHomePage() {
        setTimeout(
            this.setWindowLocationToHome,
            1000
        );
    }

    setWindowLocationToHome() {
        window.location = '/';
    }



    render() {
        return (
            <div>
                <h3 style={{ textAlign: "center" }}>Create Exercise Log</h3>
                <form autoComplete="off" className="main-form" onSubmit={this.onSubmit}>
                    <div className="form-field">
                        <TextField
                            id="username"
                            select
                            label="User"
                            size="medium"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >
                            {
                                this.state.users.map((user) => (
                                    <MenuItem key={user} value={user}>
                                        {user}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </div>
                    <div className="form-field">
                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            rows={2}
                            size="medium"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-field">
                        <TextField
                            id="duration"
                            label="Duration (in minutes)"
                            size="medium"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-field">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                label="Date"
                                placeholder={new Date().toDateString()}
                                value={this.state.date}
                                onChange={this.onChangeDate}
                                format="yyyy/MM/dd"
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="form-field save-button center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<SaveIcon />}
                            type="submit"
                        >
                            Create Exercise Log
                    </Button>
                    </div>
                </form>
                <CustomizedSnackbar 
                            isError={this.state.snackbar.isError}
                            open={this.state.snackbar.open}
                            message={this.state.snackbar.message}
                />
            </div>
        )
    }
}