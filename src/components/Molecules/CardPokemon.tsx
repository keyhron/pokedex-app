import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/interfaces/pokemon";
import capitalize from "@/utils/capitalize";
import formattedDate from "@/utils/formattedDate";

const CardPokemon = ({
  pokemon,
  className,
}: {
  pokemon: Pokemon;
  className?: string;
}) => {
  return (
    <Link
      className={`bg-white border border-gray-200 rounded-lg shadow ${className}`}
      href={`/pokemon/${pokemon.id}`}
    >
      <div className="relative bg-white w-full rounded-t-lg flex items-center justify-center bg-gradient-to-t from-[#ff6c6c3d] via-transparent to-transparent">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={240}
          height={240}
        />

        <div className="w-full absolute bottom-4 flex items-center justify-between px-6">
          <h2 className="text-sm">{formattedDate()}</h2>
          <button className="outline-none border-0 rounded-2xl text-white bg-red-600 w-32 text-xs h-6">
            {pokemon.weight / 10} Kg
          </button>
        </div>
      </div>
      <div className="h-32 p-4 flex flex-col justify-between">
        <h1 className="text-lg font-bold">{capitalize(pokemon.name)}</h1>
        <div className="flex flex-wrap">
          {pokemon.moves?.slice(0, 10).map((move) => (
            <p key={move.move.url} className="text-xs mr-1">
              #{capitalize(move.move.name)}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default CardPokemon;

