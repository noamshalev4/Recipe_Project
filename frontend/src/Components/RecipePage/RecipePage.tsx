import React, { useEffect } from 'react';
import { useRecipes } from '../../Context/RecipeContext/RecipyContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { RecipeDisplay } from '../../Components/RecipeDisplay/RecipeDisplay';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RecipePage: React.FC = () => {
  const { currentRecipe, clearCurrentRecipe } = useRecipes();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // If there's no current recipe, redirect to history page
    if (!currentRecipe) {
      navigate('/recipes');
    }
  }, [currentRecipe, navigate]);

  const handleClose = () => {
    clearCurrentRecipe();
    navigate('/recipes');
  };

  if (!currentRecipe) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="d-flex justify-content-between mb-3">
            <Button variant="outline-secondary" onClick={() => navigate('/recipes')}>
              {t('recipe.viewAll')}
            </Button>
            <Button variant="primary" onClick={() => navigate('/wizard-form')}>
              {t('recipe.createNew')}
            </Button>
          </div>

          <RecipeDisplay
            recipe={currentRecipe.content}
            isLoading={false}
            error={null}
            onClose={handleClose}
            imageUrl={currentRecipe.imageUrl} // Pass imageUrl instead of image
          />

          <div className="mt-3 text-muted">
            <small>
              {t('recipe.createdOn')}: {new Date(currentRecipe.createdAt).toLocaleString()}
              <br />
              {t('recipe.difficulty')}: {currentRecipe.difficulty} | {t('recipe.time')}: {currentRecipe.timeRange}
            </small>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipePage;