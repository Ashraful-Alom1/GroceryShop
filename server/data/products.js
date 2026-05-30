const products = [
  // === FRUITS ===
  { id: 1, name: "Organic Bananas", category: "fruits", price: 2.49, unit: "bunch", description: "Sweet, perfectly ripe organic bananas. Great for smoothies, baking, or a quick healthy snack.", image: "🍌", inStock: true, rating: 4.7, reviews: 234 },
  { id: 2, name: "Fresh Strawberries", category: "fruits", price: 4.99, unit: "pack", description: "Juicy, farm-fresh strawberries picked at peak ripeness. Perfect for desserts and salads.", image: "🍓", inStock: true, rating: 4.8, reviews: 189 },
  { id: 3, name: "Honeycrisp Apples", category: "fruits", price: 3.99, unit: "lb", description: "Crisp, sweet-tart Honeycrisp apples. America's favorite apple variety.", image: "🍎", inStock: true, rating: 4.6, reviews: 312 },
  { id: 4, name: "Ripe Avocados", category: "fruits", price: 1.99, unit: "each", description: "Perfectly ripe Hass avocados, ready to eat. Ideal for guacamole and toast.", image: "🥑", inStock: true, rating: 4.5, reviews: 278 },
  { id: 5, name: "Seedless Grapes", category: "fruits", price: 3.49, unit: "lb", description: "Sweet, crunchy seedless red grapes. A refreshing snack for the whole family.", image: "🍇", inStock: true, rating: 4.4, reviews: 156 },
  { id: 6, name: "Fresh Mangoes", category: "fruits", price: 2.29, unit: "each", description: "Tropical Alfonso mangoes bursting with flavor. The king of fruits.", image: "🥭", inStock: true, rating: 4.9, reviews: 201 },

  // === VEGETABLES ===
  { id: 7, name: "Baby Spinach", category: "vegetables", price: 3.49, unit: "bag", description: "Tender, pre-washed baby spinach leaves. Ready for salads, smoothies, or sautéing.", image: "🥬", inStock: true, rating: 4.5, reviews: 167 },
  { id: 8, name: "Cherry Tomatoes", category: "vegetables", price: 3.99, unit: "pint", description: "Sweet, vine-ripened cherry tomatoes. Burst of flavor in every bite.", image: "🍅", inStock: true, rating: 4.6, reviews: 143 },
  { id: 9, name: "Fresh Broccoli", category: "vegetables", price: 2.49, unit: "bunch", description: "Crisp, dark green broccoli crowns. Packed with vitamins and perfect for stir-fry.", image: "🥦", inStock: true, rating: 4.3, reviews: 198 },
  { id: 10, name: "Sweet Bell Peppers", category: "vegetables", price: 4.49, unit: "3-pack", description: "Colorful mix of red, yellow, and green bell peppers. Sweet and crunchy.", image: "🫑", inStock: true, rating: 4.7, reviews: 121 },
  { id: 11, name: "Organic Carrots", category: "vegetables", price: 2.99, unit: "bag", description: "Sweet, crunchy organic carrots. Great for snacking, cooking, or juicing.", image: "🥕", inStock: true, rating: 4.4, reviews: 187 },
  { id: 12, name: "Fresh Corn", category: "vegetables", price: 0.99, unit: "each", description: "Sweet summer corn on the cob. Perfect for grilling or boiling.", image: "🌽", inStock: true, rating: 4.5, reviews: 145 },

  // === DAIRY ===
  { id: 13, name: "Whole Milk", category: "dairy", price: 4.29, unit: "gallon", description: "Farm-fresh whole milk, pasteurized and homogenized. Rich and creamy.", image: "🥛", inStock: true, rating: 4.6, reviews: 289 },
  { id: 14, name: "Greek Yogurt", category: "dairy", price: 5.99, unit: "tub", description: "Thick, creamy Greek yogurt with live cultures. High in protein.", image: "🫙", inStock: true, rating: 4.8, reviews: 234 },
  { id: 15, name: "Cheddar Cheese", category: "dairy", price: 6.49, unit: "block", description: "Aged sharp cheddar cheese. Bold, tangy flavor perfect for any dish.", image: "🧀", inStock: true, rating: 4.7, reviews: 178 },
  { id: 16, name: "Farm Fresh Eggs", category: "dairy", price: 5.49, unit: "dozen", description: "Free-range eggs from local farms. Rich, golden yolks.", image: "🥚", inStock: true, rating: 4.9, reviews: 345 },
  { id: 17, name: "Salted Butter", category: "dairy", price: 4.99, unit: "pack", description: "Premium European-style salted butter. Perfect for cooking and baking.", image: "🧈", inStock: true, rating: 4.6, reviews: 156 },

  // === BAKERY ===
  { id: 18, name: "Sourdough Bread", category: "bakery", price: 5.49, unit: "loaf", description: "Artisan sourdough bread with a crispy crust and tangy flavor.", image: "🍞", inStock: true, rating: 4.8, reviews: 267 },
  { id: 19, name: "Croissants", category: "bakery", price: 4.99, unit: "4-pack", description: "Buttery, flaky French croissants. Baked fresh daily.", image: "🥐", inStock: true, rating: 4.9, reviews: 198 },
  { id: 20, name: "Bagels", category: "bakery", price: 4.49, unit: "6-pack", description: "Chewy, golden bagels. Perfect toasted with cream cheese.", image: "🥯", inStock: true, rating: 4.5, reviews: 156 },
  { id: 21, name: "Chocolate Cake", category: "bakery", price: 18.99, unit: "whole", description: "Rich, decadent triple-layer chocolate cake with ganache frosting.", image: "🎂", inStock: true, rating: 4.9, reviews: 312 },
  { id: 22, name: "Blueberry Muffins", category: "bakery", price: 5.99, unit: "4-pack", description: "Moist, fluffy muffins loaded with fresh blueberries.", image: "🧁", inStock: true, rating: 4.7, reviews: 189 },

  // === BEVERAGES ===
  { id: 23, name: "Fresh Orange Juice", category: "beverages", price: 6.99, unit: "bottle", description: "100% pure squeezed orange juice. No added sugar or preservatives.", image: "🧃", inStock: true, rating: 4.7, reviews: 234 },
  { id: 24, name: "Sparkling Water", category: "beverages", price: 4.49, unit: "6-pack", description: "Naturally carbonated mineral water. Refreshing and crisp.", image: "💧", inStock: true, rating: 4.4, reviews: 178 },
  { id: 25, name: "Green Tea", category: "beverages", price: 7.99, unit: "box", description: "Premium Japanese green tea bags. Smooth, earthy flavor with antioxidants.", image: "🍵", inStock: true, rating: 4.6, reviews: 201 },
  { id: 26, name: "Cold Brew Coffee", category: "beverages", price: 8.99, unit: "bottle", description: "Smooth, slow-steeped cold brew coffee. Bold yet never bitter.", image: "☕", inStock: true, rating: 4.8, reviews: 267 },

  // === SNACKS ===
  { id: 27, name: "Mixed Nuts", category: "snacks", price: 9.99, unit: "bag", description: "Premium roasted mix of almonds, cashews, pecans, and walnuts.", image: "🥜", inStock: true, rating: 4.7, reviews: 198 },
  { id: 28, name: "Dark Chocolate Bar", category: "snacks", price: 4.49, unit: "bar", description: "72% cacao dark chocolate. Rich, smooth, and luxurious.", image: "🍫", inStock: true, rating: 4.8, reviews: 234 },
  { id: 29, name: "Tortilla Chips", category: "snacks", price: 3.99, unit: "bag", description: "Crispy stone-ground corn tortilla chips. Perfect with salsa.", image: "🫓", inStock: true, rating: 4.5, reviews: 167 },
  { id: 30, name: "Granola Bars", category: "snacks", price: 5.49, unit: "box", description: "Crunchy oat granola bars with honey and dried fruits.", image: "🍪", inStock: true, rating: 4.4, reviews: 189 },

  // === NEW POPULAR ITEMS ===

  // Fruits (3 more)
  { id: 31, name: "Fresh Blueberries", category: "fruits", price: 5.49, unit: "pack", description: "Plump, sweet organic blueberries. Packed with antioxidants and perfect for smoothie bowls.", image: "🫐", inStock: true, rating: 4.8, reviews: 276 },
  { id: 32, name: "Seedless Watermelon", category: "fruits", price: 6.99, unit: "whole", description: "Sweet, juicy seedless watermelon. The ultimate summer refreshment.", image: "🍉", inStock: true, rating: 4.7, reviews: 198 },
  { id: 33, name: "Golden Pineapple", category: "fruits", price: 3.99, unit: "each", description: "Tropical golden pineapple, sweet and tangy. Rich in vitamin C and bromelain.", image: "🍍", inStock: true, rating: 4.6, reviews: 165 },

  // Vegetables (4 more)
  { id: 34, name: "Baby Bella Mushrooms", category: "vegetables", price: 3.99, unit: "pack", description: "Earthy, savory baby bella mushrooms. Perfect for stir-fry, pasta, and pizza.", image: "🍄", inStock: true, rating: 4.5, reviews: 187 },
  { id: 35, name: "Sweet Potatoes", category: "vegetables", price: 2.49, unit: "lb", description: "Naturally sweet and creamy sweet potatoes. Loaded with beta-carotene and fiber.", image: "🍠", inStock: true, rating: 4.6, reviews: 213 },
  { id: 36, name: "Fresh Garlic", category: "vegetables", price: 1.49, unit: "head", description: "Aromatic, pungent fresh garlic. Essential for every kitchen and cuisine.", image: "🧄", inStock: true, rating: 4.7, reviews: 342 },
  { id: 37, name: "Organic Zucchini", category: "vegetables", price: 2.29, unit: "lb", description: "Tender, versatile organic zucchini. Great grilled, spiralized, or in baked goods.", image: "🥒", inStock: true, rating: 4.4, reviews: 134 },

  // Dairy (3 more)
  { id: 38, name: "Fresh Mozzarella", category: "dairy", price: 5.99, unit: "ball", description: "Soft, creamy fresh mozzarella. Made daily for that perfect Caprese salad.", image: "🧀", inStock: true, rating: 4.8, reviews: 212 },
  { id: 39, name: "Cream Cheese", category: "dairy", price: 3.99, unit: "pack", description: "Smooth, rich cream cheese spread. Perfect on bagels or for cheesecake.", image: "🫙", inStock: true, rating: 4.6, reviews: 267 },
  { id: 40, name: "Almond Milk", category: "dairy", price: 4.49, unit: "carton", description: "Unsweetened vanilla almond milk. Dairy-free, creamy, and only 30 calories per serving.", image: "🥛", inStock: true, rating: 4.5, reviews: 198 },

  // Bakery (3 more)
  { id: 41, name: "Cinnamon Rolls", category: "bakery", price: 6.99, unit: "4-pack", description: "Warm, gooey cinnamon rolls with cream cheese frosting. Baked fresh every morning.", image: "🥮", inStock: true, rating: 4.9, reviews: 287 },
  { id: 42, name: "French Baguette", category: "bakery", price: 3.49, unit: "each", description: "Crusty, golden French baguette with a soft, airy interior. Baked in-house.", image: "🥖", inStock: true, rating: 4.7, reviews: 176 },
  { id: 43, name: "Glazed Donuts", category: "bakery", price: 5.49, unit: "6-pack", description: "Classic glazed donuts with a sweet, crispy coating. A breakfast favorite.", image: "🍩", inStock: true, rating: 4.8, reviews: 234 },

  // Beverages (3 more)
  { id: 44, name: "Coconut Water", category: "beverages", price: 3.49, unit: "bottle", description: "Pure, refreshing coconut water. Natural electrolytes for ultimate hydration.", image: "🥥", inStock: true, rating: 4.6, reviews: 189 },
  { id: 45, name: "Fresh Lemonade", category: "beverages", price: 5.99, unit: "bottle", description: "Hand-squeezed lemonade with a hint of mint. Perfectly sweet and tart.", image: "🍋", inStock: true, rating: 4.7, reviews: 201 },
  { id: 46, name: "Berry Smoothie Mix", category: "beverages", price: 8.49, unit: "bag", description: "Frozen mixed berry smoothie blend. Just add milk or yogurt for a perfect smoothie.", image: "🍹", inStock: true, rating: 4.5, reviews: 156 },

  // Snacks (4 more)
  { id: 47, name: "Butter Popcorn", category: "snacks", price: 3.99, unit: "bag", description: "Freshly popped butter popcorn. Light, crunchy, and irresistibly buttery.", image: "🍿", inStock: true, rating: 4.6, reviews: 278 },
  { id: 48, name: "Trail Mix", category: "snacks", price: 7.99, unit: "bag", description: "Energy-packed trail mix with nuts, dried fruits, and dark chocolate chips.", image: "🥜", inStock: true, rating: 4.7, reviews: 212 },
  { id: 49, name: "Classic Hummus", category: "snacks", price: 4.49, unit: "tub", description: "Creamy, smooth hummus made with chickpeas, tahini, and olive oil.", image: "🫕", inStock: true, rating: 4.8, reviews: 198 },
  { id: 50, name: "Soft Pretzels", category: "snacks", price: 4.99, unit: "4-pack", description: "Warm, chewy soft pretzels with coarse salt. Great with mustard or cheese dip.", image: "🥨", inStock: true, rating: 4.5, reviews: 167 },
];

module.exports = products;
