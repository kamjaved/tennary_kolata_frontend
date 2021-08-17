import React, { useEffect, useState } from 'react'

import { TablePagination, TableContainer, makeStyles, Typography, Button } from '@material-ui/core'
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridColumnsToolbarButton, GridFilterToolbarButton, } from '@material-ui/data-grid';

import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'


import { Link, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from "prop-types";
import { getMfcSplittings, deleteSplitting, setCurrentSplitting } from "../../../../_actions/splittingAction"
import DateFilter from '../ProcessForm/dateFilter'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 120
    },
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

    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}))




// FOR CUSTOM GRID TOOLBAR



const SplittingView = ({ getMfcSplittings, deleteSplitting, splittingsMapMfc, setCurrentSplitting, match, filteredDate }) => {


    const [state, setstate] = useState({
        mfcName: '',
        mfcID: ''
    });

    const [date, setDate] = React.useState({
        month: '',
        year: ''
    });

    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(10);



    function CustomToolbar() {
        const classes = useStyles();


        return (
            <GridToolbarContainer className={classes.customtoolbar}>
                <GridColumnsToolbarButton />
                <GridToolbarExport />
                <GridFilterToolbarButton />

                <DateFilter />
            </GridToolbarContainer>

        )
    }



    useEffect(() => {
        const id = localStorage.getItem('ManID');
        const name = localStorage.getItem('ManName');
        setstate({ mfcID: id, mfcName: name })

        setDate({ month: filteredDate.month, year: filteredDate.year })
        getMfcSplittings(id);

        //eslint-disable-next-line
    }, [page, rowPerPage, count, getMfcSplittings,]);

    // console.log('---GridPage', state)
    console.log(date)


    const handleChangePage = (event, newPage) => {
        setPage(newPage)

    }

    const handleDelete = (id) => {
        deleteSplitting(id);
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


    // --DEFINING ROWS
    const GridRows = [];

    for (const item of splittingsMapMfc) {

        GridRows.push({
            id: item._id, cow: item.qtys.CowPcs, side: item.qtys.SidesPcs, calf: item.qtys.CalfPcs, goat: item.qtys.GoatPcs,
            cowRate: item.totalCowRate.toFixed(2), sideRate: item.totalSidesRate.toFixed(2), calfRate: item.totalCalfRate.toFixed(2),
            goatRate: item.totalGoatRate.toFixed(2), date: moment(item.date).format('DD-MM-YYYY'), action: item.splittingQtyId
        })
    }

    // --DEFINING COLUMN
    const GridColumns = [

        { field: 'cow', headerName: 'Cow', flex: 0.5, },
        { field: 'side', headerName: 'Side', flex: 0.5, },
        { field: 'calf', headerName: 'Calf', flex: 0.5 },
        { field: 'goat', headerName: 'Goat', flex: 0.5, },
        { field: 'cowRate', headerName: 'Cow (₹)', type: 'number', flex: 0.7, },
        { field: 'sideRate', headerName: 'Side (₹)', type: 'number', flex: 0.7, },
        { field: 'calfRate', headerName: 'Calf (₹)', type: 'number', flex: 0.7, },
        { field: 'goatRate', headerName: 'Goat (₹)', type: 'number', flex: 0.6, },
        { field: 'date', headerName: 'Date', type: 'date', flex: 0.6, },
        {
            field: "action", headerName: "Action",
            flex: 1,
            renderCell: (params) => (


                <React.Fragment>
                    <Link to={`/edit-splitting/${params.value}`} onClick={() => setCurrentSplitting(params.value)}>
                        <EditSharpIcon
                            color="primary"
                            fontSize="small"
                            style={{ marginLeft: 16 }}
                            value={params.value}
                        /></Link>

                    <Link title='Delete' to="#!" onClick={() => handleDelete(params.value)}>
                        <DeleteSharpIcon
                            fontSize="small"
                            style={{ marginLeft: 16, color: 'red' }} />
                    </Link>
                </React.Fragment>
                // <Link title='Delete' to="#!" ></Link>

            ),
        },
    ];

    const classes = useStyles();
    const history = useHistory()

    return (
        <React.Fragment>
            <div className={classes.root}>


                <div>
                    <Typography variant="h5" className={classes.heading} >Splitting </Typography>

                    <Typography variant="overline" className={classes.heading} gutterBottom>
                        {state.mfcName}
                    </Typography>
                </div>

                <TableContainer className={classes.table} align="center"></TableContainer>

                <div style={{ height: 400, width: '100%' }}>

                    <DataGrid className={classes.dataGrid} rows={GridRows} columns={GridColumns} pageSize={rowPerPage} rowHeight={30} components={{
                        Toolbar: CustomToolbar,
                        Pagination: CustomPagination,
                    }} />

                </div>
                <TableContainer />

                <Link className={classes.heading} to={`/add-splitting/${match.params.processid}`}><Fab color="primary" aria-label="add" className={classes.absolute}>
                    <AddIcon />
                </Fab></Link>
            </div>
        </React.Fragment>
    )
}


SplittingView.propTypes = {
    getMfcSplittings: PropTypes.func.isRequired,
    deleteSplitting: PropTypes.func.isRequired,
    setCurrentSplitting: PropTypes.func.isRequired,
    splittingsMapMfc: PropTypes.array.isRequired,

}
const mapStateToProps = (state) => ({
    auth: state.auth,
    splittingsMapMfc: state.splitting.splittingsMapMfc,
    filteredDate: state.filterDate.filteredDate,
    loading: state.splitting.loading

})

export default connect(mapStateToProps, { getMfcSplittings, setCurrentSplitting, deleteSplitting })(SplittingView)









import React, { useEffect, useState } from 'react'

// Material-ui Imports
import { makeStyles, } from '@material-ui/core'
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'


import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from "prop-types";
import { getMfcSplittings, deleteSplitting, setCurrentSplitting } from "../../../../_actions/splittingAction"

import TableQtyView from './TableQty';
import DateFilter from '../ProcessForm/dateFilter';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 120
    },
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

    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}))



const SplittingView = ({

    getMfcSplittings, deleteSplitting,
    splittingsMapMfc, setCurrentSplitting,
    match, filteredDate }) => {


    const [state, setstate] = useState({
        mfcName: '',
        mfcID: ''
    });

    const year = filteredDate.year;
    const month = filteredDate.month

    console.log(year, month)

    useEffect(() => {
        const id = localStorage.getItem('ManID');
        const name = localStorage.getItem('ManName');
        setstate({ mfcID: id, mfcName: name })

        getMfcSplittings(id, month, year);

        //eslint-disable-next-line
    }, [getMfcSplittings, filteredDate]);


    // console.log('---GridPage', state)
    console.log(filteredDate)


    const handleDelete = (id) => {
        deleteSplitting(id);
    }



    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>


                <TableQtyView GridColumns={GridColumns} GridRows={GridRows} mfcName={state.mfcName} filteredDate={filteredDate} date={filteredDate} TableData={splittingsMapMfc} />

                <Link className={classes.heading} to={`/add-splitting/${match.params.processid}`}><Fab color="primary" aria-label="add" className={classes.absolute}>
                    <AddIcon />
                </Fab></Link>
            </div>
        </React.Fragment>
    )
}


SplittingView.propTypes = {
    getMfcSplittings: PropTypes.func.isRequired,
    deleteSplitting: PropTypes.func.isRequired,
    setCurrentSplitting: PropTypes.func.isRequired,
    splittingsMapMfc: PropTypes.array.isRequired,

}
const mapStateToProps = (state) => ({
    splittingsMapMfc: state.splitting.splittingsMapMfc,
    filteredDate: state.filterDate.filteredDate,
    loading: state.splitting.loading

})

export default connect(mapStateToProps, { getMfcSplittings, setCurrentSplitting, deleteSplitting })(SplittingView)



