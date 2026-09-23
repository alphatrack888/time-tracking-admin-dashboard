import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import profileImg from "../../../public/Images/profile.png";
import NotificationBell from "./NotificationBell";

export default function Header() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="flex items-center justify-end bg-[#fff] w-full px-10 py-4">
      <div className="flex items-center gap-4">
        <NotificationBell />
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
