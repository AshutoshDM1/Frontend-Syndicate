import { useState } from 'react';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { type Table } from '~/store/tableState/table.types';
import TableSVG from '~/modules/MonitorTable/components/TableSVG';
import useTable from '~/hooks/useTable';
import Loading from '~/components/common/Loading';

const SelectTable = ({ setShowTable }: { setShowTable: (show: boolean) => void }) => {
  const { tables, selectedTable, setSelectedTable, isPending, isError, error } = useTable();
  const [selectedFloor, setSelectedFloor] = useState(1);

  // Filter tables by selected floor
  const filteredTables = tables.filter((table) => table.floor === selectedFloor);

  // Handle table selection
  const handleTableSelect = (table: Table) => {
    setSelectedTable(table);
    setShowTable(false);
  };

  return (
    <>
      <div className="p-6 min-h-screen w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Select Table</h1>
          <p className="text-muted-foreground">Select a table to start a new order</p>
        </div>

        {/* Status Legend */}
        <Card className="mb-6 p-4 bg-card border-border">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-sm shadow-sm"></div>
              <span className="text-sm font-medium text-card-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-sm shadow-sm"></div>
              <span className="text-sm font-medium text-card-foreground">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-sm shadow-sm"></div>
              <span className="text-sm font-medium text-card-foreground">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-sm shadow-sm"></div>
              <span className="text-sm font-medium text-card-foreground">Taking Order</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted-foreground rounded-sm shadow-sm"></div>
              <span className="text-sm font-medium text-card-foreground">Needs Cleaning</span>
            </div>
          </div>
        </Card>

        {/* Floor Selection */}
        <div className="mb-6">
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

        {/* Tables Grid */}
        <div className="flex gap-4">
          <Card className="p-8  min-h-[70vh] max-h-[70vh] w-full overflow-y-auto bg-card border-border custom-scrollbar overflow-x-hidden">
            {isPending && (
              <div className="flex items-center justify-center h-full">
                <Loading/>
              </div>
            )}
            {isError && (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Error: {error?.message}</p>
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

export default SelectTable;
