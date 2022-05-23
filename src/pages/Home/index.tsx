import axios from "axios";
import PokemonCard from "components/PokemonCard";
import SearchInput from "components/SearchInput";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteScroll from "react-infinite-scroll-hook";
import api from "services/api";

import * as S from "./styles";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const [pokemonsList, setPokemonsList] = useState<any>([]);
  const [searchedPokemon, setSearchedPokemon] = useState<any>([]);
  const [pagination, setPagination] = useState({ offset: 0, limit: 28 });
  const [hasMore, setHasMore] = useState(false);

  const getPokemons = async (offset: number) => {
    try {
      const response: any = await api.get("/pokemon", {
        params: {
          limit: pagination.limit,
          offset,
        },
      });

      if (!response.next) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }

      setPagination({ ...pagination, offset });

      const endPoints = response.data.results.map((item: any) => {
        return item.url;
      });

      let newArray: any = [];

      await axios
        .all(endPoints.map((endPoint: any) => axios.get(endPoint)))
        .then((data) => {
          data.forEach((item: any) => {
            newArray.push(item.data);
          });
        });

      setPokemonsList([...pokemonsList, ...newArray]);
    } catch (error) {
      console.log(error);
    }
  };

  const searchPokemon = async () => {
    try {
      setPokemonsList([]);
      const { data } = await api.get(`/pokemon/${search}`);
      setSearchedPokemon([data]);
    } catch (error) {
      setPokemonsList([]);
    }
  };

  useEffect(() => {
    if (search.length === 0) {
      getPokemons(0);
      return;
    }

    const timeout = setTimeout(() => {
      searchPokemon();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    // getPokemons(pagination.offset);
  }, []);

  return (
    <InfiniteScroll
      dataLength={pokemonsList.length}
      next={() => getPokemons(pagination.offset + pagination.limit)}
      hasMore={hasMore}
      loader={<div></div>}
    >
      <S.Container>
        <S.Content>
          <SearchInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeHolder="Pesquise por nome ou código"
          />
          <S.Title>Pokémons</S.Title>

          <S.ListContainer>
            {pokemonsList.length > 0 ? (
              pokemonsList.map((pokemon: any) => (
                <PokemonCard
                  key={pokemon.id}
                  name={pokemon.name}
                  type={pokemon.types[0].type.name}
                  cod={pokemon.id}
                  imgUrl={pokemon.sprites.other.dream_world.front_default}
                />
              ))
            ) : searchedPokemon ? 
              searchedPokemon.map((pokemon: any) => (
              <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                type={pokemon.types[0].type.name}
                cod={pokemon.id}
                imgUrl={pokemon.sprites.other.dream_world.front_default}
              />
            )) : (
              <h4 style={{ width: 500 }}>Nenhum Pokémon encontrado.</h4>
            )}
          </S.ListContainer>
        </S.Content>
      </S.Container>
    </InfiniteScroll>
  );
};

export default Home;
