import { useState } from 'react';
import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '~/components/ui/dialog';
import { Plus, Edit, Trash2, Star, ShoppingCart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
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
}

interface ComboMeal {
  id: string;
  name: string;
  items: string[];
  price: number;
  image: string;
  description: string;
}

const MenuCustom = () => {
  // Sample data
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Pizza', description: 'Delicious Italian pizzas' },
    { id: '2', name: 'Burgers', description: 'Juicy beef and chicken burgers' },
    { id: '3', name: 'Salads', description: 'Fresh and healthy salads' },
    { id: '4', name: 'Desserts', description: 'Sweet treats and desserts' },
    { id: '5', name: 'Beverages', description: 'Refreshing drinks' },
  ]);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Smokey Supreme Pizza',
      price: 12.00,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      description: 'Delicious pizza with smoked sausage, pepperoni, and cheese',
      category: '1',
      rating: 4.5,
      available: true,
      modifiers: [
        { id: '1', name: 'Extra Cheese', price: 2.50, type: 'extra' },
        { id: '2', name: 'Spicy', price: 0, type: 'option' },
      ]
    },
    {
      id: '2',
      name: 'Grilled Salmon',
      price: 22.00,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      description: 'Fresh grilled salmon with lemon and herbs',
      category: '1',
      rating: 4.7,
      available: true,
      modifiers: [
        { id: '3', name: 'Extra Lemon', price: 0.50, type: 'extra' },
        { id: '4', name: 'Medium Rare', price: 0, type: 'option' },
      ]
    },
    {
      id: '3',
      name: 'Grilled Chicken Delight',
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop',
      description: 'Tender grilled chicken with herbs and spices',
      category: '2',
      rating: 4.8,
      available: true,
      modifiers: [
        { id: '5', name: 'Extra Spicy', price: 0, type: 'option' },
        { id: '6', name: 'BBQ Sauce', price: 1.00, type: 'extra' },
      ]
    },
    {
      id: '4',
      name: 'Fiery Shrimp Salad',
      price: 8.00,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      description: 'Fresh shrimp salad with mixed greens',
      category: '3',
      rating: 4.4,
      available: true,
      modifiers: [
        { id: '7', name: 'Extra Shrimp', price: 3.00, type: 'extra' },
        { id: '8', name: 'Dressing on Side', price: 0, type: 'option' },
      ]
    },
    {
      id: '5',
      name: 'Chocolate Lava Cake',
      price: 10.00,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
      description: 'Rich chocolate cake with molten center',
      category: '4',
      rating: 4.9,
      available: true,
      modifiers: [
        { id: '9', name: 'Vanilla Ice Cream', price: 2.00, type: 'extra' },
        { id: '10', name: 'Extra Hot', price: 0, type: 'option' },
      ]
    },
    {
      id: '6',
      name: 'Classic Cheeseburger',
      price: 10.00,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      description: 'Juicy beef patty with cheese, lettuce, and tomato',
      category: '2',
      rating: 4.6,
      available: true,
      modifiers: [
        { id: '11', name: 'Extra Patty', price: 4.00, type: 'extra' },
        { id: '12', name: 'No Onions', price: 0, type: 'option' },
      ]
    },
    {
      id: '7',
      name: 'Sunny Citrus Cake',
      price: 8.50,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
      description: 'Light and zesty citrus cake',
      category: '4',
      rating: 4.8,
      available: true,
      modifiers: [
        { id: '13', name: 'Extra Glaze', price: 1.00, type: 'extra' },
        { id: '14', name: 'Whipped Cream', price: 1.50, type: 'extra' },
      ]
    },
    {
      id: '8',
      name: 'Spaghetti Carbonara',
      price: 15.00,
      image: 'https://plus.unsplash.com/premium_photo-1674511582428-58ce834ce172?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3BhZ2hldHRpJTIwQ2FyYm9uYXJhfGVufDB8fDB8fHww',
      description: 'Classic Italian pasta with eggs, cheese, and bacon',
      category: '1',
      rating: 4.7,
      available: true,
      modifiers: [
        { id: '15', name: 'Extra Bacon', price: 2.50, type: 'extra' },
        { id: '16', name: 'Gluten Free', price: 1.00, type: 'option' },
      ]
    },
    {
      id: '9',
      name: 'Roasted Turkey Legs',
      price: 8.00,
      image: 'https://plus.unsplash.com/premium_photo-1664392048940-3e08720a4207?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Um9hc3RlZCUyMFR1cmtleSUyMExlZ3N8ZW58MHx8MHx8fDA%3D',
      description: 'Slow-roasted turkey legs with herbs',
      category: '1',
      rating: 4.5,
      available: true,
      modifiers: [
        { id: '17', name: 'Extra Gravy', price: 1.50, type: 'extra' },
        { id: '18', name: 'Spicy Rub', price: 0, type: 'option' },
      ]
    },
    {
      id: '10',
      name: 'Fresh Fruit Smoothie',
      price: 6.50,
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
      description: 'Refreshing blend of seasonal fruits',
      category: '5',
      rating: 4.3,
      available: true,
      modifiers: [
        { id: '19', name: 'Protein Powder', price: 2.00, type: 'extra' },
        { id: '20', name: 'Extra Large', price: 2.00, type: 'option' },
      ]
    },
  ]);

  const [comboMeals, setComboMeals] = useState<ComboMeal[]>([
    {
      id: '1',
      name: 'Pizza & Salad Combo',
      items: ['1', '4'],
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop',
      description: 'Supreme pizza with fresh shrimp salad'
    }
  ]);

  // State for dialogs and forms
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showComboDialog, setShowComboDialog] = useState(false);
  const [showEditItemDialog, setShowEditItemDialog] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);

  // Form states
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newCombo, setNewCombo] = useState({ name: '', description: '', selectedItems: [] as string[] });

  // Filter items by category
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Handle item selection and show customization dialog
  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedModifiers([]);
    setShowItemDialog(true);
  };

  // Handle modifier selection
  const toggleModifier = (modifierId: string) => {
    setSelectedModifiers(prev => 
      prev.includes(modifierId) 
        ? prev.filter(id => id !== modifierId)
        : [...prev, modifierId]
    );
  };

  // Calculate total price with modifiers
  const calculateTotalPrice = () => {
    if (!selectedItem) return 0;
    const modifierPrice = selectedModifiers.reduce((total, modifierId) => {
      const modifier = selectedItem.modifiers.find(m => m.id === modifierId);
      return total + (modifier?.price || 0);
    }, 0);
    return selectedItem.price + modifierPrice;
  };

  // Add new category
  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: Category = {
        id: Date.now().toString(),
        name: newCategory.name,
        description: newCategory.description
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', description: '' });
      setShowCategoryDialog(false);
    }
  };

  // Delete category
  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    if (activeCategory === categoryId) {
      setActiveCategory('all');
    }
  };

  // Add new menu item
  const handleAddMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: 'New Item',
      price: 10.00,
      image: 'https://images.unsplash.com/photo-1546069900247-0877df9cc83c?w=400&h=300&fit=crop',
      description: 'New menu item description',
      category: categories[0]?.id || '1',
      rating: 4.0,
      available: true,
      modifiers: []
    };
    setMenuItems([...menuItems, newItem]);
    setEditingItem(newItem);
    setShowEditItemDialog(true);
  };

  // Update menu item
  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(menuItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setShowEditItemDialog(false);
    setEditingItem(null);
  };

  // Delete menu item
  const handleDeleteMenuItem = (itemId: string) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
  };

  // Create combo meal
  const handleCreateCombo = () => {
    if (newCombo.name.trim() && newCombo.selectedItems.length >= 2) {
      const combo: ComboMeal = {
        id: Date.now().toString(),
        name: newCombo.name,
        items: newCombo.selectedItems,
        price: newCombo.selectedItems.reduce((total, itemId) => {
          const item = menuItems.find(i => i.id === itemId);
          return total + (item?.price || 0);
        }, 0) * 0.85, // 15% discount for combo
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
        description: newCombo.description
      };
      setComboMeals([...comboMeals, combo]);
      setNewCombo({ name: '', description: '', selectedItems: [] });
      setShowComboDialog(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Menu Customization
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              Manage your restaurant menu items, categories, and combos with our intuitive interface
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-700">
                  {menuItems.filter(item => item.available).length} items available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-sm font-medium text-orange-700">
                  {categories.length} categories
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span className="text-sm font-medium text-purple-700">
                  {comboMeals.length} combo deals
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => setShowCategoryDialog(true)} 
              variant="outline"
              className="border-primary/20 hover:border-primary/30 hover:bg-primary/5 text-primary font-medium cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
            <Button 
              onClick={handleAddMenuItem} 
              variant="outline"
              className="border-primary/20 hover:border-primary/30 hover:bg-primary/5 text-primary font-medium cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
            <Button 
              onClick={() => setShowComboDialog(true)}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Combo
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('all')}
            className="whitespace-nowrap"
          >
            All Items ({menuItems.length})
          </Button>
          {categories.map(category => (
            <div key={category.id} className="flex items-center gap-2">
              <Button
                variant={activeCategory === category.id ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name} ({menuItems.filter(item => item.category === category.id).length})
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDeleteCategory(category.id)}
                className="h-8 w-8"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Combo Meals Section */}
        {comboMeals.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-card-foreground">Combo Meals</h2>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                SPECIAL OFFERS
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {comboMeals.map(combo => (
                <Card key={combo.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card rounded-2xl border border-border shadow-sm cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Combo Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        COMBO DEAL
                      </div>
                    </div>

                    {/* Savings Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        SAVE 15%
                      </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <CardContent className="p-5 space-y-3">
                    {/* Title */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg text-card-foreground leading-tight">
                        {combo.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {combo.description}
                      </p>
                    </div>

                    {/* Included Items Preview */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {combo.items.slice(0, 2).map(itemId => {  
                          const item = menuItems.find(i => i.id === itemId);
                          return item ? (
                            <span 
                              key={itemId}
                              className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                            >
                              {item.name}
                            </span>
                          ) : null;
                        })}
                        {combo.items.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            +{combo.items.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex flex-col items-start justify-center gap-2 pt-2">
                      <div className="flex items-start justify-center gap-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-primary">
                            ${combo.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground font-medium">USD</span>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add Combo
                      </Button>
                    </div>

                    {/* Deal Indicator */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium text-green-700">
                        Limited Time Offer
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card rounded-2xl border-0 shadow-sm cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={() => handleItemClick(item)}
                />
                
                {/* Action Buttons - Top Right */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg border-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingItem(item);
                      setShowEditItemDialog(true);
                    }}
                  >
                      <Edit className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8 bg-red-500/90 backdrop-blur-sm hover:bg-red-600 shadow-lg border-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMenuItem(item.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </Button>
                </div>

                {/* Rating Badge - Top Left */}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center gap-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.rating}</span>
                  </div>
                </div>

                {/* Availability Overlay */}
                {!item.available && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white/95 dark:bg-gray-800/95 px-4 py-2 rounded-full">
                      <span className="text-gray-800 dark:text-gray-200 font-semibold text-sm">Unavailable</span>
                    </div>
                  </div>
                )}

                {/* Gradient Overlay for Better Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              <CardContent className="p-5 space-y-3">
                {/* Title and Category */}
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-card-foreground leading-tight line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 h-10">
                    {item.description}
                  </p>
                </div>

                {/* Modifiers Preview */}
                {item.modifiers.length > 0 && (
                  <div className="flex flex-col items-start justify-center gap-1">
                    {item.modifiers.slice(0, 2).map(modifier => (
                      <span 
                        key={modifier.id}
                        className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {modifier.name}
                        {modifier.price > 0 && <span className="ml-1">+${modifier.price}</span>}
                      </span>
                    ))}
                    {item.modifiers.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                        +{item.modifiers.length - 2} more
                      </span>
                    )}
                  </div>
                )}

                {/* Price and Action */}
                <div className="flex flex-col items-start justify-center gap-2 pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">USD</span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleItemClick(item)}
                    disabled={!item.available}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Customize
                  </Button>
                </div>

                {/* Availability Indicator */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className={`text-xs font-medium ${item.available ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                      {item.available ? 'Available' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Item Customization Dialog */}
        <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
          <DialogContent className="max-w-md">
            <DialogClose onClick={() => setShowItemDialog(false)} />
            <DialogHeader>
              <DialogTitle>Customize {selectedItem?.name}</DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="p-6 space-y-4">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <p className="text-muted-foreground">{selectedItem.description}</p>
                
                {selectedItem.modifiers.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Customize your order:</h4>
                    <div className="space-y-2">
                      {selectedItem.modifiers.map(modifier => (
                        <label key={modifier.id} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedModifiers.includes(modifier.id)}
                              onChange={() => toggleModifier(modifier.id)}
                              className="mr-3 text-primary"
                            />
                            <span>{modifier.name}</span>
                          </div>
                          {modifier.price > 0 && (
                            <span className="text-primary font-medium">+${modifier.price.toFixed(2)}</span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-primary">
                      ${calculateTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full" onClick={() => setShowItemDialog(false)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Category Dialog */}
        <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
          <DialogContent>
            <DialogClose onClick={() => setShowCategoryDialog(false)} />
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category Name</label>
                <Input
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Input
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Enter category description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Combo Dialog */}
        <Dialog open={showComboDialog} onOpenChange={setShowComboDialog}>
          <DialogContent className="max-w-2xl">
            <DialogClose onClick={() => setShowComboDialog(false)} />
            <DialogHeader>
              <DialogTitle>Create Combo Meal</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Combo Name</label>
                <Input
                  value={newCombo.name}
                  onChange={(e) => setNewCombo({...newCombo, name: e.target.value})}
                  placeholder="Enter combo name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Input
                  value={newCombo.description}
                  onChange={(e) => setNewCombo({...newCombo, description: e.target.value})}
                  placeholder="Enter combo description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Select Items (minimum 2)</label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  {menuItems.map(item => (
                    <label key={item.id} className="flex items-center p-2 border rounded cursor-pointer hover:bg-muted">
                      <Checkbox
                        checked={newCombo.selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewCombo({...newCombo, selectedItems: [...newCombo.selectedItems, item.id]});
                          } else {
                            setNewCombo({...newCombo, selectedItems: newCombo.selectedItems.filter(id => id !== item.id)});
                          } 
                        }}
                        className="mr-2"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">${item.price.toFixed(2)}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {newCombo.selectedItems.length >= 2 && (
                      <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-800">
                    Total Regular Price: ${newCombo.selectedItems.reduce((total, itemId) => {
                      const item = menuItems.find(i => i.id === itemId);
                      return total + (item?.price || 0);
                    }, 0).toFixed(2)}
                  </div>
                  <div className="text-sm font-medium text-green-800">
                    Combo Price (15% off): ${(newCombo.selectedItems.reduce((total, itemId) => {
                      const item = menuItems.find(i => i.id === itemId);
                      return total + (item?.price || 0);
                    }, 0) * 0.85).toFixed(2)}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowComboDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateCombo}
                disabled={newCombo.selectedItems.length < 2 || !newCombo.name.trim()}
              >
                Create Combo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Item Dialog */}
        <Dialog open={showEditItemDialog} onOpenChange={setShowEditItemDialog}>
          <DialogContent>
            <DialogClose onClick={() => setShowEditItemDialog(false)} />
            <DialogHeader>
              <DialogTitle>Edit Menu Item</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Item Name</label>
                  <Input
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Input
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select 
                    value={editingItem.category}
                    onValueChange={(value) => setEditingItem({...editingItem, category: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingItem.available}
                    onChange={(e) => setEditingItem({...editingItem, available: e.target.checked})}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium">Available</label>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditItemDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => editingItem && handleUpdateMenuItem(editingItem)}>
                Update Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MenuCustom;