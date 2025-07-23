
//@ts-nocheck
import AppLayout from "../../layout/appLayout";
import apiClient from "../../util/apiClient";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar, DollarSign, Clock, CheckCircle, AlertCircle } from "react-feather";

interface Applicant {
    name: string;
    email: string;
    telephone: string;
    totalLoan: string;
}

interface Loan {
    id: string;
    amount: string;
    maturityDate: string;
    status: 'active' | 'pending';
    applicant: Applicant;
    createdAt: string;
}

interface ApiResponse {
    data: Loan[];
}

export default function Dashboard(): JSX.Element {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getallLoans = async (): Promise<void> => {
        try {
            setLoading(true);
            const response: ApiResponse = await apiClient.get(`/api/loans`);
            setLoans(response.data);
            console.log("All loans fetched successfully:", response.data);
        } catch (error) {
            console.error("Failed to fetch loans:", error);
            setError("Failed to fetch loans");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getallLoans();
    }, []);

    const getStatusColor = (status: 'active' | 'pending'): string => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: 'active' | 'pending'): JSX.Element => {
        switch (status) {
            case 'active':
                return <CheckCircle size={16} className="text-green-600" />;
            case 'pending':
                return <AlertCircle size={16} className="text-yellow-600" />;
            default:
                return <Clock size={16} className="text-gray-600" />;
        }
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -5,
            scale: 1.02,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    if (loading) {
        return (
            <AppLayout>
                <div className="flex flex-col items-center justify-center h-screen">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-[#61227D] border-t-transparent rounded-full"
                    />
                    <p className="mt-4 text-gray-600">Loading loans...</p>
                </div>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout>
                <div className="flex flex-col items-center justify-center h-screen">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-red-500 text-center"
                    >
                        <AlertCircle size={48} className="mx-auto mb-4" />
                        <p className="text-xl font-semibold">{error}</p>
                    </motion.div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50 p-6">
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-[#61227D] mb-2">Loan Dashboard</h1>
                    <p className="text-gray-600 text-lg">
                        Managing {loans.length} loan{loans.length !== 1 ? 's' : ''} across your portfolio
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {loans.map((loan: Loan) => (
                        <motion.div
                            key={loan.id}
                            variants={cardVariants}
                            whileHover="hover"
                            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-2">
                                    <DollarSign className="text-[#61227D]" size={20} />
                                    <span className="text-sm font-medium text-gray-500">ID: {loan.id}</span>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1 ${getStatusColor(loan.status)}`}>
                                    {getStatusIcon(loan.status)}
                                    <span className="capitalize">{loan.status}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{loan.amount}</h3>
                                <p className="text-sm text-gray-500">Loan Amount</p>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center space-x-2">
                                    <User size={16} className="text-gray-400" />
                                    <div>
                                        <p className="font-semibold text-gray-900">{loan.applicant.name}</p>
                                        <p className="text-xs text-gray-500">{loan.applicant.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Phone size={16} className="text-gray-400" />
                                    <span className="text-sm text-gray-600">{loan.applicant.telephone}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Calendar size={16} className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">Maturity: {formatDate(loan.maturityDate)}</p>
                                        <p className="text-xs text-gray-500">Created: {formatDate(loan.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
{loan.applicant.totalLoan && (
 <div className="border-t pt-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Total Loans</span>
                                    <span className="text-sm font-semibold text-[#61227D]">{loan.applicant.totalLoan}</span>
                                </div>
                            </div>
)}
                           
                        </motion.div>
                    ))}
                </motion.div>

                {loans.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <DollarSign size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No loans found</h3>
                        <p className="text-gray-500">Start by creating your first loan application.</p>
                    </motion.div>
                )}
            </div>
        </AppLayout>
    );
}