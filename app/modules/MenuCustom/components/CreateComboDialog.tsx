import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Checkbox } from '~/components/ui/checkbox';
import { useState } from 'react';
import { useMenuItemStore } from '~/store/menuItemState/menuItem.state';

const CreateComboDialog = ({
  showComboDialog,
  setShowComboDialog,
}: {
  showComboDialog: boolean;
  setShowComboDialog: (show: boolean) => void;
}) => {
  const { menuItems } = useMenuItemStore();
  const [newCombo, setNewCombo] = useState({
    name: '',
    description: '',
    selectedItems: [] as string[],
  });

  const handleCreateCombo = () => {
    console.log(newCombo);
  };

  return (
    <>
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
                onChange={(e) => setNewCombo({ ...newCombo, name: e.target.value })}
                placeholder="Enter combo name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Input
                value={newCombo.description}
                onChange={(e) => setNewCombo({ ...newCombo, description: e.target.value })}
                placeholder="Enter combo description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select Items (minimum 2)</label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {menuItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center p-2 border rounded cursor-pointer hover:bg-muted"
                  >
                    <Checkbox
                      checked={newCombo.selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewCombo({
                            ...newCombo,
                            selectedItems: [...newCombo.selectedItems, item.id],
                          });
                        } else {
                          setNewCombo({
                            ...newCombo,
                            selectedItems: newCombo.selectedItems.filter((id) => id !== item.id),
                          });
                        }
                      }}
                      className="mr-2"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        ${parseFloat(item.price.toString()).toFixed(2)}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            {newCombo.selectedItems.length >= 2 && (
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-green-800">
                  Total Regular Price: $
                  {newCombo.selectedItems
                    .reduce((total, itemId) => {
                      const item = menuItems.find((i) => i.id === itemId);
                      return total + (parseFloat(item?.price || '0') || 0);
                    }, 0)
                    .toFixed(2)}
                </div>
                <div className="text-sm font-medium text-green-800">
                  Combo Price (15% off): $
                  {(
                    newCombo.selectedItems.reduce((total, itemId) => {
                      const item = menuItems.find((i) => i.id === itemId);
                      return total + (parseFloat(item?.price || '0') || 0);
                    }, 0) * 0.85
                  ).toFixed(2)}
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
    </>
  );
};

export default CreateComboDialog;
