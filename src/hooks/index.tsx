import React from "react";
import { PokemonProvider } from "./pokemons";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <PokemonProvider>{children}</PokemonProvider>
);
