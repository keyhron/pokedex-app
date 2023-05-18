import NextHead from "next/head";

const title = "Pokedex App";
const URL = process.env.NEXT_PUBLIC_URI;
const description =
  "Descubre todos los secretos de los Pokémon con nuestra aplicación de Pokédex. Encuentra información detallada sobre cada Pokémon, incluyendo su nombre, descripción, tipo, habilidades, estadísticas y mucho más. Además, nuestra aplicación cuenta con una amplia galería de imágenes para que puedas ver cada Pokémon en detalle. ¡Conviértete en un maestro Pokémon y descubre todo lo que necesitas saber sobre tus criaturas favoritas con nuestra aplicación de Pokédex! Descarga ahora y comienza tu aventura Pokémon.";
const ogImage = "/images/pokedex-hand.jpg";

const Head = () => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta
      name="keywords"
      content="Pokédex, Pokémon, Información detallada sobre cada Pokémon, Tipos de Pokémon, Habilidades de Pokémon, Estadísticas de Pokémon, Galería de imágenes de Pokémon, Maestro Pokémon, Aventura Pokémon, Descarga de Pokédex, Criaturas Pokémon, Aplicación de Pokédex."
    />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    {/* PWA primary color */}
    <meta name="theme-color" content="red" />

    {/* Helps prevent duplicate content issues */}
    <link rel="canonical" href={URL} />

    {/* Name of web application (only should be used if the website is used as an app) */}
    <meta name="application-name" content={title} />

    <link rel="manifest" href="/site.webmanifest" />
    <link rel="shortcut icon" href="/svgs/pokedex.svg" />

    <meta property="og:site_name" content="Guanare Market" />
    <meta property="og:type" content="website" />
    <meta name="og:url" content={URL} />
    <meta name="og:title" content={title} />
    <meta name="og:description" content={description} />
    <meta name="omg:image" content={ogImage} />
    <meta property="og:image:alt" content={title} />
    <meta name="omg:image:width" content="1200" />
    <meta name="omg:image:height" content="630" />
    <meta name="twitter:site" content={URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage} />
  </NextHead>
);

export default Head;

