import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { getAllProcesses } from "../../../_actions/allProcessAction"


// MATERIAL-ui IMPORT
import { makeStyles, Grid, Card, CardContent, Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        flexGrow: 1,
        height: 100,
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
        marginRight: 30,
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



function ProcessCards({ getAllProcesses, allProcesses, loading }) {
    const classes = useStyles();

    useEffect(() => {
        getAllProcesses();


        //eslint-diable-next-line
    }, [getAllProcesses]);

    return (
        <Fragment>
            {allProcesses !== null && !loading ? (

                <div className={classes.root}>
                    <Grid container spacing={3} className={classes.gridMargin}>



                        {allProcesses.map(item => (


                            <Grid item xs={12} sm={4} lg={2} key={item._id} >

                                <Link to={`/${item.ProcessName}/${item._id}`} className={classes.link}>
                                    <Card className={classes.card} >
                                        <CardContent>
                                            <Typography className={classes.title} gutterBottom>
                                                {item.ProcessName}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>

                            </Grid>

                        ))}

                    </Grid>
                </div>

            ) : <h2>Loading...</h2>
            }
        </Fragment >
    )
}




ProcessCards.propTypes = {
    getAllProcesses: PropTypes.func.isRequired,
    allProcesses: PropTypes.array.isRequired,

}
const mapStateToProps = (state) => ({
    auth: state.auth,
    allProcesses: state.processall.allProcesses,
    loading: state.processall.loading

})

export default connect(mapStateToProps, { getAllProcesses })(ProcessCards)


// onClick={() => history.push(`${item._id}`)}