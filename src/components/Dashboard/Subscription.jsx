import React, { useState } from "react";
import { Card, CardContent, Button, LinearProgress } from "@mui/material";
import { useGetSubscriptionPlansQuery } from "../../Redux/api/subscriptionApi";
import { GoDotFill } from "react-icons/go";
import SubscriptionModal from "../UI/Modals/SubscriptionModal";

const Subscription = () => {
  const { data: allSubscriptionData, isLoading } =
    useGetSubscriptionPlansQuery();
  const subscriptionData = allSubscriptionData?.data;

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);

  const handleOpenModal = (subscription = null) => {
    if (subscription) {
      setEditMode(true);
      setCurrentSubscription(subscription);
    } else {
      setEditMode(false);
      setCurrentSubscription(null);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSave = () => {
    // This will trigger data refresh after adding/editing
    setOpenModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LinearProgress size="large" tip="Loading Terms and Conditions..." />
      </div>
    );
  }

  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh] rounded-lg flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-semibold">Our Subscription Plans</p>
        <Button
          sx={{
            bgcolor: "#3F80AE",
            color: "#fff",
            textTransform: "none",
            padding: "10px 20px",
            "&:hover": { bgcolor: "#70a4c7" },
          }}
          onClick={() => handleOpenModal()}
        >
          + Add Package
        </Button>
      </div>
      <div className="flex justify-center flex-wrap gap-8 bg-white py-5 rounded">
        {subscriptionData.map((subscription) => (
          <div
            className="flex flex-col gap-5 sm:w-[45%] md:w-[30%] max-w-[345px]"
            key={subscription.id}
          >
            <div className="bg-[#3F80AE] rounded-lg py-3 px-5 text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{subscription.name}</p>
                <p className="text-lg font-semibold"> ${subscription.price}</p>
              </div>
              <p className="text-xs mt-2">Payment Package</p>
            </div>
            <Card
              sx={{
                bgcolor: "#6599BE",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <CardContent>
                <div className="flex flex-col gap-3 text-center text-white min-h-[300px]">
                  <p className="text-2xl">{subscription.title}</p>
                  <p className="text-3xl font-medium">${subscription.price}</p>
                  <p className="text-sm text-justify">
                    {subscription.description}
                  </p>
                  {subscription.features.map((feature, index) => (
                    <div
                      key={index}
                      className="text-sm flex items-center gap-1"
                    >
                      <GoDotFill /> <p>{feature}</p>
                    </div>
                  ))}
                </div>

                <Button
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "18px",
                    width: "100%",
                    marginTop: "20px",
                    bgcolor: "white",
                    color: "#3F80AE",
                    "&:hover": {
                      bgcolor: "#3F80AE",
                      color: "white",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.40)",
                    },
                  }}
                  onClick={() => handleOpenModal(subscription)}
                >
                  Edit Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Subscription Modal for Adding and Editing */}
      <SubscriptionModal
        open={openModal}
        onClose={handleCloseModal}
        subscriptionData={currentSubscription}
        onSave={handleSave}
        editMode={editMode}
      />
    </div>
  );
};

export default Subscription;
