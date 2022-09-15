import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const AVATAR = 'https://www.gravatar.com/avatar/812ba00112e6fb842d2a606ebeb70786';
const AVATAR_TWO = 'https://www.gravatar.com/avatar/38c5f3df8603b9a7d8339d0c4607ccd2';

const initialState = {
  player: {
  name: 'group10',
  avatar: AVATAR,
  score: 300,
  assertions: 5,
  },
};

window.localStorage.setItem('ranking', JSON.stringify(
  [
    {
      avatar: AVATAR,
      name: 'group10',
      score: 300,
    },
    {
      avatar: AVATAR_TWO,
      name: 'group100',
      score: 350,
    }
  ]));

describe('Testa a tela de Ranking', () => {
  // afterEach(() => jest.clearAllMocks());
  it('a tela é renderizada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/ranking');

    expect(history.location.pathname).toBe('/ranking');


    const rankingTitle = screen.getByRole('heading', { name: /Ranking/i, level: 1 });
    expect(rankingTitle).toBeInTheDocument();

    const userImg = screen.getAllByRole('img')
    expect(userImg[0]).toBeInTheDocument();
    expect(userImg[0]).toHaveAttribute('src', AVATAR_TWO);
    expect(userImg[1]).toBeInTheDocument();
    expect(userImg[1]).toHaveAttribute('src', AVATAR);

    const homeBtn = screen.getByTestId('btn-go-home');
    expect(homeBtn).toBeInTheDocument();
  });

  it('o botão Tela Inicial redireciona para o caminho "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/ranking');
  
    const homeBtn = screen.getByTestId('btn-go-home');
    expect(homeBtn).toBeInTheDocument();

    userEvent.click(homeBtn);
    expect(history.location.pathname).toBe('/');
  });
});
