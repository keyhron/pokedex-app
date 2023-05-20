import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import PrintData from "@/components/Molecules/PrintData";

import { Pokemon } from "@/interfaces/pokemon";
import capitalize from "@/utils/capitalize";
import PageLayout from "@/components/Templates/PageLayout";

export default function Pokemon({ pokemon }: { pokemon: Pokemon }) {
  return (
    <PageLayout title={capitalize(pokemon.name)} linkTitle="Ir al inicio">
      <Image
        data-cy="pokemon-image"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={100}
        height={100}
      />

      <div>
        <h2 data-cy="pokemon-weigth">
          <b>Peso:</b> {pokemon.weight / 10} Kg
        </h2>
        <h2 data-cy="pokemon-heigth">
          <b>Altura:</b> {pokemon.height / 10} Mts
        </h2>
      </div>

      <PrintData
        data-cy="pokemon-abilities"
        title="Habilidades:"
        array={pokemon.abilities}
        itemData="ability"
      />

      <PrintData
        data-cy="pokemon-types"
        title="Tipo:"
        array={pokemon.types}
        itemData="type"
      />

      <PrintData
        data-cy="pokemon-stats"
        title="Estadísticas:"
        array={pokemon.stats}
        itemData="stat"
      />

      <PrintData
        data-cy="pokemon-moves"
        title="Movimientos:"
        array={pokemon.moves}
        itemData="move"
      />
    </PageLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pk: Pokemon = await res.json();

  return {
    props: {
      pokemon: {
        sprites: pk.sprites,
        name: pk.name,
        weight: pk.weight,
        height: pk.height,
        abilities: pk.abilities,
        types: pk.types,
        stats: pk.stats,
        moves: pk.moves,
      },
    },
  };
}

