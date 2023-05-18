const Loader = () => {
  return (
    <div
      className="fixed z-50 bg-black bg-opacity-30 flex items-center justify-center w-full h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="loader"
    >
      <svg className="loader" viewBox="25 25 50 50" stroke-width="5">
        <circle cx="50" cy="50" r="20" />
      </svg>
    </div>
  );
};

export default Loader;

