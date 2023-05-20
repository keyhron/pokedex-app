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
    <p className="text-sm text-center" data-cy="pagination-text-total">
      Hay un total de <span className="font-semibold">{totalItems}</span>{" "}
      {title}
    </p>
    <p data-cy="pagination-text-pagination">
      <span className="font-semibold">Página {page}</span> de{" "}
      <span className="font-semibold">{totalPages}</span>
    </p>
    <div className="flex mt-2 gap-1">
      <ButtonPag
        data-cy="pagination-btn-previous"
        onClick={onPrevious}
        disabled={disabledPreviousButton}
      >
        Anterior
      </ButtonPag>
      <ButtonPag
        data-cy="pagination-btn-next"
        onClick={onNext}
        disabled={disabledNextButton}
        isNext
      >
        Siguiente
      </ButtonPag>
    </div>
  </div>
);

export default Pagination;

