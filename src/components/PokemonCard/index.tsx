import React from "react";

import * as S from "./styles";

type CardProps = {
  name: string;
  cod: number;
  type: string;
  imgUrl: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

const PokemonCard: React.FC<CardProps> = ({ name, cod, type, imgUrl, onClick }) => {
  return (
    <S.Container onClick={onClick}>
      <S.PokemonImage src={imgUrl} alt="pokemon"></S.PokemonImage>
      <div>
        <h3>{name}</h3>
        <h5 style={{textAlign: 'center'}}>Cód: {cod}</h5>
      </div>
      <S.PokemonType>{type}</S.PokemonType>
    </S.Container>
  );
};

export default PokemonCard;
