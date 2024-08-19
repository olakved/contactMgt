import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LayoutWrapper from "./layout/layoutWrapper";
import HomePage from "./pages/homepage";
import DashboardLayout from "./modules/dashboard";
import ContactList from "./modules/user/pages/contactList/contactList";
import MessageDetails from "./modules/user/pages/contactList/messageDetails";
import ErrorPage from "./components/errorPage";
import UserDashboard from "./modules/user/pages/userDashboard/userDashboard";
import Settings from "./modules/user/pages/settings";
import GeneralSettings from "./modules/user/pages/settings/components/general";
import SecuritySettings from "./modules/user/pages/settings/components/security";
import NotificationSettings from "./modules/user/pages/settings/components/notifications";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <LayoutWrapper>
            <HomePage />
          </LayoutWrapper>
        }
      />
      <Route path="/user" element={<DashboardLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="contact" element={<ContactList />} />
        <Route path="contact/:id" element={<MessageDetails />} />
        <Route path="settings" element={<Settings />}>
          <Route index element={<GeneralSettings />} />
          <Route path="general" element={<GeneralSettings />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="notifications" element={<NotificationSettings />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
