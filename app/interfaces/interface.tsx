import { Pokemon } from "../types/types";

export interface IPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface IAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface IStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IType {
  name: string;
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

export interface ISprites {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface IPokemonDetail {
  id: number;
  name: string;
  image: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: IAbility[];
  stats: IStat[];
  types: IType[];
  moves: IMove[];
  sprites: ISprites;
  species: {
    name: string;
    url: string;
  };
}

export interface ISearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export interface IPokemonCardProps {
  pokemon: Pokemon;
}

export interface IPokemonListProps {
  pokemonList: Pokemon[];
}

export interface IHomeProps {
  initialPokemonList: Pokemon[];
}
