import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, Menu, Globe, X, User, Package, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Navlist from "@/components/shared/Navlist";

import i1 from "@/assets/Group 1116606595 (2).png"

export default function Header() {
  const navigate = useNavigate();
  const reduxUserName = useSelector((state: RootState) => state.auth?.userName);
  const userName = reduxUserName || localStorage.getItem("userName") || "Guest";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getFirstLetter = (name: string) => {
    return name ? name.trim().charAt(0).toUpperCase() : "G";
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setIsProfileOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative flex h-full w-full items-center justify-between px-4 md:px-6 text-white select-none">
      <div className="flex items-center gap-3 md:gap-5 flex-1 max-w-2xl">
        <button
          onClick={toggleMobileMenu}
          className="flex md:hidden items-center justify-center p-1.5 text-gray-300 hover:text-white bg-white/5 active:bg-white/10 rounded-lg transition-all"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div>
          <img
            src={i1}
            alt="fastcart"
            className="w-[200px] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        <div className="relative lg:block hidden w-full max-w-[160px] sm:max-w-xs lg:ml-10">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search size={16} className="md:size-[18px]" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white/5 md:bg-transparent py-1.5 md:py-2 pl-9 md:pl-10 pr-3 md:pr-4 text-xs md:text-sm text-white placeholder-gray-400 outline-none border border-transparent rounded-2xl focus:border-white/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5">
        <div className="flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-white/5 md:border-white/10 cursor-pointer transition-all">
          <Globe size={14} className="text-emerald-500 md:size-[16px]" />
          <span className="text-[11px] md:text-xs font-bold text-gray-200">EN</span>
          <ChevronDown size={10} className="text-gray-400 md:size-[12px]" />
        </div>
        <ThemeToggle />
        <div className="hidden sm:block h-5 w-[1px] bg-gray-700/60" />
        <button className="relative flex items-center justify-center text-gray-300 hover:text-white transition-colors">
          <Bell size={18} className="md:size-[20px]" />
          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#2563eb] text-[9px] font-bold text-white ring-2 ring-[#1e2640]">
            5
          </span>
        </button>
        <div className="h-5 w-[1px] bg-gray-700/60" />
        <div className="relative">
          <div
            onClick={toggleProfileMenu}
            className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="flex h-7 w-7 md:h-9 md:w-9 items-center justify-center rounded-full bg-[#10b981] text-xs md:text-base font-bold text-white tracking-wider shadow-sm shrink-0">
              {getFirstLetter(userName)}
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors max-w-[120px] truncate">
                {userName}
              </span>
              <ChevronDown
                size={14}
                className={`text-gray-400 group-hover:text-white transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </div>
          </div>
          {isProfileOpen && (
            <>              <div
              className="fixed inset-0 z-40"
              onClick={() => setIsProfileOpen(false)}
            ></div>
              <div className="absolute right-0 top-full mt-3 w-48 rounded-xl bg-[#1a1a1a] border border-[#333] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col py-1.5">
                  <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left">
                    <User size={16} />
                    <span>Account</span>
                  </button>
                  <button onClick={() => navigate("/orders")} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left">
                    <Package size={16} />
                    <span>My Order</span>
                  </button>
                  <div className="h-[1px] w-full bg-[#333] my-1.5"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1e2640] border-t border-white/10 p-4 shadow-2xl z-50 md:hidden">
          <div className="bg-[#141b30] p-3 rounded-xl border border-white/5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-2">
              Navigation Menu
            </p>
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <Navlist />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}