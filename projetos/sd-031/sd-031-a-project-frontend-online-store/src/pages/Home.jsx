import PropTypes from 'prop-types';
import React from 'react';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import '../css/Home.css';
import { getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
    categoriesOpen: false,
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  visibleCategories = () => {
    this.setState(({ categoriesOpen }) => ({ categoriesOpen: !categoriesOpen }));
  };

  render() {
    const { categories } = this.state;
    const { productList, handleAddInCart, getProducts,
      noSearch, sort, handleChange } = this.props;
    return (
      <main className="main">
        <CategoryList
          handleAddInCart={ handleAddInCart }
          categories={ categories }
          getProducts={ getProducts }
        />
        { productList.length ? (
          <div className="produts-container">
            <div>
              <button
                type="button"
                onClick={ this.visibleCategories }
                className="categories"
              >
                Categorias
              </button>
              <select
                name="sort"
                id="sort"
                value={ sort }
                onChange={ handleChange }
              >
                <option value="">Ordenar</option>
                <option value="price_desc">
                  Maior preço
                </option>
                <option value="price_asc">
                  Menor preço
                </option>
              </select>
            </div>
            <ProductList
              productList={ productList }
              handleAddInCart={ handleAddInCart }
              sort={ sort }
            />
          </div>
        ) : noSearch || (
          <section className="home-container">
            <p>Nenhum produto foi encontrado</p>
          </section>
        ) }
        {
          noSearch && (
            <section className="home-container">
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            </section>
          )
        }
      </main>
    );
  }
}

Home.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  handleAddInCart: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  noSearch: PropTypes.bool.isRequired,
  sort: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Home;
