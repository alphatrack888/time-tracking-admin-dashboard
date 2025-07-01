import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";

import logInImage from "../../public/Images/logIn.png";

// import { useSignInMutation } from "../../Redux/api/authApi";
// import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  // const [login] = useSignInMutation();

  const onFinish = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const values = {
      email: form.get("email"),
      password: form.get("password"),
    };

    console.log("signIn Data", values);
    navigate("/", { replace: true });
    // try {
    //   const res = await login(data).unwrap();
    //   localStorage.setItem("accessToken", res?.data?.accessToken);
    //   localStorage.setItem("refreshToken", res?.data?.refreshToken);

    //   if (res.success) {
    //     toast.success("Login Successfully!");
    //     navigate("/");
    //   } else {
    //     toast.error("Login Error.");
    //   }
    // } catch (error) {
    //   console.error("Error user login:", error);
    //   if (error.data) {
    //     toast.error("Something went wrong while logging in.");
    //   }
    // }
  };

  return (
    <div className="bg-[#fff] min-h-[76vh] max-w-2xl flex flex-col gap-5 items-center mx-auto my-28 p-5 rounded-lg">
      <img src={logInImage} alt="logo" className="size-40" />
      <div className="bg-[#ECF2F7] rounded-3xl p-8">
        <p className="text-3xl text-center font-semibold mb-7 text-[#333333]">
          Log In
        </p>

        <form onSubmit={onFinish}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            placeholder="Enter your email"
            InputProps={{
              startAdornment: <HiOutlineMailOpen />,
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            placeholder="Enter your password"
            InputProps={{
              startAdornment: <MdOutlineLock />,
            }}
          />

          <div className="flex items-center justify-between mt-2">
            <div>
              <FormControlLabel
                control={<Checkbox name="rememberMe" color="primary" />}
                label="Remember me"
              />
            </div>
            <div>
              <Link
                to="/forgot-password"
                style={{
                  fontWeight: "600",
                  // textDecoration: "underline",
                  color: "#545454",
                }}
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              marginTop: "20px",
              backgroundColor: "#3F80AE",
              padding: "8px",
              fontWeight: "600",
              borderRadius: "10px",
              fontSize: "16px",
              textTransform: "none",
            }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
