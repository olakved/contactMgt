// import { FaCircleUser } from "react-icons/fa6";
import ImageUpload from "../../../../../shared/upload/ImageUpload";

function UpdateProfileImage() {
  return (
    <div>
      <ImageUpload successWatcher={false} acceptType="image/*" />
      {/* <FaCircleUser className="text-background-dark w-[150px] h-[150px]" /> */}
    </div>
  );
}

export default UpdateProfileImage;
