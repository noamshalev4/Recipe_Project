import React from 'react';
import { useRecipes, Recipe } from '../../Context/RecipeContext/RecipyContext'; // Import Recipe type
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext/ThemeContext';
import './RecipeHistory.css';

const RecipeHistoryPage: React.FC = () => {
  const { recipes, setCurrentRecipe } = useRecipes();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const handleViewRecipe = (recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      setCurrentRecipe(recipe);
      navigate('/recipe');
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-between align-items-center mb-4">
        <Col>
          <h2>{t('recipeHistory.title')}</h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => navigate('/wizard-form')}>
            {t('recipeHistory.createNew')}
          </Button>
        </Col>
      </Row>

      {recipes.length === 0 ? (
        <Card className={`p-5 text-center ${isDarkMode ? 'bg-dark text-light' : ''}`}>
          <h4>{t('recipeHistory.noRecipes')}</h4>
          <p>{t('recipeHistory.getStarted')}</p>
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={() => navigate('/wizard-form')}>
              {t('recipeHistory.createFirstRecipe')}
            </Button>
          </div>
        </Card>
      ) : (
        <Row>
          {recipes.map((recipe: Recipe) => (
            <Col md={6} lg={4} className="mb-4" key={recipe.id}>
              <Card className={`recipe-card ${isDarkMode ? 'bg-dark text-light' : ''}`}>
                {/* Display recipe image if available, otherwise show placeholder */}
                {recipe.imageUrl ? (
                  <Card.Img
                    variant="top"
                    src={recipe.imageUrl}
                    alt={`Recipe from ${new Date(recipe.createdAt).toLocaleDateString()}`}
                    className="recipe-card-image"
                  />
                ) : (
                  <div className={`recipe-card-placeholder ${isDarkMode ? 'bg-secondary' : 'bg-light'}`}>
                    <span>{t('recipeHistory.noImage')}</span>
                  </div>
                )}

                <Card.Body>
                  <Card.Title>Recipe {new Date(recipe.createdAt).toLocaleDateString()}</Card.Title>
                  <Card.Subtitle className={`mb-2 ${isDarkMode ? 'text-light-muted' : 'text-muted'}`}>
                    {recipe.difficulty} | {recipe.timeRange}
                  </Card.Subtitle>
                  <Card.Text>
                    {recipe.content.substring(0, 120)}...
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleViewRecipe(recipe.id)}>
                    {t('recipeHistory.viewRecipe')}
                  </Button>
                </Card.Body>
                <Card.Footer className={isDarkMode ? 'text-light-muted' : 'text-muted'}>
                  <small>{new Date(recipe.createdAt).toLocaleString()}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default RecipeHistoryPage;