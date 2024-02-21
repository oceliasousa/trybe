import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const initialStateUser = {
  player: {
    name: 'playerName',
    assertions: 3,
    score: 63,
    gravatarEmail: 'playerEmail@gmail.com',
  },
};

describe('Testando a página de Feedback', () => {
  it('Teste se a página contém um heading h1 com o texto Feedback, uma imagem escrito TRIVIA e a mensagem SUA VEZ', () => {
    renderWithRouterAndRedux(<App />, {}, '/feedback');
    const imgTrivia = screen.getAllByRole('img');
    expect(imgTrivia[0]).toHaveAttribute('alt', 'logo');

    const msgSuaVez = screen.getByText(/sua vez/i);
    expect(msgSuaVez).toBeInTheDocument();

    const headingFeedback = screen.getByRole('heading', { name: /feedback/i });    
    expect(headingFeedback).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem do avatar do usuário e seu respectivo nome', () => {
    const { store } = renderWithRouterAndRedux(<App />, initialStateUser, '/feedback');
    const userAvatar = screen.getAllByRole('img');
    expect(userAvatar[1]).toHaveAttribute('alt', 'User avatar');

    // const userName = screen.getByText(initialStateUser.player.name);
    expect(store.getState().player.name).toEqual('playerName');
  });

  it('Teste se a página contém dois botões: "Ranking" e "Play Again"', () => {
    renderWithRouterAndRedux(<App />, {}, '/feedback');
    const rankingBtn = screen.getByRole('button', { name: /ranking/i });
    const playAgainBtn = screen.getByRole('button', { name: /play again/i });
    expect(rankingBtn).toBeInTheDocument();
    expect(playAgainBtn).toBeInTheDocument();
  });

  it('Teste se ao clicar no botão "Play Again" a aplicação vai para página de Login "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
    const playAgainBtn = screen.getByRole('button', { name: /play again/i });
    expect(playAgainBtn).toBeInTheDocument();

    userEvent.click(playAgainBtn);

    expect(history.location.pathname).toEqual('/');
  });

  it('Teste se ao clicar no botão "Ranking" a aplicação vai para página de Ranking "/ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
    const rankingBtn = screen.getByRole('button', { name: /ranking/i });
    expect(rankingBtn).toBeInTheDocument();

    userEvent.click(rankingBtn);

    expect(history.location.pathname).toEqual('/ranking');
  });

  it('Teste se a página mostra a mensagem correta de acordo com a quantidade de questões repondidas de forma correta', () => {
    const { store } = renderWithRouterAndRedux(<App />, initialStateUser, '/feedback');
    
    expect(store.getState().player.assertions).toBeGreaterThanOrEqual(3);
    
    const feedbackGame = screen.getByText(/Well Done!/i);
    expect(feedbackGame).toBeInTheDocument();
  });

  it('Teste se a página mostra a quantidade de questões repondidas de forma correta', () => {
    const { store } = renderWithRouterAndRedux(<App />, initialStateUser, '/feedback');
    
    expect(store.getState().player.assertions).toEqual(3);
  });

  it('Teste se a página mostra o score atualizado', () => {
    const { store } = renderWithRouterAndRedux(<App />, initialStateUser, '/feedback');
    
    expect(store.getState().player.score).toEqual(63);
  });

});
