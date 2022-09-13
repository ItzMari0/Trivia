import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const INPUT_NAME = 'input-player-name';
const INPUT_EMAIL = 'input-gravatar-email';
const NAME = 'tryber';
const EMAIL = 'tryber@trybe.com';
const MOCK_FETCH = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
};

describe('Testa a tela de Login', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_FETCH)
    })
  });

  it('a tela é renderizada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(INPUT_NAME);
    expect(inputName).toBeInTheDocument();

    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    expect(inputEmail).toBeInTheDocument();

    const playBtn = screen.getByRole('button', { name: /Jogar/i });
    expect(playBtn).toBeInTheDocument();

    const settingsBtn = screen.getByTestId('btn-settings');
    userEvent.click(settingsBtn);
    expect(history.location.pathname).toBe('/settings');
  });

  it('os campos de "nome" e "email" são preenchidos e funcionais', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(INPUT_NAME);
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const playBtn = screen.getByRole('button', { name: /Jogar/i });

    userEvent.type(inputName, NAME);
    expect(inputName).toHaveValue(NAME);

    userEvent.type(inputEmail, EMAIL);
    expect(inputEmail).toHaveValue(EMAIL);
    expect(playBtn).not.toHaveAttribute('disabled');

    userEvent.click(playBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/game'));
  });
});