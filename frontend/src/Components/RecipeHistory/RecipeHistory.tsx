import React, { useState } from 'react';
import { useRecipes, Recipe } from '../../Context/RecipeContext/RecipyContext'; // Import Recipe type
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext/ThemeContext';
import './RecipeHistory.css';

const RecipeHistoryPage: React.FC = () => {
  const { recipes, setCurrentRecipe, deleteRecipe } = useRecipes();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);

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

  const handleViewRecipe = (recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      setCurrentRecipe(recipe);
      navigate('/recipe');
    }
  };

  const handleDeleteClick = (recipeId: string) => {
    setRecipeToDelete(recipeId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (recipeToDelete) {
      deleteRecipe(recipeToDelete);
      setRecipeToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setRecipeToDelete(null);
    setShowDeleteModal(false);
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
                    <span>{t('Recipe image is coming soon...')}</span>
                  </div>
                )}

                <Card.Body>
                  <Card.Title>Recipe {new Date(recipe.createdAt).toLocaleDateString()}</Card.Title>
                  <Card.Subtitle className={`mb-2 ${isDarkMode ? 'text-light-muted' : 'text-muted'}`}>
                    {recipe.difficulty} | {recipe.timeRange}
                  </Card.Subtitle>
                  <Card.Text>
                    {cleanText(recipe.content).substring(0, 120)}...
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button variant="primary" onClick={() => handleViewRecipe(recipe.id)}>
                      {t('recipeHistory.viewRecipe')}
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteClick(recipe.id)}
                      title="Delete Recipe"
                    >
                      🗑️
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer className={isDarkMode ? 'text-light-muted' : 'text-muted'}>
                  <small>{new Date(recipe.createdAt).toLocaleString()}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
          Are you sure you want to delete this recipe? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer className={isDarkMode ? 'bg-dark border-secondary' : ''}>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RecipeHistoryPage;