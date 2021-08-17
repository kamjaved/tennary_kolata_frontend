import React, { useEffect, useState } from 'react'

import { TablePagination, TableContainer, makeStyles, Typography, } from '@material-ui/core'
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridColumnsToolbarButton, GridFilterToolbarButton, } from '@material-ui/data-grid';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'


import { Link, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from "prop-types";
import { getMfcDryDrums, deleteDryDrum, setCurrentDryDrum } from "../../../../_actions/drydrumAction"


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


const DryDrumView = ({ getMfcDryDrums, deleteDryDrum, drydrumsMapMfc, setCurrentDryDrum, match }) => {




    const [state, setstate] = useState({
        mfcName: '',
        mfcID: ''
    });
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(10);


    useEffect(() => {
        const id = localStorage.getItem('ManID');
        const name = localStorage.getItem('ManName');
        setstate({ mfcID: id, mfcName: name })

        getMfcDryDrums(id);

        //eslint-disable-next-line
    }, [page, rowPerPage, count, getMfcDryDrums]);

    // console.log('---GridPage', state)


    const handleChangePage = (event, newPage) => {
        setPage(newPage)

    }

    const handleDelete = (id) => {
        deleteDryDrum(id);
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

    for (const item of drydrumsMapMfc) {

        GridRows.push({
            id: item._id, hour: item.hrs.dryDrumHour,
            total: item.totalHourlyRate,
            date: moment(item.date).format('DD-MM-YYYY'),
            action: item.dryDrumHourId
        })
    }

    // --DEFINING COLUMN
    const GridColumns = [

        { field: 'hour', headerName: 'Usage (Hours)', flex: 0.5, },
        { field: 'total', headerName: 'Total Rate', flex: 0.6 },
        { field: 'date', headerName: 'Date', type: 'date', flex: 0.6, },
        {
            field: "action", headerName: "Action",
            flex: 1,
            renderCell: (params) => (


                <React.Fragment>
                    <Link to={`/edit-drydrum/${params.value}`} onClick={() => setCurrentDryDrum(params.value)}>
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
                    <Typography variant="h5" className={classes.heading} >Dry-Drum </Typography>

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

                <Link className={classes.heading} to={`/add-drydrum/${match.params.processid}`}><Fab color="primary" aria-label="add" className={classes.absolute}>
                    <AddIcon />
                </Fab></Link>

            </div>
        </React.Fragment>
    )
}


DryDrumView.propTypes = {
    getMfcDryDrums: PropTypes.func.isRequired,
    deleteDryDrum: PropTypes.func.isRequired,
    setCurrentDryDrum: PropTypes.func.isRequired,
    drydrumsMapMfc: PropTypes.array.isRequired,

}
const mapStateToProps = (state) => ({
    auth: state.auth,
    drydrumsMapMfc: state.drydrum.drydrumsMapMfc,
    loading: state.drydrum.loading

})

export default connect(mapStateToProps, { getMfcDryDrums, setCurrentDryDrum, deleteDryDrum })(DryDrumView)



