import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Atoms/Container";

const NotFoundPage = () => {
  return (
    <Container className="flex justify-center items-center flex-col">
      <h1 className="font-bold text-lg">404 - Page Not Found</h1>
      <Link href="/" className="underline text-gray-500 text-sm my-4">
        Volver al inicio
      </Link>

      <Image
        src="/images/pokemon-sad.jpg"
        alt="Pokemon sad"
        width={200}
        height={200}
        className="object-cover"
      />
    </Container>
  );
};

export default NotFoundPage;

