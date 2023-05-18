import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Button from "../Atoms/Button";

interface IButtonPag
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isNext?: boolean;
}

interface IPagination {
  className?: string;
  title: string;
  page: string;
  totalPages: string;
  totalItems: string;
  disabledPreviousButton: boolean;
  disabledNextButton: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

const ButtonPag = ({ children, isNext, ...rest }: IButtonPag) => (
  <Button
    className={`text-white bg-primary border-0 border-l border-white ${
      isNext ? "rounded-l" : "rounded-r"
    } hover:bg-black`}
    {...rest}
  >
    {children}
  </Button>
);

const Pagination = ({
  className,
  title,
  page,
  totalPages,
  totalItems,
  disabledPreviousButton,
  disabledNextButton,
  onNext,
  onPrevious,
}: IPagination) => (
  <div className={`flex flex-col items-center w-full ${className}`}>
    <span className="text-sm text-gray-700">
      <span className="font-semibold text-gray-900">{page}</span> a{" "}
      <span className="font-semibold text-gray-900">{totalPages}</span> de{" "}
      <span className="font-semibold text-gray-900">{totalItems}</span> {title}
    </span>
    <div className="flex mt-2 gap-1">
      <ButtonPag onClick={onPrevious} disabled={disabledPreviousButton}>
        Anterior
      </ButtonPag>
      <ButtonPag onClick={onNext} disabled={disabledNextButton} isNext>
        Siguiente
      </ButtonPag>
    </div>
  </div>
);

export default Pagination;

