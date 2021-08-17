import React, { Fragment } from 'react'
import AllProcessTable from './allProcessTable'
import AllProcessTab from './allProcessTab'
import TableRoutes from './TableRoutes'
import { makeStyles, Typography } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // height: 50
    },
}));


function ProcessMainPage() {
    const classes = useStyles();


    return (
        <Fragment>
            <div className={classes.root}>
                <Typography variant='h4'>Hello From Demo Page</Typography>
            </div>

        </Fragment>
    )
}

export default ProcessMainPage
