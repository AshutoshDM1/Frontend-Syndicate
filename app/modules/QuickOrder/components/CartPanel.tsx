import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { ScrollArea } from '~/components/ui/scroll-area';
import type { CartItem } from './DoOrder';

interface CartPanelProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  totalAmount: number;
}

const CartPanel = ({ cart, onUpdateQuantity, onRemoveItem, totalAmount }: CartPanelProps) => {
  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground">Add items from the menu to get started</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {cart.map((cartItem) => (
            <CartItemCard
              key={cartItem.item.id}
              cartItem={cartItem}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-muted/50">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Total Items:</span>
          <span className="font-semibold">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>
        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total Amount:</span>
          <span className="text-primary">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;   

// Cart Item Card Component
interface CartItemCardProps {
  cartItem: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const CartItemCard = ({ cartItem, onUpdateQuantity, onRemoveItem }: CartItemCardProps) => {
  const { item, quantity } = cartItem;
  const itemTotal = parseFloat(item.price.toString()) * quantity;

  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
        <div className="flex-1 p-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
              <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
              <p className="text-sm font-semibold text-primary mt-1">
                ${parseFloat(item.price.toString()).toFixed(2)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveItem(item.id)}
              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-6 w-6 p-0"
                onClick={() => onUpdateQuantity(item.id, quantity - 1)}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-sm font-medium w-8 text-center">{quantity}</span>
              <Button
                size="sm"
                variant="outline"
                className="h-6 w-6 p-0"
                onClick={() => onUpdateQuantity(item.id, quantity + 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <span className="text-sm font-semibold">${itemTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
