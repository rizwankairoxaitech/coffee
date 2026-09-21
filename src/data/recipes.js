export const RECIPES = [
  {
    id: "cold-coffee",
    number: "01",
    total: "03",
    name: "Cold Coffee",
    subtitle: "Smooth • Rich • Iced",
    giantTitle: ["Cold", "Coffee"],
    category: "Artisan Brew",
    time: "10 MIN",
    servings: "1 SERVING",
    calories: "140 KCAL",
    difficulty: "EASY",
    accentColor: "#d97706",
    accentLight: "#fbbf24",
    glowColor: "rgba(217, 119, 6, 0.28)",
    bgGradient: "radial-gradient(ellipse at 50% 40%, rgba(69, 26, 3, 0.45) 0%, rgba(15, 10, 8, 0.92) 75%, #080504 100%)",
    bgImage: "/assets/background/cold-coffee-bg.jpg",
    mainImage: "/assets/recipe/cold-coffee-main.png",
    floatingIngredients: [
      {
        id: "bean-1",
        name: "Roasted Coffee Bean",
        src: "/assets/ingredients/coffee-bean.png",
        initial: { x: "18%", y: "22%", size: 90, rotate: -35 },
        mobile: { x: "11%", y: "17%", size: 68, rotate: -35 },
        speed: 1.2,
        parallax: { x: -30, y: -70, rotate: 45 },
        blur: "0px"
      },
      {
        id: "ice-1",
        name: "Artisan Ice Block",
        src: "/assets/ingredients/ice-cube.png",
        initial: { x: "82%", y: "18%", size: 135, rotate: 25 },
        mobile: { x: "83%", y: "19%", size: 72, rotate: 25 },
        speed: 1.8,
        parallax: { x: 50, y: -120, rotate: -45 },
        blur: "0.5px"
      },
      {
        id: "bean-2",
        name: "Single Origin Bean",
        src: "/assets/ingredients/coffee-bean.png",
        initial: { x: "88%", y: "68%", size: 95, rotate: 40 },
        mobile: { x: "83%", y: "73%", size: 68, rotate: 40 },
        speed: 0.9,
        parallax: { x: 35, y: -60, rotate: 90 },
        blur: "0px"
      },
      {
        id: "ice-2",
        name: "Chilled Ice Shard",
        src: "/assets/ingredients/ice-cube.png",
        initial: { x: "16%", y: "74%", size: 120, rotate: -20 },
        mobile: { x: "14%", y: "77%", size: 70, rotate: -20 },
        speed: 1.6,
        parallax: { x: -30, y: -100, rotate: 40 },
        blur: "0.8px"
      },
      {
        id: "mint-1",
        name: "Fresh Mint Leaf",
        src: "/assets/ingredients/mint-leaf.png",
        initial: { x: "24%", y: "42%", size: 105, rotate: 55 },
        mobile: { x: "7%", y: "46%", size: 60, rotate: 45 },
        speed: 1.1,
        parallax: { x: -25, y: -70, rotate: -40 },
        blur: "0px"
      }
    ],
    description:
      "A layered cold brew masterclass featuring single-origin slow-extracted espresso over crystal clear artisanal ice, crowned with velvety aerated sweet vanilla cold foam and raw cane drizzle.",
    ingredients: [
      { name: "Single-Origin Dark Roast Espresso / Cold Brew", amount: "180 ml" },
      { name: "Organic Heavy Whipping Cream (Aerated)", amount: "60 ml" },
      { name: "Madagascar Bourbon Vanilla Syrup", amount: "15 ml" },
      { name: "Artisanal Clear Ice Cubes", amount: "1 Glass Full" },
      { name: "Raw Muscovado Sugar Shavings", amount: "1 pinch" },
      { name: "Fresh Mint Sprig", amount: "for garnish" }
    ],
    instructions: [
      {
        step: 1,
        title: "Prime the Glassware",
        detail: "Fill a chilled ribbed tumbler with solid crystal-clear ice blocks up to the brim."
      },
      {
        step: 2,
        title: "Slow Pour Extraction",
        detail: "Gently pour the chilled 18-hour cold brew coffee concentrate over the ice, leaving 2 inches at the top."
      },
      {
        step: 3,
        title: "Whip the Cold Foam",
        detail: "Froth cold heavy cream with vanilla syrup using an electric handheld aerator for 20 seconds until stiff ribbons form."
      },
      {
        step: 4,
        title: "Velvet Crown & Garnish",
        detail: "Float the cold foam slowly over the back of a bar spoon. Dust with fresh ground coffee aromatics and serve."
      }
    ],
    nutrition: {
      calories: "140 kcal",
      carbs: "12g",
      protein: "2g",
      fat: "9g"
    },
    sommelierTip: "Use water filtered at 120 PPM with 20% mineral content for optimal extraction clarity."
  },
  {
    id: "cheesecake",
    number: "02",
    total: "03",
    name: "Classic Cheesecake",
    subtitle: "Creamy • Rich • Simple",
    giantTitle: ["Cheesecake"],
    category: "Patisserie Haute",
    time: "45 MIN",
    servings: "6 SERVINGS",
    calories: "420 KCAL",
    difficulty: "MEDIUM",
    accentColor: "#f59e0b",
    accentLight: "#fde68a",
    glowColor: "rgba(245, 158, 11, 0.32)",
    bgGradient: "radial-gradient(ellipse at 50% 45%, rgba(120, 53, 15, 0.45) 0%, rgba(20, 10, 5, 0.93) 75%, #080302 100%)",
    bgImage: "/assets/background/cheesecake-bg.jpg",
    mainImage: "/assets/recipe/cheesecake-main.png",
    floatingIngredients: [
      {
        id: "strawberry-1",
        name: "Glazed Wild Strawberry",
        src: "/assets/ingredients/strawberry.png",
        initial: { x: "14%", y: "24%", size: 130, rotate: 20 },
        mobile: { x: "13%", y: "17%", size: 75, rotate: 20 },
        speed: 1.4,
        parallax: { x: -40, y: -90, rotate: 50 },
        blur: "0px"
      },
      {
        id: "blackberry-1",
        name: "Wild Mountain Blackberry",
        src: "/assets/ingredients/blackberry.png",
        initial: { x: "84%", y: "22%", size: 115, rotate: -25 },
        mobile: { x: "82%", y: "19%", size: 65, rotate: -25 },
        speed: 1.7,
        parallax: { x: 45, y: -110, rotate: -70 },
        blur: "0.5px"
      },
      {
        id: "lemon-1",
        name: "Sicilian Lemon Slice",
        src: "/assets/ingredients/lemon-slice.png",
        initial: { x: "86%", y: "70%", size: 135, rotate: 30 },
        mobile: { x: "82%", y: "75%", size: 72, rotate: 30 },
        speed: 1.0,
        parallax: { x: 30, y: -75, rotate: 60 },
        blur: "0.8px"
      },
      {
        id: "mint-2",
        name: "Fresh Garden Mint",
        src: "/assets/ingredients/mint-leaf.png",
        initial: { x: "18%", y: "72%", size: 110, rotate: -40 },
        mobile: { x: "13%", y: "76%", size: 65, rotate: -40 },
        speed: 1.5,
        parallax: { x: -35, y: -95, rotate: 80 },
        blur: "0px"
      },
      {
        id: "blackberry-2",
        name: "Dark Gloss Blackberry",
        src: "/assets/ingredients/blackberry.png",
        initial: { x: "26%", y: "45%", size: 95, rotate: 45 },
        mobile: { x: "8%", y: "44%", size: 55, rotate: 35 },
        speed: 1.2,
        parallax: { x: -20, y: -65, rotate: -35 },
        blur: "0px"
      }
    ],
    description:
      "A silky, caramelized Basque-style cheesecake crafted from whipped Philadelphia cream cheese, cultured French crème fraîche, and real Tahitian vanilla bean on a butter-roasted speculoos crumb base.",
    ingredients: [
      { name: "Full-Fat Philadelphia Cream Cheese (Room Temp)", amount: "500g" },
      { name: "Cultured French Crème Fraîche", amount: "180g" },
      { name: "Golden Caster Sugar", amount: "160g" },
      { name: "Free-Range Pasture Eggs", amount: "3 Whole Eggs" },
      { name: "Speculoos / Graham Cracker Crumbs", amount: "140g" },
      { name: "Grass-fed European Butter (Melted)", amount: "65g" },
      { name: "Tahitian Vanilla Bean Pod (Scraped)", amount: "1 whole" },
      { name: "Fresh Macerated Blackberries & Raspberries", amount: "150g" }
    ],
    instructions: [
      {
        step: 1,
        title: "Golden Biscuit Base",
        detail: "Crush biscuits into sand-like texture. Combine with melted butter and press firmly into an 8-inch springform pan. Chill 20 mins."
      },
      {
        step: 2,
        title: "Silk Batter Emulsion",
        detail: "Beat cream cheese and caster sugar on low until entirely satin smooth. Gradually fold in crème fraîche and scraped vanilla caviar."
      },
      {
        step: 3,
        title: "Slow Egg Fold",
        detail: "Incorporate eggs one by one without beating excess air into the batter to preserve the dense, creamy interior."
      },
      {
        step: 4,
        title: "Bake & Caramelize",
        detail: "Bake at 200°C (390°F) for 42 minutes until the crown blisters golden brown while the center retains a delicate wobble."
      }
    ],
    nutrition: {
      calories: "420 kcal",
      carbs: "34g",
      protein: "7g",
      fat: "28g"
    },
    sommelierTip: "Pair with a late-harvest Riesling or vintage Tawny Port to balance the rich acidity."
  },
  {
    id: "avocado-toast",
    number: "03",
    total: "03",
    name: "Avocado Toast",
    subtitle: "Fresh • Creamy • Crisp",
    giantTitle: ["Avocado", "Toast"],
    category: "Gourmet Brunch",
    time: "10 MIN",
    servings: "1 SERVING",
    calories: "320 KCAL",
    difficulty: "EASY",
    accentColor: "#65a30d",
    accentLight: "#a3e635",
    glowColor: "rgba(101, 163, 13, 0.32)",
    bgGradient: "radial-gradient(ellipse at 50% 45%, rgba(20, 83, 45, 0.45) 0%, rgba(6, 35, 18, 0.94) 75%, #03140a 100%)",
    bgImage: "/assets/background/avocado-toast-bg.jpg",
    mainImage: "/assets/recipe/avocado-toast-main.png",
    floatingIngredients: [
      {
        id: "avo-1",
        name: "Ripe Avocado Crescent",
        src: "/assets/ingredients/avocado-slice.png",
        initial: { x: "12%", y: "20%", size: 140, rotate: -25 },
        mobile: { x: "13%", y: "17%", size: 78, rotate: -25 },
        speed: 1.5,
        parallax: { x: -45, y: -100, rotate: 45 },
        blur: "0px"
      },
      {
        id: "chili-1",
        name: "Crushed Chili Flake",
        src: "/assets/ingredients/chili-flake.png",
        initial: { x: "85%", y: "24%", size: 105, rotate: 35 },
        mobile: { x: "82%", y: "19%", size: 65, rotate: 35 },
        speed: 1.8,
        parallax: { x: 45, y: -120, rotate: 110 },
        blur: "0.5px"
      },
      {
        id: "micro-1",
        name: "Crisp Pea Microgreen",
        src: "/assets/ingredients/microgreen.png",
        initial: { x: "86%", y: "72%", size: 115, rotate: -30 },
        mobile: { x: "82%", y: "75%", size: 68, rotate: -30 },
        speed: 1.1,
        parallax: { x: 35, y: -70, rotate: -60 },
        blur: "0.8px"
      },
      {
        id: "chili-2",
        name: "Sun-Dried Pepper Shard",
        src: "/assets/ingredients/chili-flake.png",
        initial: { x: "16%", y: "75%", size: 95, rotate: 60 },
        mobile: { x: "13%", y: "76%", size: 60, rotate: 60 },
        speed: 1.3,
        parallax: { x: -30, y: -85, rotate: -80 },
        blur: "0px"
      },
      {
        id: "mint-3",
        name: "Fresh Coriander Leaf",
        src: "/assets/ingredients/mint-leaf.png",
        initial: { x: "28%", y: "44%", size: 105, rotate: -15 },
        mobile: { x: "8%", y: "45%", size: 60, rotate: -35 },
        speed: 1.2,
        parallax: { x: -20, y: -65, rotate: 45 },
        blur: "0.5px"
      }
    ],
    description:
      "Charred artisan country sourdough topped with hand-crushed Hass avocado, cold-pressed Greek extra virgin olive oil, flaky Maldon salt crystals, and a delicate pasture-raised soft poached egg bursting with molten yolk.",
    ingredients: [
      { name: "Rustic Country Sourdough Batard (Thick Cut)", amount: "1 Large Slice" },
      { name: "Hass Avocado (Ripe & Creamy)", amount: "1 whole" },
      { name: "Pasture-Raised Organic Egg", amount: "1 egg" },
      { name: "Cold-Pressed Extra Virgin Olive Oil", amount: "15 ml" },
      { name: "Fresh Lemon Juice", amount: "1 tsp" },
      { name: "Crushed Red Pepper Flakes", amount: "1/2 tsp" },
      { name: "Flaky Maldon Sea Salt & Cracked Black Pepper", amount: "to taste" },
      { name: "Fresh Organic Pea Tendrils & Edible Blossoms", amount: "handful" }
    ],
    instructions: [
      {
        step: 1,
        title: "Woodfire Char the Sourdough",
        detail: "Toast the thick sourdough slice in a cast-iron skillet with olive oil until golden crusty outside with a chewy crumb."
      },
      {
        step: 2,
        title: "Rustic Avocado Mash",
        detail: "Scoop ripe avocado into a bowl. Coarsely crush with a fork, folding in lemon juice, flaky sea salt, and extra virgin olive oil."
      },
      {
        step: 3,
        title: "Simmer Poached Egg",
        detail: "Swirl a gentle whirlpool in boiling water with a dash of white vinegar. Slide egg into center and poach for exactly 3 minutes for molten yolk."
      },
      {
        step: 4,
        title: "Assemble & Crown",
        detail: "Mound rustic avocado over the warm toast, place poached egg on top, sprinkle fiery chili flakes, sesame, and fresh microgreens."
      }
    ],
    nutrition: {
      calories: "320 kcal",
      carbs: "26g",
      protein: "14g",
      fat: "19g"
    },
    sommelierTip: "Drizzle with aged white truffle oil for an elevated weekend brunch finish."
  }
];
