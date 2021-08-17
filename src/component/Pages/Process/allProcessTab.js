import React, { useEffect, } from 'react';

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import PropTypes from "prop-types";

import { AppBar, Tabs, Tab, makeStyles, Typography, } from '@material-ui/core';
import { getAllProcesses } from "../../../_actions/allProcessAction"



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: 70,
        backgroundColor: theme.palette.background.paper,
        // height: 50
    },
    appBar: {

        // border: '2px yellow solid',

    },
    Tabs: {
        // border: '4px red solid',
    },


}));

const AllProcessTab = ({ getAllProcesses, allProcesses, loading }) => {


    const history = useHistory();

    // const routeChange = () => {
    //     let path = `/`;
    //     history.push(path);
    // }




    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        getAllProcesses();


        //eslint-diable-next-line
    }, [getAllProcesses]);


    return (
        <React.Fragment>
            { allProcesses !== null && !loading ? (

                <AppBar position="static" color="default" className={classes.root}>

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        className={classes.Tabs}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    // style={{ border: '1px red solid' }}
                    >

                        <Tab
                            label='Demo'
                            key={1}
                        />

                        {allProcesses.map(item => (

                            <Tab
                                label={item.ProcessName}
                                key={item._id}
                                onClick={() => history.push(`/process/${item._id}`)}

                            />

                        ))}

                    </Tabs>
                </AppBar>

            ) : <h2>Loading...</h2>}

        </React.Fragment>
    );
}

AllProcessTab.propTypes = {
    getAllProcesses: PropTypes.func.isRequired,
    allProcesses: PropTypes.array.isRequired,
}
const mapStateToProps = (state) => ({

    auth: state.auth,
    allProcesses: state.processall.allProcesses,
    loading: state.processall.loading

})

export default connect(mapStateToProps, { getAllProcesses })(AllProcessTab)

