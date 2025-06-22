import { useState } from 'react';
import { Card, CardContent, CardFooter } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Badge } from '~/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import {
  Star,
  ShoppingCart,
  Plus,
  Minus,
  Search,
  Clock,
  X,
  Edit,
  Check,

} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Checkbox } from '~/components/ui/checkbox';

// Types
interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  available: boolean;
  modifiers: Modifier[];
  reviews?: Review[];
  prepTime?: number;
  calories?: number;
  tags?: string[];
}

interface Modifier {
  id: string;
  name: string;
  price: number;
  type: 'extra' | 'option';
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

interface ComboMeal {
  id: string;
  name: string;
  items: string[];
  price: number;
  image: string;
  description: string;
  savings: number;
  reviews?: Review[];
}

interface Review {
  id: string;
  user: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface CartItem {
  id: string;
  type: 'item' | 'combo';
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  modifiers: string[];
  specialInstructions?: string;
}

interface OrderInfo {
  tableNumber: string;
  customerName: string;
  customerPhone: string;
  guestCount: number;
  orderType: 'dine-in' | 'takeout' | 'delivery';
}

const QuickOrder = () => {
  // Sample data
  const [categories] = useState<Category[]>([
    { id: '1', name: 'Pizza', description: 'Delicious Italian pizzas', icon: '🍕' },
    { id: '2', name: 'Burgers', description: 'Juicy beef and chicken burgers', icon: '🍔' },
    { id: '3', name: 'Salads', description: 'Fresh and healthy salads', icon: '🥗' },
    { id: '4', name: 'Desserts', description: 'Sweet treats and desserts', icon: '🍰' },
    { id: '5', name: 'Beverages', description: 'Refreshing drinks', icon: '🥤' },
  ]);

  const [menuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Smokey Supreme Pizza',
      price: 12.0,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      description: 'Delicious pizza with smoked sausage, pepperoni, and cheese.',
      category: '1',
      rating: 4.5,
      available: true,
      prepTime: 15,
      calories: 580,
      tags: ['Popular', 'Spicy'],
      modifiers: [
        { id: '1', name: 'Extra Cheese', price: 2.5, type: 'extra' },
        { id: '2', name: 'Spicy', price: 0, type: 'option' },
      ],
      reviews: [
        {
          id: '1',
          user: 'John Doe',
          rating: 5,
          comment: 'Amazing pizza! The smoky flavor is incredible.',
          date: '2024-01-15',
          helpful: 12,
        },
      ],
    },
    {
      id: '2',
      name: 'Grilled Salmon',
      price: 22.0,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      description: 'Fresh Atlantic salmon grilled to perfection.',
      category: '1',
      rating: 4.7,
      available: true,
      prepTime: 20,
      calories: 340,
      tags: ['Healthy', 'Gluten-Free'],
      modifiers: [{ id: '3', name: 'Extra Lemon', price: 0.5, type: 'extra' }],
      reviews: [
        {
          id: '2',
          user: 'Sarah Smith',
          rating: 5,
          comment: "Best salmon I've had! Perfectly cooked.",
          date: '2024-01-14',
          helpful: 15,
        },
      ],
    },
    {
      id: '3',
      name: 'Classic Cheeseburger',
      price: 10.0,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      description: 'Juicy beef patty with cheese, lettuce, and tomato.',
      category: '2',
      rating: 4.6,
      available: true,
      prepTime: 12,
      calories: 650,
      tags: ['Classic', 'Popular'],
      modifiers: [
        { id: '4', name: 'Extra Patty', price: 4.0, type: 'extra' },
        { id: '5', name: 'No Onions', price: 0, type: 'option' },
      ],
      reviews: [
        {
          id: '3',
          user: 'Mike Johnson',
          rating: 4,
          comment: 'Great classic burger. Good size and tasty!',
          date: '2024-01-11',
          helpful: 6,
        },
      ],
    },
  ]);

  const [comboMeals] = useState<ComboMeal[]>([
    {
      id: '1',
      name: 'Pizza & Burger Combo',
      items: ['1', '3'],
      price: 18.0,
      image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop',
      description: 'Supreme pizza slice with classic cheeseburger',
      savings: 4.0,
      reviews: [
        {
          id: '4',
          user: 'Alex Johnson',
          rating: 4,
          comment: 'Great value for money! Both items are delicious.',
          date: '2024-01-14',
          helpful: 9,
        },
      ],
    },
  ]);

