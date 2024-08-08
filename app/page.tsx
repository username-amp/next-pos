'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', { username, password });

            if (response.status === 200) {
                Cookies.set('token', response.data.token, { expires: 1 }); // 1 day expiry
                setModalMessage('Login Success!');
                setShowModal(true);
                router.push('/home');
            }
        } catch (error) {
            setModalMessage('No Account Found');
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (modalMessage === 'Login Success!') {
            router.push('/home');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-backColor p-4 sm:p-8">
            <div className="bg-customGray p-10 sm:p-8 rounded-lg shadow-lg max-w-4xl w-full flex flex-col lg:flex-row">
                <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
                    <h1 className="text-gray-100 text-3xl mb-6 text-center font-bold">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full py-2 bg-loginColor text-gray-100 rounded-lg hover:bg-gray-500"
                        >
                            Log In
                        </button>
                    </form>
                </div>
                <div className="lg:w-1/2 w-full justify-center items-center">
                    <div className="text-center">
                        <img src="/icons-01.png" alt="RFID" width={180} height={180} className="rounded mb-3 ml-0 lg:ml-32 hidden lg:flex" />
                        <div className="ml-0 lg:ml-4">
                            <h1 className="text-gray-400 text-center text-lg lg:text-xl">
                                <Link href="#">
                                    Login with RFID
                                </Link>
                            </h1>
                            <p className="hidden lg:block text-center text-gray-400">Scan this to <br /> login instantly</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-backColor p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl mb-4 text-white">{modalMessage}</h2>
                       <div className="flex justify-end">
                       <button 
                            onClick={handleCloseModal} 
                            className="py-1 px-4 justify-end bg-okButton text-white rounded hover:bg-gray-700"
                        >
                            OK
                        </button>
                       </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
