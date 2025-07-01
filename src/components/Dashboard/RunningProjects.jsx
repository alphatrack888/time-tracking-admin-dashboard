/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Modal,
  Button,
} from "@mui/material";
import { GoEye } from "react-icons/go";
import { AiTwotoneDelete } from "react-icons/ai";
import { PiNotepadBold } from "react-icons/pi";

const projectData = [
  {
    serialNo: 1,
    projectName: "Laundry Service for Spark Laundry",
    assignedEmployee: "Alice Johnson",
    description:
      "Complete laundry services for Spark Laundry including washing, drying, and folding.",
    status: "Completed",
    note: "Completed within time frame.",
    keyFeatures: [
      "High-quality service",
      "Fast turnaround time",
      "Eco-friendly detergent",
    ],
    workingTime: [
      { type: "Manual", time: "5 hours" },
      { type: "Overtime", time: "0 hours" },
    ],
    projectImage: "/public/Images/projectImage.png",
  },
  {
    serialNo: 2,
    projectName: "Home Cleaning for Fresh Cleaners",
    assignedEmployee: "Bob Smith",
    description:
      "Full-service home cleaning including vacuuming, dusting, and sanitizing.",
    status: "Ongoing",
    note: "Cleaning process is underway.",
    keyFeatures: [
      "Thorough cleaning",
      "Customer satisfaction",
      "Flexible scheduling",
    ],
    workingTime: [
      { type: "Manual", time: "4 hours" },
      { type: "Overtime", time: "1 hour" },
    ],
    projectImage: "/public/Images/projectImage.png",
  },
  {
    serialNo: 3,
    projectName: "Office Cleaning for OfficeShine",
    assignedEmployee: "Carol White",
    description:
      "Office cleaning service, including desks, carpets, and high-touch areas.",
    status: "Completed",
    note: "Completed successfully.",
    keyFeatures: [
      "Office sanitation",
      "Post-work cleaning",
      "Regular schedule",
    ],
    workingTime: [
      { type: "Manual", time: "6 hours" },
      { type: "Overtime", time: "0 hours" },
    ],
    projectImage: "/public/Images/projectImage.png",
  },
  {
    serialNo: 4,
    projectName: "Car Wash for Quick Car Wash",
    assignedEmployee: "David Lee",
    description:
      "Complete car wash including exterior cleaning, waxing, and interior vacuuming.",
    status: "Ongoing",
    note: "In progress, car wash started.",
    keyFeatures: ["Exterior washing", "Interior vacuuming", "Waxing included"],
    workingTime: [
      { type: "Manual", time: "3 hours" },
      { type: "Overtime", time: "0 hours" },
    ],
    projectImage: "/public/Images/projectImage.png",
  },
  {
    serialNo: 5,
    projectName: "Laundry Service for Eco Laundry",
    assignedEmployee: "Eva Green",
    description:
      "Laundry service focusing on eco-friendly detergents for washing.",
    status: "Completed",
    note: "Laundry completed and ready for pickup.",
    keyFeatures: ["Eco-friendly", "Fast service", "Premium quality"],
    workingTime: [
      { type: "Manual", time: "5 hours" },
      { type: "Overtime", time: "0 hours" },
    ],
    projectImage: "/public/Images/projectImage.png",
  },
  {
    serialNo: 6,
    projectName: "Home Cleaning for Bright Home Clean",
    assignedEmployee: "Frank Moore",
    description:
      "Home cleaning services for residential areas, including cleaning of floors and windows.",
    status: "Cancelled",
    note: "Customer canceled the service.",
    keyFeatures: [
      "Detailed cleaning",
      "Affordable pricing",
      "On-demand scheduling",
    ],
    workingTime: [
      { type: "Manual", time: "0 hours" },
      { type: "Overtime", time: "0 hours" },
    ],
    projectImage: "/public/Images/projectImage.png",
  },
  {
    serialNo: 7,
    projectName: "Office Cleaning for Prime Office Care",
    assignedEmployee: "Grace Kim",
    description:
      "Regular office cleaning services for business offices, including dusting and trash removal.",
    status: "Completed",
    note: "All areas cleaned and sanitized.",
    keyFeatures: [
      "Efficient cleaning",
      "Safe and hygienic",
      "Regular schedule",
    ],
    workingTime: [
      { type: "Manual", time: "6 hours" },
      { type: "Overtime", time: "0 hours" },
    ],
    projectImage: "/public/Images/projectImage.png",
  },
  {
    serialNo: 8,
    projectName: "Car Wash for Speedy Wash",
    assignedEmployee: "Henry Clark",
    description: "Speedy car wash including waxing and interior detailing.",
    status: "Ongoing",
    note: "Car wash in progress.",
    keyFeatures: ["Quick service", "Premium wax", "Interior detailing"],
    workingTime: [
      { type: "Manual", time: "4 hours" },
      { type: "Overtime", time: "0 hours" },
    ],
    projectImage: "/public/Images/projectImage.png",
  },
  {
    serialNo: 9,
    projectName: "Laundry Service for Green Laundry Co.",
    assignedEmployee: "Isabel Turner",
    description:
      "Laundry service for residential customers with fast delivery.",
    status: "Completed",
    note: "Laundry is ready for pickup.",
    keyFeatures: [
      "Quick service",
      "High-quality washing",
      "Pickup and delivery",
    ],
    workingTime: [
      { type: "Manual", time: "4 hours" },
      { type: "Overtime", time: "0 hours" },
    ],
    projectImage: "/public/Images/projectImage.png",
  },
  {
    serialNo: 10,
    projectName: "Home Cleaning for Clean Sweep Homes",
    assignedEmployee: "Jackie Adams",
    description: "Home cleaning including floor scrub and kitchen cleaning.",
    status: "Completed",
    note: "Service completed successfully.",
    keyFeatures: ["Kitchen cleaning", "Floor scrubbing", "Bathroom sanitation"],
    workingTime: [
      { type: "Manual", time: "5 hours" },
      { type: "Overtime", time: "0 hours" },
    ],
    projectImage: "/public/Images/projectImage.png",
  },
];

