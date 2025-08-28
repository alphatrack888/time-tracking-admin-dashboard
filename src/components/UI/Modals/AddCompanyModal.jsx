import React, { useState } from "react";
import {
  Modal,
  TextField,
  Box,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { FaUpload } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useCreateCompanyMutation } from "../../../Redux/api/companyApi";
import { toast } from "sonner";

export default function AddCompanyModal({
  openAddCompanyModal,
  handleCloseAddCompanyModal,
}) {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [companyLogo, setCompanyLogo] = useState(undefined);
  const [logoPreview, setLogoPreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [createCompany] = useCreateCompanyMutation();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCompany = async () => {
    const errors = {};
    if (!companyName) errors.name = "Company Name is required";
    if (!companyEmail) errors.email = "Company Email is required";
    if (!companyLocation) errors.location = "Company Location is required";
    if (!companyPhone) errors.phone = "Company Phone is required";
    if (!companyLogo) errors.logo = "Company Logo is required";
    if (!companyPassword) errors.password = "Company Password is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formData = new FormData();
    const companyDetails = {
      name: companyName,
      email: companyEmail,
      address: companyLocation,
      phone: companyPhone,
      password: companyPassword,
      role: "company",
    };

    formData.append("data", JSON.stringify(companyDetails));
    if (companyLogo) formData.append("images", companyLogo);

    try {
      const response = await createCompany(formData).unwrap();
      console.log("Company created successfully:", response);
      toast.success("Company Created Successfully..!");

      // Reset form
      setCompanyName("");
      setCompanyEmail("");
      setCompanyLocation("");
      setCompanyPhone("");
      setCompanyPassword("");
      setCompanyLogo(undefined);
      setLogoPreview(null);
      setFormErrors({});

      handleCloseAddCompanyModal();
    } catch (error) {
      console.error("Error creating company:", error);
      toast.error("Failed to create company");
      setFormErrors({
        submit: "Failed to create company. Please try again later.",
      });
    }
  };

  return (
    <Modal
      open={openAddCompanyModal}
      onClose={handleCloseAddCompanyModal}
      aria-labelledby="add-company-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <p className="text-[#1c1c1c] font-medium text-2xl mb-4">Add Company</p>
        <form className="flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            <TextField
              label="Company Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              label="Company Email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </div>
          <div className="flex gap-4 items-center">
            <TextField
              label="Company Location"
              fullWidth
              variant="outlined"
              margin="normal"
              value={companyLocation}
              onChange={(e) => setCompanyLocation(e.target.value)}
              error={!!formErrors.location}
              helperText={formErrors.location}
            />
            <TextField
              label="Company Phone"
              fullWidth
              variant="outlined"
              margin="normal"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
            />
          </div>

          <div className="flex items-center gap-4 w-full">
            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                style={{ display: "none" }}
                id="company-logo-upload"
              />
              <label htmlFor="company-logo-upload">
                <Button
                  component="span"
                  sx={{
                    width: "100%",
                    marginTop: "10px",
                    height: "55px",
                    border: "1px solid #3F80AE",
                  }}
                >
                  <div className="flex items-center gap-2 text-[#3F80AE]">
                    <FaUpload />
                    <p>Upload Company Logo</p>
                  </div>
                </Button>
              </label>
              {logoPreview && (
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      marginTop: "10px",
                    }}
                  />
                </div>
              )}
              {formErrors.logo && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formErrors.logo}
                </p>
              )}
            </div>
            <div className="w-full">
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your password"
                value={companyPassword}
                onChange={(e) => setCompanyPassword(e.target.value)}
                error={!!formErrors.password}
                helperText={formErrors.password}
                InputProps={{
                  startAdornment: <MdOutlineLock className="mr-2" />,
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
                        {showPassword ? (
                          <IoEyeOff className="text-2xl text-[#3F80AE]" />
                        ) : (
                          <IoEye className="text-2xl text-[#3F80AE]" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={handleCloseAddCompanyModal}
              sx={{
                bgcolor: "#f0f0f0",
                color: "black",
                textTransform: "none",
                width: "100px",
                padding: "10px",
                "&:hover": { bgcolor: "#e0e0e0" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCompany}
              sx={{
                bgcolor: "#3F80AE",
                color: "#fff",
                textTransform: "none",
                width: "130px",
                padding: "10px",
                "&:hover": { bgcolor: "#70a4c7" },
              }}
            >
              Add Company
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
