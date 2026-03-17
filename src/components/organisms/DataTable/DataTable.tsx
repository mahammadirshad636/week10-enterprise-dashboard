import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import type { ReactNode } from 'react';

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

export const DataTable = <T extends Record<string, unknown>>({ data, columns, onRowClick }: DataTableProps<T>) => (
  <TableContainer component={Paper}>
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={String(column.key)}>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={index}
            hover={Boolean(onRowClick)}
            onClick={() => onRowClick?.(row)}
            sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
          >
            {columns.map((column) => (
              <TableCell key={String(column.key)}>{column.render ? column.render(row) : String(row[column.key])}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
