import React from "react";
import { IPokemonListProps } from "@/app/interfaces/interface";
import PokemonCard from "../PokemonCard/PokemonCard";

const PokemonList: React.FC<IPokemonListProps> = ({ pokemonList }) => {
  if (!pokemonList || pokemonList.length === 0) {
    return <div className="text-center py-10">No Pokemon found</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
