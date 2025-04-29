import { JSX, useState } from "react";
import { Card, Button, ProgressBar, Form, Container, Row, Col, Badge, InputGroup } from "react-bootstrap";
import "./WizardForm.css";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next"; // Add this import

// Define ingredient categories - keep enum in English for consistency
enum IngredientCategory {
    PROTEIN = "Protein",
    CARBOHYDRATES = "Carbohydrates",
    FATS = "Fats",
    VEGETABLES = "Vegetables",
    FRUITS = "Fruits",
    Dry_FRUITS = "Dry fruits",
    DAIRY_PRODUCTS = "Dairy Products",
    SPICES_AND_HERBS = "Spices and Herbs",
    SWEETENERS = "Sweeteners",
    LIQUIDS_AND_ADDITIONAL_INGREDIENTS = "Liquids & Additional Ingredients"
}

// Sample ingredients data structure
const ingredientsByCategory: Record<IngredientCategory, string[]> = {
    [IngredientCategory.PROTEIN]: ["Chicken", "Beef", "Tofu", "Fish", "Eggs"],
    [IngredientCategory.CARBOHYDRATES]: ["Rice", "Pasta", "Bread", "Quinoa", "Oats", "Buckwheat"],
    [IngredientCategory.FATS]: ["Olive Oil", "Avocado", "Coconut Oil", "Sesame Oil", "Walnut", "Almonds","Cashew","Pistachio", "Peanut", "Pecans", "Hazelnut", "Macadamia nut", "Brazil nut", "white sesame", "Black sesame", "Black cumin seed", "Linen seed", "Chia seeds", "Pine nuts", "Sunflower seeds", "Pumpkin seeds", "Tahini"],
    [IngredientCategory.VEGETABLES]: ["Tomatoes", "Cucumber", "White onion", "Purple onion", "Garlic", "Bell Peppers", "Carrots", "White cabbage", "Purple cabbage", "Radish", "Spinach", "Broccoli", "Zucchini", "Cauliflower", "Potato", "Sweet potato", "Beet root", "Chard", "Kohlrabi", "Eggplant"],
    [IngredientCategory.FRUITS]: ["Apples", "Bananas", "Berries", "Oranges", "Lemons", "Mango", "Pineapple", "Grapes", "Watermelon", "Melon", "Plum", "Peach", "Apricot", "Kiwi", "Papaya", "Pomegranate", "Fig", "Coconut", "Guava", "Passion fruit", "Lychee", "Dragon fruit", "Persimmon", "Tangerine", "Nectarine"],
    [IngredientCategory.Dry_FRUITS]: ["Cranberries", "Dates", "Apricot", "Plum", "Raisins", "Dried Plums", "Dried Mango", "Dried Banana", "Dried Pineapple", "Dried Coconut"],
    [IngredientCategory.DAIRY_PRODUCTS]: ["Milk", "White Cheese", "Yogurt", "Cream", "Butter", "Sour Cream", "Cottage Cheese", "Ricotta", "Cream Cheese", "Mozzarella", "Feta", "Parmesan", "Goat Cheese", "Blue Cheese", "Brie", "Camembert", "Cheddar", "Coconut Milk", "Almond Milk", "Soy Milk", "Oat Milk", "Rice Milk"],
    [IngredientCategory.SPICES_AND_HERBS]: ["Salt", "Black Pepper", "Coriander", "Turmeric", "Ginger", "Thyme", "Rosemary", "Parsley", "Dill", "Mint", "Bay Leaf", "Basil", "Oregano", "Cumin", "Paprika", "Cinnamon"],
    [IngredientCategory.SWEETENERS]: ["Sugar", "Honey", "Maple Syrup", "Stevia", "Brown Sugar", "Vanilla", "Agave Syrup", "Coconut Sugar"],
    [IngredientCategory.LIQUIDS_AND_ADDITIONAL_INGREDIENTS]: ["Water", "Vegetable stock", "Beef stock", "Fish stock", "Red wine", "White wine", "Vinegar", "Soy Sauce", "Tomato Sauce", "Mustard", "Ketchup", "Mayonnaise", "Peanut Butter", "Almond Butter", "Rice Vinegar", "Balsamic Vinegar"],
};

