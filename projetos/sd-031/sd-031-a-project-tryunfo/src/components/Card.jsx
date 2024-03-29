import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isPreview,
      onDeleteCard,
    } = this.props;
    return (
      <div>
        <span data-testid="name-card">{ cardName }</span>
        <img
          src={ cardImage }
          alt={ cardName }
          data-testid="image-card"
        />

        <span data-testid="description-card">{ cardDescription }</span>
        <span data-testid="attr1-card">{ cardAttr1 }</span>
        <span data-testid="attr2-card">{ cardAttr2 }</span>
        <span data-testid="attr3-card">{ cardAttr3 }</span>
        <span data-testid="rare-card">{ cardRare }</span>
        {cardTrunfo && <span data-testid="trunfo-card">Super Trunfo</span>}
        {!isPreview
        && <button onClick={ onDeleteCard } data-testid="delete-button">Excluir</button>}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
};

export default Card;
