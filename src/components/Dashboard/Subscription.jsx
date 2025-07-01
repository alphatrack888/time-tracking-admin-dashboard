import { Card, CardContent, Button } from "@mui/material";

const subscriptionData = [
  {
    id: 1,
    title: "Pro",
    price: 200,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum eligendi facilis laudantium. Dolores suscipit cumque, doloribus sit earum quas voluptate.",
  },
  {
    id: 2,
    title: "Premium",
    price: 500,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae magnam esse nemo eius maiores eos, ipsum illo quos totam iure amet voluptas iste laborum dolor.",
  },
];

const selectedSubscription = (subscription) => {
  console.log("Selected Subscription", subscription);
};

export default function Subscription() {
  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh] rounded-lg flex gap-8 justify-center flex-wrap">
      {subscriptionData.map((subscription) => (
        <div
          className="flex flex-col gap-8 sm:w-[45%] md:w-[30%] max-w-[345px]"
          key={subscription.id}
        >
          <div className="bg-[#3F80AE] rounded-lg py-3 px-5 text-white">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">
                Alpha Track {subscription.title}
              </p>
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
              <div className="flex flex-col gap-3 text-center text-white">
                <p className="text-2xl">{subscription.title}</p>
                <p className="text-3xl font-medium">${subscription.price}</p>
                <p className="text-sm text-justify">
                  {subscription.description}
                </p>
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
                onClick={() => selectedSubscription(subscription)}
              >
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
