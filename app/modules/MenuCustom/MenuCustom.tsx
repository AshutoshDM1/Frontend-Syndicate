import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { DeleteMenuItem } from '~/services/MenuItem.service';
import type { MenuItem } from '~/store/menuItemState/menuItem.types';
import { DeleteCategory } from '~/services/category.service';
import ItemCustomizationDialog from './components/ItemCustomizationDialog';
import AddCategoryDialog from './components/AddCategoryDialog';
import CreateComboDialog from './components/CreateComboDialog';
import EditItemDialog from './components/EditItemDialog';
import MenuCard from './components/MenuCard';
import ComboMealCard from './components/ComboMealCard';
import { toast } from 'sonner';
import useManuItems from '~/hooks/useManuItems';
import Loading from '~/components/common/Loading';

const MenuCustom = () => {
  const { categories, menuItems, comboMeals, isPending, isError, error, refetch } = useManuItems();

  // State for dialogs and forms
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showComboDialog, setShowComboDialog] = useState(false);
  const [showEditItemDialog, setShowEditItemDialog] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Form states
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Filter items by category
  const filteredItems =
    activeCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category.id === activeCategory);

  // Handle item selection and show customization dialog
  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setShowItemDialog(true);
  };

  // Delete category
  const handleDeleteCategory = async (categoryId: string) => {
    try {
      toast.loading('Deleting category...');
      await DeleteCategory(categoryId);
      toast.dismiss();
      toast.success('Category deleted successfully');
      refetch();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error('Failed to delete category');
    }
  };

  // Add new menu item
  const handleAddMenuItem = () => {
    setEditingItem(null);
    setShowEditItemDialog(true);
  };

  // Delete menu item
  const handleDeleteMenuItem = async (itemId: string) => {
    try {
      toast.loading('Deleting item...');
      await DeleteMenuItem(itemId);
      toast.dismiss();
      toast.success('Item deleted successfully');
      refetch();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error('Failed to delete item');
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Menu Customization</h1>
        <p className="text-muted-foreground">
          Manage your restaurant menu items, categories, and combos with our intuitive interface
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700">
                {menuItems.filter((item) => item.isAvailable).length} items available
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
            className="bg-emerald-500 hover:bg-emerald-600 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
          <Button
            onClick={handleAddMenuItem}
            className="bg-blue-500 hover:bg-blue-600 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
          <Button
            onClick={() => setShowComboDialog(true)}
            className="bg-primary hover:bg-primary/80 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Combo
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-4 mb-8 flex-wrap pb-2">
        <div className="flex gap-4">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('all')}
            className="whitespace-nowrap"
          >
            All Items ({menuItems.length})
          </Button>
          <Button
            variant={activeCategory === 'comboMeals' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('comboMeals')}
            className="whitespace-nowrap"
          >
            Combo Meals ({comboMeals.length})
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Button
                variant={activeCategory === category.id ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name} (
                {menuItems.filter((item) => item.category.id === category.id).length})
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
      </div>

      {/* Combo Meals Section */}
      {activeCategory === 'comboMeals' && comboMeals.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-card-foreground">Combo Meals</h2>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              SPECIAL OFFERS
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {comboMeals.map((combo) => (
              <ComboMealCard edit={true} combo={combo} />
            ))}
          </div>
        </div>
      )}

      {/* Menu Items Grid */}
      {isPending && (
        <div className="flex justify-center items-center h-full w-full mt-10">
          <Loading />
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center h-full">
          <p className="text-muted-foreground">Error: {error?.message}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredItems.length > 0 &&
          filteredItems.map((item) => (
            <MenuCard
              item={item}
              setEditingItem={setEditingItem}
              setShowEditItemDialog={setShowEditItemDialog}
              handleItemClick={handleItemClick}
              handleDeleteMenuItem={handleDeleteMenuItem}
            />
          ))}
      </div>
      {/* Item Customization Dialog */}
      <ItemCustomizationDialog
        showItemDialog={showItemDialog}
        setShowItemDialog={setShowItemDialog}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      {/* Add Category Dialog */}
      <AddCategoryDialog
        refetch={refetch}
        showCategoryDialog={showCategoryDialog}
        setShowCategoryDialog={setShowCategoryDialog}
      />
      {/* Create Combo Dialog */}
      <CreateComboDialog
        refetch={refetch}
        showComboDialog={showComboDialog}
        setShowComboDialog={setShowComboDialog}
      />
      {/* Edit Item Dialog */}
      <EditItemDialog
        refetch={refetch}
        showEditItemDialog={showEditItemDialog}
        setShowEditItemDialog={setShowEditItemDialog}
        editingItem={editingItem}
      />
    </div>
  );
};

export default MenuCustom;
