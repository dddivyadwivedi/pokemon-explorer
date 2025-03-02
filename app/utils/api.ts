import { IPokemonDetail, IPokemonListResponse } from "../interfaces/interface";
import { Pokemon } from "../types/types";


const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 20, offset = 0): Promise<IPokemonListResponse> => {
    try {
        const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        const modifiedResults: Pokemon[] = data.results.map((pokemon: any) => {
            const id = pokemon.url.split('/')[6];
            return {
                ...pokemon,
                id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            };
        });

        return {
            ...data,
            results: modifiedResults
        };
    } catch (error) {
        console.error('Error fetching Pokemon list:', error);
        return { count: 0, next: null, previous: null, results: [] };
    }
};

export const getPokemonDetails = async (idOrName: string | number): Promise<IPokemonDetail | null> => {
    try {
        const response = await fetch(`${API_URL}/pokemon/${idOrName}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching Pokemon details for ${idOrName}:`, error);
        return null;
    }
};

export const searchPokemon = (name: string, pokemonList: Pokemon[]): Pokemon[] => {
    return pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
    );
};