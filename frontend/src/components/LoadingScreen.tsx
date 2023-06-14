interface ILoadingScreenProps {
  message: string;
}

const LoadingScreen: React.FC<ILoadingScreenProps> = ({ message }) => {
  return (
    <div className="bg-neutral-100 h-screen flex justify-center items-center">
      <h1 className="font-bold">{message}</h1>
    </div>
  );
};

export default LoadingScreen;
