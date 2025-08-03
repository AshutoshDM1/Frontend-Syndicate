import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import type { ComboMeal } from '~/store/menuItemState/comboMeal.types';

const ComboMealCard = ({ combo }: { combo: ComboMeal }) => {
  return (
    <>
      <Card
        key={combo.id}
        className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card rounded-2xl border border-border shadow-sm cursor-pointer"
      >
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

        <CardContent className="p-5 space-y-1">
          {/* Title */}
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-card-foreground leading-tight">{combo.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {combo.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex flex-col items-start justify-center gap-2 pt-0">
            <div className="flex items-start justify-center gap-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">
                  ${combo.price}
                </span>
                <span className="text-sm text-muted-foreground font-medium">USD</span>
              </div>
            </div>
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Edit Combo
            </Button>
          </div>

        </CardContent>
      </Card>
    </>
  );
};

export default ComboMealCard;
