import styled from "styled-components";

export const Container = styled.div`
  width: 153px;
  height: 190px;
  background-color: #fff;
  box-shadow: 0px 4px 20px #e1e1e1;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
`;

export const PokemonImage = styled.img`
  height: 50px;
`;

export const PokemonType = styled.div`
  width: 80%;
  background-color: rgba(247, 247, 247, 0.4);
  border-radius: 5px;
  text-align: center;
  color: #c4c4c4;
`;
