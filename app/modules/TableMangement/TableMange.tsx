import React, { useState } from 'react';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import TableSVG from '~/components/TableSVG';

// Types for table management in POS
type TableStatus = 'available' | 'occupied' | 'reserved' | 'ordering' | 'needs-cleaning';
type TableSize = 'small' | 'medium' | 'large';

interface Table {
  id: string;
  number: string;
  status: TableStatus;
  size: TableSize;
  orderStartTime?: string;
  orderId?: string;
  customerCount?: number;
  floor: number;
  totalAmount?: number;
  orderItems?: number;
}

// Mock data - replace with actual data from your backend
const mockTables: Table[] = [
  // 1st Floor
  { id: '1', number: 'A1', status: 'available', size: 'medium', floor: 1 },
  { id: '2', number: 'A2', status: 'occupied', size: 'small', floor: 1, orderStartTime: '14:30', orderId: 'ORD-001', customerCount: 2, totalAmount: 45.50, orderItems: 3 },
  { id: '3', number: 'A3', status: 'reserved', size: 'large', floor: 1, orderStartTime: '15:00', customerCount: 6 },
  { id: '4', number: 'A4', status: 'available', size: 'medium', floor: 1 },
  { id: '5', number: 'A5', status: 'available', size: 'medium', floor: 1 },
  { id: '6', number: 'A6', status: 'ordering', size: 'medium', floor: 1, orderId: 'ORD-002', customerCount: 4, orderStartTime: '14:45' },
  { id: '7', number: 'A7', status: 'occupied', size: 'small', floor: 1, orderStartTime: '13:30', orderId: 'ORD-003', customerCount: 2, totalAmount: 32.00, orderItems: 5 },
  { id: '8', number: 'A8', status: 'needs-cleaning', size: 'medium', floor: 1 },
  { id: '9', number: 'A9', status: 'available', size: 'large', floor: 1 },
  { id: '10', number: 'A10', status: 'available', size: 'medium', floor: 1 },
  { id: '11', number: 'A11', status: 'ordering', size: 'medium', floor: 1, orderId: 'ORD-004', customerCount: 3, orderStartTime: '15:15' },
  { id: '12', number: 'A12', status: 'available', size: 'medium', floor: 1 },
  { id: '13', number: 'A13', status: 'occupied', size: 'large', floor: 1, orderId: 'ORD-005', customerCount: 8, orderStartTime: '12:30', totalAmount: 125.75, orderItems: 12 },
  { id: '14', number: 'A14', status: 'available', size: 'large', floor: 1 },
  // 2nd Floor
  { id: '15', number: 'B1', status: 'available', size: 'medium', floor: 2 },
  { id: '16', number: 'B2', status: 'reserved', size: 'small', floor: 2, orderStartTime: '16:00', customerCount: 2 },
  { id: '17', number: 'B3', status: 'available', size: 'large', floor: 2 },
  { id: '18', number: 'B4', status: 'ordering', size: 'medium', floor: 2, orderId: 'ORD-006', customerCount: 4, orderStartTime: '15:30' },
  // 3rd Floor
  { id: '19', number: 'C1', status: 'available', size: 'medium', floor: 3 },
  { id: '20', number: 'C2', status: 'needs-cleaning', size: 'small', floor: 3 },
];

const TableMange = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // Filter tables by selected floor
  const filteredTables = mockTables.filter(table => table.floor === selectedFloor);

  // Handle table selection
  const handleTableSelect = (tableId: string, status: TableStatus) => {
    setSelectedTable(tableId);
  };

  // Get selected table data
  const selectedTableData = selectedTable ? mockTables.find(t => t.id === selectedTable) : null;

  // Handle different POS actions
  const handleStartOrder = () => {
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
              variant={selectedFloor === floor ? "default" : "outline"}
              onClick={() => setSelectedFloor(floor)}
              className="px-6"
            >
              {floor === 1 ? "1st Floor" : floor === 2 ? "2nd Floor" : "3rd Floor"}
            </Button>
          ))}
        </div>
      </div>

      {/* Tables Grid */}
      <div className='flex gap-4'>
        <Card className="p-8 max-h-[70vh] overflow-y-auto bg-card border-border custom-scrollbar overflow-x-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-12 place-items-center">
          {filteredTables.map((table) => {
            const isSelected = selectedTable === table.id;

            return (
              <TableSVG
                key={table.id}
                tableNumber={table.number}
                status={table.status}
                time={table.orderStartTime}
                reservationId={table.orderId}
                isSelected={isSelected}
                onClick={() => handleTableSelect(table.id, table.status)}
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
                  Table {selectedTableData?.number}
                </h3>
                <p className="text-muted-foreground mt-1 capitalize">
                  Status: {selectedTableData?.status.replace('-', ' ')}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedTable(null)}>
                ✕ Close
              </Button>
            </div>

            {/* Order Details (if table has active order) */}
            {(selectedTableData?.status === 'occupied' || selectedTableData?.status === 'ordering') && (
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Order ID:</span>
                    <p className="font-medium text-card-foreground">{selectedTableData?.orderId}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Customers:</span>
                    <p className="font-medium text-card-foreground">{selectedTableData.customerCount}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Order Time:</span>
                    <p className="font-medium text-card-foreground">{selectedTableData.orderStartTime}</p>
                  </div>
                  {selectedTableData.totalAmount && (
                    <div>
                      <span className="text-muted-foreground">Total:</span>
                      <p className="font-medium text-card-foreground">${selectedTableData.totalAmount}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons based on table status */}
            <div className="flex flex-wrap gap-3">
              {selectedTableData?.status === 'available' && (
                <>
                  <Button onClick={handleStartOrder} className="bg-green-600 hover:bg-green-700">
                    Start New Order
                  </Button>
                </>
              )}

              {selectedTableData?.status === 'ordering' && (
                <>
                  <Button onClick={handleViewOrder} variant="outline">
                    Continue Order
                  </Button>
                  <Button onClick={handleMarkCleaning} variant="outline">
                    Cancel Order
                  </Button>
                </>
              )}

              {selectedTableData?.status === 'occupied' && (
                <>
                  <Button onClick={handleViewOrder} variant="outline">
                    View Order
                  </Button>
                  <Button onClick={handleProcessPayment} className="bg-blue-600 hover:bg-blue-700">
                    Process Payment
                  </Button>
                  <Button onClick={handleMarkCleaning} variant="outline">
                    Mark for Cleaning
                  </Button>
                </>
              )}

              {selectedTableData?.status === 'needs-cleaning' && (
                <Button onClick={handleMarkAvailable} className="bg-green-600 hover:bg-green-700">
                  Mark as Clean & Available
                </Button>
              )}

              {selectedTableData?.status === 'reserved' && (
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
  );
};

export default TableMange;