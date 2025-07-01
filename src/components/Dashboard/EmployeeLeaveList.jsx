import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { GoEye } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";

const employeeLeaveData = [
  {
    serial: 1,
    name: "John Doe",
    email: "johndoe@sparklaundry.com",
    contact: "+1234567890",
    designation: "Manager",
    status: "approved",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    leaveType: "Sick Leave",
    fromDate: "2025-06-01",
    toDate: "2025-06-05",
    totalDays: 5,
    reason: "Flu symptoms",
  },
  {
    serial: 2,
    name: "Jane Smith",
    email: "janesmith@freshcleaners.com",
    contact: "+1234567891",
    designation: "Operations Manager",
    status: "approved",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    leaveType: "Annual Leave",
    fromDate: "2025-07-10",
    toDate: "2025-07-20",
    totalDays: 10,
    reason: "Family vacation",
  },
  {
    serial: 3,
    name: "Robert Johnson",
    email: "robert.johnson@officeshine.com",
    contact: "+1234567892",
    designation: "Team Leader",
    status: "pending",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    leaveType: "Maternity Leave",
    fromDate: "2025-06-15",
    toDate: "2025-07-15",
    totalDays: 30,
    reason: "Childbirth recovery",
  },
  {
    serial: 4,
    name: "Michael Brown",
    email: "michaelbrown@quickcarwash.com",
    contact: "+1234567893",
    designation: "Branch Manager",
    status: "approved",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    leaveType: "Sick Leave",
    fromDate: "2025-06-05",
    toDate: "2025-06-07",
    totalDays: 2,
    reason: "Back pain",
  },
  {
    serial: 5,
    name: "Emily Davis",
    email: "emily.davis@ecolaundry.com",
    contact: "+1234567894",
    designation: "Supervisor",
    status: "pending",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    leaveType: "Personal Leave",
    fromDate: "2025-08-01",
    toDate: "2025-08-03",
    totalDays: 3,
    reason: "Personal matters",
  },
  {
    serial: 6,
    name: "Alice Wilson",
    email: "alice.wilson@brighthomeclean.com",
    contact: "+1234567895",
    designation: "Cleaner",
    status: "approved",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    leaveType: "Annual Leave",
    fromDate: "2025-07-01",
    toDate: "2025-07-15",
    totalDays: 15,
    reason: "Wedding anniversary celebration",
  },
  {
    serial: 7,
    name: "James Taylor",
    email: "james.taylor@primeofficecare.com",
    contact: "+1234567896",
    designation: "Office Manager",
    status: "pending",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    leaveType: "Maternity Leave",
    fromDate: "2025-06-20",
    toDate: "2025-07-20",
    totalDays: 30,
    reason: "Childbirth recovery",
  },
  {
    serial: 8,
    name: "David Martinez",
    email: "david.martinez@speedywash.com",
    contact: "+1234567897",
    designation: "CEO",
    status: "pending",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    leaveType: "Sick Leave",
    fromDate: "2025-06-12",
    toDate: "2025-06-14",
    totalDays: 3,
    reason: "Migraine",
  },
  {
    serial: 9,
    name: "Sophia Lee",
    email: "sophia.lee@greenlaundry.com",
    contact: "+1234567898",
    designation: "Manager",
    status: "approved",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    leaveType: "Annual Leave",
    fromDate: "2025-08-05",
    toDate: "2025-08-12",
    totalDays: 7,
    reason: "Holiday with family",
  },
  {
    serial: 10,
    name: "Mason Harris",
    email: "mason.harris@cleansweephomes.com",
    contact: "+1234567899",
    designation: "Supervisor",
    status: "approved",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    leaveType: "Sick Leave",
    fromDate: "2025-06-22",
    toDate: "2025-06-25",
    totalDays: 4,
    reason: "Stomach infection",
  },
];

