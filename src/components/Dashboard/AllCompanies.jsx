/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination,
  Button,
  LinearProgress,
} from "@mui/material";
import BlockConfirmationModal from "../UI/Modals/BlockConfirmationModal";
import DeleteConfirmationModal from "../UI/Modals/DeleteConfirmationModal";
import CompanyTable from "../UI/CompanyTable";
import CompanyDetailsModal from "../UI/Modals/CompanyDetailsModal";
import { useDeleteCompanyMutation, useGetAllCompaniesQuery } from "../../Redux/api/companyApi";
import AddCompanyModal from "../UI/Modals/AddCompanyModal";

export default function AllCompanies() {
  const {
    data: allCompanyData,
    isLoading,
    isError,
  } = useGetAllCompaniesQuery();
  const allCompanies = allCompanyData?.data?.data;
  const {deleteCompany} = useDeleteCompanyMutation();
  console.log("all company", allCompanies);

  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddCompanyModal, setOpenAddCompanyModal] = useState(false);

  const filterCompanies = () => {
    return allCompanies
      .filter((company) => {
        // Search filter (if any search text exists)
        return (
          company.name.toLowerCase().includes(searchText.toLowerCase()) ||
          company.email.toLowerCase().includes(searchText.toLowerCase()) ||
          company.phone.toLowerCase().includes(searchText.toLowerCase()) ||
          company.address.toLowerCase().includes(searchText.toLowerCase())
        );
      })
      .filter((company) => {
        return selectedStatus === "all" || company.status === selectedStatus;
      });
  };

  const handleFilterStatus = (e) => {
    setSelectedStatus(e.target.value);
    setPage(0);
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

  const handleOpenAddCompanyModal = () => {
    setOpenAddCompanyModal(true);
  };

  const handleCloseAddCompanyModal = () => {
    setOpenAddCompanyModal(false);
  };

  const handleBlockCompany = () => {
    console.log(`Blocked ${selectedCompany.name}`);
    handleCloseBlockModal();
  };

  const handleDeleteCompany = () => {
    console.log(`Deleted ${selectedCompany.name}`);
    deleteCompany(selectedCompany._id);
    handleCloseDeleteModal();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LinearProgress size="large" tip="Loading Terms and Conditions..." />
      </div>
    );
  if (isError) return <div>Error fetching data...</div>;

  const filteredCompanies = filterCompanies();
  const companiesToDisplay = filteredCompanies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh]">
      <div className="flex items-center justify-between">
        <p className="text-[#1c1c1c] font-medium text-2xl capitalize">
          all companies
        </p>
        <div className="flex items-center gap-3">
          <Button
            sx={{
              bgcolor: "#3F80AE",
              color: "#fff",
              textTransform: "none",
              padding: "10px 20px",
              "&:hover": { bgcolor: "#70a4c7" },
            }}
            onClick={handleOpenAddCompanyModal}
          >
            + Add Company
          </Button>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={selectedStatus}
              onChange={handleFilterStatus}
              sx={{ height: "50px" }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="mt-6">
        <CompanyTable
          companies={companiesToDisplay}
          rowsPerPage={rowsPerPage}
          page={page}
          handleViewDetails={handleViewDetails}
          handleOpenBlockModal={handleOpenBlockModal}
          handleOpenDeleteModal={handleOpenDeleteModal}
        />

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCompanies.length}
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

      <AddCompanyModal
        openAddCompanyModal={openAddCompanyModal}
        handleCloseAddCompanyModal={handleCloseAddCompanyModal}
      />
    </div>
  );
}
