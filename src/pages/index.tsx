import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/Atoms/Container";
import CardPokemon from "@/components/Molecules/CardPokemon";
import Navbar from "@/components/Organisms/Navbar";

import { Pokemon } from "../interfaces/pokemon";

export default function Home({ data }: { data: Pokemon[] }) {
  const [pokemons, setPokemons] = useState<Pokemon[]>(data);
  const [page, setPage] = useState(1);

  async function fetchData() {
    try {
      const res = await fetch(`/api/pokemons?page=${page}`);
      const { pageData } = await res.json();

      setPokemons(pageData);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(pokemons);

  useEffect(() => {
    if (page !== 1) {
      fetchData();
    }
  }, [page]);

  return (
    <div className="min-h-screen ">
      <Navbar />
      <Container className="my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pokemons.map((pokemon) => (
            <CardPokemon key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/pokemons");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

