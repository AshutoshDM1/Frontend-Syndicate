import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import type { MenuItem } from '~/store/menuItemState/menuItem.types';
import { useState } from 'react';
import { Checkbox } from '~/components/ui/checkbox';

const ItemCustomizationDialog = ({
  showItemDialog,
  setShowItemDialog,
  selectedItem,
  setSelectedItem,
}: {
  showItemDialog: boolean;
  setShowItemDialog: (show: boolean) => void;
  selectedItem: MenuItem | null;
  setSelectedItem: (item: MenuItem) => void;
}) => {
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);

  // Calculate total price with modifiers
  const calculateTotalPrice = () => {
    if (!selectedItem) return 0;
    const modifierPrice = selectedModifiers.reduce((total, modifierId) => {
      const modifier = selectedItem.modifiers.find((m) => m.id === modifierId);
      return total + (modifier?.price || 0);
    }, 0);
    return parseFloat(selectedItem.price.toString()) + modifierPrice;
  };

  const toggleModifier = (modifierId: string) => {
    setSelectedModifiers((prev) => {
      console.log(prev);
      return prev.includes(modifierId)
        ? prev.filter((id) => id !== modifierId)
        : [...prev, modifierId];
    });
  };
  return (
    <>
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
                    {selectedItem.modifiers.map((modifier) => (
                      <label
                        key={modifier.id}
                        className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted"
                      >
                        <div className="flex items-center">
                          <Checkbox
                            className="mr-2 mt-1"
                            checked={selectedModifiers.includes(modifier.id)}
                            onCheckedChange={() => toggleModifier(modifier.id)}
                          />
                          <span>{modifier.modifier.name}</span>
                        </div>
                        {modifier.price > 0 && (
                          <span className="text-primary font-medium">
                            +${parseFloat(modifier.price.toString()).toFixed(2)}
                          </span>
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
                    ${parseFloat(calculateTotalPrice().toString()).toFixed(2)}
                  </span>
                </div>
                <Button className="w-full" onClick={() => setShowItemDialog(false)}>
                  Save
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ItemCustomizationDialog;
