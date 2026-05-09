import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AiTwotoneDelete } from "react-icons/ai";
import { GoEye } from "react-icons/go";
import { SlLock } from "react-icons/sl";
import { useDeleteCompanyMutation } from "../../Redux/api/companyApi";

export default function CompanyTable({
  companies,
  page,
  rowsPerPage,
  handleViewDetails,
  // handleOpenBlockModal,
  // handleOpenDeleteModal,
}) {
  const [deleteCompany] = useDeleteCompanyMutation();
  return (
    <div>
      <TableContainer component={Paper} sx={{ border: "1px solid #e6e6e6" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#C3D8E6" }}>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Serial No.
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Company Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Contact No.
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Company Location
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
            {companies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((company, index) => (
                <TableRow key={company._id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {company.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {company.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {company.phone}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {company.address}
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <div
                      style={{
                        backgroundColor:
                          company.status.toLowerCase() === "active"
                            ? "#008000"
                            : company.status.toLowerCase() === "inactive"
                            ? "#CC0505"
                            : "#f0ce0e",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        textAlign: "center",
                      }}
                    >
                      <p className="capitalize"> {company.status}</p>
                    </div>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <div className="flex items-center justify-center gap-2">
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(company)}
                        sx={{
                          color: "#fff",
                          fontSize: "20px",
                          bgcolor: "#3F80AE",
                          width: "30px",
                          height: "30px",
                          borderRadius: "4px",
                          "&:hover": {
                            bgcolor: "#fff",
                            border: "1px solid #3F80AE",
                            color: "#3F80AE",
                          },
                        }}
                      >
                        <GoEye />
                      </IconButton>
                      {/* <IconButton
                        size="small"
                        // onClick={() => handleOpenBlockModal(company)}
                        sx={{
                          color: "#fff",
                          fontSize: "20px",
                          bgcolor: "#3F80AE",
                          width: "30px",
                          height: "30px",
                          borderRadius: "4px",
                        }}
                      >
                        <SlLock />
                      </IconButton> */}
                      <IconButton
                        size="small"
                        onClick={() => deleteCompany(company._id)}
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
    </div>
  );
}
