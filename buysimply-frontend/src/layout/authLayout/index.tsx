import { motion } from "framer-motion";
import Logo from "../../assets/logo.svg";

export default function AuthLayout({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#F9F9F9] flex h-[100vh] w-full flex-col items-center justify-center"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white lg:w-[25%] w-[90%] min-h-[50px] py-7 px-6 rounded-lg"
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="w-full flex flex-row justify-center items-center"
                >
                    <img src={Logo} alt="logo" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
