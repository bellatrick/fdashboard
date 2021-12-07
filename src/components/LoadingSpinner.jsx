const LoadingSpinner = ({height,width}) => {
  return (
    <div>
      <div className=" flex justify-center items-center">
        <div data-testid='animate-spin' className={`animate-spin rounded-full h-${height} w-${width} border-t-2 border-b-2 border-green-400}`}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
