import { Modal } from "@mui/material";

export default function CompanyDetailsModal({
  openDetailsModal,
  handleCloseModal,
  selectedCompany,
}) {
  return (
    <div>
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="bg-[#fff] p-4 rounded-lg shadow-lg relative"
          style={{ width: "800px" }}
        >
          {selectedCompany && (
            <div className="flex flex-col gap-2 p-3 rounded-lg">
              <p className="font-medium mb-3">Company Details</p>
              <div className="flex gap-10">
                <img
                  src={selectedCompany.image}
                  alt={selectedCompany.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    marginBottom: "10px",
                    borderRadius: "10px",
                  }}
                />
                <div className="flex gap-5">
                  <div className="flex flex-col gap-2 font-medium">
                    <p>Company Name:</p>
                    <p>Email:</p>
                    <p>Contact:</p>
                    <p>Company Address:</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>{selectedCompany.companyName}</p>
                    <p>{selectedCompany.Email}</p>
                    <p>{selectedCompany.Contact}</p>
                    <p>{selectedCompany.Location}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
