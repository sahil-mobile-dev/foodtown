export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  variants?: { name: string; price: number }[];
  price?: number;
  category: string;
  tag?: "Bestseller" | "Must Try" | "New" | "Trending";
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "sandwiches",
    name: "Sandwiches",
    items: [
      { id: "s1", name: "Bread Butter", category: "sandwiches", variants: [{ name: "Plain", price: 30 }, { name: "Grill", price: 35 }] },
      { id: "s2", name: "Chutney Sandwich", category: "sandwiches", variants: [{ name: "Plain", price: 40 }, { name: "Grill", price: 50 }] },
      { id: "s3", name: "Vegetable Sandwich", category: "sandwiches", variants: [{ name: "Plain", price: 45 }, { name: "Grill", price: 60 }] },
      { id: "s4", name: "Aloo Mutter Sandwich", category: "sandwiches", variants: [{ name: "Plain", price: 45 }, { name: "Grill", price: 60 }] },
      { id: "s5", name: "Cheese Sandwich", category: "sandwiches", variants: [{ name: "Plain", price: 75 }, { name: "Grill", price: 85 }], tag: "Bestseller" },
      { id: "s6", name: "Cheese Chutney", category: "sandwiches", variants: [{ name: "Plain", price: 80 }, { name: "Grill", price: 90 }] },
      { id: "s7", name: "Vegetable Cheese", category: "sandwiches", variants: [{ name: "Plain", price: 90 }, { name: "Grill", price: 100 }] },
      { id: "s8", name: "Aloo Mutter Cheese", category: "sandwiches", variants: [{ name: "Plain", price: 90 }, { name: "Grill", price: 100 }] },
      { id: "s9", name: "Nachos Sandwich", category: "sandwiches", price: 120 },
    ],
  },
  {
    id: "club-sandwiches",
    name: "Club Sandwiches",
    items: [
      { id: "cs1", name: "Ghughra Grill", category: "club-sandwiches", price: 149 },
      { id: "cs2", name: "Cheese Italian", category: "club-sandwiches", price: 149 },
      { id: "cs3", name: "Classic Club", category: "club-sandwiches", price: 149 },
      { id: "cs4", name: "Bombay Club", category: "club-sandwiches", price: 149 },
      { id: "cs5", name: "Schezwan Club", category: "club-sandwiches", price: 149 },
      { id: "cs6", name: "Tandoori Paneer Club", category: "club-sandwiches", price: 149 },
      { id: "cs7", name: "Mexican Club", category: "club-sandwiches", price: 149 },
      { id: "cs8", name: "Peri Peri Club Sand.", category: "club-sandwiches", price: 159 },
      { id: "cs9", name: "Pizza Club Sand.", category: "club-sandwiches", price: 199, tag: "Must Try" },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    items: [
      { id: "b1", name: "Aloo Tikki Burger", category: "burgers", variants: [{ name: "Aloo Tikki", price: 65 }, { name: "Paneer Tikki", price: 95 }], tag: "Bestseller" },
      { id: "b2", name: "Veg. Delight Burger", category: "burgers", variants: [{ name: "Aloo Tikki", price: 70 }, { name: "Paneer Tikki", price: 100 }] },
      { id: "b3", name: "Really Spicy Burger", category: "burgers", variants: [{ name: "Aloo Tikki", price: 70 }, { name: "Paneer Tikki", price: 100 }] },
      { id: "b4", name: "Peri Peri Burger", category: "burgers", variants: [{ name: "Aloo Tikki", price: 70 }, { name: "Paneer Tikki", price: 100 }] },
      { id: "b5", name: "Tandoori Burger", category: "burgers", variants: [{ name: "Aloo Tikki", price: 70 }, { name: "Paneer Tikki", price: 100 }] },
      { id: "b6", name: "Mexican Burger", category: "burgers", variants: [{ name: "Aloo Tikki", price: 80 }, { name: "Paneer Tikki", price: 110 }] },
      { id: "b7", name: "Cheese Jalapeno", category: "burgers", variants: [{ name: "Aloo Tikki", price: 80 }, { name: "Paneer Tikki", price: 110 }] },
      { id: "b8", name: "Double Tikki Burger", category: "burgers", price: 120 },
    ],
  },
  {
    id: "pizza",
    name: "Pizza",
    items: [
      { id: "p1", name: "Margherita", description: "Mozzarella Cheese, Tomato", category: "pizza", variants: [{ name: '6"', price: 119 }, { name: '8"', price: 199 }, { name: '12"', price: 299 }], tag: "Trending" },
      { id: "p2", name: "American Cheese Corn", description: "Sweet and Juicy Golden Corn", category: "pizza", variants: [{ name: '6"', price: 129 }, { name: '8"', price: 219 }, { name: '12"', price: 319 }] },
      { id: "p3", name: "Double Cheese Pizza", description: "Extra Mozzarella Cheese", category: "pizza", variants: [{ name: '6"', price: 139 }, { name: '8"', price: 229 }, { name: '12"', price: 349 }] },
      { id: "p4", name: "Ahmedabadi Touch Pizza", description: "Onion, Capsicum, Olives", category: "pizza", variants: [{ name: '6"', price: 139 }, { name: '8"', price: 229 }, { name: '12"', price: 369 }] },
      { id: "p5", name: "Tandoori Paneer", description: "Tandoori Sauce, Paneer, Capsicum, Onion", category: "pizza", variants: [{ name: '6"', price: 139 }, { name: '8"', price: 229 }, { name: '12"', price: 369 }] },
      { id: "p6", name: "Mexican Pizza", description: "Onion, Capsicum, Corn, Mexican Beans", category: "pizza", variants: [{ name: '6"', price: 139 }, { name: '8"', price: 249 }, { name: '12"', price: 389 }] },
      { id: "p7", name: "Sp. Food Town Pizza", description: "Onion, Corn, Masala Paneer, Capsicum, Chilli", category: "pizza", variants: [{ name: '6"', price: 159 }, { name: '8"', price: 259 }, { name: '12"', price: 419 }], tag: "Must Try" },
    ],
  },
  {
    id: "shakes",
    name: "Milk Shakes",
    items: [
      { id: "sh1", name: "Cold Coffee", category: "shakes", price: 59 },
      { id: "sh2", name: "Strawberry Shake", category: "shakes", price: 79 },
      { id: "sh3", name: "Chocolate Shake", category: "shakes", price: 79 },
      { id: "sh4", name: "Oreo Chocolate Shake", category: "shakes", price: 99 },
      { id: "sh5", name: "Brownie Shake", category: "shakes", price: 139 },
    ],
  },
  {
    id: "mojitos",
    name: "Mojitos",
    items: [
      { id: "m1", name: "Mojito Mint", category: "mojitos", price: 70 },
      { id: "m2", name: "Blue Curacao", category: "mojitos", price: 80 },
      { id: "m3", name: "Green Apple", category: "mojitos", price: 80 },
      { id: "m4", name: "Watermelon", category: "mojitos", price: 80 },
      { id: "m5", name: "Strawberry", category: "mojitos", price: 80 },
      { id: "m6", name: "Kiwi", category: "mojitos", price: 80 },
    ],
  },
  {
    id: "fries",
    name: "French Fries",
    items: [
      { id: "f1", name: "Salted Fries", category: "fries", price: 90 },
      { id: "f2", name: "Masala Fries", category: "fries", price: 100 },
      { id: "f3", name: "Peri Peri Fries", category: "fries", price: 110 },
      { id: "f4", name: "Cheese Fries", category: "fries", price: 130 },
      { id: "f5", name: "Cheese Backed Fries", category: "fries", price: 150 },
    ],
  },
  {
    id: "hotdogs",
    name: "Hot Dogs",
    items: [
      { id: "hd1", name: "Veg. Cheese Hot Dog", category: "hotdogs", price: 130 },
      { id: "hd2", name: "Paneer Cheese Hot Dog", category: "hotdogs", price: 150 },
    ],
  },
  {
    id: "wraps",
    name: "Wraps",
    items: [
      { id: "w1", name: "Tandoori Paneer Wrap", category: "wraps", price: 110 },
      { id: "w2", name: "Peri Peri Paneer Wrap", category: "wraps", price: 110 },
      { id: "w3", name: "Nachos Wrap", category: "wraps", price: 110 },
    ],
  },
  {
    id: "garlic-bread",
    name: "Garlic Bread",
    items: [
      { id: "gb1", name: "Cheese Garlic Bread", category: "garlic-bread", price: 130 },
      { id: "gb2", name: "Supreme Garlic Bread", category: "garlic-bread", price: 140 },
      { id: "gb3", name: "Double Cheese", category: "garlic-bread", price: 150 },
      { id: "gb4", name: "Peri Peri Paneer", category: "garlic-bread", price: 150 },
    ],
  },
];

export interface ComboOffer {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export const comboOffers: ComboOffer[] = [
  { id: "c1", name: "Burger Combo", description: "Burger + French Fries + Cold Drink", price: 119 },
  { id: "c2", name: "Double Burger", description: "2 Aloo Tikki Burger", price: 120 },
  { id: "c3", name: "Hot Dog Combo", description: "Veg. Cheese Hot Dog + Mojito", price: 179 },
  { id: "c4", name: "Family Pack", description: "2 Aloo Tikki Burger + Fries", price: 199 },
];
