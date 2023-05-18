import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Atoms/Container";
import Title from "@/components/Atoms/Title";
import PrintData from "@/components/Molecules/PrintData";
import Navbar from "@/components/Organisms/Navbar";

import { Pokemon } from "@/interfaces/pokemon";
import capitalize from "@/utils/capitalize";

export default function Pokemon({ pokemon }: { pokemon: Pokemon }) {
  console.log(pokemon);
  return (
    <div className="min-h-screen ">
      <Navbar />
      <Container className="my-10">
        <Link href="/" className="text-xs text-gray-500 underline">
          Volver al inicio
        </Link>

        <Title className="mt-2">{capitalize(pokemon.name)}</Title>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={100}
          height={100}
        />

        <div>
          <h2>
            <span className="font-bold">Peso:</span> {pokemon.weight / 10} Kg
          </h2>
          <h2>
            <span className="font-bold">Altura:</span> {pokemon.height / 10} Mts
          </h2>
        </div>

        <PrintData
          title="Habilidades:"
          array={pokemon.abilities}
          itemData="ability"
        />

        <PrintData title="Tipo:" array={pokemon.types} itemData="type" />

        <PrintData
          title="Estadísticas:"
          array={pokemon.stats}
          itemData="stat"
        />

        <PrintData title="Movimientos:" array={pokemon.moves} itemData="move" />
      </Container>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await res.json();
  return { props: { pokemon } };
}

