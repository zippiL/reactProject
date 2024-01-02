import { observer } from "mobx-react-lite";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Chip } from "@mui/joy";
import meetingStore from "../../store/meetingStore";

const SeeMeetings = observer(() => {

  const columns = [
    {
      field: 'serviceName',
      headerName: 'Service name',
      width: 150,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,

    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'number',
      width: 150,

    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      width: 150,

    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'Date',
      width: 150,
      sortable: true,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        const date1 = new Date(v1);
        const date2 = new Date(v2);
        return date1.getTime() - date2.getTime();
      },
      valueGetter: (params) => {
        const date = new Date(params.row.dateTime);
        return date.toDateString();
      },
    },
    {
      field: 'time',
      headerName: 'Time',
      type: 'Date',
      width: 100,
      sortable: true,
      sortComparator: (v1, v2) => {
        const date1 = new Date(v1);
        const date2 = new Date(v2);
        return date1.getTime() - date2.getTime();
      },
      valueGetter: (params) => {
        const date = new Date(params.row.dateTime);
        return date.toLocaleTimeString();
      },
    }
    ,
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const date = new Date(params.row.dateTime);
        const today = new Date();
        const thisWeek = new Date();
        thisWeek.setDate(date + 7);

        const isPast = date <= today;
        let status;

        if (isPast && date.toDateString() === today.toDateString()) {
          status = 'Today';
        } else if (isPast && date <= thisWeek) {
          status = 'This week';
        } else if (isPast && status !== 'past') {
          status = 'past';
        } else {
          status = '';
        }


        if (status === 'Today') {
          return <Chip color="danger">Today</Chip>;
        } else if (status === 'This week') {
          return <Chip color="warning">This week</Chip>;
        } else if (status === 'past') {
          return <Chip >POST</Chip>;
        } else {
          return <Chip color="success">Later</Chip>;
        }
      },
    }


  ];

  const rows = meetingStore.data;

  const getRowId = (row) => `${row.name}-${row.serviceName}-${row.phone}`;

  return (<>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        getRowId={getRowId}

      />
    </Box>
  </>);
})
export default SeeMeetings;