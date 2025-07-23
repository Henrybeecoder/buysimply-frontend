import AuthLayout from "../../layout/authLayout";
import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { LocalStorage } from "../../util/localStorage";


export default function Login() {
    const baseUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showVerifyLogin, setShowVerifyLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const loginPayload = {
        userName: email,
        password: password
    }

    const loginFunction = () => {
        setIsLoading(true);
      
        axios
        .post(`${
            baseUrl}/api/Auth/Login`, loginPayload  )
        .then((response) => {
            if (response?.data?.code === "99") {
                toast.error("User is logged in somewhere else")
            }
            else {
                toast.success("User authenticated successfully!", {
                    position: "top-center",
                });
                setIsLoading(false)
                setShowVerifyLogin(true);
                // navigate('/')
                LocalStorage.set('user', response?.data?.data)
                LocalStorage.set('token', response?.data?.data?.jwtToken)
                console.log(response, "login successful");
            }
           
        })
        .catch((error) => {
            toast.error("Invalid email and password", {
                position: "top-center",
            });
            setIsLoading(false);
            console.error(error, "This is my API response");
        });

       // Simulate a 5-second delay
    };

    return (
        <AuthLayout>
          <p className="text-[#61227D] font-bold text-[32px] leading-[48px]">Welcome back</p>
          <p className="text-[#5E5E5E] text-[16px]">Enter your email address and password to access your account.</p>

          <div>
            <label className="text-[#3E3E3E]">Email Address <sup className="text-red-600">*</sup></label>
            <input
              type="email"
              className="w-full h-[48px] border border-[#D9D9D9] rounded-[4px] px-3 mt-2"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <button className="font-semibold text-white bg-[#61227D] cursor-pointer w-full ">
            Sign in
          </button>
          <div className="flex flex-row items-center justify-center mt-4 text-[#5E5E5E]">
   Don’t have an account? <span className="text-[#61227D] font-semibold cursor-pointer">Sign up</span>
          </div>
        </AuthLayout>
    );
}
