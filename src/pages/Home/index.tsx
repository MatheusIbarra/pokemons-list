/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { usePokemon } from "hooks/pokemons";
import api from "services/api";
import { Pokemon, Response } from "services/types";

import PokemonCard from "components/PokemonCard";
import SearchInput from "components/SearchInput";

import * as S from "./styles";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([]);
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon[]>([]);
  const [pagination, setPagination] = useState({ offset: 0, limit: 28 });
  const [hasMore, setHasMore] = useState(false);
  const navigate = useNavigate();

  const { setSelectedPokemon } = usePokemon();

  const getPokemons = async () => {
    try {
      const response: Response = await api.get("/pokemon", {
        params: {
          limit: pagination.limit,
          offset: 0,
        },
      });

      if (response.data.next) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      const endPoints = response.data.results.map((item: any) => {
        return item.url;
      });

      setPagination({ offset: 0, limit: 28 });

      let newArray: Pokemon[] = [];

      await axios
        .all(endPoints.map((endPoint: string) => axios.get(endPoint)))
        .then((data) => {
          data.forEach((item: any) => {
            newArray.push(item.data);
          });
        });

      setPokemonsList(newArray);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async (offset: number) => {
    try {
      const response: Response = await api.get("/pokemon", {
        params: {
          limit: pagination.limit,
          offset,
        },
      });

      if (response.data.next) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }

      setPagination({ ...pagination, offset });

      const endPoints = response.data.results.map((item: any) => {
        return item.url;
      });

      let newArray: Pokemon[] = [];

      await axios
        .all(endPoints.map((endPoint: string) => axios.get(endPoint)))
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
      setSearchedPokemon([]);
    }
  };

  const handleNavigation = (pokemon: Pokemon, route: string) => {
    setSelectedPokemon(pokemon)
    navigate(route)
  }

  useEffect(() => {
    if (search.length === 0) {
      getPokemons();
      return;
    }

    const timeout = setTimeout(() => {
      searchPokemon();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);
  
  return (
    <S.Container>
      <S.Content>
        <InfiniteScroll
          dataLength={pokemonsList.length}
          next={() =>
            setTimeout(() => {
              loadMore(pagination.offset + pagination.limit);
            }, 1000)
          }
          hasMore={hasMore}
          loader={
            <div style={{ marginTop: 20, marginBottom: 20 }}>Carregando...</div>
          }
        >
          <SearchInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeHolder="Pesquise por nome ou código"
            resetSearch={() => setSearch('')}
          />
          <S.Title>Pokémons</S.Title>

          <S.ListContainer>
            {pokemonsList.length > 0 ? (
              pokemonsList.map((pokemon: Pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  name={pokemon.name}
                  type={pokemon.types[0].type.name}
                  cod={pokemon.id}
                  imgUrl={pokemon.sprites.other.dream_world.front_default}
                  onClick={() => handleNavigation(pokemon, '/pokemon')}
                />
              ))
            ) : searchedPokemon.length > 0 ? (
              searchedPokemon.map((pokemon: any) => (
                <PokemonCard
                  key={pokemon.id}
                  name={pokemon.name}
                  type={pokemon.types[0].type.name}
                  cod={pokemon.id}
                  imgUrl={pokemon.sprites.other.dream_world.front_default}
                  onClick={() => handleNavigation(pokemon, '/pokemon')}
                />
              ))
            ) : (
              <></>
            )}
          </S.ListContainer>
        </InfiniteScroll>
        {searchedPokemon.length <= 0 && pokemonsList.length <= 0 && (
          <h4 style={{width: 500}}>Nenhum Pokémon encontrado.</h4>
        )}
      </S.Content>
    </S.Container>
  );
};

export default Home;
