/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { TripLog } from '@logic/interfaces/TripLogInterface';
import { CustomButton } from '@components/inputs/CustomButton';
import useGetTripsLogs from '@logic/hooks/trips/useGetTripsLogs';
import CustomPagination from '@components/display/CustomTablePagination';
import { Divider } from '@mui/material';

function createData(tripLog: TripLog) {
  return {
    id: tripLog.id,
    user: tripLog.user.name,
    created_at: new Date(tripLog.created_at * 1000).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    comments: tripLog.comments,
    place: tripLog.place.latitude + ', ' + tripLog.place.longitude,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key,
) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof TripLog;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'user', numeric: false, disablePadding: false, label: 'Registro' },
  { id: 'comments', numeric: false, disablePadding: false, label: 'Descripción' },
  { id: 'place', numeric: false, disablePadding: false, label: 'Lugar' },
];


function EnhancedTableHead(props: { order: 'asc' | 'desc'; orderBy: any; onRequestSort: (property: any) => void }) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: any) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow sx={{ '& > *': { paddingBlock: '4px' } }} >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Box component="span" sx={{ fontWeight: 600 }}>
                {headCell.label}
              </Box>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset', paddingBlock: '4px' } }}>
        <TableCell align="left">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{row.user}</span>
            <span>{row.created_at}</span>
          </div>
        </TableCell>
        <TableCell align="left">{row.comments}</TableCell>
        <TableCell align="left">
          <CustomButton
            variant="text"
            label="Mapa"
            size="small"
            onClick={() => alert(row.place)}
            sx={{
              paddingLeft: 0
            }}
          />
        </TableCell>

      </TableRow>
    </React.Fragment>
  );
}

const TripLogsTable = ({ trip, initialLimit, showPagination = false }: { trip: string, initialLimit: number, showPagination?: boolean }) => {

  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TripLog>('id');

  const [params, setParams] = React.useState({ page: 1, limit: initialLimit });

  const { data: logs } = useGetTripsLogs(trip, params);

  if (!logs?.data) {
    return
  }

  const handleRequestSort = (property: keyof TripLog) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const rows = logs?.data.map((log: TripLog) => createData(log));

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }} elevation={0}>
        <TableContainer>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows
                .sort(getComparator(order, orderBy))
                .map((row: ReturnType<typeof createData>, index: number) => (
                  <Row key={index} row={row} />
                ))}
            </TableBody>
          </Table>
          {showPagination && (
            <>
              <CustomPagination
                endPagination={true}
                count={logs.meta.total_pages}
                page={params.page}
                rowsPerPage={params.limit}
                onPageChange={(_event, value) => setParams({ ...params, page: value })}
                onRowsPerPageChange={(event) => setParams({ ...params, page: 1, limit: Number(event.target.value) })}
              />
              <Divider orientation="horizontal" />
            </>
          )
          }
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TripLogsTable;
