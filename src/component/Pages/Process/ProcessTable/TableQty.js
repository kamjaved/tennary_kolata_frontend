import React from 'react'
import { TableContainer, makeStyles, Typography, Button } from '@material-ui/core'
import { DataGrid, GridToolbarContainer, GridColumnsToolbarButton, GridFilterToolbarButton, } from '@material-ui/data-grid';

import DateFilter from '../ProcessForm/dateFilter'


const useStyles = makeStyles((theme) => ({

    heading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        color: 'black',

    },

    dataGrid: {
        display: 'flex',
        margin: 'auto',
        marginTop: 30,
        minWidth: 650,
        width: 1250,
        height: 500,
        '& .MuiDataGrid-colCell, .headerData-grid': {
            color: 'black',

        }
    },

    customtoolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',


    },
    customtable: {
        margin: 'auto',
        marginTop: 0,
        background: "primary"

    },
    dateFiltered: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        color: 'blue',
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}))




// FOR CUSTOM GRID TOOLBAR

const TableQtyView = ({ GridColumns, GridRows, mfcName, date, month, year, PdfButton }) => {






    function CustomToolbar() {
        const classes = useStyles();


        return (
            <GridToolbarContainer className={classes.customtoolbar}>
                <GridColumnsToolbarButton />
                <PdfButton />
                <GridFilterToolbarButton />
                <DateFilter />
            </GridToolbarContainer>

        )
    }


    const classes = useStyles();

    return (
        <React.Fragment>

            <div>
                <Typography variant="h5" className={classes.heading} >Splitting </Typography>
                <Typography variant="overline" className={classes.heading} >
                    {mfcName}
                </Typography>

                <Typography variant="overline" className={classes.dateFiltered}  >
                    Month: {date.month ? date.month : month}  Year: {date.year ? date.year : year}
                </Typography>
            </div>

            <TableContainer className={classes.table} align="center"></TableContainer>

            <div style={{ height: 400, width: '100%' }}>

                <DataGrid className={classes.dataGrid} rows={GridRows} hideFooterPagination='true' columns={GridColumns} rowHeight={40} components={{
                    Toolbar: CustomToolbar,
                }} />

            </div>
            <TableContainer />
        </React.Fragment>
    )
}


export default TableQtyView



