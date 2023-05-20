import Loader from "@/components/Atoms/Loader";
import Container from "@/components/Atoms/Container";
import Title from "@/components/Atoms/Title";
import CardPokemon from "@/components/Molecules/CardPokemon";
import Pagination from "@/components/Molecules/Pagination";
import Navbar from "@/components/Organisms/Navbar";
import usePokemon from "@/hooks/usePokemon";

export default function Home() {
  const {
    // Values
    loading,
    nextPage,
    page,
    pokemons,
    previousPage,
    totalPokemons,
    // Methods
    handleNext,
    handlePrevious,
  } = usePokemon();

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

