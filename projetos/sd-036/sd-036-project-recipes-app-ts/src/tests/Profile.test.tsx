import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './RenderWith';
import Profile from '../pages/Profile';

describe('Testa página Profile', () => {
  it('Verifica se ao clicar no botão Done Recipes vai para página correta', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });
    const user = userEvent.setup();

    const buttonProfile = screen.getByRole('button', { name: /profile/i });
    await user.click(buttonProfile);

    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');

    await user.click(buttonDoneRecipes);
    const titleDoneRecipes = screen.getByRole('heading', { name: /done recipes/i, level: 1 });
    expect(titleDoneRecipes).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão Favorite Recipes vai para página correta', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });
    const user = userEvent.setup();

    const buttonProfile = screen.getByRole('button', { name: /profile/i });
    await user.click(buttonProfile);

    const buttonFavoriteRecipes = screen.getByTestId('profile-favorite-btn');

    await user.click(buttonFavoriteRecipes);
    const titleFavoriteRecipes = screen.getByRole('heading', { name: /favorite recipes/i, level: 1 });
    expect(titleFavoriteRecipes).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão Done Recipes vai para página correta', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });
    const user = userEvent.setup();

    const buttonProfile = screen.getByRole('button', { name: /profile/i });
    await user.click(buttonProfile);

    const buttonLogout = screen.getByTestId('profile-logout-btn');

    await user.click(buttonLogout);

    const email = screen.getByLabelText(/email:/i);
    expect(email).toBeInTheDocument();

    const password = screen.getByLabelText(/password:/i);
    expect(password).toBeInTheDocument();
  });

  class LocalStorageMock implements Storage { // ajuda do chatGPT para implementação desse StorageMock
    private store: { [key: string]: string } = {};

    get length() {
      return Object.keys(this.store).length;
    }

    key(index: number) {
      const keys = Object.keys(this.store);
      return keys[index] || null;
    }

    getItem(key: string) {
      return this.store[key] || null;
    }

    setItem(key: string, value: string) {
      this.store[key] = value;
    }

    removeItem(key: string) {
      delete this.store[key];
    }

    clear() {
      this.store = {};
    }
  }

  it('Testa se o email do usuário é exibido corretamente', async () => {
    const user = { email: 'tes@test.com' };
    const localStorageMock = new LocalStorageMock();
    localStorageMock.setItem('user', JSON.stringify(user));

    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
    });

    renderWithRouterAndRedux(<Profile />);

    const profileEmailElement = screen.getByTestId('profile-email');
    expect(profileEmailElement).toBeInTheDocument();

    expect(profileEmailElement).toHaveTextContent('tes@test.com');
  });
});
