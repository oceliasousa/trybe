import { RecommendationCardProps } from '../types';

function RecommendationCard({ recipe, index }: RecommendationCardProps) {
  return (
    <div data-testid={ `${index}-recommendation-card` } className="col-7">
      <span data-testid={ `${index}-recommendation-title` }>
        { 'strMeal' in recipe && recipe.strMeal }
        { 'strDrink' in recipe && recipe.strDrink }
      </span>
    </div>
  );
}

export default RecommendationCard;
