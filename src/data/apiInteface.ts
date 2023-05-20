import { IDataPokeApi, IResPokeApi } from "@/interfaces/api";
import { Pokemon } from "@/interfaces/pokemon";

interface TResponse<T> {
  data: T | null;
  error: string | null;
}

export const getPokemons = async (
  url: string
): Promise<TResponse<IDataPokeApi>> => {
  const abortController = new AbortController();

  try {
    const res = await fetch(url, { signal: abortController.signal });
    const { results, next, previous, count }: IResPokeApi = await res.json();

    const pokemonResponses = await Promise.all(
      results.map((result: { url: string; name: string }) =>
        fetch(result.url, { signal: abortController.signal })
      )
    );
    const pokemons: Pokemon[] = await Promise.all(
      pokemonResponses.map((res) => res.json())
    );

    return {
      data: { pokemons, next, previous, count },
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || "Fetch error {getPokemons}",
    };
  }
};

export const getPokemonById = async (
  id: string
): Promise<TResponse<Pokemon>> => {
  const abortController = new AbortController();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      signal: abortController.signal,
    });
    const pokemon: Pokemon = await res.json();
    return { data: pokemon, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || "Fetch error {getPokemonById}",
    };
  }
};

