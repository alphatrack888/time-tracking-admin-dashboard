import { PiBellSimpleRingingBold } from "react-icons/pi";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import profileImg from "../../../public/Images/profile.png";

export default function Header() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="flex items-center justify-end bg-[#fff] w-full px-10 py-4">
      <div className="flex items-center gap-4">
        <div className="bg-[#f0f0f0] p-2 rounded-full hover:bg-[#E0E1E2] transition-colors duration-300">
          <Link to="/notifications">
            <PiBellSimpleRingingBold fontSize={24} />
          </Link>
        </div>
        <Button
          sx={{
            color: "black",
            textTransform: "none",
            padding: "5px",
            width: "100%",
            float: "right",
          }}
          onClick={handleProfileClick}
          variant="text"
        >
          <div className="flex items-center gap-2">
            <img
              src={profileImg}
              alt=""
              className="size-8 rounded-full border border-white"
            />
            <div className="flex flex-col items-start">
              <p className="text-black font-medium">User Name</p>
              <p className="text-black font-medium text-xs">Admin</p>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}
