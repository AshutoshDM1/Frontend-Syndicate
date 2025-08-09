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
import { useComboMealStore } from '~/store/menuItemState/comboMeal.state';
import CartPanel from './CartPanel';
import OrderPanel from './OrderPanel';
import ComboMealCard from '~/modules/MenuCustom/components/ComboMealCard';

enum CartItemType {
  MENU_ITEM = 'menuItem',
  COMBO_MEAL = 'comboMeal',
}
export interface CartItem {
  type: CartItemType;
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
  const { comboMeals } = useComboMealStore();
  const { categories } = useCategoryStore();

  const [OrderPannel , setOrderPannel] = useState<"cart" | "order">("cart");
  console.log(OrderPannel);
  // Filter menu items based on search and category
  const filteredItems = menuItems.filter((item: MenuItem) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.item.id === item.item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prev, item];
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
      const MakeOrderData: MakeOrderType = {
        tableId: selectedTable.id || '',
        customerName,
        customerPhone : parseInt(customerPhone),
        totalAmount: getTotalAmount(),
        status: OrderStatus.STARTED,
        paymentMethod: PaymentMethod.CASH,
        orderItems: cart.map((item) => ({
          itemId: item.item.id,
          itemType: item.type,
          quantity: item.quantity,
        })),
      };
      console.log(MakeOrderData);
      const response = await MakeOrder(MakeOrderData);
      console.log(response);

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
                <Button
                  variant={selectedCategory === 'comboMeals' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('comboMeals')}
                >
                  Combo Meals
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
                {selectedCategory === 'comboMeals'
                  ? comboMeals.map((item: ComboMeal) => (
                      <div key={item.id} className="relative">
                        <ComboMealCard combo={item} />
                        <Button
                          size="sm"
                          className="absolute bottom-4 right-4 h-8 w-8 rounded-full shadow-lg"
                          onClick={() => {
                            addToCart({ type: CartItemType.COMBO_MEAL, item, quantity: 1 });
                          }}
                          disabled={!item.isAvailable}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  : filteredItems.map((item: MenuItem) => (
                      <div key={item.id} className="relative">
                        <MenuItemCard item={item} />
                        <Button
                          size="sm"
                          className="absolute bottom-4 right-4 h-8 w-8 rounded-full shadow-lg"
                          onClick={() => addToCart({ type: CartItemType.MENU_ITEM, item, quantity: 1 })}
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
          <Tabs value={OrderPannel} onValueChange={(value) => setOrderPannel(value as "cart" | "order")} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 px-3">
              <TabsTrigger value="cart" className="flex items-center gap-2 cursor-pointer">
                <ShoppingCart className="w-4 h-4" />
                Cart ({getTotalItems()})
              </TabsTrigger>
              <TabsTrigger value="order" className="flex items-center gap-2 cursor-pointer">
                <Receipt className="w-4 h-4" />
                Order
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cart" className="flex-1 flex flex-col">
              <CartPanel
                cart={cart}
                handleNext={() => {
                  setOrderPannel("order");  
                }}
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

export default DoOrder;
