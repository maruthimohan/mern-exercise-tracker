import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Link from '@material-ui/core/Link';
import CustomizedSnackbar from './customized-snack-bar.component';
import '../styles/exercises-list.component.css';

/**
 * Columns defined programmatically
 */
const columns = [
    {
        id: 'Username',
        label: 'Username',
        align: 'left'
    },
    {
        id: 'Description',
        label: 'Description',
        align: "left"
    },
    {
        id: 'Duration',
        label: "Duration (minutes)",
        align: "left"
    },
    {
        id: 'Date',
        label: 'Date',
        align: 'left'
    },
    {
        id: 'Actions',
        label: 'Actions',
        align: "left"
    }
];

const Exercise = (props) => (
    <TableRow>
        <TableCell>{props.exercise.username}</TableCell>
        <TableCell>{props.exercise.description}</TableCell>
        <TableCell>{`${props.exercise.duration} min`}</TableCell>
        <TableCell>{new Date(props.exercise.date).toLocaleString()}</TableCell>
        <TableCell>
            <Link underline="none" href={"/edit/" + props.exercise._id}><EditIcon /></Link>
            <span style={{
                height: "20px",
                borderLeft: "2px solid gray",
                textAlign: "initial",
                display: "inline-block",
                margin: "0 10px"
            }}></span>
            <Link href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}><DeleteRoundedIcon color="secondary" /></Link>
        </TableCell>
    </TableRow>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.exerciseList = this.exerciseList.bind(this);
        this.state = {
            exercises: [],
            snackbar: {
                open: false,
                message: '',
                isError: false
            }
        };
        /**
        * Bind Snackbar related methods
        */
        this.showSnackbar = this.showSnackbar.bind(this);
        this.hideSnackbar = this.hideSnackbar.bind(this);
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
            const { snackbar } = { ...state };
            const snackbarCurrentState = snackbar;
            snackbarCurrentState.open = false;
            // Return the new snackbar state object
            return {
                snackbar: snackbarCurrentState
            };
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(
                res => {
                    console.log(res.data);
                    this.showSnackbar('Don\'t worry, you could always go for another run!');
                }
            );
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return (
                <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />
            );
        })
    }

    render() {
        return (
            <div>
                <h3 style={{ textAlign: "center" }}>Logged Exercises</h3>
                <TableContainer component={Paper} className="container">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.exerciseList()
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <CustomizedSnackbar
                    isError={this.state.snackbar.isError}
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                />
            </div>
        )
    }
}