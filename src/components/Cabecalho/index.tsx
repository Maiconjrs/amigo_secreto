import style  from './style.module.css';
import React from 'react';
const Cabecalho = () => {
    return (
        <header className={style.cabecalho}>
            <div className={style.imageLogo} role="img" aria-label='Logo do Sorteador'></div>
            <img className={style.participante} src="/images/participante.png" alt="Participante com um presente na mão" />
        </header>
    )
};

export default Cabecalho;
