import { useNavigate } from "react-router-dom";
import { MdContactMail, MdCorporateFare, MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

function SideBar() {
  const navlist = [
    {
      icon: <MdDashboard />,
      ttile: "Dashboard",
      path: "/user",
    },
    {
      icon: <MdContactMail />,
      ttile: "Contact",
      path: "/user/contact",
    },
    {
      icon: <MdCorporateFare />,
      ttile: "Corperate",
      path: "",
    },
    {
      icon: <HiUsers />,
      ttile: "Users",
      path: "",
    },
    {
      icon: <IoIosSettings />,
      ttile: "Settings",
      path: "/user/settings",
    },
  ];

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    if (path) {
      navigate(path);
    }
  };

  const currentPath = window.location.pathname;
  // const isPathActive = (path: string) => {
  //   if (currentPath === "/user" && path === "/user") return true;
  //   return currentPath.startsWith(path) && path !== "/user";
  // };

  const isPathActive = (path: string) => {
    if (!path) return false; // Don't make the background white if the path is empty
    if (currentPath === "/user" && path === "/user") return true;
    return currentPath.startsWith(path) && path !== "/user";
  };

  return (
    <div className="bg-background-dark h-screen py-[10px] flex flex-col justify-between">
      <div>
        <div>
          <p className="text-primary-white px-[20px] font-[700] text-[32px]">
            App
          </p>
        </div>
        <div className="pr-[5px] mt-[40px]">
          {navlist.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-[10px] px-[10px] py-[15px] shadow-sm cursor-pointer ${
                isPathActive(item.path) ? "bg-primary-white " : ""
              }`}
              onClick={() => handleNavigate(item.path)}
            >
              <div
                className={`text-[white] text-[18px] ${
                  isPathActive(item.path) && "text-background-dark"
                }`}
              >
                {item?.icon}
              </div>
              <p
                className={`text-[white] font-[500] text-[18px] leading-[26px] tracking-normal ${
                  isPathActive(item.path) && "text-background-dark"
                }`}
              >
                {item.ttile}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-[1px] border-primary-light-2 flex flex-col  gap-[5px] text-[14px] cursor-pointer pb-[20px] pt-[5px] px-[10px] text-primary-white">
        <p>olakved@gmail.com</p>
        <div className="flex items-center gap-1">
          <IoLogOut className="text-[20px]" />{" "}
          <p onClick={() => handleNavigate("/")}>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
