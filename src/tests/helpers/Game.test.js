import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const AVATAR = 'https://www.gravatar.com/avatar/812ba00112e6fb842d2a606ebeb70786';
const token = '819468d42deeb1dd53dfcc7d5846331ca15432bdef5f8048012656eafe0b50e2';

const initialState = {
  player: {
  name: 'group10',
  avatar: AVATAR,
  score: 0,
  assertions: 0,
  },
};

window.localStorage.setItem('token', token);

const INPUT_NAME = 'input-player-name';
const INPUT_EMAIL = 'input-gravatar-email';
const NAME = 'group10';
const EMAIL = 'tryber@trybe.com';

describe('Testa a tela de Jogo', () => {
  // afterEach(() => jest.setTimeout(35000));

  it('a tela de Jogo é renderizada corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');

    expect(history.location.pathname).toBe('/game');

    const header = screen.getByTestId('header-player-name');
    expect(header).toBeInTheDocument();
    
    const triviaTitle = screen.getByRole('heading', { name: /Trivia/i, level: 1 });
    expect(triviaTitle).toBeInTheDocument();

    const loading = screen.getByText(/carregando/i);
    expect(loading).toBeInTheDocument();
    jest.setTimeout(2000);
    await waitFor(() => expect(loading).not.toBeInTheDocument());

    const category = screen.getByTestId('question-category');
    expect(category).toBeInTheDocument();
    
    const question = screen.getByTestId('question-text');
    expect(question).toBeInTheDocument();

    const correctBtn = screen.getByTestId('correct-answer');
    expect(correctBtn).toBeInTheDocument();
    expect(correctBtn).toHaveAttribute('class', 'answer-button');

    const wrongBtn = screen.getAllByTestId('wrong-answer');
    expect(wrongBtn[0]).toBeInTheDocument();
    expect(wrongBtn[0]).toHaveAttribute('class', 'answer-button');

    userEvent.click(correctBtn);
    expect(correctBtn).toHaveAttribute('class', 'answer-button correct');
    expect(wrongBtn[0]).toHaveAttribute('class', 'answer-button wrong');
    const nextBtn = screen.getByTestId('btn-next');
    expect(nextBtn).toBeInTheDocument();

    userEvent.click(nextBtn);
    jest.setTimeout(2000);
    expect(correctBtn).toHaveAttribute('class', 'answer-button');
    expect(wrongBtn[0]).toHaveAttribute('class', 'answer-button');
    expect(nextBtn).not.toBeInTheDocument();
  });

  it('se o timer faz a contagem', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');

    expect(history.location.pathname).toBe('/game');

    const loading = screen.getByText(/carregando/i);
    expect(loading).toBeInTheDocument();
    jest.setTimeout(2000);
    await waitFor(() => expect(loading).not.toBeInTheDocument());
    
    const timer = screen.getByTestId('timer');
    expect(timer).not.toHaveAttribute('text', 30);
  });

  it('a tela de Jogo é redirecionada ao "Feedback" após responder 5 perguntas corretas', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');
    window.localStorage.setItem('ranking', JSON.stringify(
      [
        {
          avatar: AVATAR,
          name: 'group10',
          score: 50,
        }
      ]));
    const previousRank = window.localStorage.getItem('ranking');

    expect(history.location.pathname).toBe('/game');

    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument;
    expect(score).toHaveTextContent(0);

    const loading = screen.getByText(/carregando/i);
    expect(loading).toBeInTheDocument();
    jest.setTimeout(1500);
    await waitFor(() => expect(loading).not.toBeInTheDocument());
    
    const question = screen.getByTestId('question-text');
    expect(question).toBeInTheDocument();

    userEvent.click(screen.getByTestId('correct-answer'));
    expect(screen.getByTestId('correct-answer').hasAttribute('disabled'));
    userEvent.click(screen.getByTestId('btn-next'));

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    userEvent.click(screen.getByTestId('correct-answer'));
    const newScore = screen.getByTestId('header-score');
    expect(newScore).toBeInTheDocument;
    expect(newScore).not.toHaveValue(0);
    userEvent.click(screen.getByTestId('btn-next'));

    expect(history.location.pathname).toBe('/feedback');
    expect(window.localStorage.getItem('ranking')).not.toBe(previousRank);

    const playAgainBtn = screen.getByTestId('btn-play-again');
    expect(playAgainBtn).toBeInTheDocument();

    userEvent.click(playAgainBtn);
    expect(history.location.pathname).toBe('/');
  });

  it('a tela de Feeback redireciona para a tela de Ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');
    window.localStorage.setItem('ranking', JSON.stringify(
      [
        {
          avatar: AVATAR,
          name: 'group10',
          score: 50,
        }
      ]));
    const previousRank = window.localStorage.getItem('ranking');

    expect(history.location.pathname).toBe('/game');

    const loading = screen.getByText(/carregando/i);
    expect(loading).toBeInTheDocument();
    jest.setTimeout(2000);
    await waitFor(() => expect(loading).not.toBeInTheDocument());
    
    const question = screen.getByTestId('question-text');
    expect(question).toBeInTheDocument();

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

    expect(history.location.pathname).toBe('/feedback');
    expect(window.localStorage.getItem('ranking')).not.toBe(previousRank);

    const rankingBtn = screen.getByTestId('btn-ranking');
    expect(rankingBtn).toBeInTheDocument();
    
    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');

    const rankingTitle = screen.getByRole('heading', { name: /Ranking/i, level: 1 });
    expect(rankingTitle).toBeInTheDocument();

    const userName = screen.getByTestId('player-name-1');
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent('group10');

    const userScore = screen.getByTestId('player-score-1');
    expect(userScore).toBeInTheDocument();
    expect(userScore).toHaveTextContent('50');

    const goHomeBtn = screen.getByTestId('btn-go-home');
    expect(goHomeBtn).toBeInTheDocument();

    userEvent.click(goHomeBtn);
    expect(history.location.pathname).toBe('/');
  });
});
