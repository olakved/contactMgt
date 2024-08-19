import AppHeader from "../../layout/appHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoIosSettings, IoIosNotifications } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";

function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "General", path: "general", icon: <IoIosSettings /> },
    { label: "Security", path: "security", icon: <MdOutlineSecurity /> },
    {
      label: "Notifications",
      path: "notifications",
      icon: <IoIosNotifications />,
    },
  ];

  const activeTab = location.pathname.split("/user/settings/")[1] || "general";

  const handleTabNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <AppHeader title="Settings" />
      <div className="px-[40px] flex gap-[20px]">
        <div className="mt-[40px] bg-primary-white p-[20px] rounded-[12px] flex flex-col items-start w-[350px] h-full ">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => handleTabNavigation(tab?.path)}
              className={`flex items-center gap-[10px] py-2 font-[400] text-[16px] px-2 py-[15px] cursor-pointer w-full ${
                activeTab === tab?.path
                  ? "text-secondary-light-1 font-[500] bg-primary-light-2 rounded-[8px]  text-left"
                  : "text-primary-lighter "
              }`}
            >
              <p className="text-[20px]">{tab?.icon}</p>
              <p> {tab.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-[40px] p-[20px] bg-primary-white rounded-[12px] w-full min-h-[500px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Index;
