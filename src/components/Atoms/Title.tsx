import { Righteous } from "next/font/google";

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
  display: "swap",
});

const Title = ({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => (
  <h1
    className={`${righteous.className} font-righteous text-sm md:text-xl w-max mb-5 ${className}`}
    data-cy="title"
    {...props}
  >
    {children}
    <div className="h-[3px] bg-red-500 w-11/12 rounded-sm" />
  </h1>
);

export default Title;

