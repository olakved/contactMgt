import AppHeader from "../../layout/appHeader";
import DashboardCards from "./dashboardCards";

function UserDashboard() {
  return (
    <div>
      <div>
        <AppHeader title="User Dashboard" />
      </div>
      <div className="px-[40px] mt-[40px]">
        <div>
          <DashboardCards />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
