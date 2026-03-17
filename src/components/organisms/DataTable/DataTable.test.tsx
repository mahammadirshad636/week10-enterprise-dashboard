import { render, screen } from '@testing-library/react';
import { DataTable, type Column } from '@components/organisms/DataTable/DataTable';

interface RowData {
  id: string;
  name: string;
}

describe('DataTable', () => {
  it('renders rows and columns', () => {
    const data: RowData[] = [
      { id: '1', name: 'Alpha' },
      { id: '2', name: 'Beta' }
    ];
    const columns: Column<RowData>[] = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' }
    ];

    render(<DataTable data={data} columns={columns} />);

    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });
});
