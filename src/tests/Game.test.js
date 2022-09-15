import React from "react";
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { questionsMock, fakeRank, initialState } from "./mocks";

const answerAll = () => {
  userEvent.click(screen.getByTestId('correct-answer'));
  userEvent.click(screen.getByTestId('btn-next'));

  userEvent.click(screen.getByTestId('correct-answer'));
  userEvent.click(screen.getByTestId('btn-next'));

  userEvent.click(screen.getByTestId('correct-answer'));
  userEvent.click(screen.getByTestId('btn-next'));

  userEvent.click(screen.getByTestId('correct-answer'));
  userEvent.click(screen.getByTestId('btn-next'));

  userEvent.click(screen.getByTestId('correct-answer'));
  userEvent.click(screen.getByTestId('btn-next'));
};

describe('Testa a tela de Jogo', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsMock)
    });
    jest.setTimeout(40000);
  });
  
  test('Se a tela possui uma pergunta e é possível responde-lá', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');
    expect(history.location.pathname).toBe('/game');
    await waitForElementToBeRemoved(screen.getByText(/carregando/i));
    userEvent.click(screen.getByTestId('correct-answer'));
    expect(screen.getByTestId('btn-next')).toBeInTheDocument();
  });

  test('Se ao responder as 5 perguntas é redirecionado para tela de Feedback', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');
    await waitForElementToBeRemoved(screen.getByText(/carregando/i));
    answerAll();
    expect(history.location.pathname).toBe('/feedback');
  });

  test('Se ao responder todas as perguntas e ja tiver alguém no ranking ele é atualizado', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');
    window.localStorage.setItem('ranking', JSON.stringify(fakeRank));
    await waitForElementToBeRemoved(screen.getByText(/carregando/i));
    answerAll();
    expect(history.location.pathname).toBe('/feedback');
  });

  test('Se o timer é atualizado a cada segundo', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game');
    await waitForElementToBeRemoved(screen.getByText(/carregando/i));
    await waitFor(() => expect(screen.getByTestId('timer').textContent).toBe('0'), { timeout: 32000, interval: 10000 });
  }, 35000);
});
