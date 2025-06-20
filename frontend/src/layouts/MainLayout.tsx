import { Outlet } from "react-router";
import { Header } from "../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
