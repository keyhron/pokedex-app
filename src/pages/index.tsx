import { useEffect, useState } from "react";
import Container from "@/components/Atoms/Container";
import Title from "@/components/Atoms/Title";
import CardPokemon from "@/components/Molecules/CardPokemon";
import Pagination from "@/components/Molecules/Pagination";
import Navbar from "@/components/Organisms/Navbar";

import { IResPokeApi } from "@/interfaces/api";
import { Pokemon } from "@/interfaces/pokemon";
import Loader from "@/components/Atoms/Loader";

type ITypeFetch = "previous" | "next" | "initial";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<null | string>(null);
  const [previousPage, setPreviousPage] = useState<null | string>(null);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [loading, setLoading] = useState(true);

  async function fetchData(type: ITypeFetch = "next") {
    setLoading(true);
    let fetchUrl: string | null = "https://pokeapi.co/api/v2/pokemon/?limit=10";

    if (type === "next") {
      fetchUrl = nextPage;
    }
    if (type === "previous") {
      fetchUrl = previousPage;
    }

    if (fetchUrl) {
      const abortController = new AbortController();

      try {
        const res = await fetch(fetchUrl, { signal: abortController.signal });
        const { results, next, previous, count }: IResPokeApi =
          await res.json();

        const pokemonResponses = await Promise.all(
          results.map((result: { url: string; name: string }) =>
            fetch(result.url, { signal: abortController.signal })
          )
        );
        const newPokemons: Pokemon[] = await Promise.all(
          pokemonResponses.map((res) => res.json())
        );

        setNextPage(next);
        setPreviousPage(previous);
        setPokemons(newPokemons);
        setTotalPokemons(count);
        setPage((prev) =>
          type === "initial" ? 1 : type === "previous" ? prev - 1 : prev + 1
        );
      } catch (error: any) {
        if (error?.name === "AbortError") {
          console.log("La solicitud fue cancelada.");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }
  }

  const handlePrevious = () => {
    fetchData("previous");
  };
  const handleNext = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData("initial");
  }, []);

  return (
    <div className="min-h-screen ">
      <Navbar />
      <Container className="my-10">
        <Title>Pokedex</Title>
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Loader />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {pokemons.map((pokemon) => (
                <CardPokemon key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
            <div className="w-full flex justify-center mt-10">
              <Pagination
                title="Pokemones"
                page={String(page)}
                totalPages={String(Math.ceil(totalPokemons / 10))}
                totalItems={String(totalPokemons)}
                disabledPreviousButton={previousPage === null}
                disabledNextButton={nextPage === null}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

