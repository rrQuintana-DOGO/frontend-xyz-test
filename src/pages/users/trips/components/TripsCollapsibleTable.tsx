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
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { visuallyHidden } from '@mui/utils';
import { Collapse } from '@mui/material';
import moment from 'moment';
import GetStatusLabel from './GetStatusLabel';
import GetEtaStatus from './GetEtaStatus';
import { TripData } from '@logic/interfaces/TripInterface';
import TripsCollapsibleDetails from './TripsCollapsibleDetails';

function createData(trip: TripData) {
  return {
    id: trip.id_trip,
    status: trip.status?.name || 'Sin estatus',
    client: trip.client?.name,
    carrier: trip.carrier?.name,
    origin: trip.places[0]?.name,
    destination: trip.places[trip.places.length - 1]?.name,
    eta: trip.places[trip.places.length - 1]?.real_arrive_date,
    estimatedArrival: trip.places[trip.places.length - 1]?.estimate_arrive_date,
    collapsibleDetails: {
      id_trip: trip.id_trip,
      data: trip,
      places: trip.places,
      description: trip.description,
      tripType: trip.trip_type.name,
      journeyType : trip.journey_type.name,
      carrier: trip.carrier?.name,
      unit: trip.units_setpoints[0]?.unit?.name,
      drivers: trip.drivers.map((driver) => ({ name: driver?.name || '' })),
      middlePoint: trip.middle_point,
      waypoints: [
        { latitude: 25.641197440014864, longitude: -100.28304077467403 },
        { latitude: 27.695175725176355, longitude: -99.74796594754365 },
        { latitude: 27.952970905838416, longitude: -99.38001786739679 },
        { latitude: 29.519651885880343, longitude: -98.48429997116423 },
      ],
      routeName : trip.route.name,
      wayBill: trip.way_bill || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    }
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
  id: keyof TripData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'status', numeric: false, disablePadding: false, label: '' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Estatus' },
  { id: 'id_trip', numeric: false, disablePadding: false, label: 'ID' },
  { id: 'client', numeric: false, disablePadding: false, label: 'Cliente' },
  { id: 'carrier', numeric: false, disablePadding: false, label: 'Unidad' },
  { id: 'origin', numeric: false, disablePadding: false, label: 'Origen' },
  { id: 'destination', numeric: false, disablePadding: false, label: 'Destino' },
  { id: 'estimatedArrival', numeric: false, disablePadding: false, label: 'Llegada programada' },
  { id: 'eta', numeric: false, disablePadding: false, label: 'ETA' },
];

function EnhancedTableHead(props: { order: 'asc' | 'desc'; orderBy: any; onRequestSort: (property: any) => void }) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: any) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow sx={{ '& > *': { paddingBlock: '4px' } }}>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
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
  const [open, setOpen] = React.useState(false);


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset', paddingBlock: '4px' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left"><GetStatusLabel status={row.status} /></TableCell>
        <TableCell align="left">{row.id}</TableCell>
        <TableCell align="left">{row.client}</TableCell>
        <TableCell align="left">{row.carrier}</TableCell>
        <TableCell align="left">{row.origin}</TableCell>
        <TableCell align="left">{row.destination}</TableCell>
        <TableCell align="left">
          {moment.unix(Number(row.estimatedArrival)).isValid()
            ? moment.unix(Number(row.estimatedArrival)).format('DD/MM/YYYY HH:mm:ss')
            : '-'}
        </TableCell>
        <TableCell align="left">{<GetEtaStatus estimatedArrival={Number(row.estimatedArrival)} realArrival={Number(row.eta)} />
        }</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit style={{ padding: 0, margin: 0, backgroundColor: '#F1F4FA' }}>
            <Box margin={1} style={{ backgroundColor: 'red' }}>
              <TripsCollapsibleDetails row={row.collapsibleDetails}  />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const TripsCollapsibleTable = ({ trips }: { trips: TripData[] }) => {
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TripData>('description');

  const handleRequestSort = (property: keyof TripData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const rows = trips.map((trip) => createData(trip));

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
                .map((row, index) => (
                  <Row key={index} row={row} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TripsCollapsibleTable;