export default function EmployeeLeaveList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleViewLeaveDetails = (employee) => {
    setSelectedEmployee(employee);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedEmployee(null);
  };

  const handleApproveLeave = () => {
    const updatedEmployee = { ...selectedEmployee, status: "Approved" };
    console.log("Approved Leave for:", updatedEmployee.name);
    setOpenDetailsModal(false);
    setSelectedEmployee(null);
  };

  const handleDeclineLeave = () => {
    const updatedEmployee = { ...selectedEmployee, status: "Declined" };
    console.log("Declined Leave for:", updatedEmployee.name);
    setOpenDetailsModal(false);
    setSelectedEmployee(null);
  };

  const handleOpenDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = () => {
    console.log("Deleted Employee Leave:", selectedEmployee.name);
    setOpenDeleteModal(false);
    setSelectedEmployee(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh] rounded-lg">
      <div className="flex items-center justify-between mb-5">
        <p className="text-lg font-medium">All Employee</p>
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
            textTransform: "none",
            bgcolor: "#3F80AE",
            color: "white",
            padding: "10px",
          }}
        >
          <IoMdAdd />
          <p>Add Leave Category</p>
        </Button>
      </div>
      <div>
        <TableContainer component={Paper} sx={{ border: "1px solid #e6e6e6" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#C3D8E6" }}>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Serial No.
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Email Address
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Contact No.
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Designation
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
              {employeeLeaveData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => (
                  <TableRow key={employee.serial}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.serial}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.email}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.contact}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.designation}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <div
                        style={{
                          backgroundColor:
                            employee.status === "approved"
                              ? "#008000"
                              : employee.status === "pending"
                              ? "#3F80AE"
                              : "gray",
                          color: "white",
                          padding: "5px",
                          borderRadius: "5px",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {employee.status}
                      </div>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <div className="flex items-center justify-center gap-2">
                        <IconButton
                          size="small"
                          onClick={() => handleViewLeaveDetails(employee)}
                          sx={{
                            color: "#fff",
                            fontSize: "20px",
                            bgcolor: "#658065",
                            width: "30px",
                            height: "30px",
                            borderRadius: "4px",
                          }}
                        >
                          <GoEye />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDeleteModal(employee)}
                          sx={{
                            color: "#fff",
                            fontSize: "20px",
                            bgcolor: "#CC0505",
                            width: "30px",
                            height: "30px",
                            borderRadius: "4px",
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
          count={employeeLeaveData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* Leave Details Modal */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseDetailsModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-[800px] bg-white p-8 rounded-lg">
          <div className="flex items-center gap-20">
            <div className="flex flex-col gap-5">
              <p>Name:</p>
              <p>Leave Type:</p>
              <p>From Date:</p>
              <p>To Date:</p>
              <p>Total Days:</p>
              <p>Reason:</p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-medium">{selectedEmployee?.name}</p>
              <p className="font-medium">{selectedEmployee?.leaveType}</p>
              <p className="font-medium">{selectedEmployee?.fromDate}</p>
              <p className="font-medium">{selectedEmployee?.toDate}</p>
              <p className="font-medium">{selectedEmployee?.totalDays}</p>
              <p className="font-medium">{selectedEmployee?.reason}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-end mt-10">
            <Button
              sx={{
                bgcolor: "#008000",
                color: "white",
                textTransform: "none",
                width: "100px",
              }}
              onClick={handleApproveLeave}
            >
              Approve
            </Button>
            <Button
              sx={{
                bgcolor: "#fff",
                color: "#CC0505",
                border: "1px solid #CC0505",
                textTransform: "none",
                width: "100px",
              }}
              onClick={handleDeclineLeave}
            >
              Decline
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: 4,
            borderRadius: 2,
          }}
        >
          <p className="mb-5">
            Are you sure you want to delete{" "}
            <span className="font-medium">{selectedEmployee?.name}</span>'s
            leave details?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              sx={{
                bgcolor: "#CC0505",
                color: "white",
                textTransform: "none",
              }}
              onClick={handleDeleteEmployee}
            >
              Yes, Delete
            </Button>
            <Button
              sx={{
                bgcolor: "#3F80AE",
                color: "white",
                textTransform: "none",
              }}
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
