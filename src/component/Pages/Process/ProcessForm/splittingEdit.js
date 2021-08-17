import React, { useState, useEffect } from 'react';

import { Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container, } from '@material-ui/core';
import EditSharpIcon from '@material-ui/icons/EditSharp';

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getCurrentSplitting, editSplitting } from "../../../../_actions/splittingAction";
import moment from 'moment';
import { useHistory } from 'react-router-dom'



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

const SplittingEdit = ({ getCurrentSplitting, editSplitting, match, splittingCurrent, loading }) => {




    const classes = useStyles();
    const history = useHistory()

    const [formData, setFormData] = useState({

        CowPcs: 0,
        SidesPcs: 0,
        CalfPcs: 0,
        GoatPcs: 0,
        date: new Date(),
    });

    var mfcName = localStorage.getItem('ManName');


    useEffect(() => {
        getCurrentSplitting(match.params.id);

        setFormData({

            CowPcs: loading || !splittingCurrent.CowPcs ? "" : splittingCurrent.CowPcs,
            SidesPcs: loading || !splittingCurrent.SidesPcs ? "" : splittingCurrent.SidesPcs,
            CalfPcs: loading || !splittingCurrent.CalfPcs ? "" : splittingCurrent.CalfPcs,
            GoatPcs: loading || !splittingCurrent.GoatPcs ? "" : splittingCurrent.GoatPcs,
            date: loading || !splittingCurrent.date ? "" : moment(splittingCurrent.date).format('YYYY-MM-DD')
        });


        //eslint-disable-next-line
    }, [getCurrentSplitting, loading]);

    console.log(splittingCurrent)

    const { SidesPcs, CowPcs, GoatPcs, date, CalfPcs } = formData;


    const onChangeHandler = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmitHandler = (e) => {
        e.preventDefault();
        editSplitting(formData, match.params.id, history,)
    };




    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EditSharpIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Splitting Quantity
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                    {mfcName}
                </Typography>

                <form className={classes.form} noValidate onSubmit={e => onSubmitHandler(e)}>

                    <TextField
                        variant="outlined"
                        margin="normal"

                        type='number'
                        fullWidth
                        id="SidesPcs"
                        label="Side Pcs Qty"
                        onChange={e => onChangeHandler(e)}
                        value={SidesPcs}
                        name="SidesPcs"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        type='number'

                        fullWidth
                        label="Cow Pcs Qty"
                        value={CowPcs}
                        onChange={e => onChangeHandler(e)}
                        name="CowPcs"
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        type='number'
                        fullWidth
                        label="Calf Pcs Qty"
                        value={CalfPcs}
                        onChange={e => onChangeHandler(e)}
                        name="CalfPcs"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        type='number'
                        fullWidth
                        label="Goat Pcs Qty"
                        value={GoatPcs}
                        onChange={e => onChangeHandler(e)}
                        name="GoatPcs"
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
                        Edit & Submit
          </Button>
                </form>
            </div>
        </Container>
    );
}

SplittingEdit.propTypes = {
    getCurrentSplitting: PropTypes.func.isRequired,
    editSplitting: PropTypes.func.isRequired,
    splittingCurrent: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    splittingCurrent: state.splitting.splitting,
    loading: state.splitting.loading
});
export default connect(
    mapStateToProps,
    { getCurrentSplitting, editSplitting }
)(SplittingEdit);