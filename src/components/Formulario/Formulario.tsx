import { useRef, useState } from 'react';
import React from 'react';
import { useAdicionarParticipante } from '../../state/hooks/useAdicionarParticipante';
import { useMensagemDeErro } from '../../state/hooks/useMensagemDeErro';
import style from './style.module.css';

const Formulario = () => {
  const [nome, setNome] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const adicionarNaLista = useAdicionarParticipante();

  const mensagemDeErro = useMensagemDeErro();

  const adicionarParticipante = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    adicionarNaLista(nome);
    setNome('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={adicionarParticipante}>
      <div className={style.grupoInputBtn}>
        <input
          ref={inputRef}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          type="text"
          placeholder="Insira os nomes dos participantes"
        />
        <button disabled={!nome}>Adicionar</button>
        {mensagemDeErro && (
          <p className={style.alertaErro} role="alert">
            {mensagemDeErro}
          </p>
        )}
      </div>
    </form>
  );
};

export default Formulario;
