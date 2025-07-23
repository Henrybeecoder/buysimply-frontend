//@ts-ignore
import { motion } from "framer-motion";
import Logo from "../../assets/logo.svg";
import Dance from '../../assets/dance.svg';

export default function AuthLayout({ children }) {
    return (
      <div className="h-[100vh] w-full flex lg:flex-row flex-col">
        <div className="bg-[#F8EAFF] w-[50%] lg:block hidden h-full rounded-lg px-8">
<img src={Logo} alt="Logo" className="w-[200px] h-[170px] mt-4 mb-14" />
<div className="font-bold text-center flex flex-col items-center justify-center ">
<img src={Dance}  className="w-[95%] h-full my-4 " />
</div>
<div className="font-bold text-center flex flex-col items-center justify-center mt-14">
<p className="lora text-[#61227D] text-[20px] mt-6">Team Achieve</p>
<p  className="lora text-[#5E5E5E] text-[18px] mt-4">Your perfect solution for funding your  desires</p>
</div>

        </div>
        <div className="bg-white lg:w-[50%] w-full  h-full lg:px-8 px-4 flex flex-col items-center justify-center ">
            <div className="lg:w-[90%] w-full">
            {children}
            </div>

        </div>
      </div>
    );
}
