"use client";
import { useState, useEffect } from "react";
import { Pokemon } from "./types/types";
import { getPokemonList, searchPokemon } from "./utils/api";
import SearchBar from "./components/SearchBar/SearchBar";
import PokemonList from "./components/PokemonList/PokemonList";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch Pokemon data on mount
  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    setLoading(true);
    try {
      const data = await getPokemonList(150, 0); // Fetch first 150 Pokemons
      setPokemonList(data.results);
      setDisplayedPokemon(data.results);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setDisplayedPokemon(pokemonList);
    } else {
      const filteredPokemon = searchPokemon(searchTerm, pokemonList);
      setDisplayedPokemon(filteredPokemon);
    }
  }, [searchTerm, pokemonList]);

  return (
    <div>
      <h1 className="text-gray-800 text-center text-7xl mb-8">
        Pokemon Explorer
      </h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <PokemonList pokemonList={displayedPokemon} />
      )}
    </div>
  );
}
