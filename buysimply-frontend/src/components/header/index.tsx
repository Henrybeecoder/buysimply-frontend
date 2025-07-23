import Logo from "../../assets/logo.svg";
import { ChevronDown, LogOut } from "react-feather";
import { LocalStorage } from "../../util/localStorage";
import { useState } from "react";
import apiClient from "../../util/apiClient";

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const user = LocalStorage.get('user');
    console.log(user, 'user')
    const imageUrl = null;

    const handleLogout = () => {
        apiClient.post(`/api/Auth/RemoveUserSession?userName=${user?.userDetails?.userName}`)
        .then((response) => {
            LocalStorage.remove('user'); 
            LocalStorage.remove('token')// Remove the user from localStorage
            window.location.href = "/login";
        })
        .catch((error) => {
            LocalStorage.remove('user'); 
            LocalStorage.remove('token')// Remove the user from localStorage
            window.location.href = "/login";
        })
      
    };

    return (
        <div className="flex flex-row justify-between items-center min-h-[10vh] border-b border-gray-300 px-10 relative">
            {/* Left Section */}
            <div className="flex flex-row justify-between items-center">
                <img src={Logo} alt="Logo" className="w-[38%]" />
                <h1 className="text-[#1A1A1A] font-bold text-[1.3rem] mt-3">BVN Mapping Portal</h1>
            </div>

            {/* Right Section */}
            <div className="flex flex-row items-center relative  cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {/* Profile Icon */}
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 ${imageUrl ? "bg-cover bg-center" : "bg-gray-200"
                        }`}
                    style={{
                        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                    }}
                >
                    {!imageUrl && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-16 h-16 text-gray-500"
                        >
                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                        </svg>
                    )}
                </div>

                {/* User Info */}
                <div className="ml-3">
                    <h1 className="text-[#1A1A1A] font-bold text-[1rem]">
                        {user?.userDetails?.firstName} {user?.userDetails?.lastName}
                    </h1>
                    <p className="text-[#6C757D] text-[0.9rem]">{user?.userDetails?.roleName}</p>
                </div>

                {/* Dropdown Toggle */}
                <div className="ml-2 cursor-pointer" >
                    <ChevronDown />
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-20 bg-white shadow-lg border rounded-lg w-48 z-10">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-gray-700"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
