import { render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import ListaParticipantes from './ListaParticipantes';
import { useListaParticipantes } from '../state/hooks/useListaDeParticipantes';

jest.mock('../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaParticipantes: jest.fn(),
  };
});

describe('uma lista vazia de participantes', () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([]);
  });
  test('deve ser renderizada sem elementos', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>,
    );

    const itens = screen.queryAllByRole('listitem');
    expect(itens).toHaveLength(0);
  });
});

describe('uma lista preechida de participantes', () => {
  const participantes = ['Ana', 'Catariana'];
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
  });
  test('deve ser renderizada os participantes', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>,
    );

    const itens = screen.queryAllByRole('listitem');
    expect(itens).toHaveLength(participantes.length);
  });
});
