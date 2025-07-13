import { Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useTheme } from '../../Context/ThemeContext/ThemeContext';
import { useTranslation } from 'react-i18next';
import './RecipeDisplay.css';
import { JSX } from 'react';

interface RecipeDisplayProps {
    recipe: string | null;
    isLoading: boolean;
    error: string | null;
    onClose: () => void;
    imageUrl?: string; // Changed from image to imageUrl
}

export function RecipeDisplay({
    recipe,
    isLoading,
    error,
    onClose,
    imageUrl // Changed parameter name to match
}: RecipeDisplayProps): JSX.Element {
    const { isDarkMode } = useTheme();
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <Card className={`recipe-display ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} mb-4`}>
                <Card.Body className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">{t('recipe.loading')}</span>
                    </Spinner>
                    <p className="mt-3">{t('recipe.generatingMessage')}</p>
                </Card.Body>
            </Card>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="mb-4">
                <Alert.Heading>{t('recipe.errorTitle')}</Alert.Heading>
                <p>{error}</p>
                <div className="d-flex justify-content-end">
                    <Button onClick={onClose} variant="outline-danger">
                        {t('recipe.tryAgain')}
                    </Button>
                </div>
            </Alert>
        );
    }

    if (!recipe) {
        return <></>;
    }

    // Ensure recipe is a string before splitting
    const recipeText = typeof recipe === 'string' ? recipe : JSON.stringify(recipe);

    // Format the recipe text
    const formattedRecipe = recipeText.split('\n').map((line, i) => {
        // Make titles bold
        if (i === 0 || line.trim().endsWith(':')) {
            return <h3 key={i} className="recipe-title my-3">{line}</h3>;
        }
        // Handle empty lines
        if (line.trim() === '') {
            return <br key={i} />;
        }
        // Handle numbered lists (instructions)
        if (/^\d+\./.test(line)) {
            return <p key={i} className="recipe-instruction">{line}</p>;
        }
        // Regular text
        return <p key={i}>{line}</p>;
    });

    return (
        <Card className={`recipe-display ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} mb-4`}>
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h2 className="m-0">{t('recipe.yourRecipe')}</h2>
                <Button variant={isDarkMode ? "outline-light" : "outline-dark"} onClick={onClose}>
                    {t('recipe.close')}
                </Button>
            </Card.Header>

            {/* Display recipe image if available */}
            {imageUrl && (
                <div className="recipe-image-container">
                    <Card.Img
                        variant="top"
                        src={imageUrl}
                        alt={t('recipe.recipeImage')}
                        className="recipe-image"
                    />
                </div>
            )}

            <Card.Body>
                <div className="recipe-content">
                    {formattedRecipe}
                </div>
            </Card.Body>
        </Card>
    );
}