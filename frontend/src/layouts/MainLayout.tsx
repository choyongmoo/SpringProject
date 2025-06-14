import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen bg-background-dark">
        <main className="flex-1 mt-3 mb-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}