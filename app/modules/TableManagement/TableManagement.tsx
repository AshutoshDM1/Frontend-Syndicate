import { useEffect, useState } from 'react';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { useTableStore } from '~/store/tableState/table.state';
import { TableStatus, type Table } from '~/store/tableState/table.types';
import TableSVG from '~/modules/TableManagement/components/TableSVG';
import { useQuery } from '@tanstack/react-query';
import { GetTables } from '~/services/table.service';
import { SelectMenu } from './components/SelectMenu';

const TableMange = () => {
  const { tables, selectedTable, setSelectedTable, setTables } = useTableStore();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [open, setOpen] = useState(false);
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

  // Handle different POS actions
  const handleStartOrder = () => {
    setOpen(true);
    console.log('Starting new order for table:', selectedTable);
    // Navigate to order taking screen or open order modal
  };

  const handleViewOrder = () => {
    console.log('Viewing order for table:', selectedTable);
    // Navigate to order details or open order management modal
  };

  const handleProcessPayment = () => {
    console.log('Processing payment for table:', selectedTable);
    // Navigate to payment processing
  };

  const handleMarkCleaning = () => {
    console.log('Marking table for cleaning:', selectedTable);
    // Update table status to needs-cleaning
  };

  const handleMarkAvailable = () => {
    console.log('Marking table as available:', selectedTable);
    // Update table status to available
  };

  return (
    <>
      <div className="p-6 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Table Management</h1>
          <p className="text-muted-foreground">Monitor table status and manage customer orders</p>
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

          <Card className="p-6 min-w-[30rem] bg-card border-border">
            <div className="space-y-4">
              {/* Table Info Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground">
                    Table {selectedTable?.number}
                  </h3>
                  <p className="text-muted-foreground mt-1 capitalize">
                    Status: {selectedTable?.status.replace('-', ' ')}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedTable(null)}>
                  ✕ Close
                </Button>
              </div>
              {/* Order Details (if table has active order) */}
              {(selectedTable?.status === TableStatus.OCCUPIED ||
                selectedTable?.status === TableStatus.ORDERING) && (
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Order ID:</span>
                      <p className="font-medium text-card-foreground">{selectedTable?.orderId}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Customers:</span>
                      <p className="font-medium text-card-foreground">
                        {selectedTable?.customerCount}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Order Time:</span>
                      <p className="font-medium text-card-foreground">
                        {selectedTable?.orderStartTime}
                      </p>
                    </div>
                    {selectedTable?.totalAmount && (
                      <div>
                        <span className="text-muted-foreground">Total:</span>
                        <p className="font-medium text-card-foreground">
                          ${selectedTable?.totalAmount}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons based on table status */}
              <div className="flex flex-wrap gap-3">
                {selectedTable?.status === TableStatus.AVAILABLE && (
                  <>
                    <Button
                      onClick={handleStartOrder}
                      className="bg-green-600 hover:bg-green-700 cursor-pointer"
                    >
                      Start New Order
                    </Button>
                  </>
                )}

                {selectedTable?.status === TableStatus.ORDERING && (
                  <>
                    <Button onClick={handleViewOrder} variant="outline">
                      Continue Order
                    </Button>
                    <Button onClick={handleMarkCleaning} variant="outline">
                      Cancel Order
                    </Button>
                  </>
                )}

                {selectedTable?.status === TableStatus.OCCUPIED && (
                  <>
                    <Button onClick={handleViewOrder} variant="outline">
                      View Order
                    </Button>
                    <Button
                      onClick={handleProcessPayment}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Process Payment
                    </Button>
                    <Button onClick={handleMarkCleaning} variant="outline">
                      Mark for Cleaning
                    </Button>
                  </>
                )}

                {selectedTable?.status === TableStatus.NEEDS_CLEANING && (
                  <Button onClick={handleMarkAvailable} className="bg-green-600 hover:bg-green-700">
                    Mark as Clean & Available
                  </Button>
                )}

                {selectedTable?.status === TableStatus.RESERVED && (
                  <>
                    <Button onClick={handleStartOrder} className="bg-green-600 hover:bg-green-700">
                      Seat Customers
                    </Button>
                    <Button onClick={handleMarkAvailable} variant="outline">
                      Cancel Reservation
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
      <SelectMenu open={open} onClose={() => setOpen(false)} onSelect={handleStartOrder} />
    </>
  );
};

export default TableMange;
