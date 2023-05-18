import { DetailedHTMLProps, HTMLAttributes } from "react";

const Container = ({
  children,
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <div
    className={`min-h-screen md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto w-full px-3 md:px-0 ${className}`}
    {...rest}
  >
    {children}
  </div>
);
export default Container;

