import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FaRegEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    setError("");
    console.log("Password change request submitted");
  };

  return (
    <div className="px-10 py-8 bg-[#efefef] h-[91vh] rounded-lg">
      <div className="bg-white py-40 rounded-lg">
        <div className="max-w-2xl mx-auto bg-[#C3D8E6] p-20 rounded-lg">
          <p className="text-3xl font-semibold text-center pb-10 text-[#39749E]">
            Change Your Password
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              {/* Old Password Field */}
              <div>
                <TextField
                  label="Old Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <IoMdEyeOff /> : <FaRegEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {/* New Password Field */}
              <div>
                <TextField
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showNewPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowNewPassword}
                          edge="end"
                        >
                          {showNewPassword ? <IoMdEyeOff /> : <FaRegEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {/* Confirm New Password Field */}
              <div>
                <TextField
                  label="Confirm New Password"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showConfirmPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <IoMdEyeOff /> : <FaRegEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {/* Error Message */}
              {error && (
                <div>
                  <Typography color="error">{error}</Typography>
                </div>
              )}
              {/* Submit Button */}
              <div>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#3F80AE",
                    color: "white",
                    fontSize: "16px",
                    textTransform: "none",
                    padding: "10px",
                    float: "right",
                  }}
                  type="submit"
                  fullWidth
                >
                  Confirm
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
