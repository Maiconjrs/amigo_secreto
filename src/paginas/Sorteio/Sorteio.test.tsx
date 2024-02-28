import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaParticipantes } from '../../state/hooks/useListaDeParticipantes';
import Sorteio from './Sorteio';
import { useResultadoSorteio } from '../../state/hooks/useResultadoSorteio';

jest.mock('../../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaParticipantes: jest.fn(),
  };
});

jest.mock('../../state/hooks/useResultadoSorteio', () => {
  return {
    useResultadoSorteio: jest.fn(),
  };
});

describe('a página de sorteio', () => {
  const participantes = ['ana', 'catarina', 'Jorel'];

  const resultado = new Map([
    ['ana', 'Jorel'],
    ['Jorel', 'Catarina'],
    ['Catarina', 'ana'],
  ]);

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
  });

  test('todos os participantes podem exibir seus amigos secretos', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>,
    );

    const opcoes = screen.queryAllByRole('option');
    expect(opcoes).toHaveLength(participantes.length + 1);
  });

  test('o amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>,
    );
    const select = screen.getByTestId('sorteio');

    fireEvent.change(select, {
      target: {
        value: participantes[0],
      },
    });

    const botao = screen.getByRole('button');
    fireEvent.click(botao);

    const amigoSecreto = screen.getByRole('alert');
    expect(amigoSecreto).toBeInTheDocument();
  });
});
