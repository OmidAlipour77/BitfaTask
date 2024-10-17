import { BounceLoader } from "react-spinners";

function Loader({ isLoading = false }) {
  return (
    <>
      {isLoading ? (
        <div className="spinner-overlay h-screen w-screen fixed top-0 left-0 grid place-content-center">
          <BounceLoader color="#36d7b7" size={60} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Loader;
