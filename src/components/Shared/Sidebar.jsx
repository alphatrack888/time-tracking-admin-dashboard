import { useState } from "react";

import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
import { RiFolderOpenLine } from "react-icons/ri";
import { RiKey2Fill } from "react-icons/ri";
import { LuShieldCheck } from "react-icons/lu";
import { LuCookingPot } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { FaPodcast } from "react-icons/fa6";
import { SiSpeedtest } from "react-icons/si";
import { PiBellSimpleRingingBold, PiFileTextBold } from "react-icons/pi";

import { Link, NavLink, useNavigate } from "react-router-dom";

import logo from "../../../public/Images/logo.png";
import { Button } from "@mui/material";

export default function Sidebar() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (path) => {
    setSelected(path);
  };

  const handleLogout = () => {
    // ProtectedRoute (src/utils/ProtectedRoute.jsx) and every API slice
    // read the session token from sessionStorage, not localStorage — this
    // was clearing the wrong storage, so "Log Out" never actually revoked
    // access: navigating back or reloading a protected route afterward
    // still worked, since the real token was untouched.
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user");
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="bg-white h-screen w-full">
      <div className="flex flex-col items-center gap-4 py-5">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="" className="h-12 mx-auto" />
        </Link>
        <hr className="w-24 border border-[#E0E1E2]" />
      </div>
      <div className="flex flex-col px-4 py-3 gap-1">
        {[
          {
            to: "/dashboard",
            icon: <MdOutlineDashboard fontSize={24} />,
            label: "Overview",
          },
          {
            to: "/all-companies",
            icon: <FaRegUser fontSize={24} />,
            label: "All Company List",
          },
          {
            to: "/reports",
            icon: <PiFileTextBold fontSize={24} />,
            label: "Reports",
          },
          {
            to: "/notifications",
            icon: <PiBellSimpleRingingBold fontSize={24} />,
            label: "Notifications",
          },

          {
            to: "/change-password",
            icon: <RiKey2Fill fontSize={24} />,
            label: "Change Password",
          },
          {
            to: "/privacy-policy",
            icon: <LuShieldCheck fontSize={24} />,
            label: "Privacy Policy",
          },
          {
            to: "/subscription",
            icon: <FaPodcast fontSize={24} />,
            label: "Subscription",
          },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => handleSelect(to)}
            className={({ isActive }) =>
              `flex items-center font-medium gap-3 text-base py-2 px-2 rounded-md 
              ${
                isActive
                  ? "bg-[#3F80AE] text-[#fff]"
                  : selected === to
                  ? "bg-[#3F80AE] text-black"
                  : "text-black"
              }
              hover:bg-[#70a4c7] hover:text-[#fff]`
            }
          >
            {icon}
            <p>{label}</p>
          </NavLink>
        ))}
        <Button
          sx={{
            color: "black",
            textTransform: "none",
            padding: "8px",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "4px",
            gap: "12px",
            ":hover": { backgroundColor: "#70a4c7", color: "#fff" },
          }}
          onClick={() => {
            handleLogout();
          }}
        >
          <MdLogout className="text-2xl" />
          <p className="font-semibold">Log Out</p>
        </Button>
      </div>
    </div>
  );
}
