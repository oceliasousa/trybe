import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form>

        <label htmlFor="name-input">Nome da Carta:</label>
        <input
          name="cardName"
          value={ cardName }
          onChange={ onInputChange }
          type="text"
          id="name-input"
          data-testid="name-input"
        />

        <label
          htmlFor="description-input"
        >
          Descrição da Carta:
        </label>
        <textarea
          name="cardDescription"
          value={ cardDescription }
          onChange={ onInputChange }
          id="description-input"
          data-testid="description-input"
        >
          text
        </textarea>

        <label htmlFor="attr1-input">Atributo 1:</label>
        <input
          name="cardAttr1"
          value={ cardAttr1 }
          onChange={ onInputChange }
          type="number"
          id="attr1-input"
          data-testid="attr1-input"
        />

        <label htmlFor="attr2-input">Atributo 2:</label>
        <input
          name="cardAttr2"
          value={ cardAttr2 }
          onChange={ onInputChange }
          type="number"
          id="attr2-input"
          data-testid="attr2-input"
        />

        <label htmlFor="attr3-input">Atributo 3:</label>
        <input
          name="cardAttr3"
          value={ cardAttr3 }
          onChange={ onInputChange }
          type="number"
          id="attr3-input"
          data-testid="attr3-input"
        />

        <label htmlFor="image-input">Imagem da Carta:</label>
        <input
          name="cardImage"
          value={ cardImage }
          onChange={ onInputChange }
          type="text"
          id="image-input"
          data-testid="image-input"
        />

        <label htmlFor="rare-input">Raridade:</label>
        <select
          name="cardRare"
          value={ cardRare }
          onChange={ onInputChange }
          id="rare-input"
          data-testid="rare-input"
        >
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito Raro</option>
        </select>

        { hasTrunfo && <span>Você já tem um Super Trunfo em seu baralho</span> }
        { !hasTrunfo && <label htmlFor="trunfo-input">Super Trunfo:</label> }
        { !hasTrunfo && <input
          name="cardTrunfo"
          checked={ cardTrunfo }
          onChange={ onInputChange }
          type="checkbox"
          id="trunfo-input"
          data-testid="trunfo-input"
        /> }

        <button
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          type="button"
          data-testid="save-button"
        >
          Salvar
        </button>

        <label
          htmlFor="name-filter"
        >
          filtro por nome:
        </label>
        <textarea
          name="cardDescription"
          // value={ cardDescription }
          // onChange={ onInputChange }
          id="name-filter"
          data-testid="name-filter"
        >
          text
        </textarea>

      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