  // State
  const [activeTab, setActiveTab] = useState('menu');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedCombo, setSelectedCombo] = useState<ComboMeal | null>(null);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [showComboDialog, setShowComboDialog] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    tableNumber: '',
    customerName: '',
    customerPhone: '',
    guestCount: 1,
    orderType: 'dine-in',
  });
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Quick add to cart (without customization)
  const quickAddToCart = (type: 'item' | 'combo', id: string) => {
    const cartItem: CartItem = {
      id: `${type}-${id}-${Date.now()}`,
      type,
      itemId: id,
      name:
        type === 'item'
          ? menuItems.find((item) => item.id === id)?.name || ''
          : comboMeals.find((combo) => combo.id === id)?.name || '',
      price: calculateItemPrice(type, id, []),
      quantity: 1,
      modifiers: [],
      specialInstructions: '',
    };

    setCart([...cart, cartItem]);
  };

  // Cart functions
  const addToCart = (type: 'item' | 'combo', id: string, modifiers: string[] = []) => {
    const cartItem: CartItem = {
      id: `${type}-${id}-${Date.now()}`,
      type,
      itemId: id,
      name:
        type === 'item'
          ? menuItems.find((item) => item.id === id)?.name || ''
          : comboMeals.find((combo) => combo.id === id)?.name || '',
      price: calculateItemPrice(type, id, modifiers),
      quantity,
      modifiers,
      specialInstructions,
    };

    setCart([...cart, cartItem]);
    setShowItemDialog(false);
    setShowComboDialog(false);
    setQuantity(1);
    setSelectedModifiers([]);
    setSpecialInstructions('');
  };

  const calculateItemPrice = (type: 'item' | 'combo', id: string, modifiers: string[] = []) => {
    if (type === 'combo') {
      return comboMeals.find((combo) => combo.id === id)?.price || 0;
    }

    const item = menuItems.find((item) => item.id === id);
    if (!item) return 0;

    const modifierPrice = modifiers.reduce((total, modifierId) => {
      const modifier = item.modifiers.find((m) => m.id === modifierId);
      return total + (modifier?.price || 0);
    }, 0);

    return item.price + modifierPrice;
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(cart.filter((item) => item.id !== cartItemId));
  };

  const updateCartItemQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart(
      cart.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedModifiers([]);
    setQuantity(1);
    setSpecialInstructions('');
    setShowItemDialog(true);
  };

  const handleProcessOrder = () => {
    if (cart.length === 0) return;
    setShowCustomerDialog(true);
  };

  const handleSubmitOrder = () => {
    // Process the order
    console.log('Order submitted:', {
      orderInfo,
      items: cart,
      total: getCartTotal(),
    });

    // Reset form
    setCart([]);
    setOrderInfo({
      tableNumber: '',
      customerName: '',
      customerPhone: '',
      guestCount: 1,
      orderType: 'dine-in',
    });
    setShowCustomerDialog(false);
    setShowOrderDialog(false);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Content - Menu */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="bg-card shadow-sm border border-border rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">POS - Order Taking</h1>
                <p className="text-muted-foreground mt-1">Take customer orders efficiently</p>
              </div>

              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 py-0 mb-5 ">
          <TabsTrigger value="menu" className="text-lg py-2 cursor-pointer w-full">
            Menu Items
          </TabsTrigger>
          <TabsTrigger value="combos" className="text-lg py-2 cursor-pointer w-full">
            Combo Meals
          </TabsTrigger>

          </TabsList>
          <TabsContent value="menu" className="space-y-6">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('all')}
                size="sm"
              >
                All Items
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(category.id)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {category.icon} {category.name}
                </Button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-200"
                >
                  <div className="relative overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />

                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {item.tags?.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-white/90 text-gray-800 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {!item.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-3 space-y-2">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-base text-card-foreground line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-xs line-clamp-2">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-lg font-bold text-primary">
                        ${item.price.toFixed(2)}
                      </span>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.prepTime}m
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-3 pt-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => quickAddToCart('item', item.id)}
                      disabled={!item.available}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Quick Add
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => handleItemClick(item)}
                      disabled={!item.available}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Customize
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="combos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comboMeals.map((combo) => (
                <Card
                  key={combo.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-200"
                >
                  <div className="relative overflow-hidden">
                    <img src={combo.image} alt={combo.name} className="w-full h-32 object-cover" />

                    <div className="absolute top-2 left-2">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                        COMBO
                      </Badge>
                    </div>

                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white text-xs">
                        Save ${combo.savings.toFixed(2)}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-3 space-y-2">
                    <h3 className="font-semibold text-base text-gray-900">{combo.name}</h3>
                    <p className="text-gray-600 text-xs">{combo.description}</p>
                    <div className="text-lg font-bold text-orange-600">
                      ${combo.price.toFixed(2)}
                    </div>
                  </CardContent>

                  <CardFooter className="p-3 pt-0">
                    <Button
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                      size="sm"
                      onClick={() => quickAddToCart('combo', combo.id)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Combo
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Sidebar - Order Summary */}
      <div className="w-80 bg-card shadow-lg p-6 space-y-4 border-l border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-card-foreground">Current Order</h2>
          <Badge variant="outline" className="px-2 py-1">
            {getCartItemCount()} items
          </Badge>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">No items added yet</p>
            <p className="text-muted-foreground/70 text-xs mt-1">Start adding items to create an order</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                    {item.modifiers.length > 0 && (
                      <p className="text-xs text-gray-400">
                        + {item.modifiers.length} add-on{item.modifiers.length !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="font-medium text-sm w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
                              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-card-foreground">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setCart([])}
                  disabled={cart.length === 0}
                >
                  Clear Order
                </Button>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleProcessOrder}
                  disabled={cart.length === 0}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Process Order
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Item Customization Dialog */}
      <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
        <DialogContent className="max-w-lg p-4">
          <DialogHeader>
            <DialogTitle className="text-xl">Customize {selectedItem?.name}</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-gray-700 text-sm">{selectedItem.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {selectedItem.prepTime}m
                    </span>
                    <span>{selectedItem.calories} cal</span>
                  </div>
                  <div className="text-xl font-bold text-orange-600 mt-2">
                    ${calculateItemPrice('item', selectedItem.id, selectedModifiers).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Modifiers */}
              {selectedItem.modifiers.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Add-ons & Options</h4>
                  <div className="space-y-2">
                    {selectedItem.modifiers.map((modifier) => (
                      <label
                        key={modifier.id}
                        className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedModifiers.includes(modifier.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedModifiers([...selectedModifiers, modifier.id]);
                              } else {
                                setSelectedModifiers(
                                  selectedModifiers.filter((id) => id !== modifier.id)
                                );
                              }
                            }}
                          />
                          <span className="text-sm font-medium">{modifier.name}</span>
                        </div>
                        {modifier.price > 0 && (
                          <span className="text-orange-600 text-sm font-medium">
                            +${modifier.price.toFixed(2)}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Special Instructions</label>
                <Input
                  placeholder="Any special requests..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>

              {/* Quantity and Add */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="font-semibold px-3">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                <Button
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                  onClick={() => addToCart('item', selectedItem.id, selectedModifiers)}
                >
                  Add $
                  {(
                    calculateItemPrice('item', selectedItem.id, selectedModifiers) * quantity
                  ).toFixed(2)}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Customer Information Dialog */}
      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Information</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Type</label>
              <Select
                value={orderInfo.orderType}
                onValueChange={(value: 'dine-in' | 'takeout' | 'delivery') =>
                  setOrderInfo({ ...orderInfo, orderType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dine-in">Dine In</SelectItem>
                  <SelectItem value="takeout">Takeout</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {orderInfo.orderType === 'dine-in' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Table Number</label>
                <Input
                  placeholder="e.g., A1, B5"
                  value={orderInfo.tableNumber}
                  onChange={(e) => setOrderInfo({ ...orderInfo, tableNumber: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Customer Name</label>
              <Input
                placeholder="Enter customer name"
                value={orderInfo.customerName}
                onChange={(e) => setOrderInfo({ ...orderInfo, customerName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                placeholder="Customer phone number"
                value={orderInfo.customerPhone}
                onChange={(e) => setOrderInfo({ ...orderInfo, customerPhone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Guests</label>
              <Select
                value={orderInfo.guestCount.toString()}
                onValueChange={(value) =>
                  setOrderInfo({ ...orderInfo, guestCount: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Guest{num !== 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Order Total:</span>
                <span className="text-xl font-bold text-orange-600">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{getCartItemCount()} items</p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCustomerDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handleSubmitOrder}
                disabled={!orderInfo.customerName}
              >
                Submit Order
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickOrder;
