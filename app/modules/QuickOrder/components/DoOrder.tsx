import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { ScrollArea } from '~/components/ui/scroll-area';
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Clock,
  Users,
  CreditCard,
  Receipt,
  CheckCircle,
} from 'lucide-react';
import type { Table } from '~/store/tableState/table.types';
import type { MenuItem } from '~/store/menuItemState/menuItem.types';
import { MenuItemCard } from '~/components/common/MenuItemCard';
import { cn } from '~/lib/utils';
import { useMenuItemStore } from '~/store/menuItemState/menuItem.state';
import { useCategoryStore } from '~/store/menuItemState/category.state';
import { MakeOrder, type MakeOrderType } from '~/services/MakeOrder';
import { OrderStatus, PaymentMethod } from '~/store/orderState/order.types';
import type { ComboMeal } from '~/store/menuItemState/comboMeal.types';

interface CartItem {
  item: MenuItem | ComboMeal;
  quantity: number;
  notes?: string;
}

const DoOrder = ({
  selectedTable,
  onBack,
}: {
  selectedTable: Table | null;
  onBack: () => void;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { menuItems } = useMenuItemStore();
  const { categories } = useCategoryStore();

  // Filter menu items based on search and category
  const filteredItems = menuItems.filter((item: MenuItem) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.item.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((cartItem) => (cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem))
    );
  };

  const getTotalAmount = () => {
    return cart.reduce((total, cartItem) => {
      return total + parseFloat(cartItem.item.price.toString()) * cartItem.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const handleSubmitOrder = async () => {
    
    if (!selectedTable || cart.length === 0) return;
    setIsSubmitting(true);
    try {
      // TODO: Implement order submission logic
      const MakeOrderData : MakeOrderType = {
        tableId: selectedTable.id || '',
        customerName,
        customerPhone,
        totalAmount: getTotalAmount(),
        status: OrderStatus.STARTED,
        paymentMethod: PaymentMethod.CASH,
        orderItems: cart.map((item) => ({
          menuItemId: 'menuItemId' in item.item ? item.item.id : undefined,
          comboMealId: 'id' in item.item ? item.item.id : undefined,
          quantity: item.quantity,
        })),
      };
      console.log(MakeOrderData);
      // Simulate API call
      // const response = await MakeOrder({
      //   tableId: selectedTable.id || '',
      //   customerName,
      //   customerPhone,
      //   totalAmount: getTotalAmount(),
      //   status: OrderStatus.STARTED,
      //   paymentMethod: PaymentMethod.CASH,
      //   orderItems: cart,
      // });

      // Clear cart and reset form
      setCart([]);
      setCustomerName('');
      setCustomerPhone('');
      setOrderNotes('');

      // Show success message or redirect
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedTable) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No table selected</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Table {selectedTable.number}</h1>
            <p className="text-sm text-muted-foreground">
              Floor {selectedTable.floor} • {selectedTable.size} Table
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={selectedTable.status === 'OCCUPIED' ? 'destructive' : 'secondary'}>
            {selectedTable.status}
          </Badge>
          <Button className="text-base px-6" onClick={onBack}>
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>
          {selectedTable.customerCount && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              {selectedTable.customerCount} guests
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Menu */}
        <div className="flex-1 flex flex-col">
          {/* Search and Filters */}
          <div className="p-4 border-b space-y-4">
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />

            {categories.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All Items
                </Button>
                {categories.map((category: { id: string; name: string }) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Menu Items Grid */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-destructive">Error loading menu items</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredItems.map((item: MenuItem) => (
                  <div key={item.id} className="relative">
                    <MenuItemCard item={item} />
                    <Button
                      size="sm"
                      className="absolute bottom-4 right-4 h-8 w-8 rounded-full shadow-lg"
                      onClick={() => addToCart(item)}
                      disabled={!item.isAvailable}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Cart and Order */}
        <div className="w-96 border-l flex flex-col">
          <Tabs defaultValue="cart" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cart" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Cart ({getTotalItems()})
              </TabsTrigger>
              <TabsTrigger value="order" className="flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                Order
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cart" className="flex-1 flex flex-col">
              <CartPanel
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                totalAmount={getTotalAmount()}
              />
            </TabsContent>

            <TabsContent value="order" className="flex-1 flex flex-col">
              <OrderPanel
                selectedTable={selectedTable}
                cart={cart}
                totalAmount={getTotalAmount()}
                customerName={customerName}
                setCustomerName={setCustomerName}
                customerPhone={customerPhone}
                setCustomerPhone={setCustomerPhone}
                orderNotes={orderNotes}
                setOrderNotes={setOrderNotes}
                onSubmitOrder={handleSubmitOrder}
                isSubmitting={isSubmitting}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Cart Panel Component
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

export default DoOrder;
