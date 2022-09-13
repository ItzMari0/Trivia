import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const AVATAR = 'https://www.gravatar.com/avatar/812ba00112e6fb842d2a606ebeb70786';
const AVATAR_TWO = 'https://www.gravatar.com/avatar/38c5f3df8603b9a7d8339d0c4607ccd2';

const initialState = {
  player: {
  name: 'group10',
  avatar: '',
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

describe('Testa a tela de Feedback', () => {
  it('a tela é renderizada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    expect(history.location.pathname).toBe('/feedback');

    const performanceMsg = screen.getByTestId('feedback-text')
    expect(performanceMsg).toBeInTheDocument();

    const wellDoneMsg = screen.getByText(/Well Done!/i);
    expect(wellDoneMsg).toBeInTheDocument();

    const correctAnswers = screen.getByTestId('feedback-total-question');
    expect(correctAnswers).toBeInTheDocument();

    const score = screen.getByTestId('feedback-total-score');
    expect(score).toBeInTheDocument();

    const rankingBtn = screen.getByTestId('btn-ranking');
    expect(rankingBtn).toBeInTheDocument();

    const replayBtn = screen.getByTestId('btn-play-again');
    expect(replayBtn).toBeInTheDocument();
  });

  it('a mensagem "Could be Better..." aparece ao acertar menos de 3 perguntas', () => {
    const initialState = {
      player: {
      name: 'group10',
      avatar: '',
      score: 100,
      assertions: 2,
      },
    };
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    expect(history.location.pathname).toBe('/feedback');

    const beBetterMsg = screen.getByText(/Could be better.../i);
    expect(beBetterMsg).toBeInTheDocument();
  });

  it('a tela é redirecionada ao clicar no botão Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    expect(history.location.pathname).toBe('/feedback');

    const rankingBtn = screen.getByTestId('btn-ranking');
    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');

    const homeBtn = screen.getByTestId('btn-go-home');
    expect(homeBtn).toBeInTheDocument();

    userEvent.click(homeBtn);
    expect(history.location.pathname).toBe('/');
  });

  it('a tela é redirecionada para a tela inicial ao clicar no botão Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    expect(history.location.pathname).toBe('/feedback');

    const replayBtn = screen.getByTestId('btn-play-again');
    userEvent.click(replayBtn);
    expect(history.location.pathname).toBe('/');
  });
});
