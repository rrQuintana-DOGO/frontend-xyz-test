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
import { Client, ClientResponse } from '@logic/interfaces/ClientInterface';
import { CollectionScheme, PaymentSchemeStatus, SubscriptionStatus } from '@logic/interfaces/StripeInterface';

function createData(client: Client) {
  return {
    id: client.id_client,
    name: client.company_name,
    account_type: SubscriptionStatus[client.subscription.status as keyof typeof SubscriptionStatus],
    status: client.status ? 'Activo' : 'Bloqueada',
    modules: client.subscription.items.length,
    units: client.subscription.items[0].quantity,
    subscription: CollectionScheme[client.subscription.collection_method as keyof typeof CollectionScheme],
    billing_ammount: client.billing_ammount,
    total_spent: client.subscription.total_spent,
    payment_status: PaymentSchemeStatus[client.subscription.latest_payment_status as keyof typeof PaymentSchemeStatus],
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
  id: keyof Client;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'status', numeric: false, disablePadding: false, label: '' },
  { id: 'company_name', numeric: false, disablePadding: false, label: 'Empresa' },
  { id: 'subscription', numeric: false, disablePadding: false, label: 'Tipo de cuenta' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Estatus' },
  { id: 'subscription', numeric: false, disablePadding: false, label: 'Módulos' },
  { id: 'subscription', numeric: false, disablePadding: false, label: 'Unidades transmitiendo' },
  { id: 'subscription', numeric: false, disablePadding: false, label: 'Viajes mensuales' },
  { id: 'subscription', numeric: false, disablePadding: false, label: 'Subscripción' },
  { id: 'billing_ammount', numeric: false, disablePadding: false, label: 'Facturación' },
  { id: 'billing_ammount', numeric: false, disablePadding: false, label: 'Pago' },
];

function EnhancedTableHead(props: { order: 'asc' | 'desc'; orderBy: any; onRequestSort: (property: any) => void }) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: any) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow sx={{ '& > *': { paddingBlock: '4px' } }}>
        {headCells.map((headCell) => (
          <TableCell
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
        <TableCell align="left">{row.name}</TableCell> 
        <TableCell align="left">{row.account_type}</TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell align="left">{row.modules}</TableCell>
        <TableCell align="left">{row.units}</TableCell>
        <TableCell align="left">{"-"}</TableCell>
        <TableCell align="left">{row.subscription}</TableCell>
        <TableCell align="left">$ {row.total_spent} MXN</TableCell>
        <TableCell align="left">{row.payment_status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div>
                <p>Detalles adicionales del viaje...</p>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ClientsCollapsibleTable = ({ clients }: { clients: ClientResponse }) => {
  
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Client>('name');

  if(!clients?.data.length) {
    return 
  }

  const handleRequestSort = (property: keyof Client) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const rows = clients.data.map((client: Client) => createData(client));

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%'}} elevation={0}>
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
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ClientsCollapsibleTable;
