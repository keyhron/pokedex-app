import { ReactNode } from "react";
import Link from "next/link";
import Title from "@/components/Atoms/Title";
import Container from "@/components/Atoms/Container";
import Navbar from "@/components/Organisms/Navbar";

export default function PageLayour({
  title,
  linkTitle,
  href = "/",
  children,
}: {
  title?: string;
  linkTitle?: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <Container className="my-10">
        {linkTitle && (
          <Link
            data-cy="link-to-home"
            href={href}
            className="text-xs text-gray-500 underline mb-2"
          >
            {linkTitle}
          </Link>
        )}
        {title && <Title>{title}</Title>}

        {children}
      </Container>
    </div>
  );
}

