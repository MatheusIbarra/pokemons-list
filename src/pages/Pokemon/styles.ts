import styled from "styled-components";

export const Container = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`;

export const Content = styled.div`
  width: 50%;
`;

export const Card = styled.div`
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 0;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  justify-content: space-around;
  min-height: 300px;
`
export const CardAbilities = styled.div`
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  justify-content: space-around;
  margin-top: 30px;
`

export const PokemonImage = styled.img`
  height: 150px;
`;

export const PokemonType = styled.div`
  text-align: center;
  color: #c4c4c4;
`;

export const AbilityContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #F1F4F5;
  width: 100%;
`

export const AbilityText = styled.div`
  text-align: left;
  padding: 0px 20px;
`

export const GetBackText = styled.div`
  margin-top: 70px;
  text-align: center;
  color: #00A3FF;
  cursor: pointer;
  font-size: 18px;
`
