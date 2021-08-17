import React, { useState, useEffect } from 'react';

import { Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editGlobalPrice, getCurrentGlobalPrice } from "../../../_actions/RateAction/globalPriceAct";
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

const EditGlobalPrice = ({ editGlobalPrice, globalPriceCurrent, loading, getCurrentGlobalPrice, match }) => {

    const classes = useStyles();
    const history = useHistory()


    const [formData, setFormData] = useState({
        SidesPcsRs: 0,
        CowPcsRs: 0,
        GoatPcsRs: 0,
        CalfPcsRs: 0,
        oneTimeRate: 0,
        ratePerHour: 0,
        date: new Date(),

        processName: '',
        isSidePcs: false,
        isOneTime: false,
        isHourlyRate: false,
    });


    useEffect(() => {
        getCurrentGlobalPrice(match.params.id)

        setFormData({
            SidesPcsRs: loading || !globalPriceCurrent.SidesPcsRs ? "" : globalPriceCurrent.SidesPcsRs,
            CowPcsRs: loading || !globalPriceCurrent.CowPcsRs ? "" : globalPriceCurrent.CowPcsRs,
            GoatPcsRs: loading || !globalPriceCurrent.GoatPcsRs ? "" : globalPriceCurrent.GoatPcsRs,
            CalfPcsRs: loading || !globalPriceCurrent.CalfPcsRs ? "" : globalPriceCurrent.CalfPcsRs,
            oneTimeRate: loading || !globalPriceCurrent.oneTimeRate ? "" : globalPriceCurrent.oneTimeRate,
            ratePerHour: loading || !globalPriceCurrent.ratePerHour ? "" : globalPriceCurrent.ratePerHour,
            date: loading || !globalPriceCurrent.date ? "" : moment(globalPriceCurrent.date).format('YYYY-MM-DD'),

            processName: loading || !globalPriceCurrent.ProcessId ? "" : globalPriceCurrent.ProcessId.ProcessName,

            isSidePcs: loading || globalPriceCurrent.SidesPcsRs ? true : false,
            isOneTime: loading || globalPriceCurrent.oneTimeRate ? true : false,
            isHourlyRate: loading || globalPriceCurrent.ratePerHour ? true : false,
        })

        // eslint-disable-next-line
    }, [getCurrentGlobalPrice, loading]);




    const { SidesPcsRs, CowPcsRs, GoatPcsRs, date, CalfPcsRs, oneTimeRate, ratePerHour, processName, isSidePcs, isHourlyRate, isOneTime } = formData;


    const onChangeHandler = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmitHandler = (e) => {
        e.preventDefault();
        editGlobalPrice(formData, match.params.id, history)
    };




    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit {processName} Price
                </Typography>

                <form className={classes.form} noValidate onSubmit={e => onSubmitHandler(e)}>



                    <TextField
                        variant="outlined"
                        style={!isSidePcs ? { display: 'none' } : { display: 'block' }}
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
                        style={!isSidePcs ? { display: 'none' } : { display: 'block' }}
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
                        style={!isSidePcs ? { display: 'none' } : { display: 'block' }}
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
                        style={!isSidePcs ? { display: 'none' } : { display: 'block' }}
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
                        style={!isOneTime ? { display: 'none' } : { display: 'block' }}
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
                        style={!isHourlyRate ? { display: 'none' } : { display: 'block' }}
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
                        color="primary"
                        className={classes.submit}
                    >
                        Edit  Price
          </Button>
                </form>
            </div>
        </Container>
    );
}

EditGlobalPrice.propTypes = {
    editGlobalPrice: PropTypes.func.isRequired,
    getCurrentGlobalPrice: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    loading: state.globalPrice.loading,
    globalPriceCurrent: state.globalPrice.globalPrice

});
export default connect(
    mapStateToProps,
    { editGlobalPrice, getAllProcesses, getCurrentGlobalPrice }
)(EditGlobalPrice);