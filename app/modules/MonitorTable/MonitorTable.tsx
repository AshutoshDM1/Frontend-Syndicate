import { useState } from 'react';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { useTableStore } from '~/store/tableState/table.state';
import { type Table } from '~/store/tableState/table.types';
import TableManagePannel from './components/MonitorTablePannel';
import HeadingTable from './components/HeadingTable';
import TableSVG from './components/TableSVG';
import useTable from '~/hooks/useTable';
import Loading from '~/components/common/Loading';

const TableMange = () => {
  const { selectedTable, setSelectedTable } = useTableStore();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const { tables, isPending, isError, error } = useTable();

  // Filter tables by selected floor
  const filteredTables = tables.filter((table) => table.floor === selectedFloor);

  // Handle table selection
  const handleTableSelect = (table: Table) => {
    setSelectedTable(table);
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Table Monitor</h1>
          <p className="text-muted-foreground">Monitor table status and manage customer orders</p>
        </div>

        {/* Floor Selection */}
        <div className="mb-5">
          <div className="flex gap-2">
            {[1, 2, 3].map((floor) => (
              <Button
                key={floor}
                variant={selectedFloor === floor ? 'default' : 'outline'}
                onClick={() => setSelectedFloor(floor)}
                className="px-6 capitalize cursor-pointer"
              >
                {floor === 1 ? '1st Floor' : floor === 2 ? '2nd Floor' : '3rd Floor'}
              </Button>
            ))}
          </div>
        </div>
        <HeadingTable />

        {/* Tables Grid */}
        <div className="flex flex-col xl:flex-row-reverse gap-4">
          {/* Selected Table Management Panel */}
          <TableManagePannel selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
          <Card className="p-8  min-h-[70vh] max-h-[70vh] w-full xl:w-2/3 overflow-y-auto bg-card border-border custom-scrollbar overflow-x-hidden">
            {isPending && (
              <div className="flex items-center justify-center h-full">
                <Loading />
              </div>
            )}
            {isError && (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Error: {error?.message}</p>
              </div>
            )}
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-12 place-items-center">
              {filteredTables.length > 0 &&
                filteredTables.map((table) => {
                  const isSelected = selectedTable?.id === table.id;
                  return (
                    <TableSVG
                      key={table.id}
                      tableNumber={table.number}
                      status={table.status}
                      reservationId={table.orderId}
                      isSelected={isSelected}
                      onClick={() => handleTableSelect(table)}
                    />
                  );
                })}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TableMange;
