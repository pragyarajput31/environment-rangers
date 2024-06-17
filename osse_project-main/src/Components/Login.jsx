import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Wrapper, Loading } from "../Components";
import gsap from "gsap";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    gsap.fromTo(
      ".auth",
      { x: 400, opacity: 0 },
      { x: 0, opacity: 100, duration: 2, ease: "power3.out", stagger: 0.25 }
    );
  }, [isLogin]);

  const login = async () => {
    if (email === "" || password === "") {
      alert("Please fill all the fields");
    } else {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setLoading(false);
        if (data?.message === "Authentication successful") {
          navigate("/");
        } else {
          alert("Invalid Credentials");
        }
      } catch (error) {
        setLoading(false);
        alert("Internal Server Error");
      }
    }
  };

  const register = async () => {
    if (email === "" || password === "" || username === "") {
      alert("Please fill all the fields");
    } else {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        setLoading(false);
        if (data?.message === "User created successfully") {
          alert("User Created Successfully");
          setIsLogin(true);
        } else {
          alert("Username or Email already exists");
        }
      } catch (error) {
        setLoading(false);
        alert("Username or Email already exists");
      }
    }
  };

  return (
    <Wrapper>
      {loading && <Loading />}
      <div className="flex py-4 md:px-[8vw] justify-center">
        <div className="auth w-full h-fit flex flex-col items-center shadow-3xl p-[5vh] rounded-xl">
          <div>
            <h1 className="mt-[5vh] text-center font-montserrat font-bold text-3xl">
              {isLogin ? "Welcome back!" : "Register with ENVIRONMENT RANGERS"}
            </h1>
            <p className="font-montserrat font-light text-center">
              {isLogin
                ? "Please enter your details"
                : "Please fill your details to register"}
            </p>
          </div>

          <div className="flex flex-col items-center mt-[8vh] gap-[2vh] md:w-fit w-full">
            {!isLogin && (
              <div className="border-b-2 md:w-[60vh] flex w-[45vh]">
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg py-4 font-montserrat font-medium md:w-[60vh]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>
            )}
            <div className="border-b-2 md:w-[60vh] flex w-[45vh]">
              <input
                type="email"
                className="mt-2 w-full rounded-lg py-4 font-montserrat font-medium md:w-[60vh]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="border-b-2 md:w-[60vh] flex w-[45vh]">
              <input
                type="password"
                className="mt-2 w-full rounded-lg py-4 font-montserrat font-medium md:w-[60vh]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            {!isLogin && (
              <div className="w-full mt-[1vh]">
                <button
                  className="font-montserrat font-medium text-gray-600 hover:text-[#01796f] hover:scale-105 transition-transform"
                  onClick={() => setIsLogin(true)}
                >
                  Already a User?
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[2vh] w-full md:px-[20vh] px-[5vh] mt-[8vh]">
            <button
              className="text-md w-full font-poppins font-medium shadow-3xl p-3 rounded-xl hover:bg-[#01796f] hover:scale-105 transition-transform"
              onClick={isLogin ? login : register}
            >
              {isLogin ? "Log in" : "Sign up"}
            </button>
            <button className="text-md flex items-center justify-center gap-[2vh] w-full font-poppins font-medium shadow-3xl p-3 rounded-xl hover:bg-red-400 hover:scale-105 transition-transform">
              <FcGoogle /> Log in with Google
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
