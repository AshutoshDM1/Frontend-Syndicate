import { CheckCircle, Clock, Receipt, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import type { CartItem } from './DoOrder';
import type { Table } from '~/store/tableState/table.types';

// Order Panel Component
interface OrderPanelProps {
  selectedTable: Table;
  cart: CartItem[];
  totalAmount: number;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  onSubmitOrder: () => void;
  isSubmitting: boolean;
}

const OrderPanel = ({
  selectedTable,
  cart,
  totalAmount,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  orderNotes,
  setOrderNotes,
  onSubmitOrder,
  isSubmitting,
}: OrderPanelProps) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4">
      {/* Order Summary */}
      <Card className="py-5 px-2 gap-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Table:</span>
            <span className="font-medium">#{selectedTable.number}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Items:</span>
            <span className="font-medium">{totalItems}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">${totalAmount.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card className="py-5 px-2 gap-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Customer Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Customer Name</label>
            <Input
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              placeholder="Enter phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Order Notes */}
      <Card className="py-5 px-2 gap-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Order Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            placeholder="Add special instructions or notes..."
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            className="w-full min-h-20 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </CardContent>
      </Card>

      {/* Submit Order */}
      <div className="mt-auto">
        <Button
          className="w-full"
          size="lg"
          onClick={onSubmitOrder}
          disabled={cart.length === 0 || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Submit Order
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OrderPanel;
