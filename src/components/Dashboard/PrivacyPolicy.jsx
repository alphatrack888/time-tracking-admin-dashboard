import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";
import { Button, LinearProgress } from "@mui/material";
import {
  useAddPrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
} from "../../Redux/api/settingsApi";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getPrivacyData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetPrivacyPolicyQuery();

  const privacyData = getPrivacyData?.data;

  console.log("privacy data", privacyData);

  const [addPrivacyPolicy, { isLoading: isAdding }] =
    useAddPrivacyPolicyMutation();

  useEffect(() => {
    if (privacyData?.content) {
      setContent(privacyData?.content);
    }
  }, [privacyData]);

  const handleOnSave = async () => {
    try {
      const data = {
        content: content,
        type: "privacy-policy",
      };
      await addPrivacyPolicy(data).unwrap();
      toast.success("Terms and Conditions added successfully!");

      refetch();
    } catch (error) {
      toast.error("Failed to save Terms and Conditions. Please try again.");
      console.error("Save error:", error);
    }
  };

  if (isFetching || isAdding) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LinearProgress size="large" tip="Loading Terms and Conditions..." />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Terms and Conditions. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[#efefef] rounded-lg py-1 px-4">
      <div className="p-2 rounded">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold  text-[#222021]">Privacy Policy</h1>
          <Button
            onClick={handleOnSave}
            sx={{
              width: "150px",
              bgcolor: "#3F80AE",
              color: "white",
              textTransform: "none",
              height: "40px",
              fontSize: "16px",
              ":hover": {
                bgcolor: "#242424",
                borderColor: "#0080FF",
              },
            }}
          >
            Save & Change
          </Button>
        </div>
        <div className="my-5">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
