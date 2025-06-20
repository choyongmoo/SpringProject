import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div>
      <Sidebar />
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
