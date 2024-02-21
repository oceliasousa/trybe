import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';


describe('Testando o página Login', () => {
  it('Teste se a página contém um heading h1 com o texto Login, uma imagem escrito TRIVIA e a mensagem SUA VEZ', () => {
    renderWithRouterAndRedux(<App />);
    const headingLogin = screen.getByText(/login/i);
    const msgSuaVez = screen.getByText(/sua vez/i);
    const imgTrivia = screen.getByRole('img');
    expect(headingLogin).toBeInTheDocument();
    expect(msgSuaVez).toBeInTheDocument();
    expect(imgTrivia).toBeInTheDocument();
  });
  it('Teste se a página contém os inputs corretos', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });
  it('Teste se a página contém dois botões', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /play/i });
    const configBtn = screen.getByRole('button', { name: /configurações/i });
    expect(playBtn).toBeInTheDocument();
    expect(configBtn).toBeInTheDocument();
  });
  it('Teste se o botão `Configurações` redireciona para a rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const configBtn = screen.getByRole('button', { name: /configurações/i });
  
    userEvent.click(configBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/config');
  });
  it('Teste se o botão `Play` redireciona para a rota `/game`', async () => {
    const { store, history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    expect(playBtn).toBeDisabled();

    userEvent.type(inputName, 'matheus');
    userEvent.type(inputEmail, 'matheus@gmail.com');

    
    expect(playBtn).not.toBeDisabled();
    
    userEvent.click(playBtn);
    
    await waitFor( () => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
    }, { timeout: 3000 });
    
    await waitFor( () => {
      const userEmail = store.getState().user.gravatarEmail;
      expect(userEmail).toBe('matheus@gmail.com');
    }, { timeout: 2000 });
  });
});
