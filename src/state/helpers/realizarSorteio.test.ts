import { realizarSorteio } from './realizarSorteio';

describe('dado um sorteio de amigo secreto', () => {
  test('cada participante não sorteie o proprio nome', () => {
    const participante = ['ana', 'catarina', 'juliana', 'joão', 'vinivius', 'natalia'];
    const sorteio = realizarSorteio(participante);

    participante.forEach((participante) => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);
    });
  });
});