export default function RunningProjects() {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projectData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleFilterStatus = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    filterProjects(searchText, status);
  };

  const filterProjects = (search, status) => {
    let filtered = projectData;

    if (search) {
      filtered = filtered.filter((project) =>
        project.projectName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status && status !== "all") {
      filtered = filtered.filter(
        (project) => project.status.toLowerCase() === status.toLowerCase()
      );
    }

    setFilteredProjects(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (project) => {
    console.log(project);
    setSelectedProject(project);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => setOpenDetailsModal(false);

  const handleViewNote = (project) => {
    setSelectedProject(project);
    setOpenNoteModal(true);
  };

  const handleCloseNoteModal = () => setOpenNoteModal(false);

  const handleOpenDeleteModal = (project) => {
    setSelectedProject(project);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteProject = () => {
    console.log("Project deleted: ", selectedProject);
    setOpenDeleteModal(false);
  };
  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#1c1c1c] font-medium text-2xl">Running Projects</p>

        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={selectedStatus}
            onChange={handleFilterStatus}
            sx={{ height: "50px" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper} sx={{ border: "1px solid #e6e6e6" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#C3D8E6" }}>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Serial No
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Project Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Assigned Employee
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((project) => (
                <TableRow key={project.serialNo}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {project.serialNo}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {project.projectName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {project.assignedEmployee}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {project.description.length > 50
                      ? `${project.description.slice(0, 50)}...`
                      : project.description}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 15px",
                        borderRadius: "8px",
                        color: "white",
                        backgroundColor:
                          project.status.toLowerCase() === "completed"
                            ? "#008000"
                            : project.status.toLowerCase() === "ongoing"
                            ? "#3F80AE"
                            : project.status.toLowerCase() === "cancelled"
                            ? "#f44336"
                            : "#9e9e9e",
                        fontWeight: "600",
                      }}
                    >
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <div className="flex items-center justify-center gap-2">
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(project)}
                        sx={{
                          color: "#fff",
                          fontSize: "20px",
                          bgcolor: "#658065",
                          width: "30px",
                          height: "30px",
                          borderRadius: "4px", // Square shape
                        }}
                      >
                        <GoEye />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleViewNote(project)}
                        sx={{
                          color: "#fff",
                          fontSize: "20px",
                          bgcolor: "#3F80AE",
                          width: "30px",
                          height: "30px",
                          borderRadius: "4px", // Square shape
                        }}
                      >
                        <PiNotepadBold />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDeleteModal(project)}
                        sx={{
                          color: "#fff",
                          fontSize: "20px",
                          bgcolor: "#CC0505",
                          width: "30px",
                          height: "30px",
                          borderRadius: "4px", // Square shape
                        }}
                      >
                        <AiTwotoneDelete />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProjects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* View Details Modal */}
      <Modal open={openDetailsModal} onClose={handleCloseDetailsModal}>
        <div className="w-[900px] bg-white p-10 m-auto mt-20 rounded-lg">
          <div>
            <h3 className="font-medium mb-5">View Details</h3>
            <img
              src={selectedProject?.projectImage}
              alt={selectedProject?.projectName}
              className="h-40 w-72"
            />
            <div className="flex flex-col gap-2 mt-5">
              <p className="text-[#333333] font-semibold text-lg">
                {selectedProject?.projectName}
              </p>
              <p className="text-[#545454] text-lg">
                {selectedProject?.assignedEmployee}
              </p>
              <div>
                <p className="font-medium">Description:</p>
                <p className="text-sm">{selectedProject?.description}</p>
              </div>
              <div>
                <p className="font-medium mb-2">Key Features</p>
                <ul className="ml-8">
                  {selectedProject?.keyFeatures.map((feature, index) => {
                    return (
                      <li className="list-disc text-sm" key={index}>
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Working Time</p>
                <div className="w-1/3">
                  <Table sx={{ border: "1px solid #ddd", borderRadius: "8px" }}>
                    <TableHead>
                      <TableRow>
                        {selectedProject?.workingTime.map((time, index) => (
                          <TableCell
                            key={index}
                            sx={{
                              border: "1px solid #ddd",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                          >
                            {time?.type}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {selectedProject?.workingTime.map((time, index) => (
                          <TableCell
                            key={index}
                            sx={{
                              border: "1px solid #ddd",
                              textAlign: "center",
                            }}
                          >
                            {time?.time}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          {/* <Button
            onClick={handleCloseDetailsModal}
            variant="outlined"
            sx={{ marginTop: 2 }}
          >
            Close
          </Button> */}
        </div>
      </Modal>
      {/* View Note Modal */}
      <Modal open={openNoteModal} onClose={handleCloseNoteModal}>
        <div className="w-[400px] bg-white p-8 m-auto mt-36 rounded-lg">
          <h3 className="font-medium mb-4 text-sm:">Project Note:</h3>
          <p className="text-lg">{selectedProject?.note}</p>
          {/* <Button
            onClick={handleCloseNoteModal}
            variant="outlined"
            sx={{
              bgcolor: "#3F80AE",
              color: "white",
              marginTop: "5px",
              textTransform: "none",
            }}
          >
            Close
          </Button> */}
        </div>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <div className="w-[400px] h-36 bg-white m-auto mt-40 p-6 rounded-lg flex flex-col items-center">
          <p className="mb-5">Are you sure you want to delete this project?</p>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDeleteProject}
              variant="contained"
              sx={{
                bgcolor: "#CC0505",
              }}
            >
              Delete
            </Button>
            <Button
              onClick={handleCloseDeleteModal}
              sx={{
                border: "1px solid #CC0505",
                color: "#CC0505",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
