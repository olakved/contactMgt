import { FaUser } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";

type AppHeaderProps = {
  title: string;
};
function AppHeader({ title }: AppHeaderProps) {
  return (
    <div className="w-full p-[20px] bg-primary-light-2">
      <div className="flex justify-between items-center">
        <p className="text-primary-main font-[500] text-[22px]">{title}</p>
        <div className="flex items-center gap-[15px]">
          <div className="relative cursor-pointer ">
            <IoNotifications className="text-background-dark text-[25px]" />
            <div className="absolute top-[-5px] right-[-3px] border-[1px] border-statusText-error p-[2px] rounded-[100%]">
              <p className="w-[7px] h-[7px] bg-statusText-error rounded-[50%] animate-pulse"></p>
            </div>
          </div>
          <div className="flex items-center justify-center w-[40px] cursor-pointer text-primary-white h-[40px] bg-background-dark rounded-[50%]">
            <FaUser />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
