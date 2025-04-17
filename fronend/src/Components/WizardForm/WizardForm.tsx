import { JSX, useState } from "react";
import { Card, Button, ProgressBar, Form, Container, Row, Col, Badge, InputGroup } from "react-bootstrap";
import "./WizardForm.css";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";

// Define ingredient categories
enum IngredientCategory {
    PROTEIN = "Protein",
    CARBOHYDRATES = "Carbohydrates",
    FATS = "Fats",
    VEGETABLES = "Vegetables",
    FRUITS = "Fruits",
    DAIRY_PRODUCTS = "Dairy Products",
    SPICES_AND_HERBS = "Spices and Herbs",
    SWEETENERS = "Sweeteners",
    LIQUIDS_AND_ADDITIONAL_INGREDIENTS = "Liquids & Additional Ingredients"
}

// Sample ingredients data structure
const ingredientsByCategory: Record<IngredientCategory, string[]> = {
    [IngredientCategory.PROTEIN]: ["Chicken", "Beef", "Tofu", "Fish", "Eggs", "Pork", "Lamb", "Shrimp"],
    [IngredientCategory.CARBOHYDRATES]: ["Rice", "Pasta", "Bread", "Potatoes", "Quinoa", "Oats", "Barley"],
    [IngredientCategory.FATS]: ["Olive Oil", "Butter", "Avocado", "Coconut Oil", "Sesame Oil", "Nuts"],
    [IngredientCategory.VEGETABLES]: ["Tomatoes", "Onions", "Bell Peppers", "Carrots", "Spinach", "Broccoli", "Zucchini"],
    [IngredientCategory.FRUITS]: ["Apples", "Bananas", "Berries", "Citrus", "Mango", "Pineapple"],
    [IngredientCategory.DAIRY_PRODUCTS]: ["Milk", "Cheese", "Yogurt", "Cream", "Butter", "Sour Cream"],
    [IngredientCategory.SPICES_AND_HERBS]: ["Salt", "Pepper", "Basil", "Oregano", "Cumin", "Paprika", "Cinnamon"],
    [IngredientCategory.SWEETENERS]: ["Sugar", "Honey", "Maple Syrup", "Stevia", "Brown Sugar"],
    [IngredientCategory.LIQUIDS_AND_ADDITIONAL_INGREDIENTS]: ["Water", "Stock", "Wine", "Vinegar", "Soy Sauce", "Tomato Sauce"]
};

export function WizardForm(): JSX.Element {
    const { isDarkMode } = useTheme();  // <-- Consume the theme context

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

    // Add new state for custom ingredients input
    const [customIngredients, setCustomIngredients] = useState<Record<IngredientCategory, string>>(
        Object.values(IngredientCategory).reduce((acc, category) => {
            acc[category as IngredientCategory] = "";
            return acc;
        }, {} as Record<IngredientCategory, string>)
    );

    // Progress calculation
    const progress = (currentStep / 3) * 100;

    // Navigation functions
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

    // Handle ingredient selection
    const handleIngredientChange = (category: IngredientCategory, ingredient: string, checked: boolean) => {
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

    // Handle custom ingredient input change
    const handleCustomIngredientChange = (category: IngredientCategory, value: string) => {
        setCustomIngredients({
            ...customIngredients,
            [category]: value
        });
    };
    
    // Handle adding custom ingredient
    const handleAddCustomIngredient = (category: IngredientCategory) => {
        const ingredient = customIngredients[category].trim();
        
        if (ingredient && !selectedIngredients[category].includes(ingredient)) {
            // Add the custom ingredient to selected ingredients
            setSelectedIngredients({
                ...selectedIngredients,
                [category]: [...selectedIngredients[category], ingredient]
            });
            
            // Clear the input field
            setCustomIngredients({
                ...customIngredients,
                [category]: ""
            });
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        // Here you can process the collected data
        console.log({
            difficulty,
            timeRange,
            selectedIngredients
        });
        alert("Form submitted successfully!");
    };
    return (
        <Container className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} WizardForm mt-4 mb-5`}>
            <Row className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} justify-content-center`}>
                <Col md={8}>
                    <Card className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                        <Card.Header className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                            <h3 className="text-center">Recipe Preferences</h3>
                            <ProgressBar now={progress} className="mt-3" variant="success" />
                            <div className="step-indicator d-flex justify-content-between mt-2">
                                <span className={currentStep >= 1 ? "active" : ""}>Difficulty</span>
                                <span className={currentStep >= 2 ? "active" : ""}>Time</span>
                                <span className={currentStep >= 3 ? "active" : ""}>Ingredients</span>
                            </div>
                        </Card.Header>
                        <Card.Body className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                            <div className={`step-container ${sliding ? `slide-${slideDirection}` : ""}`}>
                                {currentStep === 1 && (
                                    <div className="step step-1">
                                        <h4 className="mb-4">Select Recipe Difficulty Level</h4>
                                        <Form>
                                            <Form.Group>
                                                {["Easy", "Normal", "Hard", "Extremely Hard"].map((level, idx) => (
                                                    <Form.Check
                                                        key={idx}
                                                        type="radio"
                                                        id={`difficulty-${idx}`}
                                                        name="difficulty"
                                                        label={level}
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
                                        <h4 className="mb-4">How Much Time Do You Want to Spend?</h4>
                                        <Form className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                                            <Form.Group>
                                                {["15-30 min", "30-60 min", "60-180 min", "180+ min"].map((range, idx) => (
                                                    <Form.Check
                                                        key={idx}
                                                        type="radio"
                                                        id={`time-${idx}`}
                                                        name="timeRange"
                                                        label={range}
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
                                        <h4 className="mb-4">Select Your Ingredients</h4>

                                        <div className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} ingredients-selection`}>
                                            {Object.values(IngredientCategory).map((category) => (
                                                <Card key={category} className="mb-3">
                                                    <Card.Header className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} ingredients-selection`}>{category}</Card.Header>
                                                    <Card.Body className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                                                        {/* Add custom ingredient input */}
                                                        <InputGroup className="mb-3">
                                                            <Form.Control
                                                                placeholder="Add your own ingredient..."
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
                                                                Add
                                                            </Button>
                                                        </InputGroup>

                                                        <Row className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                                                            {ingredientsByCategory[category as IngredientCategory].map((ingredient, idx) => (
                                                                <Col md={4} key={idx} className="mb-2">
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        id={`${category}-${idx}`}
                                                                        label={ingredient}
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
                                            <h5>Selected Ingredients:</h5>
                                            <div className="d-flex flex-wrap">
                                                {Object.entries(selectedIngredients).flatMap(([category, ingredients]) =>
                                                    ingredients.map((ingredient, idx) => (
                                                        <Badge
                                                            bg="primary"
                                                            key={`${category}-${idx}`}
                                                            className="m-1 p-2"
                                                        >
                                                            {ingredient}
                                                        </Badge>
                                                    ))
                                                )}
                                                {Object.values(selectedIngredients).every(arr => arr.length === 0) && (
                                                    <p className="text-muted">No ingredients selected yet</p>
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
                                    Back
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
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        variant="success"
                                        onClick={handleSubmit}
                                    >
                                        Submit
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