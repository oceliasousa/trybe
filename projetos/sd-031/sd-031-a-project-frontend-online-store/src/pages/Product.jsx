import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';

const MAX_RATING = 5;

export default class Product extends Component {
  state = {
    product: {},
    email: '',
    rating: 0,
    evaluation: '',
    reviews: [],
    errorMsg: '',
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const product = await getProductById(params.id);
    this.setState({ product });

    // Retrieve reviews from local storage
    const storedReviews = localStorage.getItem(params.id);
    if (storedReviews) {
      this.setState({ reviews: JSON.parse(storedReviews) });
    }
  }

  handleInputChange = ({ target: { name, value } }) => {
    const validValue = name === 'rating' ? Number(value) : value;
    this.setState({ [name]: validValue });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, rating, evaluation, reviews, product } = this.state;

    if ((!email.includes('.') && !email.includes('@')) || !rating) {
      this.setState({ errorMsg: 'Campos inválidos' });
      return;
    }

    const newReview = {
      email,
      rating: Number(rating),
      evaluation,
    };

    const updatedReviews = [...reviews, newReview];

    // Save reviews in local storage
    localStorage.setItem(product.id, JSON.stringify(updatedReviews));

    this.setState({
      reviews: updatedReviews,
      email: '',
      rating: 0,
      evaluation: '',
      errorMsg: '',
    });
  };

  renderReviews = () => {
    const { reviews } = this.state;

    return reviews.map((review, index) => (
      <div key={ index }>
        <p data-testid="review-card-email">{review.email}</p>
        <p data-testid="review-card-rating">{review.rating}</p>
        <p data-testid="review-card-evaluation">{review.evaluation}</p>
      </div>
    ));
  };

  render() {
    const { handleAddInCart } = this.props;
    const { product, email, rating, evaluation, errorMsg } = this.state;
    const { title, thumbnail, price } = product;

    const ratings = [...Array(MAX_RATING).keys()].map((index) => index + 1);

    return (
      <>
        <div>
          <img
            data-testid="product-detail-image"
            src={ thumbnail }
            alt={ title }
          />
          <h1 data-testid="product-detail-name">{title}</h1>
          <p data-testid="product-detail-price">{price}</p>
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => handleAddInCart(product) }
          >
            Adicionar ao carrinho
          </button>
        </div>

        <form onSubmit={ this.handleSubmit }>

          <label htmlFor="email">
            <input
              data-testid="product-detail-email"
              type="email"
              name="email"
              value={ email }
              id="email"
              onChange={ this.handleInputChange }

            />
          </label>

          <label htmlFor="evaluation">
            <textarea
              data-testid="product-detail-evaluation"
              name="evaluation"
              value={ evaluation }
              id="evaluation"
              onChange={ this.handleInputChange }
            />
          </label>

          {
            ratings.map((value) => (
              <label htmlFor="" key={ value }>
                <input
                  data-testid={ `${value}-rating` }
                  type="radio"
                  name="rating"
                  value={ value }
                  onChange={ this.handleInputChange }
                  checked={ rating === value }

                />
              </label>
            ))
          }

          {errorMsg && <p data-testid="error-msg">{ errorMsg }</p>}

          <button type="submit" data-testid="submit-review-btn">Avaliar</button>
        </form>

        <div className="reviews">
          {this.renderReviews()}
        </div>
      </>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleAddInCart: PropTypes.func.isRequired,
};