export function WizardForm(): JSX.Element {
    const { isDarkMode } = useTheme();
    const { t, i18n } = useTranslation(); // Add translation hook
    
    const [currentStep, setCurrentStep] = useState(1);
    const [sliding, setSliding] = useState(false);
    const [slideDirection, setSlideDirection] = useState("left");

    // Form state
    const [difficulty, setDifficulty] = useState("");
    const [timeRange, setTimeRange] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState<Record<IngredientCategory, string[]>>(
        Object.values(IngredientCategory).reduce((acc, category) => {
            acc[category as IngredientCategory] = [];
            return acc;
        }, {} as Record<IngredientCategory, string[]>)
    );

    // Custom ingredients state
    const [customIngredients, setCustomIngredients] = useState<Record<IngredientCategory, string>>(
        Object.values(IngredientCategory).reduce((acc, category) => {
            acc[category as IngredientCategory] = "";
            return acc;
        }, {} as Record<IngredientCategory, string>)
    );

    // Progress calculation
    const progress = (currentStep / 3) * 100;

    // Navigation functions remain unchanged
    const goToNextStep = () => {
        if (currentStep < 3) {
            setSlideDirection("left");
            setSliding(true);
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
                setSliding(false);
            }, 300);
        }
    };

    const goToPrevStep = () => {
        if (currentStep > 1) {
            setSlideDirection("right");
            setSliding(true);
            setTimeout(() => {
                setCurrentStep(currentStep - 1);
                setSliding(false);
            }, 300);
        }
    };

    // Other handler functions remain unchanged
    const handleIngredientChange = (category: IngredientCategory, ingredient: string, checked: boolean) => {
        // Keep existing logic
        if (checked) {
            setSelectedIngredients({
                ...selectedIngredients,
                [category]: [...selectedIngredients[category], ingredient]
            });
        } else {
            setSelectedIngredients({
                ...selectedIngredients,
                [category]: selectedIngredients[category].filter(item => item !== ingredient)
            });
        }
    };

    const handleCustomIngredientChange = (category: IngredientCategory, value: string) => {
        // Keep existing logic
        setCustomIngredients({
            ...customIngredients,
            [category]: value
        });
    };
    
    const handleAddCustomIngredient = (category: IngredientCategory) => {
        // Keep existing logic
        const ingredient = customIngredients[category].trim();
        
        if (ingredient && !selectedIngredients[category].includes(ingredient)) {
            setSelectedIngredients({
                ...selectedIngredients,
                [category]: [...selectedIngredients[category], ingredient]
            });
            
            setCustomIngredients({
                ...customIngredients,
                [category]: ""
            });
        }
    };

    const handleSubmit = () => {
        // Keep existing logic
        console.log({
            difficulty,
            timeRange,
            selectedIngredients
        });
        alert(t('wizard.form.submitSuccess'));
    };

    // Helper function to translate difficulty levels
    const getDifficultyLabel = (level: string) => {
        return t(`wizard.difficultyLevels.${level.toLowerCase().replace(/\s+/g, '_')}`);
    };

    // Helper function to translate time ranges
    const getTimeRangeLabel = (range: string) => {
        return t(`wizard.timeRanges.${range.replace(/\s+/g, '_').replace(/-/g, '_to_')}`);
    };

    // Helper function to translate ingredient categories
    const getCategoryLabel = (category: IngredientCategory) => {
        return t(`wizard.categories.${category}`);
    };

    // Helper function to translate ingredients
    // const getIngredientLabel = (ingredient: string) => {
    //     return t(`wizard.ingredients.${ingredient.toLowerCase().replace(/\s+/g, '_')}`);
    // };

    // Helper function to translate ingredients with fallback for custom ingredients
