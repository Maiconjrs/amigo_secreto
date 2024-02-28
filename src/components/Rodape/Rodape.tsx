import { useNavigate } from 'react-router-dom';
import { useListaParticipantes } from '../../state/hooks/useListaDeParticipantes';
import style from './style.module.css';
import { useSorteador } from '../../state/hooks/useSorteador';

const Rodape = () => {
  const participantes = useListaParticipantes();

  const navegarPara = useNavigate();

  const sortear = useSorteador();

  const iniciar = () => {
    sortear();
    navegarPara('/sorteio');
  };
  return (
    <footer className={style.rodapeConfiguracoes}>
      <button className={style.botao} disabled={participantes.length < 3} onClick={iniciar}>
        Iniciar brincadeira
      </button>
      <img src="/images/sacolas.png" alt="Sacolas de compras" />
    </footer>
  );
};
export default Rodape;
