import React, { useState, useEffect } from 'react';

import { Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSplitting } from "../../../../_actions/splittingAction";
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

const SplittingAdd = ({ addSplitting, match, loading }) => {

    const classes = useStyles();
    const history = useHistory()



    var mfcName = localStorage.getItem('ManName');
    var mfcid = localStorage.getItem('ManID');

    const [formData, setFormData] = useState({
        SidesPcs: 0,
        CowPcs: 0,
        GoatPcs: 0,
        CalfPcs: 0,
        manufacturerId: mfcid,
        // date: moment(Date.now()).format('DD-MM-YYYY')
        date: new Date()
    });



    const { SidesPcs, CowPcs, GoatPcs, date, CalfPcs } = formData;


    const onChangeHandler = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (SidesPcs === "" || null) {
            alert("Either Put 0 or Give Some Value")
            setFormData({ SidesPcs: 0 })
        } else if (CowPcs === "" || null) {
            alert("Either Put 0 or Give Some Value")
            setFormData({ CowPcs: 0 })
        } else if (GoatPcs === "" || null) {
            alert("Either Put 0 or Give Some Value")
            setFormData({ GoatPcs: 0 })
        } else if (CalfPcs === "" || null) {
            alert("Either Put 0 or Give Some Value")
            setFormData({ CalfPcs: 0 })
        }

        addSplitting(formData, match.params.id, history)
    };




    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add New Splitting Quantity
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
                        defaultValue={0}
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
                        defaultValue={0}
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
                        defaultValue={0}
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
                        defaultValue={0}
                        label="Goat Pcs Qty"
                        value={GoatPcs}
                        onChange={e => onChangeHandler(e)}
                        name="GoatPcs"
                    />

                    <TextField
                        id="date"
                        label="Date"
                        type="date"
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

SplittingAdd.propTypes = {
    addSplitting: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    loading: state.splitting.loading
});
export default connect(
    mapStateToProps,
    { addSplitting }
)(SplittingAdd);