// SubscriptionModal.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
// import { useCreateSubscriptionMutation, useEditSubscriptionMutation } from "../../Redux/api/subscriptionApi";

const SubscriptionModal = ({
  open,
  onClose,
  subscriptionData,
  onSave,
  editMode,
}) => {
  const [subscriptionName, setSubscriptionName] = useState("");
  const [subscriptionDescription, setSubscriptionDescription] = useState("");
  const [subscriptionCurrency, setSubscriptionCurrency] = useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState("");
  const [subscriptionInterval, setSubscriptionInterval] = useState("month");
  const [subscriptionFeatures, setSubscriptionFeatures] = useState([]);

  //   const [createSubscription] = useCreateSubscriptionMutation();
  //   const [editSubscription] = useEditSubscriptionMutation();

  useEffect(() => {
    if (editMode && subscriptionData) {
      setSubscriptionName(subscriptionData.name);
      setSubscriptionDescription(subscriptionData.description);
      setSubscriptionCurrency(subscriptionData.currency);
      setSubscriptionPrice(subscriptionData.price);
      setSubscriptionInterval(subscriptionData.interval);
      setSubscriptionFeatures(subscriptionData.features);
    }
  }, [editMode, subscriptionData]);

  const handleSavePackage = async () => {
    const newPackage = {
      name: subscriptionName,
      description: subscriptionDescription,
      currency: subscriptionCurrency,
      price: subscriptionPrice,
      interval: subscriptionInterval,
      features: subscriptionFeatures,
    };

    console.log("new package", newPackage);

    // try {
    //   if (editMode) {
    //     await editSubscription({ id: subscriptionData.id, ...newPackage }).unwrap();
    //     console.log("Subscription edited successfully!");
    //   } else {
    //     await createSubscription(newPackage).unwrap();
    //     console.log("Subscription created successfully!");
    //   }
    //   onSave(); // Call the onSave callback to refresh the data and close modal
    // } catch (err) {
    //   console.error("Error saving subscription:", err);
    // }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="flex justify-center items-center h-full"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <div
          className="bg-white p-8 rounded-lg"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <p className="text-2xl font-semibold mb-6 text-center">
            {editMode ? "Edit Subscription Plan" : "Add New Subscription Plan"}
          </p>
          <div className="flex flex-col gap-4">
            <TextField
              label="Package Name"
              value={subscriptionName}
              onChange={(e) => setSubscriptionName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={subscriptionDescription}
              onChange={(e) => setSubscriptionDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Currency"
              value={subscriptionCurrency}
              onChange={(e) => setSubscriptionCurrency(e.target.value)}
              fullWidth
            />
            <TextField
              label="Price"
              value={subscriptionPrice}
              onChange={(e) => setSubscriptionPrice(e.target.value)}
              fullWidth
              type="number"
            />

            {/* Interval Radio Buttons */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Interval</FormLabel>
              <RadioGroup
                row
                value={subscriptionInterval}
                onChange={(e) => setSubscriptionInterval(e.target.value)}
              >
                <FormControlLabel
                  value="month"
                  control={<Radio />}
                  label="Monthly"
                />
                <FormControlLabel
                  value="year"
                  control={<Radio />}
                  label="Yearly"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              label="Features (comma separated)"
              value={subscriptionFeatures.join(", ")}
              onChange={(e) =>
                setSubscriptionFeatures(e.target.value.split(","))
              }
              fullWidth
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button
                sx={{
                  bgcolor: "#f0f0f0",
                  color: "black",
                  textTransform: "none",
                  width: "100px",
                  padding: "10px",
                  "&:hover": { bgcolor: "#e0e0e0" },
                }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  bgcolor: "#3F80AE",
                  color: "#fff",
                  textTransform: "none",
                  width: "130px",
                  padding: "10px",
                  "&:hover": { bgcolor: "#70a4c7" },
                }}
                onClick={handleSavePackage}
              >
                Save Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
