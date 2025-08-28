import { Modal } from "@mui/material";
import { getImageUrl } from "../../../utils/baseUrl";

export default function CompanyDetailsModal({
  openDetailsModal,
  handleCloseModal,
  selectedCompany,
}) {
  const imageUrl = getImageUrl();
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
        <div className="bg-[#fff] p-4 rounded-lg shadow-lg relative w-[800px]">
          {selectedCompany && (
            <div className="flex flex-col gap-2 p-3 rounded-lg">
              <p className="font-medium mb-3">Company Details</p>
              <div className="flex gap-10">
                <img
                  src={`${imageUrl}/${selectedCompany?.profile}`}
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
                    <p>{selectedCompany.name}</p>
                    <p>{selectedCompany.email}</p>
                    <p>{selectedCompany.phone}</p>
                    <p>{selectedCompany.address}</p>
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
