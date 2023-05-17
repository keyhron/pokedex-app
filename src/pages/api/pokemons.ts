// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Pokemon } from "@/interfaces/pokemon";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon[]>
) {
  const pageSize = 10;
  const { page = 1 } = req.query;

  // Calcular el índice de inicio y el índice de fin de la página actual
  const offset = (Number(page) - 1) * Number(pageSize);

  const pokeApiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&${offset}`
  );
  const { results } = await pokeApiResponse.json();

  const pokemonResponses = await Promise.all(
    results.map((result: { url: string; name: string }) => fetch(result.url))
  );
  const pokemonData = await Promise.all(
    pokemonResponses.map((res) => res.json())
  );

  res.status(200).json(pokemonData);
}

