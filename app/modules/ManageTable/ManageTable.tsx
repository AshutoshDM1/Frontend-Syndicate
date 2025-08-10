import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '~/components/ui/table';
import { Button } from '~/components/ui/button';
import { toast } from 'sonner';
import { DeleteTable } from '~/services/table.service';
import EditTableDailog from './components/EditTableDailog';
import useTable from '~/hooks/useTable';
import type { Table as TableType } from '~/store/tableState/table.types';
import Loading from '~/components/common/Loading';
import HeadingTable from '../MonitorTable/components/HeadingTable';

const ManageTable = () => {
  const [open, setOpen] = useState(false);
  const [table, setTable] = useState<TableType | null>(null);
  const [mode, setMode] = useState<'edit' | 'add'>('edit');
  const { tables, isPending, isError, refetch } = useTable();
  const handleDelete = async (id: string) => {
    try {
      if (!id) return;
      const response = await DeleteTable(id);
      if (response?.statusCode === 201) {
        toast.success('Table deleted successfully');
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete table');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Table Management</h1>
        <p className="text-muted-foreground">Manage your tables and their status</p>
      </div>
      <HeadingTable />
      {isPending ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : isError ? (
        <div className="text-center text-muted-foreground py-8">Error: Table not found</div>
      ) : (
        <>
          <div className="rounded-lg border border-border p-2">
            <div className="flex justify-end">
              <Button
                className="bg-primary text-white"
                onClick={() => {
                  setOpen(true);
                  setMode('add');
                }}
              >
                Add Table
              </Button>
            </div>
            <Table>
              <TableCaption>A list of all the tables in the restaurant.</TableCaption>
              <TableHeader>
                <TableRow className="text-center">
                  <TableHead>Table Number</TableHead>
                  <TableHead>Table Status</TableHead>
                  <TableHead>Table Floor</TableHead>
                  <TableHead>Table Capacity</TableHead>
                  <TableHead className="text-center">Table Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tables.length > 0 ? (
                  tables.map((table) => (
                    <TableRow key={table.id}>
                      <TableCell>{table.number}</TableCell>
                      <TableCell
                        className={`${table.status === 'AVAILABLE' ? 'text-green-500' : table.status === 'OCCUPIED' ? 'text-red-500' : table.status === 'RESERVED' ? 'text-blue-500' : table.status === 'ORDERING' ? 'text-primary' : table.status === 'NEEDS_CLEANING' ? 'text-muted-foreground' : 'text-muted-foreground'}`}
                      >
                        {table.status.split('_').join(' ')}
                      </TableCell>
                      <TableCell>{table.floor}</TableCell>
                      <TableCell>{table.size}</TableCell>
                      <TableCell className="flex justify-center">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setOpen(true);
                              setMode('edit');
                              setTable(table);
                            }}
                          >
                            Edit
                          </Button>
                          <Button onClick={() => handleDelete(table.id || '')} variant="outline">
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
      <EditTableDailog
        open={open}
        setOpen={setOpen}
        mode={mode}
        table={table}
        onSuccuss={refetch}
      />
    </div>
  );
};

export default ManageTable;
