import React, { useEffect, useState } from 'react'

// Material-ui Imports
import { makeStyles, Button } from '@material-ui/core'
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from "prop-types";
import { getDailyTotal, getMonthlyTotal, deleteSplitting, setCurrentSplitting } from "../../../../_actions/splittingAction"

import TableQtyView from './TableQty';
import { saveAs } from 'file-saver'
import axios from 'axios'

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

    getDailyTotal, getMonthlyTotal, deleteSplitting,
    dailyTotalSplitting, monthlyTotalSplitting, setCurrentSplitting,
    match, filteredDate }) => {


    const [state, setstate] = useState({
        mfcName: '',
        mfcID: ''
    });

    // DATE RELATED CODES
    const today = new Date()
    // const currentMonthName = today.toLocaleString('default', { month: 'short' })
    const currentMonth = today.getMonth() + 1
    const currentYear = today.getFullYear()

    const year = filteredDate.year || currentYear;
    const month = filteredDate.month || currentMonth


    useEffect(() => {
        const id = localStorage.getItem('ManID');
        const name = localStorage.getItem('ManName');
        setstate({ mfcID: id, mfcName: name })

        getDailyTotal(id, month, year);
        getMonthlyTotal(id, month, year)

        //eslint-disable-next-line
    }, [getDailyTotal, getMonthlyTotal, filteredDate]);


    // console.log('---GridPage', state)
    console.log(filteredDate)


    const handleDelete = (id) => {
        deleteSplitting(id);
    }

    const onClickHandler = e => {
        axios.post("http://localhost:5000/create-tableQty", dailyTotalSplitting)
            .then(() => axios.get("http://localhost:5000/fetch-tableQty", { responseType: "blob" }))

            .then(res => {
                const pdfBlob = new Blob([res.data], { type: "application/pdf" });
                saveAs(pdfBlob, `SPLITTING${Date.now()}.pdf`);
            });
    }


    const PDFButton = () => {
        return (
            <Button
                color="primary"
                className={classes.button}
                size="small"
                onClick={onClickHandler}
                startIcon={<PictureAsPdfIcon />}
            >PDF</Button>
        )
    }



    // --DEFINING ROWS
    const GridRows = [];

    for (const item of dailyTotalSplitting) {

        GridRows.push({
            id: item._id, cow: item.qtys.CowPcs, side: item.qtys.SidesPcs, calf: item.qtys.CalfPcs, goat: item.qtys.GoatPcs,
            cowRate: item.totalCowRate.toFixed(2), sideRate: item.totalSidesRate.toFixed(2), calfRate: item.totalCalfRate.toFixed(2),
            goatRate: item.totalGoatRate.toFixed(2),
            daytotal: item.dailyOverAll.toFixed(2),
            date: moment(item.date).format('DD-MM-YYYY'), action: item.splittingQtyId
        })
    }

    // --DEFINING COLUMN
    const GridColumns = [

        { field: 'cow', headerName: 'Cow', flex: 0.4, },
        { field: 'side', headerName: 'Side', flex: 0.4, },
        { field: 'calf', headerName: 'Calf', flex: 0.4 },
        { field: 'goat', headerName: 'Goat', flex: 0.4, },
        { field: 'cowRate', headerName: 'Cow (₹)', flex: 0.5, },
        { field: 'sideRate', headerName: 'Side (₹)', flex: 0.5, },
        { field: 'calfRate', headerName: 'Calf (₹)', flex: 0.5, },
        { field: 'goatRate', headerName: 'Goat (₹)', flex: 0.5, },
        { field: 'daytotal', headerName: 'Day Total(₹)', flex: 0.5, },
        { field: 'date', headerName: 'Date', type: 'date', flex: 0.5, },
        {
            field: "action", headerName: "Action",
            flex: 0.6,
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

    return (
        <React.Fragment>
            <div className={classes.root}>


                <TableQtyView GridColumns={GridColumns} GridRows={GridRows} mfcName={state.mfcName} date={filteredDate} month={month} year={year} PdfButton={PDFButton} />

                <Link className={classes.heading} to={`/add-splitting/${match.params.processid}`}><Fab color="primary" aria-label="add" className={classes.absolute}>
                    <AddIcon />
                </Fab></Link>
            </div>
        </React.Fragment>
    )
}


SplittingView.propTypes = {
    getDailyTotal: PropTypes.func.isRequired,
    getMonthlyTotal: PropTypes.func.isRequired,
    deleteSplitting: PropTypes.func.isRequired,
    setCurrentSplitting: PropTypes.func.isRequired,
    dailyTotalSplitting: PropTypes.array.isRequired,

}
const mapStateToProps = (state) => ({
    dailyTotalSplitting: state.splitting.dailyTotalSplitting,
    monthlyTotalSplitting: state.splitting.monthlyTotalSplitting,
    filteredDate: state.filterDate.filteredDate,
    loading: state.splitting.loading

})

export default connect(mapStateToProps, { getDailyTotal, getMonthlyTotal, setCurrentSplitting, deleteSplitting })(SplittingView)



