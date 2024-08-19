import { Outlet } from "react-router-dom";
import SideBar from "../components/appNav/sideBar";
const DashboardLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <section className="grid grid-cols-[260px_1fr] h-screen overflow-auto mdxl:block bg-background-borderlight">
        <aside className="sticky top-0 h-screen mdxl:hidden">
          <SideBar />
        </aside>
        {/* <main className="mdxl:w-full w-full"> */}
        <main className="w-full h-full overflow-hidden">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default DashboardLayout;
