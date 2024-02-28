import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Rodape from '../Rodape/Rodape';
import { useListaParticipantes } from '../../state/hooks/useListaDeParticipantes';
jest.mock('../../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaParticipantes: jest.fn(),
  };
});
const mockNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao,
  };
});

jest.mock('../../state/hooks/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio,
  };
});

describe('quando não existe participantes suficientes', () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([]);
  });
  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>,
    );

    const botao = screen.getByRole('button');
    expect(botao).toBeDisabled();
  });
});

describe('quando existe participantes suficientes', () => {
  const participantes = ['Ana', 'Catariana', 'João'];
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
  });
  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>,
    );

    const botao = screen.getByRole('button');
    expect(botao).toBeEnabled();
  });

  test('a brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>,
    );

    const botao = screen.getByRole('button');
    fireEvent.click(botao);
    expect(mockNavegacao).toHaveBeenCalled();
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
    expect(mockSorteio).toHaveBeenCalled();
  });
});
