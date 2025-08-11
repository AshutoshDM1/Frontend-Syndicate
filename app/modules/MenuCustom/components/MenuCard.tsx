import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Edit, Trash2, Star, ShoppingCart } from 'lucide-react';
import type { MenuItem } from '~/store/menuItemState/menuItem.types';

const MenuCard = ({
  item,
  setEditingItem,
  setShowEditItemDialog,
  handleItemClick,
  handleDeleteMenuItem,
}: {
  item: MenuItem;
  setEditingItem: (item: MenuItem) => void;
  setShowEditItemDialog: (show: boolean) => void;
  handleItemClick: (item: MenuItem) => void;
  handleDeleteMenuItem: (itemId: string) => void;
}) => {
  return (
    <>
      <Card
        key={item.id}
        className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card rounded-2xl border-0 shadow-sm cursor-pointer"
      >
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
              className="h-8 w-8 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-800 shadow-lg border-0"
              onClick={(e) => {
                e.stopPropagation();
                setEditingItem(item);
                setShowEditItemDialog(true);
              }}
            >
              <Edit className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </Button>
            <Button
              size="icon"
              className="h-8 w-8 bg-red-500 backdrop-blur-sm hover:bg-red-600 shadow-lg border-0"
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
            <div className="flex items-center gap-1 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {item.rating}
              </span>
            </div>
          </div>

          {/* Availability Overlay */}
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white/95 dark:bg-zinc-800/95 px-4 py-2 rounded-full">
                <span className="text-zinc-800 dark:text-zinc-200 font-semibold text-sm">
                  Unavailable
                </span>
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
              {item.modifiers.slice(0, 2).map((modifier) => (
                <span
                  key={modifier.id}
                  className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                >
                  {modifier.modifier.name}
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
                ${parseFloat(item.price.toString()).toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground font-medium">USD</span>
            </div>
            <Button
              size="sm"
              onClick={() => handleItemClick(item)}
              disabled={!item.isAvailable}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Customize
            </Button>
          </div>

          {/* Availability Indicator */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${item.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
              />
              <span
                className={`text-xs font-medium ${item.isAvailable ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}
              >
                {item.isAvailable ? 'Available' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MenuCard;
