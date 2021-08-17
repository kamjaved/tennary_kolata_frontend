import React, { useEffect, useState } from 'react'

import { Paper, TablePagination, TableContainer, makeStyles, Typography } from '@material-ui/core'
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridColumnsToolbarButton, GridFilterToolbarButton } from '@material-ui/data-grid';
import Pagination from "@material-ui/lab/Pagination"

import { columns } from './tabledata'

const useStyles = makeStyles((theme) => ({

    heading: {
        margin: 'auto',
        color: 'black',
    },

    root: {
        display: 'flex',
        margin: 'auto',
        marginTop: 30,
        minWidth: 650,
        width: 1150,
        height: 500,

        // '& .headerData-grid': {
        //     color: 'black',
        //     border: '2px solid red',
        //     fontWeight: 600

        // },
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

    }
}))




// FOR CUSTOM GRID TOOLBAR

function CustomToolbar() {
    const classes = useStyles();
    return (
        <GridToolbarContainer className={classes.customtoolbar}>
            <GridColumnsToolbarButton />
            <GridToolbarExport />
            <GridFilterToolbarButton />
        </GridToolbarContainer>

    )
}



function AllProcessTable() {

    const [state, setstate] = useState([]);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(10);


    const fetchData = () => {
        fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${rowPerPage}`).then((res) => res.json())
            .then((data) => {
                setstate(data.data)
                setCount(data.totalPassengers)

            })
    }

    useEffect(() => {
        fetchData();

        //eslint-disable-next-line
    }, [page, rowPerPage, count]);

    // console.log('---GridPage', state)


    const handleChangePage = (event, newPage) => {
        setPage(newPage)

    }

    const handleChangeRowsPerPage = (e) => {
        setRowPerPage(Number(e.target.value));
        setPage(0);
    };
    // console.log(page)


    // FOR CUSTOM PAGINATION
    function CustomPagination() {
        const classes = useStyles();
        return (
            <TablePagination
                // component="div"
                count={count}
                page={page}
                className={classes.customtable}
                onChangePage={handleChangePage}
                rowsPerPage={rowPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        )
    }

    // Setting Rows Data for Data-Grid
    const GridRows = [];

    for (const item of state) {

        GridRows.push({ id: item._id, name: item.name, country: item.airline.country, logo: item.airline.logo, headquaters: item.airline.head_quaters, established: item.airline.established })
    }

    //console.table(GridRows)

    // console.log(GridRows)

    const classes = useStyles();
    return (
        <React.Fragment>

            <Typography variant="h5" className={classes.heading} >Dry-Drum Table Example</Typography>

            <TableContainer className={classes.table} align="center"></TableContainer>

            <div style={{ height: 400, width: '100%' }}>

                <DataGrid className={classes.root} rows={GridRows} columns={columns} pageSize={rowPerPage} rowHeight={30} components={{
                    Toolbar: CustomToolbar,
                    Pagination: CustomPagination,
                }} />

            </div>
            <TableContainer />

        </React.Fragment>
    )
}

export default AllProcessTable

