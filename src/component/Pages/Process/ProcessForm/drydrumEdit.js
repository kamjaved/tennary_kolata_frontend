import React, { useState, useEffect } from 'react';

import { Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container, } from '@material-ui/core';
import EditSharpIcon from '@material-ui/icons/EditSharp';

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getCurrentDryDrum, editDryDrum } from "../../../../_actions/drydrumAction";
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

const DryDrumEdit = ({ getCurrentDryDrum, editDryDrum, match, drydrumCurrent, loading }) => {




    const classes = useStyles();
    const history = useHistory()

    const [formData, setFormData] = useState({
        dryDrumHour: 0,
        date: new Date(),
    });

    var mfcName = localStorage.getItem('ManName');


    useEffect(() => {
        getCurrentDryDrum(match.params.id);

        setFormData({

            dryDrumHour: loading || !drydrumCurrent.dryDrumHour ? "" : drydrumCurrent.dryDrumHour,
            date: loading || !drydrumCurrent.date ? "" : moment(drydrumCurrent.date).format('YYYY-MM-DD')
        });


        //eslint-disable-next-line
    }, [getCurrentDryDrum, loading]);

    console.log(drydrumCurrent)

    const { dryDrumHour, date } = formData;


    const onChangeHandler = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmitHandler = (e) => {
        e.preventDefault();
        editDryDrum(formData, match.params.id, history,)
    };




    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EditSharpIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Dry-Drum Hours
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
                        label="Usage Hours"
                        value={dryDrumHour}
                        onChange={e => onChangeHandler(e)}
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
                        Edit & Submit
          </Button>
                </form>
            </div>
        </Container>
    );
}

DryDrumEdit.propTypes = {
    getCurrentDryDrum: PropTypes.func.isRequired,
    editDryDrum: PropTypes.func.isRequired,
    drydrumCurrent: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    drydrumCurrent: state.drydrum.drydrum,
    loading: state.drydrum.loading
});
export default connect(
    mapStateToProps,
    { getCurrentDryDrum, editDryDrum }
)(DryDrumEdit);