import axios from 'axios';
import { JSX, useState } from "react";
import { Badge, Button, Card, Col, Container, Form, InputGroup, ProgressBar, Row, Spinner, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Add this import
import { useNavigate } from 'react-router-dom';
import { useRecipes } from "../../Context/RecipeContext/RecipyContext";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";
import "./WizardForm.css";


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
    [IngredientCategory.FATS]: ["Olive Oil", "Avocado", "Coconut Oil", "Sesame Oil", "Walnut", "Almonds", "Cashew", "Pistachio", "Peanut", "Pecans", "Hazelnut", "Macadamia nut", "Brazil nut", "white sesame", "Black sesame", "Black cumin seed", "Linen seed", "Chia seeds", "Pine nuts", "Sunflower seeds", "Pumpkin seeds", "Tahini"],
    [IngredientCategory.VEGETABLES]: ["Tomatoes", "Cucumber", "White onion", "Purple onion", "Garlic", "Bell Peppers", "Carrots", "White cabbage", "Purple cabbage", "Radish", "Spinach", "Broccoli", "Zucchini", "Cauliflower", "Potato", "Sweet potato", "Beet root", "Chard", "Kohlrabi", "Eggplant"],
    [IngredientCategory.FRUITS]: ["Apples", "Bananas", "Berries", "Oranges", "Lemons", "Mango", "Pineapple", "Grapes", "Watermelon", "Melon", "Plum", "Peach", "Apricot", "Kiwi", "Papaya", "Pomegranate", "Fig", "Coconut", "Guava", "Passion fruit", "Lychee", "Dragon fruit", "Persimmon", "Tangerine", "Nectarine"],
    [IngredientCategory.Dry_FRUITS]: ["Cranberries", "Dates", "Apricot", "Plum", "Raisins", "Dried Plums", "Dried Mango", "Dried Banana", "Dried Pineapple", "Dried Coconut"],
    [IngredientCategory.DAIRY_PRODUCTS]: ["Milk", "White Cheese", "Yogurt", "Cream", "Butter", "Sour Cream", "Cottage Cheese", "Ricotta", "Cream Cheese", "Mozzarella", "Feta", "Parmesan", "Goat Cheese", "Blue Cheese", "Brie", "Camembert", "Cheddar", "Coconut Milk", "Almond Milk", "Soy Milk", "Oat Milk", "Rice Milk"],
    [IngredientCategory.SPICES_AND_HERBS]: ["Salt", "Black Pepper", "Coriander", "Turmeric", "Ginger", "Thyme", "Rosemary", "Parsley", "Dill", "Mint", "Bay Leaf", "Basil", "Oregano", "Cumin", "Paprika", "Cinnamon"],
    [IngredientCategory.SWEETENERS]: ["Sugar", "Honey", "Maple Syrup", "Stevia", "Brown Sugar", "Vanilla", "Agave Syrup", "Coconut Sugar"],
    [IngredientCategory.LIQUIDS_AND_ADDITIONAL_INGREDIENTS]: ["Water", "Vegetable stock", "Beef stock", "Fish stock", "Red wine", "White wine", "Vinegar", "Soy Sauce", "Tomato Sauce", "Mustard", "Ketchup", "Mayonnaise", "Peanut Butter", "Almond Butter", "Rice Vinegar", "Balsamic Vinegar"],
};

