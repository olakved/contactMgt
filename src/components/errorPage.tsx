import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-background-dark h-screen w-screen">
      <div className="flex justify-center items-center h-full">
        <div className="text-primary-white flex flex-col items-center gap-[10px]">
          <MdErrorOutline className="text-[80px]" />
          <p>Page not found!</p>
          <button
            className="bg-primary-white cursor-pointer text-secondary-light-1 font-[600] px-4 py-2  rounded-lg"
            onClick={() => navigate(-1)}
            type="button"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
