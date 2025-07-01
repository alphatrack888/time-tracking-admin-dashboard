/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination,
} from "@mui/material";
import BlockConfirmationModal from "../Modals/BlockConfirmationModal";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import CompanyTable from "../UI/CompanyTable";
import CompanyDetailsModal from "../Modals/CompanyDetailsModal";

const companyData = [
  {
    serialNo: 1,
    companyName: "Powell, Salinas and Bradley",
    Email: "jeffreysutton@welch-allen.info",
    Contact: "001-273-452-7775x503",
    Location: "Port Andrew",
    totalBudget: 2523990.44,
    Status: "Inactive",
  },
  {
    serialNo: 2,
    companyName: "Hines, Evans and Harris",
    Email: "walkerkathryn@williams.com",
    Contact: "001-179-545-0283",
    Location: "Stevenstad",
    totalBudget: 4211798.67,
    Status: "Under Review",
  },
  {
    serialNo: 3,
    companyName: "Guzman-Diaz",
    Email: "philliplawson@walker-melendez.com",
    Contact: "160.348.7954",
    Location: "East Brandonport",
    totalBudget: 1138882.03,
    Status: "Active",
  },
  {
    serialNo: 4,
    companyName: "Strong and Sons",
    Email: "nancy64@moore.com",
    Contact: "+1-190-385-4032x6980",
    Location: "Carpenterchester",
    totalBudget: 2042640.88,
    Status: "Inactive",
  },
  {
    serialNo: 5,
    companyName: "Walker Ltd",
    Email: "ycrawford@miller.com",
    Contact: "+1-016-015-1526x71241",
    Location: "Thomasview",
    totalBudget: 1586329.34,
    Status: "Under Review",
  },
  {
    serialNo: 6,
    companyName: "Lee, Ward and Martinez",
    Email: "bryanmoore@davis.com",
    Contact: "001-191-876-4629x705",
    Location: "Port Alice",
    totalBudget: 3712201.55,
    Status: "Active",
  },
  {
    serialNo: 7,
    companyName: "Gonzalez, Howard and Ward",
    Email: "james48@collins-brown.com",
    Contact: "+1-112-896-2460x604",
    Location: "Lake Carla",
    totalBudget: 2356763.76,
    Status: "Inactive",
  },
  {
    serialNo: 8,
    companyName: "Robinson LLC",
    Email: "elizabeth27@harris.com",
    Contact: "001-789-654-9832x242",
    Location: "North Alex",
    totalBudget: 4926881.22,
    Status: "Active",
  },
  {
    serialNo: 9,
    companyName: "Jameson and Sons",
    Email: "kathleenanderson@evans.info",
    Contact: "001-287-659-8420",
    Location: "South Belleville",
    totalBudget: 3062504.94,
    Status: "Under Review",
  },
  {
    serialNo: 10,
    companyName: "Davis, Reynolds and Clark",
    Email: "justinbrown@richards.com",
    Contact: "001-304-789-2043x809",
    Location: "East Margaret",
    totalBudget: 1992990.77,
    Status: "Inactive",
  },
];

export default function AllCompanies() {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState(companyData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleFilterStatus = (e) => {
    setSelectedStatus(e.target.value);
    filterUsers(searchText, e.target.value);
  };

  const filterUsers = (search, type) => {
    let filtered = companyData;

    if (type && type !== "all") {
      filtered = filtered.filter((company) => company.Status === type);
    }

    setFilteredUsers(filtered);
  };

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedCompany(null);
  };

  const handleOpenBlockModal = (company) => {
    setSelectedCompany(company);
    setOpenBlockModal(true);
  };

  const handleCloseBlockModal = () => {
    setOpenBlockModal(false);
    setSelectedCompany(null);
  };

  const handleOpenDeleteModal = (company) => {
    setSelectedCompany(company);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedCompany(null);
  };

  const handleBlockCompany = () => {
    console.log(`Blocked ${selectedCompany.name}`);
    handleCloseBlockModal();
  };

  const handleDeleteCompany = () => {
    console.log(`Deleted ${selectedCompany.name}`);
    handleCloseDeleteModal();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh]">
      <div className="flex items-center justify-between">
        <p className="text-[#1c1c1c] font-medium text-2xl capitalize">
          all companies
        </p>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={selectedStatus}
            onChange={handleFilterStatus}
            sx={{ height: "50px" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
            <MenuItem value="Under Review">Under Review</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="mt-6">
        <CompanyTable
          filteredUsers={filteredUsers}
          page={page}
          rowsPerPage={rowsPerPage}
          handleViewDetails={handleViewDetails}
          handleOpenBlockModal={handleOpenBlockModal}
          handleOpenDeleteModal={handleOpenDeleteModal}
        />

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* Details Modal */}
      <CompanyDetailsModal
        openDetailsModal={openDetailsModal}
        handleCloseModal={handleCloseModal}
        selectedCompany={selectedCompany}
      />

      {/* Block Confirmation Modal */}
      <BlockConfirmationModal
        openBlockModal={openBlockModal}
        handleCloseBlockModal={handleCloseBlockModal}
        handleBlockEmployee={handleBlockCompany}
        selectedCompany={selectedCompany}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        openDeleteModal={openDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        selectedCompany={selectedCompany}
        handleDeleteEmployee={handleDeleteCompany}
      />
    </div>
  );
}