export function WizardForm(): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const [generatedRecipe, setGeneratedRecipe] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Modal states
    const [showTooManyRequestsModal, setShowTooManyRequestsModal] = useState(false);
    const [showServerErrorModal, setShowServerErrorModal] = useState(false);
    const [showIngredientWarningModal, setShowIngredientWarningModal] = useState(false);

    const { addRecipe } = useRecipes();
    const navigate = useNavigate();

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

    // Helper function to count total selected ingredients
    const getTotalIngredientsCount = (): number => {
        return Object.values(selectedIngredients).reduce((total, ingredients) => total + ingredients.length, 0);
    };

    // Function to remove an ingredient
    const removeIngredient = (category: IngredientCategory, ingredientToRemove: string) => {
        setSelectedIngredients({
            ...selectedIngredients,
            [category]: selectedIngredients[category].filter(ingredient => ingredient !== ingredientToRemove)
        });
    };

    const handleSubmit = async () => {
        try {
            // Validation stays the same
            if (!difficulty) {
                alert(t('wizard.validation.selectDifficulty'));
                return;
            }
            if (!timeRange) {
                alert(t('wizard.validation.selectTime'));
                return;
            }

            // Check if any ingredients are selected
            const hasIngredients = Object.values(selectedIngredients).some(
                category => category.length > 0
            );

            if (!hasIngredients) {
                alert(t('wizard.validation.selectIngredients'));
                return;
            }

            // Check for too many ingredients and show warning
            const totalIngredients = getTotalIngredientsCount();
            if (totalIngredients > 15) {
                setShowIngredientWarningModal(true);
                return;
            }

            await executeRecipeGeneration();
        } catch (err: any) {
            console.error('Error in handleSubmit:', err);
        }
    };

    const executeRecipeGeneration = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Create translated ingredient selections
            const translatedIngredients: Record<string, string[]> = {};

            Object.entries(selectedIngredients).forEach(([category, ingredients]) => {
                // Translate the category name
                const translatedCategory = getCategoryLabel(category as IngredientCategory);

                // Translate each ingredient in the category
                translatedIngredients[translatedCategory] = ingredients.map(ingredient =>
                    getIngredientLabel(ingredient)
                );
            });

            const requestData = {
                difficulty: getDifficultyLabel(difficulty),
                timeRange: getTimeRangeLabel(timeRange),
                ingredients: Object.values(selectedIngredients)
                    .flat()
                    .map(getIngredientLabel), // flatten and translate
                language: i18n.language
            };


            console.log('Sending recipe request with language:', i18n.language);
            console.log('Request data:', requestData);

            // Send request with proper headers
            const response = await axios.post('http://localhost:8080/api/recipes/generate',
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Language': i18n.language
                    }
                }
            );

            // Log the full response for debugging
            console.log('Backend response:', response.data);

            // Handle different response formats
            if (!response.data) {
                throw new Error('No data received from server');
            }

            let recipeText = '';
            let imageUrl = '';

            // NEW LOGIC: Handle the nested recipe object structure
            if (response.data.recipe && typeof response.data.recipe === 'object') {
                // Handle the nested structure like { recipe: { recipe: "text", image: "url" } }
                recipeText = response.data.recipe.recipe || '';
                imageUrl = response.data.recipe.image || '';

                // Debug logging for image URL
                console.log('Extracted image URL from response:', imageUrl);
                console.log('Image URL timestamp check:', imageUrl.includes('variant_'));
            } else if (typeof response.data === 'object') {
                // Try the original approach for backward compatibility
                if (response.data.recipeText) {
                    recipeText = response.data.recipeText;
                    imageUrl = response.data.imageUrl || '';
                } else if (typeof response.data === 'string') {
                    recipeText = response.data;
                } else {
                    // If we can't find the expected structure, show the error
                    console.error('Unexpected response structure:', response.data);
                    throw new Error('Invalid response format from server');
                }
            } else if (typeof response.data === 'string') {
                // If the response is just a string
                recipeText = response.data;
            } else {
                throw new Error('Unknown response format');
            }

            // Set the generated recipe in state
            setGeneratedRecipe(recipeText);

            // Add the recipe to context
            addRecipe({
                content: recipeText,
                difficulty: difficulty,
                timeRange: timeRange,
                imageUrl: imageUrl // Include the image URL
            });

            // Navigate to the recipe page
            navigate('/recipe');
        } catch (err: any) {
            console.error('Error generating recipe:', err);

            // Enhanced error handling with modals
            if (err.response) {
                // The server responded with an error status code
                console.error('Server error response:', err.response.data);
                console.error('Status code:', err.response.status);

                if (err.response.status === 429) {
                    // Too Many Requests
                    setShowTooManyRequestsModal(true);
                } else {
                    // Other server errors
                    setShowServerErrorModal(true);
                }
            } else if (err.request) {
                // The request was made but no response received
                console.error('No response received from server');
                setShowServerErrorModal(true);
            } else {
                // Error in setting up the request
                setShowServerErrorModal(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resetRecipe = () => {
        // setShowRecipe(false);
        setGeneratedRecipe(null);
        setError(null);
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
        <>
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
                                {/* Display loading spinner when isLoading is true */}
                                {isLoading && (
                                    <div className="text-center my-5">
                                        <Spinner animation="border" role="status" variant="primary" />
                                        <h5 className="mt-3">{t('wizard.steps.generatingMessage')}</h5>
                                    </div>
                                )}

                                {/* Hide the form content when loading */}
                                {!isLoading && (
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
                                                <div className="d-flex align-items-center justify-content-between mb-4">
                                                    <h4 className="mb-0">{t('wizard.ingredients.title')}</h4>
                                                    <Badge
                                                        bg={getTotalIngredientsCount() > 15 ? "danger" : "primary"}
                                                        className="fs-6 p-2"
                                                    >
                                                        {getTotalIngredientsCount()} {t('wizard.ingredients.selected')}
                                                    </Badge>
                                                </div>

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
                                                                    bg={getTotalIngredientsCount() > 15 ? "danger" : "primary"}
                                                                    key={`${category}-${idx}`}
                                                                    className="m-1 p-2 clickable-badge"
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => removeIngredient(category as IngredientCategory, ingredient)}
                                                                    title="Click to remove"
                                                                >
                                                                    {getIngredientLabel(ingredient)} ×
                                                                </Badge>
                                                            ))
                                                        )}
                                                        {Object.values(selectedIngredients).every(arr => arr.length === 0) && (
                                                            <p className="text-muted">{t('wizard.ingredients.noSelection')}</p>
                                                        )}
                                                    </div>
                                                    {getTotalIngredientsCount() > 15 && (
                                                        <div className="mt-2">
                                                            <small className="text-warning">
                                                                ⚠️ You have {getTotalIngredientsCount()} ingredients. Consider reducing for better results.
                                                            </small>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Card.Body>
                            <Card.Footer>
                                <div className="d-flex justify-content-between">
                                    <Button
                                        variant="secondary"
                                        onClick={goToPrevStep}
                                        disabled={currentStep === 1 || isLoading}
                                    >
                                        {t('wizard.steps.buttons.back')}
                                    </Button>

                                    {currentStep < 3 ? (
                                        <Button
                                            variant="primary"
                                            onClick={goToNextStep}
                                            disabled={
                                                isLoading ||
                                                (currentStep === 1 && !difficulty) ||
                                                (currentStep === 2 && !timeRange)
                                            }
                                        >
                                            {t('wizard.steps.buttons.next')}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant={getTotalIngredientsCount() > 15 ? "danger" : "success"}
                                            onClick={handleSubmit}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="me-2"
                                                    />
                                                    {t('wizard.steps.buttons.generating')}
                                                </>
                                            ) : (
                                                <>
                                                    {t('wizard.steps.buttons.submit')}
                                                    <Badge
                                                        bg={getTotalIngredientsCount() > 15 ? "warning" : "light"}
                                                        text={getTotalIngredientsCount() > 15 ? "light" : "dark"}
                                                        className="ms-2"
                                                    >
                                                        {getTotalIngredientsCount()}
                                                    </Badge>
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>

                {/* Too Many Requests Modal */}
                <Modal show={showTooManyRequestsModal} onHide={() => setShowTooManyRequestsModal(false)} centered>
                    <Modal.Header closeButton className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}>
                        <Modal.Title>{t('wizard.modals.tooManyRequests.title')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
                        <p>{t('wizard.modals.tooManyRequests.message')}</p>
                        <p>{t('wizard.modals.tooManyRequests.description')}</p>
                        <p><strong>{t('wizard.modals.tooManyRequests.note')}</strong></p>
                    </Modal.Body>
                    <Modal.Footer className={isDarkMode ? 'bg-dark border-secondary' : ''}>
                        <Button variant="primary" onClick={() => setShowTooManyRequestsModal(false)}>
                            {t('wizard.modals.tooManyRequests.button')}
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Server Error Modal */}
                <Modal show={showServerErrorModal} onHide={() => setShowServerErrorModal(false)} centered>
                    <Modal.Header closeButton className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}>
                        <Modal.Title>{t('wizard.modals.serverError.title')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
                        <p>{t('wizard.modals.serverError.message')}</p>
                        <p>{t('wizard.modals.serverError.description')}</p>
                        <ul>
                            <li>{t('wizard.modals.serverError.reasons.server')}</li>
                            <li>{t('wizard.modals.serverError.reasons.network')}</li>
                            <li>{t('wizard.modals.serverError.reasons.technical')}</li>
                        </ul>
                        <p><strong>{t('wizard.modals.serverError.note')}</strong></p>
                    </Modal.Body>
                    <Modal.Footer className={isDarkMode ? 'bg-dark border-secondary' : ''}>
                        <Button variant="primary" onClick={() => setShowServerErrorModal(false)}>
                            {t('wizard.modals.serverError.button')}
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Ingredient Warning Modal */}
                <Modal show={showIngredientWarningModal} onHide={() => setShowIngredientWarningModal(false)} centered>
                    <Modal.Header closeButton className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}>
                        <Modal.Title>{t('wizard.modals.ingredientWarning.title')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
                        <p>{t('wizard.modals.ingredientWarning.message', { count: getTotalIngredientsCount() })}</p>
                        <p>{t('wizard.modals.ingredientWarning.description')}</p>
                        <ul>
                            <li>{t('wizard.modals.ingredientWarning.reasons.time')}</li>
                            <li>{t('wizard.modals.ingredientWarning.reasons.complexity')}</li>
                            <li>{t('wizard.modals.ingredientWarning.reasons.balance')}</li>
                        </ul>
                        <p><strong>{t('wizard.modals.ingredientWarning.question')}</strong></p>
                    </Modal.Body>
                    <Modal.Footer className={isDarkMode ? 'bg-dark border-secondary' : ''}>
                        <Button variant="secondary" onClick={() => setShowIngredientWarningModal(false)}>
                            {t('wizard.modals.ingredientWarning.buttonReduce')}
                        </Button>
                        <Button variant="warning" onClick={() => {
                            setShowIngredientWarningModal(false);
                            executeRecipeGeneration();
                        }}>
                            {t('wizard.modals.ingredientWarning.buttonContinue', { count: getTotalIngredientsCount() })}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}