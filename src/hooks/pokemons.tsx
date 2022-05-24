import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Pokemon } from "services/types";

type PokemonsContextData = {
  selectedPokemon: Pokemon;
  setSelectedPokemon: Dispatch<SetStateAction<Pokemon>>;
};

type PokemonProviderProps = {
  children: React.ReactNode;
};

const PokemonContext = createContext<PokemonsContextData>(
  {} as PokemonsContextData
);

export function usePokemon(): PokemonsContextData {
  const context = useContext(PokemonContext);

  if (!context) {
    throw Error("usePokemon must be used within a AppProvider");
  }

  return context;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
}) => {
  const [selectedPokemon, setSelectedPokemon] = useState({} as Pokemon);

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemon,
        setSelectedPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
