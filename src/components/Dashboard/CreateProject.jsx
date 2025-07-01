/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Chip,
  Box,
  InputAdornment,
  Modal,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { LuImageUp } from "react-icons/lu";
import { AiOutlineAudioMuted } from "react-icons/ai";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const employees = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Brown",
  "Charlie Davis",
  "David Lee",
];

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectTime, setProjectTime] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [employeeInput, setEmployeeInput] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [error, setError] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const handleAddEmployee = () => {
    if (employeeInput && !assignedEmployees.includes(employeeInput)) {
      setAssignedEmployees([...assignedEmployees, employeeInput]);
      setEmployeeInput("");
    }
  };

  const handleRemoveEmployee = (employee) => {
    setAssignedEmployees(assignedEmployees.filter((emp) => emp !== employee));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("audio/")) {
        setAudio(URL.createObjectURL(file));
        setError("");
      } else {
        setError("Please upload a valid audio file.");
        setAudio(null);
      }
    }
  };

  const handleSubmit = () => {
    console.log("Project Name:", projectName);
    console.log("Project Time:", projectTime);
    console.log("Project Description:", projectDescription);
    console.log("Assigned Employees:", assignedEmployees);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredEmployees(
      employees.filter((employee) =>
        employee.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSelectEmployee = (employee) => {
    setEmployeeInput(employee);
    setOpenModal(false);
  };

  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh]">
      <p className="text-xl font-medium mb-5">Create New Projects Template</p>

      <div className="bg-white px-6 py-10 rounded-lg">
        <div className="flex items-center gap-5 mb-5">
          <div className="w-full flex flex-col gap-2">
            <p className="font-medium">Projects Name</p>
            <TextField
              label="Enter Project Name"
              variant="outlined"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-medium">Start Date</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Select Start Date" />
            </LocalizationProvider>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-medium">End Date</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Select End Date" />
            </LocalizationProvider>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-medium">Project Time</p>
            <TextField
              label="Enter Project Time"
              variant="outlined"
              value={projectTime}
              onChange={(e) => setProjectTime(e.target.value)}
              fullWidth
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-medium">Upload Photo</p>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                height: "55px",
                textTransform: "none",
                outline: "none",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <div className="flex items-center gap-1 text-[#3F80AE]">
                <p>Upload</p>
                <LuImageUp />
              </div>

              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-medium">Upload Audio</p>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                height: "55px",
                textTransform: "none",
                outline: "none",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <div className="text-[#3F80AE]">
                <AiOutlineAudioMuted className="text-xl" />
              </div>

              <input type="file" hidden onChange={handleAudioUpload} />
            </Button>
          </div>
          {image && (
            <div className="w-1/2">
              <img
                src={image}
                alt="Uploaded"
                style={{
                  marginTop: "10px",
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
          {/* Display error message if any */}
          {error && <Typography color="error">{error}</Typography>}

          {/* Display uploaded audio */}
          {audio && (
            <div className="mt-3">
              <audio controls>
                <source src={audio} type="audio/mp3" />
              </audio>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <p className="font-medium">Project Description</p>
          <TextField
            label="Enter Projects Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between bg-[#ECF2F7] rounded-lg">
          <div className="flex items-center gap-2">
            <p className="bg-[#C3D8E6] p-4 rounded-l-lg font-medium">
              Assigned To
            </p>
            <div className="flex gap-2">
              {assignedEmployees.map((employee, index) => (
                <Chip
                  key={index}
                  label={employee}
                  onDelete={() => handleRemoveEmployee(employee)}
                  deleteIcon={<span style={{ color: "#CC0505" }}>×</span>}
                  sx={{
                    paddingX: "5px",
                  }}
                />
              ))}
            </div>
            <div className="flex">
              <TextField
                label="Mention Employee"
                fullWidth
                value={employeeInput}
                onClick={() => setOpenModal(true)}
                onChange={(e) => setEmployeeInput(e.target.value)}
              />
            </div>
          </div>
          <Button
            onClick={handleAddEmployee}
            disabled={!employeeInput}
            sx={{
              bgcolor: "#3F80AE",
              color: "white",
              padding: "10px",
              textTransform: "none",
              marginRight: "10px",
            }}
          >
            Mention Employee
          </Button>
        </div>
      </div>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          float: "right",
          marginTop: "20px",
          width: "300px",
          height: "50px",
          textTransform: "none",
          fontSize: "18px",
          bgcolor: "#3F80AE",
        }}
      >
        Send Now
      </Button>

      {/* Modal for Employee Selection */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: 4,
            borderRadius: 2,
          }}
        >
          <TextField
            label="Search Here"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            sx={{ marginBottom: "10px", bgcolor: "#ECF2F7" }}
          />
          <List>
            {filteredEmployees.map((employee, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleSelectEmployee(employee)}
              >
                <ListItemText
                  primary={employee}
                  sx={{
                    bgcolor: "#ECF2F7",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                />
              </ListItem>
            ))}
          </List>
          {/* <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button> */}
        </Box>
      </Modal>
    </div>
  );
};

export default CreateProject;
