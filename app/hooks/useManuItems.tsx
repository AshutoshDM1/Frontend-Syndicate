import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetCategories } from "~/services/category.service";
import { GetComboMeals } from "~/services/comboMeal.service";
import { GetMenuItems } from "~/services/MenuItem.service";
import { useCategoryStore } from "~/store/menuItemState/category.state";
import { useComboMealStore } from "~/store/menuItemState/comboMeal.state";
import { useMenuItemStore } from "~/store/menuItemState/menuItem.state";
import type { MenuItem } from "~/store/menuItemState/menuItem.types";
import type { Category } from "~/store/menuItemState/category.types";
import type { ComboMeal } from "~/store/menuItemState/comboMeal.types";

const useManuItems = () => {
  // Sample data
  const { categories, setCategories } = useCategoryStore();
  const { menuItems, setMenuItems } = useMenuItemStore();
  const { comboMeals, setComboMeals } = useComboMealStore();

  const { isPending, isError, isSuccess, data, error, refetch } = useQuery({
    queryKey: ['menuItems', 'categories', 'comboMeals'],
    queryFn: async () => {
      const [menuItems, categories, comboMeals] = await Promise.all([
        GetMenuItems(),
        GetCategories(),
        GetComboMeals(),
      ]);
      return { menuItems, categories, comboMeals };
    },
  });

  useEffect(() => {
    if (isSuccess && data && data.menuItems && data.categories && data.comboMeals) {
      setMenuItems(data.menuItems.data.menuItems as MenuItem[]);
      setCategories(data.categories.data.categories as Category[]);
      setComboMeals(data.comboMeals.data.comboMeals as ComboMeal[]);
    }
  }, [isSuccess, data]);


  return { categories, menuItems, comboMeals, isPending, isError, isSuccess, error, refetch };
};

export default useManuItems;