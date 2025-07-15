import { Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useTheme } from '../../Context/ThemeContext/ThemeContext';
import { useTranslation } from 'react-i18next';
import './RecipeDisplay.css';
import { JSX, useState } from 'react';

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
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

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

    // Clean up asterisks and other markdown formatting
    const cleanText = (text: string): string => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove **bold** formatting
            .replace(/\*(.*?)\*/g, '$1')     // Remove *italic* formatting
            .replace(/^\*\s*/gm, '• ')       // Convert * bullets to proper bullets
            .replace(/#/g, '')               // Remove all hashtags #
            .replace(/[^\w\s!().,;:?•\-]/g, '') // Remove special chars except ! ( ) and common punctuation including :
            .trim();
    };

    // Format the recipe text
    const formattedRecipe = recipeText.split('\n').map((line, i) => {
        const cleanedLine = cleanText(line);

        // Make titles bold
        if (i === 0 || cleanedLine.trim().endsWith(':')) {
            return <h3 key={i} className="recipe-title my-3">{cleanedLine}</h3>;
        }
        // Handle empty lines
        if (cleanedLine.trim() === '') {
            return <br key={i} />;
        }
        // Handle numbered lists (instructions)
        if (/^\d+\./.test(cleanedLine)) {
            return <p key={i} className="recipe-instruction">{cleanedLine}</p>;
        }
        // Handle bullet points
        if (cleanedLine.startsWith('• ')) {
            return <p key={i} className="recipe-bullet">{cleanedLine}</p>;
        }
        // Regular text
        return <p key={i}>{cleanedLine}</p>;
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
                    {/* Skeleton loader while image is loading */}
                    {imageLoading && (
                        <div className="image-skeleton">
                            <div className="skeleton-shimmer"></div>
                            <div className="skeleton-text">
                                <Spinner animation="border" size="sm" />
                                <span className="ms-2">Loading delicious image...</span>
                            </div>
                        </div>
                    )}

                    {/* Error state */}
                    {imageError && (
                        <div className="image-error">
                            <span>🍽️ Image couldn't load, but the recipe is still delicious!</span>
                        </div>
                    )}

                    {/* Actual image */}
                    <Card.Img
                        variant="top"
                        src={imageUrl}
                        alt={t('recipe.recipeImage')}
                        className={`recipe-image ${imageLoading ? 'image-hidden' : 'image-visible'}`}
                        style={{
                            height: '350px',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                        onLoad={() => setImageLoading(false)}
                        onError={() => {
                            setImageLoading(false);
                            setImageError(true);
                        }}
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