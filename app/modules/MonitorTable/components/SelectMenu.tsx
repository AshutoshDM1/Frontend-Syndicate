import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { useMenuItemStore } from '~/store/menuItemState/menuItem.state';
import type { MenuItem } from '~/store/menuItemState/menuItem.types';
import { GetMenuItems } from '~/services/MenuItem.service';
import { useQuery } from '@tanstack/react-query';
import { MenuItemCard } from '~/components/common/MenuItemCard';

interface SelectMenuProps {
  open: boolean;
  onClose: () => void;
  onSelect: (item: MenuItem) => void;
}

export function SelectMenu({ open, onClose, onSelect }: SelectMenuProps) {

  const { menuItems, setMenuItems } = useMenuItemStore();
  const { isSuccess, data } = useQuery({
    queryKey: ['menuItems'],
    queryFn: GetMenuItems,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setMenuItems(data.data.menuItems);
    }
  }, [isSuccess]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Select a Menu Item to Start Order</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-h-[80vh] overflow-y-auto custom-scrollbar-main p-2">
          {menuItems.length === 0 ? (
            <div className="col-span-full text-muted-foreground text-center py-8">
              No menu items found.
            </div>
          ) : (
            menuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectMenu;
