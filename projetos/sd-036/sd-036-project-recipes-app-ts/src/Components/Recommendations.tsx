import { RecommendationsProps } from '../types';
import RecommendationCard from './RecommendationCard';

function Recommendations({ recipes }: RecommendationsProps) {
  return (
    <div className="d-flex overflow-scroll">
      {recipes.map((recipe, index) => (
        <RecommendationCard
          key={ index }
          recipe={ recipe }
          index={ index }
        />
      ))}
    </div>
  );
}

export default Recommendations;
