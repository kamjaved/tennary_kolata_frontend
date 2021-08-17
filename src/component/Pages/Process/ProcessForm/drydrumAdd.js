import React, { useState, useEffect } from 'react';

import { Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addDryDrum } from "../../../../_actions/drydrumAction";
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

const DryDrumAdd = ({ addDryDrum, match, loading }) => {

    const classes = useStyles();
    const history = useHistory()



    var mfcName = localStorage.getItem('ManName');
    var mfcid = localStorage.getItem('ManID');

    const [formData, setFormData] = useState({
        dryDrumHour: 0,
        manufacturerId: mfcid,
        date: moment(Date.now()).format('DD-MM-YYYY')
    });



    const { date, dryDrumHour } = formData;


    const onChangeHandler = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmitHandler = (e) => {
        e.preventDefault();
        addDryDrum(formData, match.params.id, history)
    };




    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add Dry-Drum Hours
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
                        id="dryDrumHour"
                        label="Usage Hours"
                        onChange={e => onChangeHandler(e)}
                        value={dryDrumHour}
                        name="dryDrumHour"
                        autoFocus
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
                        Add
          </Button>
                </form>
            </div>
        </Container>
    );
}

DryDrumAdd.propTypes = {
    addDryDrum: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    loading: state.drydrum.loading
});
export default connect(
    mapStateToProps,
    { addDryDrum }
)(DryDrumAdd);