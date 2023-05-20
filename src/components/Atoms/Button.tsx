import {
  useState,
  useEffect,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
} from "react";

const Button = ({
  className,
  children,
  onClick,
  color,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <button
      className={`relative overflow-hidden rounded-lg py-1 px-3 xl:p-2 xl:px-5 font-semibold ripple-button transition-all bg-red-500 hover:bg-red-700 text-white disabled:bg-gray-600`}
      onClick={(e) => {
        const rect = (e.target as any).getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
      {...props}
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ""
      )}
      <span className="flex items-center justify-center">{children}</span>
    </button>
  );
};

export default Button;

