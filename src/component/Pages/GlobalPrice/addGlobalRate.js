import React, { useState, useEffect } from 'react';

import { Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addGlobalPrice } from "../../../_actions/RateAction/globalPriceAct";
import { getAllProcesses } from "../../../_actions/allProcessAction";

import moment from 'moment';



const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AddGlobalPrice = ({ addGlobalPrice, getAllProcesses, allProcesses }) => {

    const classes = useStyles();
    const history = useHistory()


    const [formData, setFormData] = useState({
        ProcessId: '',
        SidesPcsRs: 0,
        CowPcsRs: 0,
        GoatPcsRs: 0,
        CalfPcsRs: 0,
        oneTimeRate: 0,
        ratePerHour: 0,
        date: new Date(),
    });
    const [isOneTime, setOneTime] = useState(false);
    const [isHourRate, setHourRate] = useState(false);

    console.log("---One", isOneTime, "----Hr", isHourRate)

    useEffect(() => {
        getAllProcesses()

        // eslint-disable-next-line
    }, [getAllProcesses]);


    const processOption = allProcesses.map(pr => (
        <MenuItem key={pr._id} value={pr._id}>
            {pr.ProcessName}
        </MenuItem>
    ))


    const { SidesPcsRs, CowPcsRs, ProcessId, GoatPcsRs, date, CalfPcsRs, oneTimeRate, ratePerHour } = formData;


    const onChangeHandler = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmitHandler = (e) => {
        e.preventDefault();
        addGlobalPrice(formData, history)
    };




    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add New Process Price
                </Typography>

                <form className={classes.form} noValidate onSubmit={e => onSubmitHandler(e)}>


                    <FormControl variant="outlined" margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Process</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Process"
                            name="ProcessId"
                            value={ProcessId}
                            onChange={e => onChangeHandler(e)}
                            required
                        >
                            {processOption}
                        </Select>
                    </FormControl>

                    <FormControl component="fieldset">
                        <FormControlLabel
                            control={<Switch color="primary" onChange={() => setHourRate(!isHourRate)} />}
                            label="Hourly Rate"
                            labelPlacement="start"
                        />

                    </FormControl>

                    <FormControl component="fieldset">
                        <FormControlLabel
                            control={<Switch color="primary" onChange={() => setOneTime(!isOneTime)} />}
                            label="One Time Rate"
                            labelPlacement="start"
                        />
                    </FormControl>


                    <TextField
                        variant="outlined"
                        style={isOneTime || isHourRate ? { display: 'none' } : { display: 'block' }}
                        margin="normal"
                        type='number'
                        fullWidth
                        label="Cow Rate"
                        value={CowPcsRs}
                        onChange={e => onChangeHandler(e)}
                        name="CowPcsRs"
                    />

                    <TextField
                        variant="outlined"
                        style={isOneTime || isHourRate ? { display: 'none' } : { display: 'block' }}
                        margin="normal"
                        type='number'
                        fullWidth
                        label="Side rate"
                        onChange={e => onChangeHandler(e)}
                        value={SidesPcsRs}
                        name="SidesPcsRs"
                        autoFocus
                    />

                    <TextField
                        variant="outlined"
                        style={isOneTime || isHourRate ? { display: 'none' } : { display: 'block' }}
                        margin="normal"
                        type='number'
                        fullWidth
                        label="Calf Rate"
                        value={CalfPcsRs}
                        onChange={e => onChangeHandler(e)}
                        name="CalfPcsRs"
                    />
                    <TextField
                        variant="outlined"
                        style={isOneTime || isHourRate ? { display: 'none' } : { display: 'block' }}
                        margin="normal"
                        type='number'
                        fullWidth
                        label="Goat Rate"
                        value={GoatPcsRs}
                        onChange={e => onChangeHandler(e)}
                        name="GoatPcsRs"
                    />

                    <TextField
                        variant="outlined"
                        style={isOneTime ? { display: 'block' } : { display: 'none' }}
                        margin="normal"
                        type='number'
                        fullWidth
                        label="One Time"
                        value={oneTimeRate}
                        onChange={e => onChangeHandler(e)}
                        name="oneTimeRate"
                    />
                    <TextField
                        variant="outlined"
                        style={isHourRate ? { display: 'block' } : { display: 'none' }}
                        margin="normal"
                        type='number'
                        fullWidth
                        label="Rate/hrs"
                        value={ratePerHour}
                        onChange={e => onChangeHandler(e)}
                        name="ratePerHour"
                    />

                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        defaultValue="2021-08-28"
                        value={date}
                        name="date"
                        onChange={e => onChangeHandler(e)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Add Price
          </Button>
                </form>
            </div>
        </Container>
    );
}

AddGlobalPrice.propTypes = {
    addGlobalPrice: PropTypes.func.isRequired,
    getAllProcesses: PropTypes.func.isRequired,
    allProcesses: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
    loading: state.splitting.loading,
    allProcesses: state.processall.allProcesses
});
export default connect(
    mapStateToProps,
    { addGlobalPrice, getAllProcesses }
)(AddGlobalPrice);