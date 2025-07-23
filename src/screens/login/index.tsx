
//@ts-nocheck
import AuthLayout from "../../layout/authLayout";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LocalStorage } from "../../util/localStorage";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "react-feather";

export default function Login() {
    const baseUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);

    const loginPayload = {
        email: email,
        password: password
    }

    const loginFunction = () => {
        setIsLoading(true);
        
        axios
        .post(`${baseUrl}/api/auth/login`, loginPayload)
        .then((response) => {
           
         
                toast.success("User authenticated successfully!", {
                    position: "top-center",
                });
                setIsLoading(false)
                navigate("/");
                LocalStorage.set('user', response?.data?.user)
                LocalStorage.set('token', response?.data?.access_token)
                console.log(response, "login successful");
      
        })
        .catch((error) => {
            toast.error("Invalid email and password", {
                position: "top-center",
            });
            setIsLoading(false);
            console.error(error, "This is my API response");
        });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const buttonVariants = {
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    return (
        <AuthLayout>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
            >
                <motion.p 
                    variants={itemVariants}
                    className="text-[#61227D] font-bold text-[32px] leading-[48px] text-center"
                >
                    Welcome back
                </motion.p>
                
                <motion.p 
                    variants={itemVariants}
                    className="text-[#5E5E5E] text-[16px] text-center"
                >
                    Enter your email address and password to access your account.
                </motion.p>

                <motion.div variants={itemVariants}>
                    <label className="text-[#3E3E3E] !text-left mb-3">
                        Email Address <sup className="text-red-600">*</sup>
                    </label>
                    <input
                        type="email"
                        className="w-full h-[48px] border border-[#D9D9D9] rounded-[10px] px-3 mt-2 outline-0 focus:border-[#61227D] transition-colors"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                    <label className="text-[#3E3E3E] !text-left mb-3">
                        Password <sup className="text-red-600">*</sup>
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full h-[48px] border border-[#D9D9D9] rounded-[10px] px-3 pr-12 mt-2 outline-0 focus:border-[#61227D] transition-colors"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1 text-[#5E5E5E] hover:text-[#61227D] transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    className="flex justify-between items-center my-6 min-h-10"
                >
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="mr-2 accent-[#61227D]"
                        />
                        <span className="text-[#5E5E5E] text-sm">Remember me</span>
                    </label>
                    <button className="text-[#61227D] font-semibold text-sm hover:underline">
                        Forgot password?
                    </button>
                </motion.div>

                <motion.button 
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={loginFunction}
                    disabled={isLoading}
                    className="font-semibold text-white bg-[#61227D] mb-4 cursor-pointer w-full px-2 py-5 rounded-md h-[50px] hover:bg-[#4f1c64] transition-colors disabled:opacity-70"
                >
                    {isLoading ? "Signing in..." : "Sign in"}
                </motion.button>

                <motion.div 
                    variants={itemVariants}
                    className="flex flex-row items-center justify-center mt-4 text-[#5E5E5E]"
                >
                    Don't have an account? 
                    <span className="text-[#61227D] font-semibold cursor-pointer ml-1 hover:underline">
                        Sign up
                    </span>
                </motion.div>
            </motion.div>
        </AuthLayout>
    );
}