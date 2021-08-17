exports.columns = [
    { field: 'name', headerName: 'Name', flex: 1, headerClassName: 'headerData-grid' },
    { field: 'country', headerName: 'Country', flex: 0.8, },
    { field: 'logo', headerName: 'Logo', flex: 0.5 },
    { field: 'headquaters', headerName: 'Headquaters', flex: 1.5, },
    { field: 'established', headerName: 'Estd-Date', type: 'number', flex: 0.5, },



    // {
    //     field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false,
    //     flex: 1,
    //     valueGetter: (params) =>
    //         `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    // },
];




exports.dataGridrows = [
    { name: '', lastName: 'Snow', firstName: 'Jon', age: 35 },
    { name: 'Carryoh doe', lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { name: 'john doe', lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { name: 'john doe', lastName: 'Stark', firstName: 'Arya', age: 16 },
    { name: 'john doe', lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { name: 'john doe', lastName: 'Melisandre', firstName: null, age: 150 },
    { name: 'john doe', lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { name: 'john doe', lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { name: 'john doe', lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]