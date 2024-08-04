import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface EnterPinProps {
  redirectTo: string;
  onClose: () => void;
}

const EnterPin: React.FC<EnterPinProps> = ({ redirectTo, onClose }) => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOk = (e: React.FormEvent) => {
    e.preventDefault();

    if (pin === '1234') {
      setLoading(true);
      setTimeout(() => {
        router.push(redirectTo);
        onClose();
      }, 1500);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setModalMessage('Pin Incorrect!');
      }, 1000);
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-backColor p-6 rounded-lg shadow-lg text-center relative z-60"
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-white text-lg font-bold focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4 text-white">Enter Pin</h2>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Pin"
        />
        <div className="flex justify-end">
          <button
            onClick={handleOk}
            className="py-1 px-4 bg-okButton text-white rounded hover:bg-gray-700 mt-3"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'OK'}
          </button>
        </div>
      </div>
      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-backColor p-6 rounded-lg shadow-lg text-center relative z-60">
            <h2 className="text-2xl mb-4 text-white">{modalMessage}</h2>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="py-1 px-4 bg-okButton text-white rounded hover:bg-gray-700 mt-3"
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

export default EnterPin;
