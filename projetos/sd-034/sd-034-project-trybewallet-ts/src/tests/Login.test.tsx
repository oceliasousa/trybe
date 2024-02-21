import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const validEmail = 'test@test.com';

describe('Login Component', () => {
  test('renders correctly', () => {
    renderWithRouterAndRedux(<Login />);

    expect(screen.getByTestId(emailTestId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordTestId)).toBeInTheDocument();
    expect(screen.getByTestId('btn-play')).toBeInTheDocument();
  });

  test('email and password validation', async () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const submitBtn = screen.getByTestId('btn-play');

    expect(submitBtn).toBeDisabled();

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, '123');

    expect(submitBtn).toBeDisabled();

    await userEvent.type(passwordInput, '123456');

    expect(submitBtn).not.toBeDisabled();
  });

  test('dispatch action and navigate on submit', async () => {
    const { store } = renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const submitBtn = screen.getByTestId('btn-play');

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(submitBtn);

    expect(store.getState().user.email).toEqual(validEmail);
  });
});
