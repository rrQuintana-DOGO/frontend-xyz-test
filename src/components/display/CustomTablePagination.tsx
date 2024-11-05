import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface CustomPaginationProps {
  count: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (event: SelectChangeEvent<number>) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  count,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  return (
    <div className='flex flex-row justify-between items-center bg-white py-3 px-5'>
      <div className="flex flex-row space-x-3 w-1/5 items-center">
        <p className='text-sm'>Filas por página</p>
        <Select
          labelId="rows-per-page-label"
          id="rows-per-page-select"
          value={rowsPerPage}
          defaultValue={10}
          onChange={onRowsPerPageChange}
          label="Filas por página"
          sx={{
            width: '60px',
            marginBottom: '16px',
            border: 'none',
            padding: '0',
            '& .MuiSelect-select': {
              padding: '0',
              border: 'none',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            m: 'auto',
            fontSize: '0.875rem',
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </div>

      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        color="primary"
        shape="rounded"
      />
      <div className="w-1/5" />
    </div>
  );
};

export default CustomPagination;
