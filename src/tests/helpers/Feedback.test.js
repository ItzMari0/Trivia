import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const initialState = {
  player: {
  name: 'group10',
  avatar: '',
  score: 300,
  correctAnswers: 5,
  },
};

describe('Testa a tela de Feedback', () => {
  afterEach(() => jest.clearAllMocks());
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
      correctAnswers: 2,
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
  });

  it('a tela é redirecionada para a tela inicial ao clicar no botão Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    expect(history.location.pathname).toBe('/feedback');

    const replayBtn = screen.getByTestId('btn-play-again');
    userEvent.click(replayBtn);
    expect(history.location.pathname).toBe('/');
  });
});
