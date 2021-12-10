import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "../axios";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [type, setType] = useState(true);
  const dispatch = useDispatch();

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleGoogle = async (googleData) => {
    const res = await axios.post(
      "/user/v1/auth/google/signup",
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

  const handleSignUp = async () => {
    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value
    ) {
      alert("Enter all the details");
      return;
    }
    try {
      const res = await axios.post(
        "/user/signup",
        {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          type: "email",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      emailRef.current.value = "";
      nameRef.current.value = "";
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
          <h1 className="font-bold text-3xl">Signup</h1>
          <button
            onClick={() => setType(false)}
            className="uppercase text-md font-semibold text-white bg-[#F38100] py-2 px-12 rounded-md mt-10"
          >
            Signup with Email
          </button>
          <br />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            className="google__button"
            buttonText="Signup with Google"
            onSuccess={handleGoogle}
            onFailure={handleGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-lg w-[600px] py-8">
          <h1 className="font-bold text-3xl">Signup</h1>
          <input
            ref={nameRef}
            type="text"
            placeholder="Name"
            className="outline-none border-solid border-gray-400 rounded-md border mt-7 w-[500px] px-2 py-3 text-lg font-semibold"
          />
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
            onClick={handleSignUp}
            className="uppercase text-lg font-semibold text-white bg-yellow-400 py-2 px-[75px] rounded-md  mt-10"
          >
            Register
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

export default Signup;
