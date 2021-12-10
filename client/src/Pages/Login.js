import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "../axios";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const Login = () => {
  const navigate = useNavigate();
  const [type, setType] = useState(true);
  const dispatch = useDispatch();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleGoogle = async (googleData) => {
    const res = await axios.post(
      "/user/v1/auth/google/login",
      {
        token: googleData.tokenId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("userToken", res.data.token);
    dispatch(authActions.login(res.data.token));
    navigate("/home");
  };

  const handleLogin = async () => {
    if (!emailRef.current.value || !passwordRef.current.value) {
      alert("Enter all the details");
      return;
    }
    try {
      const res = await axios.post(
        "/user/login",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      emailRef.current.value = "";
      passwordRef.current.value = "";
      localStorage.setItem("userToken", res.data.token);
      dispatch(authActions.login(res.data.token));
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-[90vh] flex-col">
      {type ? (
        <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-lg w-[600px] py-8">
          <h1 className="font-bold text-3xl">Login</h1>
          <button
            onClick={() => setType(false)}
            className="uppercase text-md font-semibold text-white bg-[#F38100] py-2 px-12 rounded-md mt-10"
          >
            Login with Email
          </button>
          <br />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            className="google__button"
            buttonText="Login with Google"
            onSuccess={handleGoogle}
            onFailure={handleGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-lg w-[600px] py-8">
          <h1 className="font-bold text-3xl">Login</h1>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="outline-none border-solid border-gray-400 rounded-md border mt-7 w-[500px] px-2 py-3 text-lg font-semibold"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="outline-none border-solid border-gray-400 rounded-md border mt-7 w-[500px] px-2 py-3 text-lg font-semibold"
          />
          <button
            onClick={handleLogin}
            className="uppercase text-lg font-semibold text-white bg-yellow-400 py-2 px-[75px] rounded-md  mt-10"
          >
            Login
          </button>
          <button
            onClick={() => setType(true)}
            className="uppercase text-lg font-semibold text-[#F38100] py-2 px-[85px] rounded-md mt-2"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
