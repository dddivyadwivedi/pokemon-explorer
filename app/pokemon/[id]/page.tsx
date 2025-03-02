"use client";
import { useState, useEffect } from "react";
import { getPokemonDetails } from "@/app/utils/api";
import {
  IAbility,
  IMove,
  IPokemonDetail,
  IStat,
} from "@/app/interfaces/interface";
import { useParams } from "next/navigation";
import Image from "next/image";

const PokemonDetailPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<IPokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pokemon details on id change
  useEffect(() => {
    if (!id) return;

    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const pokemonData = await getPokemonDetails(id as string);
        if (!pokemonData) throw new Error("Pokemon not found");
        setPokemon(pokemonData);
      } catch (err) {
        setError("Failed to fetch Pokemon data");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]); // Added id to dependency array

  // Handle errors or missing data
  if (error || !pokemon) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Pokemon Not Found</h1>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  // Get Pokemon image URL
  const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  // Fallback to default sprite if official artwork doesn't exist
  const fallbackImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
          <div className="flex flex-col md:flex-row items-center">
            {/* Pokemon Image */}
            <div className="w-40 h-40 md:w-52 md:h-52 bg-white bg-opacity-20 rounded-full p-4 flex items-center justify-center mb-4 md:mb-0">
              <div className="relative w-full h-full">
                <Image
                  src={pokemonImageUrl}
                  alt={pokemon.name}
                  fill
                  sizes="(max-width: 768px) 160px, 208px"
                  style={{ objectFit: "contain" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = fallbackImageUrl;
                  }}
                  priority
                />
              </div>
            </div>
            <div className="md:w-2/3 text-center md:text-left md:ml-6">
              <p className="text-gray-200 mb-1">
                #{String(pokemon.id).padStart(3, "0")}
              </p>
              <h1 className="text-3xl font-bold capitalize mb-2">
                {pokemon.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {pokemon.types.map((type, index) => (
                  <span
                    key={`${type.name}-${index}`}
                    className="px-3 py-1 rounded-full text-sm bg-white bg-opacity-30"
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pokemon Details */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-500">Height</p>
                <p className="font-medium">{pokemon.height / 10} m</p>
              </div>
              <div>
                <p className="text-gray-500">Weight</p>
                <p className="font-medium">{pokemon.weight / 10} kg</p>
              </div>
              <div>
                <p className="text-gray-500">Base Experience</p>
                <p className="font-medium">{pokemon.base_experience}</p>
              </div>
              <div>
                <p className="text-gray-500">Abilities</p>
                <div>
                  {pokemon.abilities.map((ability: IAbility) => (
                    <p
                      key={ability.ability.name}
                      className="font-medium capitalize"
                    >
                      {ability.ability.name.replace("-", " ")}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Stats</h2>
            <div className="space-y-3">
              {pokemon.stats.map((stat: IStat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 capitalize">
                      {stat.stat.name.replace("-", " ")}
                    </span>
                    <span className="font-medium">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (stat.base_stat / 255) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Moves */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Moves</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {pokemon.moves.map((move: IMove) => (
                <div
                  key={move.move.name}
                  className="bg-gray-100 px-3 py-2 rounded-lg text-sm capitalize"
                >
                  {move.move.name.replace("-", " ")}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
