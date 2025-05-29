import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('language') || 'en';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "about": "About",
      "contact": "Contact",
      "backToTop": "Back to Top",
      "navbar": {
        "home": "Home",
        "about": "About",
        "contact": "Contact",
        "myRecipes": "My Recipes",
        "wizardForm": "Recipe Wizard"
      },
      "button": {
        "start": "Let's Start!"
      },
      "footer": {
        "ourMission": "Our Mission",
        "missionStatement": "To empower home cooks of all skill levels to create delicious, satisfying meals with the ingredients they already have, making cooking an accessible and joyful experience for everyone.",
        "copyright": "© {{date}} Reciply, All Rights Reserved.",
        "backToTop": "Back to top",
        "social": {
          "facebook": "Visit our Facebook page",
          "whatsapp": "Contact us on WhatsApp",
          "instagram": "Follow us on Instagram",
          "email": "Email us"
        },
        "inclusivityNote": "We used masculine language for convenience, but all the recipes, inspiration, and tips here are for everyone 😊"
      },
      "theme": {
        "darkMode": "Switch to Dark Mode",
        "lightMode": "Switch to Light Mode"
      },
      "language": {
        "english": "Switch to English",
        "hebrew": "Switch to Hebrew"
      },
      "notFound": {
        "title": "Oops! This recipe is still in the oven...",
        "message": "We couldn't find the page you were looking for. Maybe it got too spicy and ran off?",
        "button": "Back to Home Kitchen",
        "humor": "Even the best chefs burn a few pages now and then!"
      },
      // NEW: Move contact to the root level
      "language-contact": {
        "pageTitle": "Contact Us - Reciply",
        "title": "Get in Touch",
        "subtitle": "Have a question about a recipe? Want to share your culinary success story? We'd love to hear from you!",
        "form": {
          "title": "Send Us a Message",
          "name": "Name",
          "namePlaceholder": "Your name",
          "email": "Email",
          "emailPlaceholder": "your@email.com",
          "subject": "Subject",
          "subjectPlaceholder": "What's this about?",
          "message": "Message",
          "messagePlaceholder": "Your message",
          "submit": "Send Message",
          "submitSuccess": "Your message has been sent successfully! We'll get back to you soon."
        },
        "info": {
          "title": "Contact Information",
          "email": {
            "label": "Email"
          },
          "phone": {
            "label": "Phone",
            "value": "+972 050-1234567"
          },
          "office": {
            "label": "Office",
            "line1": "123 Culinary Street",
            "line2": "Foodie City, FC 12345"
          }
        },
        "social": {
          "title": "Follow Us",
          "instagram": "Follow us on Instagram",
          "facebook": "Like us on Facebook"
        }
      },
      "recipe": {
        "yourRecipe": "Your Generated Recipe",
        "loading": "Loading...",
        "generatingMessage": "Our chef is cooking up your recipe...",
        "errorTitle": "Recipe Generation Failed",
        "tryAgain": "Try Again",
        "close": "Close",
        "viewAll": "View All Recipes",
        "createNew": "Create New Recipe",
        "createdOn": "Created on",
        "difficulty": "Difficulty",
        "time": "Time"
      },
      "recipeHistory": {
        "title": "Your Recipe History",
        "createNew": "Create New Recipe",
        "noRecipes": "No recipes yet",
        "getStarted": "Create your first recipe to get started",
        "createFirstRecipe": "Create First Recipe",
        "viewRecipe": "View Recipe"
      },
      "wizard": {
        "title": "Recipe Preferences",
        "steps": {
          "difficulty": "Difficulty",
          "time": "Time",
          "ingredients": "Ingredients",
          "generatingMessage": "Our chef is cooking up your recipe...",
          "buttons": {
            "generating": "Generating...",
            "submit": "Generate Recipe",
            "back": "Back",
            "next": "Next"
          }
        },
        "difficulty": {
          "title": "Select Recipe Difficulty Level"
        },
        "difficultyLevels": {
          "easy": "Easy",
          "normal": "Normal",
          "hard": "Hard",
          "extremely_hard": "Extremely Hard"
        },
        "time": {
          "title": "How Much Time Do You Want to Spend?"
        },
        "timeRanges": {
          "15_to_30_min": "15-30 min",
          "30_to_60_min": "30-60 min",
          "60_to_180_min": "60-180 min",
          "180+_min": "180+ min"
        },
        "ingredients": {
          "title": "Select Your Ingredients",
          "selected": "Selected Ingredients:",
          "noSelection": "No ingredients selected yet",
          "addCustomPlaceholder": "Add your own ingredient...",
          "chicken": "Chicken",
          "beef": "Beef",
          "tofu": "Tofu",
          "fish": "Fish",
          "eggs": "Eggs",
          "rice": "Rice",
          "pasta": "Pasta",
          "bread": "Bread",
          "quinoa": "Quinoa",
          "oats": "Oats",
          "buckwheat": "Buckwheat",
          "olive_oil": "Olive Oil",
          "avocado": "Avocado",
          "coconut_oil": "Coconut Oil",
          "sesame_oil": "Sesame Oil",
          "walnut": "Walnut",
          "almonds": "Almond",
          "cashew": "Cashew",
          "pistachio": "Pistachio",
          "peanut": "Peanut",
          "pecans": "Pecan",
          "hazelnut": "Hazelnut",
          "macadamia_nut": "Macadamia Nut",
          "brazil_nut": "Brazil Nut",
          "white_sesame": "White Sesame",
          "black_sesame": "Black Sesame",
          "black_cumin_seed": "Black Cumin Seeds",
          "linen_seed": "Linen Seeds",
          "chia_seeds": "Chia Seeds",
          "pine_nuts": "Pine Nuts",
          "sunflower_seeds": "Sunflower Seeds",
          "pumpkin_seeds": "Pumpkin Seeds",
          "tahini": "Tahini",
          "tomatoes": "Tomatoes",
          "cucumber": "Cucumber",
          "white_onion": "White Onion",
          "purple_onion": "Purple Onion",
          "garlic": "Garlic",
          "bell_peppers": "Bell Pepper",
          "carrots": "Carrots",
          "white_cabbage": "White Cabbage",
          "purple_cabbage": "Purple Cabbage",
          "radish": "Radish",
          "spinach": "Spinach",
          "broccoli": "Broccoli",
          "zucchini": "Zucchini",
          "cauliflower": "Cauliflower",
          "potato": "Potato",
          "sweet_potato": "Sweet Potato",
          "beet_root": "Beet Root",
          "chard": "Chard",
          "kohlrabi": "Kohlrabi",
          "eggplant": "Eggplant",
          "berries": "Berries",
          "bananas": "Bananas",
          "apples": "Apples",
          "mango": "Mango",
          "lemons": "Lemons",
          "oranges": "Oranges",
          "watermelon": "Watermelon",
          "grapes": "Grapes",
          "pineapple": "Pineapple",
          "plum": "Plum",
          "melon": "Melon",
          "peach": "Peach",
          "apricot": "Apricot",
          "kiwi": "Kiwi",
          "papaya": "Papaya",
          "pomegranate": "Pomegranate",
          "fig": "Fig",
          "coconut": "Coconut",
          "guava": "Guava",
          "passion_fruit": "Passion Fruit",
          "lychee": "Lychee",
          "dragon_fruit": "Dragon Fruit",
          "persimmon": "Persimmon",
          "tangerine": "Tangerine",
          "nectarine": "Nectarine",
          "dry_apricots": "Dried Apricots",
          "dates": "Dates",
          "cranberries": "Cranberries",
          "dried_figs": "Dried Figs",
          "raisins": "Raisins",
          "dried_plums": "Dried Plums",
          "dried_mango": "Dried Mango",
          "dried_banana": "Dried Banana",
          "dried_pineapple": "Dried Pineapple",
          "dried_coconut": "Dried Coconut",
          "milk": "Milk",
          "white_cheese": "White Cheese",
          "yogurt": "Yogurt",
          "cream": "Cream",
          "butter": "Butter",
          "cottage_cheese": "Cottage Cheese",
          "sour_cream": "Sour Cream",
          "cream_cheese": "Cream Cheese",
          "mozzarella": "Mozzarella",
          "feta": "Feta",
          "parmesan": "Parmesan",
          "ricotta": "Ricotta",
          "goat_cheese": "Goat Cheese",
          "blue_cheese": "Blue Cheese",
          "cheddar": "Cheddar",
          "brie": "Brie",
          "camembert": "Camembert",
          "coconut_milk": "Coconut Milk",
          "almond_milk": "Almond Milk",
          "soy_milk": "Soy Milk",
          "oat_milk": "Oat Milk",
          "rice_milk": "Rice Milk",
          "salt": "Salt",
          "black_pepper": "Black Pepper",
          "cumin": "Cumin",
          "coriander": "Coriander",
          "turmeric": "Turmeric",
          "paprika": "Paprika",
          "cinnamon": "Cinnamon",
          "ginger": "Ginger",
          "basil": "Basil",
          "oregano": "Oregano",
          "thyme": "Thyme",
          "rosemary": "Rosemary",
          "parsley": "Parsley",
          "dill": "Dill",
          "mint": "Mint",
          "bay_leaf": "Bay Leaf",
          "vanilla": "Vanilla",
          "sugar": "Sugar",
          "honey": "Honey",
          "maple_syrup": "Maple Syrup",
          "agave_syrup": "Agave Syrup",
          "stevia": "Stevia",
          "brown_sugar": "Brown Sugar",
          "coconut_sugar": "Coconut Sugar",
          "water": "Water",
          "vegetable_stock": "Vegetable Stock",
          "beef_stock": "Beef Stock",
          "fish_stock": "Fish Stock",
          "red_wine": "Red Wine",
          "white_wine": "White Wine",
          "vinegar": "Vinegar",
          "soy_sauce": "Soy Sauce",
          "tomato_sauce": "Tomato Sauce",
          "mustard": "Mustard",
          "ketchup": "Ketchup",
          "mayonnaise": "Mayonnaise",
          "peanut_butter": "Peanut Butter",
          "almond_butter": "Almond Butter",
          "rice_vinegar": "Rice Vinegar",
          "balsamic_vinegar": "Balsamic Vinegar",
          "apple_cider_vinegar": "Apple Cider Vinegar"
        },
        "categories": {
          "Protein": "Protein",
          "Carbohydrates": "Carbohydrates",
          "Fats": "Fats",
          "Vegetables": "Vegetables",
          "Fruits": "Fruits",
          "Dry fruits": "Dry Fruits",
          "Dairy Products": "Dairy Products",
          "Spices and Herbs": "Spices and Herbs",
          "Sweeteners": "Sweeteners",
          "Liquids & Additional Ingredients": "Liquids & Additional Ingredients"
        },
        "buttons": {
          "back": "Back",
          "next": "Next",
          "submit": "Submit",
          "add": "Add"
        },
        "form": {
          "submitSuccess": "Form submitted successfully!"
        },
        "navigation": {
          "back": "Back",
          "next": "Next",
          "submit": "Submit"
        },
        "validation": {
          "selectDifficulty": "Please select a difficulty level",
          "selectTime": "Please select a time range",
          "selectIngredients": "Please select at least one ingredient"
        },
        "errors": {
          "generationFailed": "Failed to generate recipe. Please try again."
        }
        // Removed contact from here
      },
      "language-about": {
        "pageTitle": "About Us - Reciply",
        "title": "About Reciply",
        "subtitle": "Where culinary inspiration meets practical guidance",
        "chefImageAlt": "Chef Mascot",
        "ourStory": {
          "title": "Our Story",
          "paragraph1": "Hello there! I'm Noam Shalev, a passionate sous-chef with years of experience in professional kitchens. Throughout my culinary journey, I've witnessed firsthand the transformative power of home cooking—and the frustration that can come with it.",
          "paragraph2": "Like many culinary professionals, I remember the early days of my career when creating even simple dishes seemed daunting. That feeling of standing in the kitchen, ingredients at hand, but unsure how to proceed—it's a universal experience that connects home cooks everywhere.",
          "paragraph3": "This is why I created Reciply. I wanted to bridge the gap between having ingredients and enjoying a delicious home-cooked meal. This platform is designed to eliminate the guesswork from cooking by providing personalized recipe recommendations based on what's already in your kitchen, your available time, and your skill level.",
          "paragraph4": "At Reciply, we believe that the most satisfying culinary experiences come from creative exploration. Our step-by-step guidance empowers you to experiment with confidence, transforming everyday ingredients into extraordinary meals. Because in the end, the best dishes come from that playful, adventurous spirit in the kitchen.",
          "paragraph5": ""
        },
        "howItWorks": {
          "title": "How Reciply Works",
          "step1": {
            "title": "Input Your Ingredients",
            "description": "Tell us what ingredients you have on hand in your kitchen pantry."
          },
          "step2": {
            "title": "Set Your Parameters",
            "description": "Specify how much time you have and your preferred difficulty level."
          },
          "step3": {
            "title": "Discover Recipes",
            "description": "Get personalized recipe suggestions that match your criteria with step-by-step instructions."
          }
        },
        "notFound": {
          "pageTitle": "Page Not Found - Reciply",
          "imageAlt": "Page not found background",
          "title": "Oops! This recipe is still in the oven...",
          "message": "We couldn't find the page you were looking for. Maybe it got too spicy and ran off?",
          "button": "Back to Home Kitchen",
          "humor": "Even the best chefs burn a few pages now and then!"
        },
      }
    }
  },
  // Hebrew translations
  he: {
    translation: {
      "home": "דף הבית",
      "about": "אודות",
      "contact": "צור קשר",
      "backToTop": "חזרה למעלה",
      "navbar": {
        "home": "דף הבית",
        "about": "אודות",
        "contact": "צור קשר",
        "myRecipes": "המתכונים שלי",
        "wizardForm": "אשף המתכונים"
      },
      "button": {
        "start": " בואו נתחיל!"
      },
      "footer": {
        "ourMission": "המשימה שלנו",
        "missionStatement": "להעצים כל בשלן – מהחובבן הסקרן ועד לטבח המנוסה – להפוך את מה שיש במקרר לחוויה קולינרית טעימה ומספקת. בלי לחץ, בלי רשימות קניות אינסופיות – רק בישול פשוט, נגיש ומהנה לכולם.",
        "copyright": "© {{date}} Reciply, כל הזכויות שמורות.",
        "backToTop": "חזרה למעלה",
        "social": {
          "facebook": "בקר בדף הפייסבוק שלנו",
          "whatsapp": "צור קשר בוואטסאפ",
          "instagram": "עקוב אחרינו באינסטגרם",
          "email": "שלח לנו אימייל"
        },
        "inclusivityNote": "השתמשנו בלשון זכר לנוחות, אבל כל המתכונים, ההשראה והטיפים כאן מיועדים לכולם ולכולן 😊"
      },
      "theme": {
        "darkMode": "עבור למצב כהה",
        "lightMode": "עבור למצב בהיר"
      },
      "language": {
        "english": "עבור לאנגלית",
        "hebrew": "עבור לעברית"
      },
      "notFound": {
        "title": "אופס! המתכון הזה עדיין בתנור...",
        "message": "לא הצלחנו למצוא את הדף שחיפשת. אולי הוא נהיה חריף מדי וברח?",
        "button": "חזרה למטבח הביתי",
        "humor": "גם לשפים הטובים ביותר נשרפים כמה דפים מדי פעם!"
      },
      "recipe": {
        "yourRecipe": "המתכון שלך",
        "loading": "טוען...",
        "generatingMessage": "השף שלנו מכין את המתכון שלך...",
        "errorTitle": "יצירת המתכון נכשלה",
        "tryAgain": "נסה שוב",
        "close": "סגור",
        "viewAll": "צפה בכל המתכונים",
        "createNew": "צור מתכון חדש",
        "createdOn": "נוצר בתאריך",
        "difficulty": "רמת קושי",
        "time": "זמן הכנה"
      },
      "recipeHistory": {
        "title": "היסטוריית המתכונים שלך",
        "createNew": "צור מתכון חדש",
        "noRecipes": "אין עדיין מתכונים",
        "getStarted": "צור את המתכון הראשון שלך כדי להתחיל",
        "createFirstRecipe": "צור מתכון ראשון",
        "viewRecipe": "צפה במתכון"
      },

      // NEW: Move contact to the root level
      "language-contact": {
        "pageTitle": "צור קשר - Reciply",
        "title": "צור קשר",
        "subtitle": "יש לך שאלה לגבי מתכון? רוצה לשתף סיפור הצלחה קולינרי? נשמח לשמוע ממך!",
        "form": {
          "title": "שלח לנו הודעה",
          "name": "שם",
          "namePlaceholder": "השם שלך",
          "email": "אימייל",
          "emailPlaceholder": "המייל שלך",
          "subject": "נושא",
          "subjectPlaceholder": "?במה מדובר",
          "message": "הודעה",
          "messagePlaceholder": "ההודעה שלך",
          "submit": "שלח הודעה",
          "submitSuccess": "ההודעה שלך נשלחה בהצלחה! נחזור אליך בהקדם."
        },
        "info": {
          "title": "פרטי יצירת קשר",
          "email": {
            "label": "אימייל"
          },
          "phone": {
            "label": "טלפון",
            "value": "+972 050-1234567"
          },
          "office": {
            "label": "משרד",
            "line1": "הרחוב הקולינרי 123",
            "line2": "עיר האוכל, 12345"
          }
        },
        "social": {
          "title": "עקבו אחרינו",
          "instagram": "עקבו אחרינו באינסטגרם",
          "facebook": "לייק בפייסבוק"
        }
      },
      "wizard": {
        "title": "העדפות מתכון",
        "steps": {
          "difficulty": "רמת קושי",
          "time": "זמן",
          "ingredients": "חומרי גלם",
          "generatingMessage": "השף שלנו מכין את המתכון שלך...",
          "buttons": {
            "generating": "מייצר...",
            "submit": "צור מתכון",
            "back": "חזרה",
            "next": "הבא"
          }
        },
        "difficulty": {
          "title": "בחר רמת קושי למתכון"
        },
        "difficultyLevels": {
          "easy": "קל",
          "normal": "רגיל",
          "hard": "קשה",
          "extremely_hard": "קשה במיוחד"
        },
        "time": {
          "title": "כמה זמן תרצה להשקיע?"
        },
        "timeRanges": {
          "15_to_30_min": "15-30 דקות",
          "30_to_60_min": "30-60 דקות",
          "60_to_180_min": "60-180 דקות",
          "180+_min": "180+ דקות"
        },
        "ingredients": {
          "title": "בחר את חומרי הגלם שלך",
          "selected": "חומרי הגלם שנבחרו:",
          "noSelection": "עדיין לא נבחרו חומרי גלם",
          "addCustomPlaceholder": "הוסף חומר גלם משלך...",
          "chicken": "עוף",
          "beef": "בקר",
          "tofu": "טופו",
          "fish": "דג",
          "eggs": "ביצים",
          "rice": "אורז",
          "pasta": "פסטה",
          "bread": "לחם",
          "quinoa": "קינואה",
          "oats": "שיבולת שועל",
          "buckwheat": "כוסמת",
          "olive_oil": "שמן זית",
          "avocado": "אבוקדו",
          "coconut_oil": "שמן קוקוס",
          "sesame_oil": "שמן שומשום",
          "walnut": "אגוז מלך",
          "almonds": "שקדים",
          "cashew": "קשיו",
          "pistachio": "פיסטוק",
          "peanut": "בוטנים",
          "pecans": "פקאנים",
          "hazelnut": "אגוזי לוז",
          "macadamia_nut": "אגוז מקדמיה",
          "brazil_nut": "אגוז ברזיל",
          "white_sesame": "שומשום לבן",
          "black_sesame": "שומשום שחור",
          "black_cumin_seed": "קצח",
          "linen_seed": "פשתן",
          "chia_seeds": "צ'יה",
          "pine_nuts": "צנוברים",
          "sunflower_seeds": "זרעי חמניה",
          "pumpkin_seeds": "זרעי דלעת",
          "tahini": "טחינה",
          "tomatoes": "עגבניות",
          "cucumber": "מלפפון",
          "white_onion": "בצל לבן",
          "purple_onion": "בצל סגול",
          "garlic": "שום",
          "bell_peppers": "גמבה",
          "carrots": "גזר",
          "white_cabbage": "כרוב לבן",
          "purple_cabbage": "כרוב סגול",
          "radish": "צנונית",
          "spinach": "תרד",
          "broccoli": "ברוקולי",
          "zucchini": "זוקיני",
          "cauliflower": "כרובית",
          "potato": "תפוחי אדמה",
          "sweet_potato": "בטטה",
          "beet_root": "סלק",
          "chard": "מנגולד",
          "kohlrabi": "קולורבי",
          "eggplant": "חציל",
          "berries": "פירות יער",
          "bananas": "בננות",
          "apples": "תפוחים",
          "mango": "מנגו",
          "lemons": "לימונים",
          "oranges": "תפוזים",
          "watermelon": "אבטיח",
          "grapes": "ענבים",
          "pineapple": "אננס",
          "plum": "שזיף",
          "melon": "מלון",
          "peach": "אפרסק",
          "apricot": "מישמיש",
          "kiwi": "קיווי",
          "papaya": "פפאיה",
          "pomegranate": "רימון",
          "fig": "תאנה",
          "coconut": "קוקוס",
          "guava": "גויאבה",
          "passion_fruit": "פסיפלורה",
          "lychee": "ליצ'י",
          "dragon_fruit": "פיטאיה",
          "persimmon": "אפרסמון",
          "tangerine": "מנדרינה",
          "nectarine": "נקטרינה",
          "dry_apricots": "משמשים מיובשים",
          "dates": "תמרים",
          "cranberries": "חמוציות",
          "dried_figs": "תאנים מיובשות",
          "raisins": "צימוקים",
          "dried_plums": "שזיף מיובש",
          "dried_mango": "מנגו מיובש",
          "dried_banana": "בננה מיובשת",
          "dried_pineapple": "אננס מיובש",
          "dried_coconut": "קוקוס מיובש",
          "milk": "חלב",
          "white_cheese": "גבינה לבנה",
          "yogurt": "יוגורט",
          "cream": "שמנת",
          "butter": "חמאה",
          "cottage_cheese": "קוטג'",
          "sour_cream": "שמנת חמוצה",
          "cream_cheese": "שמנת למריחה",
          "mozzarella": "מוצרלה",
          "feta": "פטה",
          "parmesan": "פרמז'ן",
          "ricotta": "ריקוטה",
          "goat_cheese": "גבינת עזים",
          "blue_cheese": "גבינה כחולה",
          "cheddar": "צ'דר",
          "brie": "ברי",
          "camembert": "קממבר",
          "coconut_milk": "חלב קוקוס",
          "almond_milk": "חלב שקדים",
          "soy_milk": "חלב סויה",
          "oat_milk": "חלב שיבולת שועל",
          "rice_milk": "חלב אורז",
          "salt": "מלח",
          "black_pepper": "פלפל שחור",
          "cumin": "כמון",
          "coriander": "כוסברה",
          "turmeric": "כורכום",
          "paprika": "פפריקה",
          "cinnamon": "קינמון",
          "ginger": "ג'ינג'ר",
          "basil": "בזיליקום",
          "oregano": "אורגנו",
          "thyme": "טימין",
          "rosemary": "רוזמרין",
          "parsley": "פטרוזליה",
          "dill": "שמיר",
          "mint": "נענע",
          "bay_leaf": "עלי דפנה",
          "vanilla": "וניל",
          "sugar": "סוכר לבן",
          "honey": "דבש",
          "maple_syrup": "מייפל",
          "agave_syrup": "אגבה",
          "stevia": "סטיביה",
          "brown_sugar": "סוכר חום",
          "coconut_sugar": "סוכר קוקוס",
          "water": "מים",
          "vegetable_stock": "ציר ירקות",
          "beef_stock": "ציר בקר",
          "fish_stock": "ציר דגים",
          "red_wine": "יין אדום",
          "white_wine": "יין לבן",
          "vinegar": "חומץ תפוחים",
          "soy_sauce": "סויה",
          "tomato_sauce": "מיץ עגבניות",
          "mustard": "חרדל",
          "ketchup": "קטשופ",
          "mayonnaise": "מיונז",
          "peanut_butter": "חמאת בוטנים",
          "almond_butter": "חמאת שקדים",
          "rice_vinegar": "חומץ אורז",
          "balsamic_vinegar": "חומץ בלסמי",
          "apple_cider_vinegar": "חומץ תפוחים"
        },
        "categories": {
          "Protein": "חלבון",
          "Carbohydrates": "פחמימות",
          "Fats": "שומן",
          "Vegetables": "ירקות",
          "Fruits": "פירות",
          "Dry fruits": "פירות יבשים",
          "Dairy Products": "מוצרי חלב",
          "Spices and Herbs": "תבלינים ועשבי תיבול",
          "Sweeteners": "ממתיקים",
          "Liquids & Additional Ingredients": "נוזלים ומרכיבים נוספים"
        },
        "buttons": {
          "back": "חזור",
          "next": "הבא",
          "submit": "שלח",
          "add": "הוסף"
        },
        "form": {
          "submitSuccess": "הטופס נשלח בהצלחה!"
        },
        "navigation": {
          "back": "חזור",
          "next": "הבא",
          "submit": "שלח"
        },
        "validation": {
          "selectDifficulty": "אנא בחר רמת קושי",
          "selectTime": "אנא בחר טווח זמן",
          "selectIngredients": "אנא בחר לפחות מרכיב אחד"
        },
        "errors": {
          "generationFailed": "יצירת המתכון נכשלה. אנא נסה שוב."
        }
        // Removed contact from here
      },
      "language-about": {
        "pageTitle": "אודות - Reciply",
        "title": "אודות Reciply",
        "subtitle": "מהשראה למנה מושלמת – הבישול המקצועי מתחיל כאן",
        "chefImageAlt": "שף מסקוט",
        "ourStory": {
          "title": "הסיפור שלנו",
          "paragraph1": "שלום! אני נועם שלו, סו-שף עם שנים של ניסיון במטבחים מקצועיים. לאורך המסע הקולינרי שלי, ראיתי מקרוב איך בישול ביתי יכול לשנות חיים. וכמה תסכול הוא לפעמים מביא איתו.",
          "paragraph2": "כמו רבים בעולם המטבח, אני זוכר היטב את הימים הראשונים בקריירה שלי, כשגם הכנת מנות פשוטות הרגישה כמו משימה בלתי אפשרית. לעמוד במטבח, עם חומרי הגלם מול העיניים, אבל בלי לדעת איך להתחיל – זו חוויה משותפת לכל מי שמבשל באהבה.",
          "paragraph3": "מתוך ההבנה הזו נולד Reciply. רציתי לסגור את הפער שבין מה שיש במטבח לבין ארוחה ביתית טעימה. יצרנו פלטפורמה שמסירה את חוסר הוודאות מהתהליך, ומציעה לכם מתכונים מותאמים אישית – לפי מה שיש לכם בבית, הזמן הפנוי שלכם, ורמת הניסיון שלכם בבישול.",
          "paragraph4": "ב-Reciply אנחנו מאמינים שהחוויה הקולינרית הכי טובה מגיעה מתוך יצירתיות והנאה. עם הנחיות מדויקות וצעדים ברורים, נעניק לכם את הביטחון להשתעשע, לנסות, ולגלות איך גם החומרים הכי פשוטים יכולים להפוך לארוחה יוצאת דופן.",
          "paragraph5": "כי אצלנו, כל מצרך הוא הזדמנות – וכל ארוחה היא יצירה."
        },
        "howItWorks": {
          "title": "איך Reciply עובד",
          "step1": {
            "title": "הכנס את חומרי הגלם שלך",
            "description": "ספר לנו אילו חומרי גלם יש לך בהישג יד במזווה המטבח שלך."
          },
          "step2": {
            "title": "זמן לקצת הגדרות",
            "description": "ציין כמה זמן יש לך ומה רמת הקושי המועדפת עליך."
          },
          "step3": {
            "title": "גלה מתכונים",
            "description": "קבל הצעות מתכונים מותאמות אישית שמתאימות לקריטריונים שלך עם הוראות צעד אחר צעד."
          }
        },
        "notFound": {
          "pageTitle": "דף לא נמצא - Reciply",
          "imageAlt": "תמונת רקע לדף שלא נמצא",
          "title": "אופס! המתכון הזה עדיין בתנור...",
          "message": "לא הצלחנו למצוא את הדף שחיפשת. אולי הוא נהיה חריף מדי וברח?",
          "button": "חזרה למטבח הביתי",
          "humor": "גם לשפים הטובים ביותר נשרפים כמה דפים מדי פעם!"
        }
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, // Use the saved language instead of hardcoded 'en'
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Add a language change listener to save the language choice
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  // Update document direction based on language
  document.dir = lng === 'he' ? 'rtl' : 'ltr';
});

export default i18n;