import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function NavBar() {
    const classes = useStyles();
    // UseState hook for the Tabs
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/" underline="none" color="inherit">
                            ExerciseTracker
                        </Link>

                        {/* <Link href="/create" underline="none" style={{ marginLeft: '10px', fontSize: '16px', backgroundColor: "steelblue", padding: "5px", borderRadius: "5px" }} color="inherit">
                            Create Exercise Log
                        </Link>
                        <Link href="/user" underline="none" style={{ marginLeft: '10px', fontSize: '16px', backgroundColor: "steelblue", padding: "5px", borderRadius: "5px" }} color="inherit">
                            Create User
                        </Link> */}
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            {/* style={{ marginLeft: '10px', fontSize: '16px', backgroundColor: "steelblue", padding: "5px", borderRadius: "5px" }} */}
                            <Tab label="Exercises" {...a11yProps(0)} component={Link} to="/"></Tab>
                            <Tab label="Create Exercise Log" {...a11yProps(1)} component={Link} to="/create"></Tab>
                            <Tab label="Create User" {...a11yProps(2)} component={Link} to="/user"></Tab>
                        </Tabs>
                    </Typography>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
