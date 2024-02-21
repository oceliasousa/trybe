import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { ProductType, ProductProps, ReviewType } from '../types';

function Product({ handleAddInCart, cartCount }: ProductProps) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const { productId } = useParams();
  const ratings = [...Array(5).keys()].map((index) => index + 1);

  const [error, setError] = useState<string>('');
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [form, setForm] = useState<ReviewType>({
    email: '',
    rating: 0,
    review: '',
  });

  useEffect(() => {
    if (productId) {
      getProductById(productId).then((response) => setProduct(response));

      const storedReviews = localStorage.getItem(productId);
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    }
  }, [productId]);

  const handleInputChange = (
    { target:
      { name, value },
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const validValue = name === 'rating' ? Number(value) : value;
    setForm({ ...form, [name]: validValue });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!product) return;

    if ((!form.email.length
      || !form.email.includes('.') || !form.email.includes('@')) || !form.rating) {
      setError('Campos inválidos');
      return;
    }

    const newReview: ReviewType = {
      email: form.email,
      rating: form.rating,
      review: form.review,
    };

    const updatedReviews = [...reviews, newReview];
    setReviews((previousReviews: ReviewType[]) => [...previousReviews, newReview]);

    localStorage.setItem(product.id, JSON.stringify(updatedReviews));

    setReviews(updatedReviews);
    setForm({
      email: '',
      rating: 0,
      review: '',
    });
    setError('');
  };

  if (!product) return;

  return (
    <section>
      <img
        data-testid="product-detail-image"
        src={ product.thumbnail }
        alt={ product.title }
      />
      <h1 data-testid="product-detail-name">{product.title}</h1>
      <p data-testid="product-detail-price">{product.price}</p>
      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => handleAddInCart(product) }
      >
        Adicionar ao carrinho
      </button>
      <Link to="/cart" data-testid="shopping-cart-button">
        Carrinho(
        <span data-testid="shopping-cart-size">{cartCount}</span>
        )
      </Link>

      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          <input
            data-testid="product-detail-email"
            type="text"
            name="email"
            value={ form.email }
            id="email"
            onChange={ handleInputChange }
          />
        </label>

        <label htmlFor="review">
          <textarea
            data-testid="product-detail-evaluation"
            name="review"
            value={ form.review }
            id="review"
            onChange={ handleInputChange }
          />
        </label>

        {
          ratings.map((value) => (
            <label htmlFor="" key={ value }>
              {value}
              <input
                data-testid={ `${value}-rating` }
                type="radio"
                name="rating"
                value={ value }
                onChange={ handleInputChange }
                checked={ form.rating === value }

              />
            </label>
          ))
        }

        {error && <p data-testid="error-msg">{ error }</p>}

        <button type="submit" data-testid="submit-review-btn">Avaliar</button>
      </form>

      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={ index }>
            <p data-testid="review-card-email">{review.email}</p>
            <p data-testid="review-card-rating">{review.rating}</p>
            <p data-testid="review-card-evaluation">{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Product;
