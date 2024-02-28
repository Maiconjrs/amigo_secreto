import { useState } from 'react';
import { useListaParticipantes } from '../../state/hooks/useListaDeParticipantes';
import { useResultadoSorteio } from '../../state/hooks/useResultadoSorteio';
import Card from '../../components/Card';
import style from './style.module.css';

const Sorteio = () => {
  const participantes = useListaParticipantes();
  const [participanteDaVez, setParticipanteDaVez] = useState('');
  const [amigoSecreto, setAmigoSecreto] = useState('');

  const resultado = useResultadoSorteio();

  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!);
    }
  };
  return (
    <Card>
      <section className={style.sorteio}>
        <h2>Quem vai tirar o papelzinho?</h2>
        <form onSubmit={sortear}>
          <select
            required
            name="participanteDavez"
            id="participanteDavez"
            data-testid="sorteio"
            value={participanteDaVez}
            onChange={(evento) => setParticipanteDaVez(evento.target.value)}
          >
            <option>Selecione o seu nome</option>
            {participantes.map((participante) => (
              <option key={participante}>{participante}</option>
            ))}
          </select>
          <p>Clique em sortear para ver quem é o seu amgo secreto</p>
          <button className={style.botaoSortear}>Sortear</button>
        </form>
        {amigoSecreto && (
          <p className={style.resultado} role="alert">
            {amigoSecreto}
          </p>
        )}
        <footer className={style.sorteio}>
          <img src="/images/aviao.png" className={style.aviao} alt="um desenho de um avião de papel" />
        </footer>
      </section>
    </Card>
  );
};

export default Sorteio;
