import { useEffect, useState } from 'react';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { useTableStore } from '~/store/tableState/table.state';
import { type Table } from '~/store/tableState/table.types';
import { useQuery } from '@tanstack/react-query';
import { GetTables } from '~/services/table.service';
import TableManagePannel from './components/MonitorTablePannel';
import HeadingTable from './components/HeadingTable';
import TableSVG from './components/TableSVG';

const TableMange = () => {
  const { tables, selectedTable, setSelectedTable, setTables } = useTableStore();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ['tables'],
    queryFn: GetTables,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setTables(data.data.tables);
    }
  }, [isSuccess]);

  // Filter tables by selected floor
  const filteredTables = tables.filter((table) => table.floor === selectedFloor);

  // Handle table selection
  const handleTableSelect = (table: Table) => {
    setSelectedTable(table);
  };

  return (
    <>
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Table Management</h1>
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
        <div className="flex gap-4">
          <Card className="p-8  min-h-[70vh] max-h-[70vh] w-2/3 overflow-y-auto bg-card border-border custom-scrollbar overflow-x-hidden">
            {isPending && (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Loading...</p>
              </div>
            )}
            {isError && (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Error: {error.message}</p>
              </div>
            )}
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-12 place-items-center">
              {filteredTables.length === 0 && (
                <>
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No tables found</p>
                  </div>
                </>
              )}
              {filteredTables.length > 0 &&
                filteredTables.map((table) => {
                  const isSelected = selectedTable?.id === table.id;
                  return (
                    <TableSVG
                      key={table.id}
                      tableNumber={table.number}
                      status={table.status}
                      time={table.orderStartTime}
                      reservationId={table.orderId}
                      isSelected={isSelected}
                      onClick={() => handleTableSelect(table)}
                    />
                  );
                })}
            </div>
          </Card>

          {/* Selected Table Management Panel */}
          <TableManagePannel selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
        </div>
      </div>
    </>
  );
};

export default TableMange;
