import React from 'react';
import style from './style.module.css';

const Card = ({ children }: any) => {
  return <div className={style.card}>{children}</div>;
};

export default Card;
