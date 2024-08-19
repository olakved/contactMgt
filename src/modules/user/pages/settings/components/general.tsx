import PersonalInfo from "./personalInfo";
import UpdateProfileImage from "./updateProfileImage";

interface GeneralSettingItem {
  title: string;
  subtitle: string;
}

function GeneralSettings() {
  const renderComponent = (title: string): JSX.Element | null => {
    switch (title) {
      case "Profile Photo":
        return <UpdateProfileImage />;
      case "Personal Information":
        return <PersonalInfo />;
      default:
        return null;
    }
  };

  const generalSettingsList: GeneralSettingItem[] = [
    {
      title: "Profile Photo",
      subtitle: "Update your profile photo",
    },
    {
      title: "Personal Information",
      subtitle: "Update another setting",
    },
  ];

  return (
    <div>
      {generalSettingsList.map((setting, index) => (
        <div
          key={index}
          className="flex mb-4 py-[20px] border-b-[1px] border-background-borderlight"
        >
          <div className="w-[30%]">
            <p className="font-[600] text-[18px] leading-[32px] text-primary-main">
              {setting.title}
            </p>
            <p className="text-[14px] leading-[24px] font-[400] text-primary-light">
              {setting.subtitle}
            </p>
          </div>
          <div className="w-[70%]">{renderComponent(setting.title)}</div>
        </div>
      ))}
    </div>
  );
}

export default GeneralSettings;
