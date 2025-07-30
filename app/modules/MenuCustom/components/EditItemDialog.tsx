import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select";
import type { MenuItem } from "~/store/menuItemState/menuItem.types";
import { useCategoryStore } from "~/store/menuItemState/category.state";

const EditItemDialog = ({
  showEditItemDialog,
  setShowEditItemDialog,
  editingItem,
  setEditingItem,
}: {
  showEditItemDialog: boolean;
  setShowEditItemDialog: (show: boolean) => void;
  editingItem: MenuItem | null;
  setEditingItem: (item: MenuItem) => void;
}) => {
  const { categories } = useCategoryStore();

  const handleUpdateMenuItem = (item: MenuItem) => {
    console.log(item);
  };

  return (
    <>
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
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editingItem.price}
                    onChange={(e) =>
                        setEditingItem({ ...editingItem, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Input
                    value={editingItem.description}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select
                    value={editingItem.category.id}
                    onValueChange={(value) => setEditingItem({ ...editingItem, category: { id: value, name: 'Pizza' } })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingItem.isAvailable}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, isAvailable: e.target.checked })
                    }
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
    </>
  );
};

export default EditItemDialog;