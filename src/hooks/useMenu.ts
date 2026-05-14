import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  variants?: { name: string; price: number }[];
  price?: number;
  category: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const useMenu = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuQuery = query(collection(db, "menu"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(menuQuery);
        
        const categoryMap: Record<string, MenuCategory> = {};
        
        querySnapshot.forEach((doc) => {
          const item = { id: doc.id, ...doc.data() } as MenuItem & { categoryName: string, categoryId: string };
          
          if (!categoryMap[item.categoryId]) {
            categoryMap[item.categoryId] = {
              id: item.categoryId,
              name: item.categoryName,
              items: [],
            };
          }
          categoryMap[item.categoryId].items.push(item);
        });

        setCategories(Object.values(categoryMap));
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return { categories, loading };
};
