import { Card, CardContent } from '~/components/ui/card';
import type { MenuItem } from '~/store/menuItemState/menuItem.types';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card
      key={item.id}
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card rounded-2xl border-0 shadow-sm cursor-pointer w-[99%] h-[420px] flex flex-col hover:scale-[1.01] hover:ring-4 hover:ring-primary/50  hover:bg-primary/5 transform-gpu"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full min-h-44 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
        />

        {/* Rating Badge - Top Left */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
            {/* Placeholder for Star icon */}
            <svg className="w-3 h-3 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
              <polygon points="10,1.5 12.59,7.36 18.9,7.97 14,12.14 15.18,18.36 10,15.27 4.82,18.36 6,12.14 1.1,7.97 7.41,7.36" />
            </svg>
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

      <CardContent className="p-5 pt-0 flex flex-col justify-between flex-1 space-y-1">
        {/* Title and Category */}
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-card-foreground leading-tight line-clamp-1">
            {item.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-1 text-ellipsis">
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
        <div className="flex flex-col items-start justify-end gap-2 pt-2 flex-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">
              ${parseFloat(item.price.toString()).toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground font-medium">USD</span>
          </div>
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
  );
}

export default MenuItemCard;
