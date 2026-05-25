import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Sidebar from "../components/shared/Sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen w-full flex-col bg-[#f8fafc] dark:bg-slate-900 transition-colors duration-200 overflow-hidden">
      <header className="h-16 w-full bg-[#1e2640] border-b border-gray-800 shrink-0 z-20">
        <Header />
      </header>
      <div className="flex flex-1 w-full overflow-hidden">
        <aside className="hidden md:block w-64 min-w-[256px] bg-[#1e2640] border-r border-gray-800 shrink-0 overflow-y-auto">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto w-full min-w-[320px]">
          <div className="mx-auto max-w-7xl h-full p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}