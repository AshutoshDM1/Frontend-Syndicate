import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { TableStatus, type Table } from '~/store/tableState/table.types';
import { useNavigate } from 'react-router';

const MonitorTablePannel = ({
  selectedTable,
  setSelectedTable,
}: {
  selectedTable: Table | null;
  setSelectedTable: (table: Table | null) => void;
}) => {
  const router = useNavigate();
  // Handle different POS actions
  const handleStartOrder = () => {
    console.log('Starting new order for table:', selectedTable);
    // Navigate to order taking screen or open order modal
    router('/dashboard/quick-order');
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
                  <p className="font-medium text-card-foreground">{selectedTable?.customerCount}</p>
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
                <Button onClick={handleProcessPayment} className="bg-blue-600 hover:bg-blue-700">
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
    </>
  );
};

  export default MonitorTablePannel;
