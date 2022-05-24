/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import { EffectEntry } from "services/types";
import { usePokemon } from "hooks/pokemons";

import * as S from "./styles";

const Pokemon: React.FC = () => {
  const [abilities, setAbilities] = useState<EffectEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { selectedPokemon } = usePokemon();

  const getAbilities = async () => {
    try {
      setLoading(true);
      const endPoints = selectedPokemon.abilities.map((ab) => {
        return ab.ability.url;
      });

      let newArray: any = [];

      await axios
        .all(endPoints.map((endPoint: string) => axios.get(endPoint)))
        .then((data) => {
          data.forEach((item: any) => {
            item.data.effect_entries.forEach((en: any) => {
              if (en.language.name === "en") {
                newArray.push(en);
              }
            });
          });
        });

      setAbilities(newArray);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0,0);
    if(selectedPokemon.id) {
      getAbilities();
    } else {
      navigate('/')
    }
  }, [selectedPokemon]);

  if(!selectedPokemon.id) {
    return (
      <div>Carregando...</div>
    )
  }

  return (
    <S.Container>
      <S.Content>
        <S.Card>
          <S.PokemonImage
            src={selectedPokemon.sprites.other.dream_world.front_default}
            alt="pokemon"
          ></S.PokemonImage>
          <h3>
            {selectedPokemon.name.charAt(0).toUpperCase() +
              selectedPokemon.name.slice(1)}
          </h3>
          <S.PokemonType>{selectedPokemon.types[0].type.name}</S.PokemonType>
        </S.Card>

        <S.CardAbilities>
          <h3>Habilidades</h3>
          {!loading ? (
            abilities.map((ab, index) => {
              return (
                <S.AbilityContainer key={index}>
                  <S.AbilityText>{ab.effect}</S.AbilityText>
                </S.AbilityContainer>
              );
            })
          ) : (
            <h4>Carregando...</h4>
          )}
        </S.CardAbilities>
        <S.GetBackText onClick={() => navigate("/")}>Voltar</S.GetBackText>
      </S.Content>
    </S.Container>
  );
};

export default Pokemon;
