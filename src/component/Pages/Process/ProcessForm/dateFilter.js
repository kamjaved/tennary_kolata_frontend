import React from 'react';
import { makeStyles, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Input, MenuItem, FormControl, Select } from '@material-ui/core';

import TodayIcon from '@material-ui/icons/Today';

import { setFilteredDate } from '../../../../_actions/dateFIlterAction'
import { connect } from 'react-redux';
import PropTypes from "prop-types";



const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const DateSelect = ({ setFilteredDate }) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState({
        month: '',
        year: ''
    });

    const { year, month } = date

    const onChangeHandler = (e) => {
        e.preventDefault();
        setDate({ ...date, [e.target.name]: Number(e.target.value) });
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setFilteredDate(date);
    };

    return (
        <div>
            <Button
                color="primary"
                className={classes.button}
                size="small"
                onClick={handleClickOpen}
                startIcon={<TodayIcon />}

            >
                Select Date
          </Button>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select Date</DialogTitle>

                <form className={classes.container} onSubmit={e => onSubmitHandler(e)}  >
                    <DialogContent>

                        <FormControl className={classes.formControl}>

                            <InputLabel htmlFor="demo-dialog-native">Month</InputLabel>

                            <Select
                                native
                                value={month}
                                name='month'
                                onChange={e => onChangeHandler(e)}
                                input={<Input id="demo-dialog-native" />}
                            >
                                <option aria-label="None" value="" />
                                <option value={1}>January</option>
                                <option value={2}>February</option>
                                <option value={3}>March</option>
                                <option value={4}>April</option>
                                <option value={5}>May</option>
                                <option value={6}>June</option>
                                <option value={7}>July</option>
                                <option value={8}>August</option>
                                <option value={9}>Spetember</option>
                                <option value={10}>Octuber</option>
                                <option value={11}>November</option>
                                <option value={12}>December</option>
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">Year</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={year}
                                name='year'
                                onChange={e => onChangeHandler(e)}
                                input={<Input />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={2019}>2019</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                                <MenuItem value={2023}>2023</MenuItem>
                                <MenuItem value={2024}>2024</MenuItem>
                                <MenuItem value={2025}>2025</MenuItem>
                                <MenuItem value={2026}>2026</MenuItem>
                                <MenuItem value={2027}>2027</MenuItem>
                            </Select>
                        </FormControl>



                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
            </Button>
                            <Button type="submit" onClick={handleClose} color="primary">
                                Ok
              </Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}

DateSelect.propTypes = {
    setFilteredDate: PropTypes.func.isRequired,
}


export default connect(null, { setFilteredDate })(DateSelect)