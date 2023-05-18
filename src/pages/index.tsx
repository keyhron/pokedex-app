import { useState } from "react";
import Container from "@/components/Atoms/Container";
import Title from "@/components/Atoms/Title";
import CardPokemon from "@/components/Molecules/CardPokemon";
import Pagination from "@/components/Molecules/Pagination";
import Navbar from "@/components/Organisms/Navbar";

import { IDataPokeApi, IResPokeApi } from "@/interfaces/api";
import { Pokemon } from "@/interfaces/pokemon";

export default function Home({ data }: { data: IDataPokeApi }) {
  const [pokemons, setPokemons] = useState<Pokemon[]>(data.pokemons);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<null | string>(data.next);
  const [previousPage, setPreviousPage] = useState<null | string>(
    data.previous
  );

  async function fetchData(isPrevious: boolean = false) {
    const fetchUrl = isPrevious ? previousPage : nextPage;
    if (fetchUrl) {
      try {
        const res = await fetch(fetchUrl);
        const { results, next, previous }: IResPokeApi = await res.json();

        const pokemonResponses = await Promise.all(
          results.map((result: { url: string; name: string }) =>
            fetch(result.url)
          )
        );
        const newPokemons: Pokemon[] = await Promise.all(
          pokemonResponses.map((res) => res.json())
        );

        setNextPage(next);
        setPreviousPage(previous);
        setPokemons(newPokemons);
        setPage((prev) => (isPrevious ? prev - 1 : prev + 1));
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handlePrevious = () => {
    fetchData(true);
  };
  const handleNext = () => {
    fetchData();
  };

  return (
    <div className="min-h-screen ">
      <Navbar />
      <Container className="my-10">
        <Title>Pokedex</Title>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pokemons.map((pokemon) => (
            <CardPokemon key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>

        <div className="w-full flex justify-center mt-10">
          <Pagination
            title="Pokemones"
            page={String(page)}
            totalPages={String(Math.ceil(data.count / 10))}
            totalItems={String(data.count)}
            disabledPreviousButton={previousPage === null}
            disabledNextButton={nextPage === null}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const pokeApiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=10`
  );
  const { results, ...rest }: IResPokeApi = await pokeApiResponse.json();

  const pokemonResponses = await Promise.all(
    results.map((result: { url: string; name: string }) => fetch(result.url))
  );
  const pokemons: Pokemon[] = await Promise.all(
    pokemonResponses.map((res) => res.json())
  );

  const data = {
    pokemons,
    ...rest,
  };

  return {
    props: {
      data,
    },
  };
}