const getIngredientLabel = (ingredient: string) => {
    const translationKey = `wizard.ingredients.${ingredient.toLowerCase().replace(/\s+/g, '_')}`;
    
    // Use i18next's exists method if available
    if (i18n.exists && typeof i18n.exists === 'function') {
        if (!i18n.exists(translationKey)) {
            return ingredient; // Return original text for custom ingredients
        }
    } else {
        // Fallback check: if translation equals the key, it means no translation was found
        const translation = t(translationKey);
        if (translation === translationKey) {
            return ingredient;
        }
        return translation;
    }
    
    return t(translationKey);
};

    return (
        <Container className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} WizardForm mt-4 mb-5 ${i18n.language === 'he' ? 'rtl' : ''}`}>
            <Row className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} justify-content-center`}>
                <Col md={8}>
                    <Card className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                        <Card.Header className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                            <h3 className="text-center">{t('wizard.title')}</h3>
                            <ProgressBar now={progress} className="mt-3" variant="success" />
                            <div className="step-indicator d-flex justify-content-between mt-2">
                                <span className={currentStep >= 1 ? "active" : ""}>{t('wizard.steps.difficulty')}</span>
                                <span className={currentStep >= 2 ? "active" : ""}>{t('wizard.steps.time')}</span>
                                <span className={currentStep >= 3 ? "active" : ""}>{t('wizard.steps.ingredients')}</span>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                            <div className={`step-container ${sliding ? `slide-${slideDirection}` : ""}`}>
                                {currentStep === 1 && (
                                    <div className="step step-1">
                                        <h4 className="mb-4">{t('wizard.difficulty.title')}</h4>
                                        <Form>
                                            <Form.Group>
                                                {["Easy", "Normal", "Hard", "Extremely Hard"].map((level, idx) => (
                                                    <Form.Check
                                                        key={idx}
                                                        type="radio"
                                                        id={`difficulty-${idx}`}
                                                        name="difficulty"
                                                        label={getDifficultyLabel(level)}
                                                        value={level}
                                                        checked={difficulty === level}
                                                        onChange={(e) => setDifficulty(e.target.value)}
                                                        className="mb-3"
                                                    />
                                                ))}
                                            </Form.Group>
                                        </Form>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="step step-2">
                                        <h4 className="mb-4">{t('wizard.time.title')}</h4>
                                        <Form className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                                            <Form.Group>
                                                {["15-30 min", "30-60 min", "60-180 min", "180+ min"].map((range, idx) => (
                                                    <Form.Check
                                                        key={idx}
                                                        type="radio"
                                                        id={`time-${idx}`}
                                                        name="timeRange"
                                                        label={getTimeRangeLabel(range)}
                                                        value={range}
                                                        checked={timeRange === range}
                                                        onChange={(e) => setTimeRange(e.target.value)}
                                                        className="mb-3"
                                                    />
                                                ))}
                                            </Form.Group>
                                        </Form>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="step step-3">
                                        <h4 className="mb-4">{t('wizard.ingredients.title')}</h4>

                                        <div className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} ingredients-selection`}>
                                            {Object.values(IngredientCategory).map((category) => (
                                                <Card key={category} className="mb-3">
                                                    <Card.Header className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} ingredients-selection`}>
                                                        {getCategoryLabel(category as IngredientCategory)}
                                                    </Card.Header>
                                                    <Card.Body className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                placeholder={t('wizard.ingredients.addCustomPlaceholder')}
                                                                value={customIngredients[category as IngredientCategory]}
                                                                onChange={(e) => handleCustomIngredientChange(category as IngredientCategory, e.target.value)}
                                                                onKeyPress={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault();
                                                                        handleAddCustomIngredient(category as IngredientCategory);
                                                                    }
                                                                }}
                                                                className={isDarkMode ? 'bg-dark text-light' : ''}
                                                            />
                                                            <Button 
                                                                variant="outline-success"
                                                                onClick={() => handleAddCustomIngredient(category as IngredientCategory)}
                                                            >
                                                                {t('wizard.buttons.add')}
                                                            </Button>
                                                        </InputGroup>

                                                        <Row className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                                                            {ingredientsByCategory[category as IngredientCategory].map((ingredient, idx) => (
                                                                <Col md={4} key={idx} className="mb-2">
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        id={`${category}-${idx}`}
                                                                        label={getIngredientLabel(ingredient)}
                                                                        checked={selectedIngredients[category as IngredientCategory]?.includes(ingredient)}
                                                                        onChange={(e) => handleIngredientChange(
                                                                            category as IngredientCategory,
                                                                            ingredient,
                                                                            e.target.checked
                                                                        )}
                                                                    />
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            ))}
                                        </div>

                                        <div className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} selected-ingredients mt-4`}>
                                            <h5>{t('wizard.ingredients.selected')}</h5>
                                            <div className="d-flex flex-wrap">
                                                {Object.entries(selectedIngredients).flatMap(([category, ingredients]) =>
                                                    ingredients.map((ingredient, idx) => (
                                                        <Badge
                                                            bg="primary"
                                                            key={`${category}-${idx}`}
                                                            className="m-1 p-2"
                                                        >
                                                            {getIngredientLabel(ingredient)}
                                                        </Badge>
                                                    ))
                                                )}
                                                {Object.values(selectedIngredients).every(arr => arr.length === 0) && (
                                                    <p className="text-muted">{t('wizard.ingredients.noSelection')}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex justify-content-between">
                                <Button
                                    variant="secondary"
                                    onClick={goToPrevStep}
                                    disabled={currentStep === 1}
                                >
                                    {t('wizard.buttons.back')}
                                </Button>

                                {currentStep < 3 ? (
                                    <Button
                                        variant="primary"
                                        onClick={goToNextStep}
                                        disabled={
                                            (currentStep === 1 && !difficulty) ||
                                            (currentStep === 2 && !timeRange)
                                        }
                                    >
                                        {t('wizard.buttons.next')}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="success"
                                        onClick={handleSubmit}
                                    >
                                        {t('wizard.buttons.submit')}
                                    </Button>
                                )}
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}