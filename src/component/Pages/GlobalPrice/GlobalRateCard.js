import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { getAllGlobalPrice, deleteGlobalPrice, setCurrentGlobalPrice } from "../../../_actions/RateAction/globalPriceAct"


// MATERIAL-ui IMPORT
import { makeStyles, Grid, Card, CardContent, Button, Typography, CardActions, CardHeader, CardActionArea, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },


    gridMargin: {
        marginTop: 100,
        marginLeft: 30,
        // marginRight: 30,
        // marginBottom: 40
    },

    card: {
        flexGrow: 1,
        height: 330,
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 110px -12.125px rgba(0,0,0,0.3)"
        }
    },

    cardActionArea: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },

    header: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        width: '100%',

    },


    link: {
        textDecoration: "none",
        colour: "black"
    },


    pos: {
        marginBottom: 12,
    },
    rateText: {
        fontSize: 14,
        fontWeight: 600,

    },

    actions: {
        marginTop: 'auto'
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },

}));



function GlobalrateCards({ getAllGlobalPrice, globalPrices, deleteGlobalPrice, loading, setCurrentGlobalPrice }) {
    const classes = useStyles();

    useEffect(() => {
        getAllGlobalPrice();


        //eslint-diable-next-line
    }, [getAllGlobalPrice]);

    const handleDelete = (id) => {

        deleteGlobalPrice(id);
    }

    return (
        <Fragment>
            {globalPrices !== null && !loading ? (

                <div className={classes.root}>
                    <Grid container spacing={3} className={classes.gridMargin}>

                        {globalPrices.map(item => (
                            <Grid item xs={12} sm={4} lg={2} key={item._id} >


                                <Card className={classes.card} >
                                    <CardActionArea
                                        className={classes.cardActionArea}>

                                        <CardHeader
                                            className={classes.header} title={item.ProcessId.ProcessName}>
                                        </CardHeader>
                                    </CardActionArea>

                                    <CardContent>

                                        <Typography variant="overline" display="block" gutterBottom className={classes.rateText}
                                            style={!item.SidesPcsRs ? { display: 'none' } : { display: 'block' }}>

                                            COW:-  ₹{item.CowPcsRs}/Pcs
                                            </Typography>

                                        <Typography variant="overline" display="block" gutterBottom className={classes.rateText}
                                            style={!item.SidesPcsRs ? { display: 'none' } : { display: 'block' }}
                                        >
                                            SIDE:- ₹ ${item.SidesPcsRs}/Pcs
                                            </Typography>

                                        <Typography variant="overline" display="block" gutterBottom className={classes.rateText}

                                            style={!item.SidesPcsRs ? { display: 'none' } : { display: 'block' }}
                                        >
                                            CALF:- ₹{item.CalfPcsRs}/Pcs
                                            </Typography>

                                        <Typography variant="overline" display="block" gutterBottom className={classes.rateText}
                                            style={!item.SidesPcsRs ? { display: 'none' } : { display: 'block' }}
                                        >
                                            GOAT:-  ₹{item.GoatPcsRs}/Pcs
                                            </Typography>



                                        <Typography variant="overline" display="block" gutterBottom className={classes.rateText}
                                            style={!item.ratePerHour ? { display: 'none' } : { display: 'block' }}
                                        >
                                            RATE:-  ₹{item.ratePerHour}/Hrs
                                            </Typography>

                                        <Typography variant="overline" display="block" gutterBottom className={classes.rateText}
                                            style={!item.oneTimeRate ? { display: 'none' } : { display: 'block' }}
                                        >
                                            RATE:-  ₹{item.oneTimeRate}    OneTime
                                            </Typography>

                                    </CardContent>

                                    <CardActions className={classes.actions} >
                                        <Link to={`edit/global-price/${item._id}`} onClick={() => setCurrentGlobalPrice(item._id)}>   <IconButton>
                                            <EditIcon />
                                        </IconButton>  </Link>

                                        <IconButton onClick={() => handleDelete(item._id)}>
                                            <DeleteIcon />
                                        </IconButton>

                                    </CardActions>

                                </Card>


                            </Grid>

                        ))}

                    </Grid>

                    <Link to="/add/global-price">
                        <Tooltip title="Add-Process" aria-label="Process">
                            <Fab color="secondary" className={classes.absolute}>
                                <AddIcon />
                            </Fab>
                        </Tooltip></Link>

                </div>

            ) : <h2>Loading...</h2>
            }
        </Fragment>
    )
}




GlobalrateCards.propTypes = {
    getAllGlobalPrice: PropTypes.func.isRequired,
    deleteGlobalPrice: PropTypes.func.isRequired,
    setCurrentGlobalPrice: PropTypes.func.isRequired,
    globalPrices: PropTypes.array.isRequired,

}
const mapStateToProps = (state) => ({
    auth: state.auth,
    globalPrices: state.globalPrice.globalPrices,
    loading: state.globalPrice.loading

})

export default connect(mapStateToProps, { getAllGlobalPrice, deleteGlobalPrice, setCurrentGlobalPrice })(GlobalrateCards)

