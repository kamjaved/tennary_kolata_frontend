import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { getManufacturers } from "../../../_actions/manufacturerAction"

// MATERIAL-ui IMPORT
import { makeStyles, Paper, Grid, Card, CardContent, Typography, Button } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '90%'
    },
    card: {
        flexGrow: 1,
        height: 150,
        backgroundColor: '#9fa8da',

        '&:hover': {
            background: "#7986cb",
            cursor: 'pointer'
        }
    },

    link: {
        textDecoration: "none",
        colour: "black"
    },
    gridMargin: {
        margin: 80,
        marginLeft: 30,
        marginRight: 0,
        marginBottom: 40
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: 14,
        fontWeight: 600,
        color: 'black'
    },
    pos: {
        marginBottom: 12,
    },
}));



function ManufacturerView({ getManufacturers, manufacturers, loading }) {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getManufacturers();


        //eslint-diable-next-line
    }, [getManufacturers]);


    const setManufacturerStorage = (id, name) => {

        // history.push(`/manufacturer/${id}`)

        localStorage.setItem('ManID', id);
        localStorage.setItem('ManName', name);
        console.log(localStorage)
    }


    // onClick={()=>setManufacturerStorage(item._id, item.name)} 

    return (
        <Fragment>
            {manufacturers !== null && !loading ? (

                <div className={classes.root}>
                    <Grid container spacing={3} className={classes.gridMargin}>

                        {manufacturers.map(item => (


                            <Grid item xs={12} sm={4} lg={3} key={item._id} >
                                <Link className={classes.link} to="/process" onClick={() => setManufacturerStorage(item._id, item.name)} >

                                    <Card className={classes.card} >

                                        <CardContent>
                                            <Typography className={classes.title} gutterBottom>
                                                {item.name}
                                            </Typography>
                                            <Typography className={classes.pos}>
                                                {item.phone}
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {item.address}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>

                            </Grid>

                        ))}
                    </Grid>


                </div>

            ) : <h2>Loading...</h2>}

        </Fragment>
    )
}




ManufacturerView.propTypes = {
    getManufacturers: PropTypes.func.isRequired,
    manufacturers: PropTypes.array.isRequired,

}
const mapStateToProps = (state) => ({
    auth: state.auth,
    manufacturers: state.manufacturer.manufacturers,
    loading: state.manufacturer.loading

})

export default connect(mapStateToProps, { getManufacturers })(ManufacturerView)
